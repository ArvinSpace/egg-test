'use strict';

/**
 * Author: meiruihao
 * Create Time: 2019-04-30 15:15
 * Description: 登录token验证
 */


module.exports = function(options, app) {
    
    return async function(ctx, next) {
        
        let ret = {...app.message.common.SUCCESS}, err, results = [];
        
        const env = app.config.env;
        
        if (env !== 'local') {
            const token = ctx.headers.token;
            const userID = ctx.headers.userid;
            const appId = ctx.headers.appid;
            const wxMiniProgramOpenId = ctx.headers.wx_mini_openid;

            if (!token || !userID) {
                ctx.logger.warn(`登录过期，userID:${userID},token:${token}`);
                ret = {...app.message.common.TOKEN_EXPIRE};
                ctx.response.body = ret;
    
                return;
            }

            // 微信小程序
            if (appId == 1004) {
                if (!token || !wxMiniProgramOpenId) {
                    ctx.logger.warn(`微信小程序登录过期，wxMiniProgramOpenId:${wxMiniProgramOpenId},token:${token}`);
                    ret = {...app.message.common.TOKEN_EXPIRE};
                    ctx.response.body = ret;
        
                    return;
                }
    
                [err, results] = await new Promise(resolve => {
                    app.redis.base.buss.get(token, function(err, reply) {
                        return resolve([err, reply]);
                    });
                });
    
                if (err) {
                    ctx.logger.error(err);
                    ret = {...app.message.common.SYSTEM_EXCEPTION};
                    ctx.response.body = ret;
        
                    return;
                }
    
                if (!results || wxMiniProgramOpenId != results) {
                    ctx.logger.warn(`微信小程序登录过期，wxMiniProgramOpenId:${wxMiniProgramOpenId},reply:${results},token:${token}`);
                    ret = {...app.message.common.TOKEN_EXPIRE};
                    ctx.response.body = ret;
        
                    return;
                }
    
                return await next();
            }
            // ios、android、wap


            [err, results] = await new Promise(resolve => {
                app.redis.base.buss.get(token, function(err, reply) {
                    return resolve([err, reply]);
                });
            });

            if (err) {
                ctx.logger.error(err);
                ret = {...app.message.common.SYSTEM_EXCEPTION};
                ctx.response.body = ret;
    
                return;
            }

            if (!results || userID != results) {
                ctx.logger.warn(`登录过期，userID:${userID},reply:${results},token:${token}`);
                ret = {...app.message.common.TOKEN_EXPIRE};
                ctx.response.body = ret;
    
                return;
            }

            return await next();
    
            
        }
            
        return await next();
        
        
    };
    
};
