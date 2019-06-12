/**
 * Created by Arvin on 2019/6/10.
 */
const redis = require('redis');
const pool = {};

module.exports = class Base {
    
    constructor(app) {
        this.app = app;
    }
    
    /**
     * 获取业务Redis连接
     * @return {*}
     */
    get buss() {
        if (pool.buss) {
            return pool.buss;
        }
        pool.buss = redis.createClient(this.app.config.redis.port, this.app.config.redis.host, this.app.config.redis.opts);
        pool.buss.on('error', function(err) {
            this.logger.error(err);
        });
    
        return pool.buss;
    }
        
};
