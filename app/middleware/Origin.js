'use strict';

/**
 * Author: Arvin
 * Create Time: 2019-06-14 16:21
 * Description: 跨域校验 中间件
 */
module.exports = (options, app) => {
    const {whiteList} = options;
    
    if (!Array.isArray(whiteList)) {
        throw new Error('跨域白名单必须设置为数组');
    }
    
    return async function(ctx, next) {
        const origin = ctx.get('origin');
        
        ctx.logger.info(`origin: ${origin}`);
        
        if (whiteList.includes('*')) {
            ctx.response.set('Access-Control-Allow-Origin', origin);
        } else if (whiteList.includes(origin)) {
            ctx.response.set('Access-Control-Allow-Origin', origin);
        }
    
        ctx.response.set('Access-Control-Allow-Methods', '*');
        ctx.response.set('Access-Control-Allow-Headers', '*');
        
        if (ctx.method === 'OPTIONS') {
            ctx.answer({ret: {...app.message.common.SUCCESS}});
            
            return;
        }
        
        return await next();
    };
    
};
