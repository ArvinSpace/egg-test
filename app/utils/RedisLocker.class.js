const Promise = require('bluebird');
const util = require('util');
let EventEmitter = require('events');
const Decimal = require('decimal.js');

if (typeof EventEmitter.EventEmitter === 'function')
{EventEmitter = EventEmitter.EventEmitter;}
function _randomStr(len) {
    const baseString = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    len = len || 13;
    let str = '';

    for (let i = 0; i < len; i++) {
        str += baseString[parseInt(Math.random() * (len - 1), 0)];
    }

    return str;
}
function _random() {
    return Date.now() + _randomStr();
}

function Lock(redlock, resource, value) {
    this.redlock = redlock;
    this.resource = resource;
    this.value = value;
}
Lock.prototype.unlock = function(callback) {
    return this.redlock.unlock(this, callback);
};
Lock.prototype.extend = function(ttl, callback) {
    if (typeof ttl === 'function') {
        return ttl('the first param ttl is missing.');
    }

    return this.redlock.extend(this, ttl, callback);
};
function Redlock(client, option) {
    this.client = client;
    this.option = option;
}
util.inherits(Redlock, EventEmitter);

/**
 * 加锁，可设置超时时间
 * @param resource 资源标识
 * @param ttl 锁时间（秒）
 * @param timeOut 获取锁等待超时时间（秒）
 * @param callback 回调函数(err, lock)
 * @return {Promise.<*>}
 */
Redlock.prototype.lockTimeout = async function(resource, ttl, timeOut, callback) {
    const self = this;
    const waitEndTime = Date.now() + Decimal.mul(timeOut, 1000).toNumber();
    // console.log(new Date().toLocaleString())
    // console.log(new Date(waitEndTime).toLocaleString())

    let err = null;
    let lock = null;
    let currTime = null;

    // let i = 0;
    while (!lock) {
        currTime = Date.now();
        // console.log(waitEndTime < currTime, i)
        if (waitEndTime < currTime) {
            // console.log(2)
            this.logger.error(resource, '加锁失败,等待超时!');

            return callback(err, lock);
        }

        err = null;
        lock = null;
        try {
            await self.lock(resource, ttl, function(errObj, lockObj) {
                if (errObj) {
                    // console.log('self errObj', i)
                    err = errObj;
                    // console.error('self errObj', errObj)
                } else {
                    lock = lockObj;
                }
            });
        } catch (error) {
            // console.error(error)
            // console.log('self err catch', i)
        }

        if (lock) {
            // console.log(1)
            return callback(err, lock);
        }

        await new Promise(function(resoleveTimeout) {
            setTimeout(function() {
                // console.log('setTimeout done', i++)
                return resoleveTimeout();
            }, 100);
        });
    }
};

Redlock.prototype.lock = function(resource, ttl, callback) {
    const self = this;
    const _val = _random();

    return new Promise(function(resolve, reject) {
        if (typeof ttl === 'function') {
            callback = ttl;

            return reject('the first param ttl is missing.');
        }
        const lock = new Lock(self, resource, _val);

        self.client.SET(resource, _val, 'EX', ttl, 'NX', function(err, data) {
            if (!err && data === 'OK') {
                return resolve(lock);
            }
            err = err || `resource: ${resource} is locked.`;

            self.emit('lockError', err);

            return reject(err);
            
        });
    }).asCallback(callback);
};

Redlock.prototype.unlock = function(lock, callback) {
    const self = this;

    return new Promise(function(resolve, reject) {
        if (typeof lock !== 'object') return reject('unlockError:lock is not object.');
        self.client.GET(lock.resource, function(err, data) {
            if (!err && data === lock.value) {
                self.client.DEL(lock.resource, function(err) {
                    if (err) {
                        self.emit('unlockError', err);

                        return reject(`unlockError:${err}`);
                    }
 
                    return resolve(lock);
                    
                });
            } else {
                self.emit('unlockError', err || `resource:${lock.resource} unable to unlock.`);

                return reject(`unlockError:${err}` || (`resource:${lock.resource} unable to unlock.`));
            }
        });
    }).asCallback(callback);
};

Redlock.prototype.extend = function(lock, ttl, callback) {
    const self = this;

    return new Promise(function(resolve, reject) {
        if (typeof lock !== 'object') return reject('unlockError:lock is not object.');
        self.client.GET(lock.resource, function(err, data) {
            if (!err && data === lock.value) {
                self.client.expire(lock.resource, ttl, function(err, data) {
                    if (!err && data === 1) {
                        return resolve(lock);
                    }
                    self.emit('extendError', err);

                    return reject(`extendError:${err}`);
                    
                });
            } else {
                self.emit('extendError', err);

                return reject(`extendError:${err}`);
            }
        });
    }).asCallback(callback);
};

module.exports = Redlock;
