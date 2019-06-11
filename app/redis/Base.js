/**
 * Created by Arvin on 2019/6/10.
 */
const redis = require('redis');
let bussRedisClient;

module.exports = class Base {
    
    constructor(app) {
        this.app = app;
    }
    
    /**
     * 获取业务Redis连接
     * @return {*}
     */
    getBussRedisClient() {
        if (bussRedisClient) {
            return bussRedisClient;
        }
        bussRedisClient = redis.createClient(this.app.config.redis.port, this.app.config.redis.host, this.app.config.redis.opts);
        bussRedisClient.on('error', function(err) {
            this.logger.error(err);
        });
    
        return bussRedisClient;
    }
        
};
