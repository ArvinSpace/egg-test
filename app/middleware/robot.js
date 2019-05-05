'use strict';

/**
 * Author: Arvin
 * Create Time: 2019-04-30 15:15
 * Description:
 */

module.exports = function(options, app) {
    
    return async function(ctx, next) {
        const source = ctx.get('user-agent') || '';
        // const source = ctx.headers['user-agent'] || '';
        
        ctx.logger.info(`source: ${source}`);
        
        const match = options.ua.some(ua => ua.test(source));
        
        if (match) {
            ctx.response.status = 403;
            ctx.response.body = 'Go away, robot.';
        } else {
            return await next();
        }
    };
    
};
