'use strict';

/**
 * Author: Arvin
 * Create Time: 2019-06-15 17:40
 * Description: 防XSS攻击 中间件
 */
module.exports = (options, app) => {
    return async function(ctx, next) {
        const query = ctx.query;
        const body = ctx.body;
    
        try {
            if (query) {
                escapeRecursive(query);
            }
            if (body) {
                escapeRecursive(body);
            }
        } catch (e) {
            ctx.logger.warn(e);
        }
        
        return await next();
    };
    
    function escapeRecursive(params) {
        if (params) {
            for (const i in params) {
                if (typeof params[i] === 'string' && params[i]) {
                    params[i] = app.Helper.prototype.escape(params[i]);
                } else if (typeof params[i] === 'object' && params[i]) {
                    escapeRecursive(params[i]);
                }
            }
        }
    }
};
