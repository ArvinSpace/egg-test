'use strict';

const commonConstants = require('../constants/CommonConstants');
const prodReleaseURIs = '/api/common/fulladdress,/api/common/pull_fulladdress,/api/common/refresh_fulladdress,';

/**
 * Author: xuzhibin
 * Create Time: 2019-06-14 15:15
 * Description: 签名验证
 */
module.exports = function(options, app) {
    
    return async function(ctx, next) {
        
        const env = app.config.env;
        
        if (env !== 'local') {
            const srcURI = ctx.originalUrl.split('?')[0];
            // 获取prodReleaseURIs数组
            let blurMatch = false;
            const arr = prodReleaseURIs.split(','); // 分割参数

            for (let i = 0, l = arr.length; i < l; i++) { // 遍历参数
                if (arr[i] && srcURI.startsWith(arr[i])) {
                    blurMatch = true;
                    break;
                }
            }
            if (blurMatch) {
                return await next();
            }
            const {appid, version, os, sign} = ctx.headers;
            const newSign = ctx.helper.isShoppingCartVersion(appid, version);
            
            let params = null;
            let sortParams = null;
            let spliceParams = '';
            let srcSign = '';

            if (newSign) {
                if (ctx.method === 'GET') {
                    params = ctx.query;
                    sortParams = ctx.helper.sortDict(params);
                    spliceParams = ctx.helper.spliceParamsSortSign(sortParams);
                    srcSign += srcSign && spliceParams ? `&${spliceParams}` : spliceParams;
                } else {
                    params = ctx.body;
                    sortParams = ctx.helper.sortDict(params);
                    spliceParams = ctx.helper.spliceParamsSortSign(sortParams);
                    srcSign += srcSign && spliceParams ? `&${spliceParams}` : spliceParams;
                }
                
                srcSign = `${srcURI}?${srcSign}`;
            } else {
                params = ctx.method === 'GET' ? ctx.query : ctx.request.body;
                sortParams = ctx.helper.sortDict(params);
                srcSign = ctx.helper.generateOriginalSign(sortParams, srcURI);
            }
            
            // 判断请求路径是否与平台一致
            if (!ctx.helper.ifContains(commonConstants.osArr, os)) {
                ctx.logger.warn(ctx.headers);
                ctx.body = ctx.helper.APP_ID_IS_INVALID;
                
                return;
            }
            // 获取请求路径 127.0.0.1
            const path = ctx.request.hostname;

            // ios
            if (commonConstants.osArr[0] === os) {
                if (app.config.IOS_HOST !== path) {
                    ctx.logger.warn(ctx.headers);
                    ctx.body = ctx.helper.SIGN_INVALID;
                    
                    return;
                }
                // 根据不同平台取不同密钥验签
                if (!sign || !ctx.helper.verify(app.config.PUBLIC_KEY_IOS, sign, srcSign, 'RSA-SHA1')) {
                    ctx.logger.warn(`srcSign: "${srcSign}", sign: "${sign}"`);
                    ctx.logger.warn(ctx.headers);
                    ctx.body = ctx.helper.SIGN_INVALID;
    
                    return;
                }

                return await next();
                
            }
            // android
            else if (commonConstants.osArr[1] === os) {
                if (app.config.ANDROID_HOST !== path) {
                    ctx.logger.warn(ctx.headers);
                    ctx.body = ctx.helper.SIGN_INVALID;
    
                    return;
                }
                // 根据不同平台取不同密钥验签
                if (!sign || !ctx.helper.verify(app.config.PUBLIC_KEY_ANDROID, sign, srcSign, 'RSA-SHA1')) {
                    ctx.logger.warn(`srcSign: "${srcSign}", sign: "${sign}"`);
                    ctx.logger.warn(ctx.headers);
                    ctx.body = ctx.helper.SIGN_INVALID;
                    
                    return;
                }

                return await next();
                
            }
            // wxmini
            else if (commonConstants.osArr[3] === os) {
                if (app.config.WXMINI_HOST !== path) {
                    ctx.logger.warn(ctx.headers);
                    ctx.body = ctx.helper.SIGN_INVALID;
                    
                    return;
                }
                // 根据不同平台取不同密钥验签
                if (!sign || !ctx.helper.verify(app.config.PUBLIC_KEY_WXMINI, sign, srcSign, 'RSA-SHA1')) {
                    ctx.logger.warn(`srcSign: "${srcSign}", sign: "${sign}"`);
                    ctx.logger.warn(ctx.headers);
                    ctx.body = ctx.helper.SIGN_INVALID;
                    
                    return;
                }

                return await next();
                
            }
            // wap
            
            if (app.config.WAP_HOST !== path) {
                ctx.logger.warn(ctx.headers);
                ctx.body = ctx.helper.SIGN_INVALID;
    
                return;
            }
            // 根据不同平台取不同密钥验签
            if (!sign || !ctx.helper.verify(app.config.PUBLIC_KEY, sign, srcSign, 'RSA-SHA1')) {
                ctx.logger.warn(`srcSign: "${srcSign}", sign: "${sign}"`);
                ctx.logger.warn(ctx.headers);
                ctx.body = ctx.helper.SIGN_INVALID;
                
                return;
            }

            return await next();
            
            
        }
        const params = ctx.request.method === 'GET' ? ctx.query : ctx.request.body;

        ctx.logger.info('=======================入参 Start========================');
        console.dir(ctx.headers);
        console.dir(params);
        ctx.logger.info('=======================入参 End========================');

        return await next();
        
    };
    
    
};
