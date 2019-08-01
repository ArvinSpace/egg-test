'use strict';

const Service = require('egg').Service;

const httpbinDomain = 'http://httpbin.org';

/**
 * https://httpbin.org调用接口
 * Author: Arvin
 * Create Time: 2019-07-10 15:18
 * Description:
 */
class HttpbinService extends Service {
    
    async get(query, timeout, headers, dataType = 'json') {
        const {logger, config, ctx, service, app} = this;
        const url = `${httpbinDomain}/get${query}`;
        const options = {method: 'GET', headers};
        
        if (timeout) {
            options.timeout = timeout;
        }
        if (dataType) {
            options.dataType = dataType;
        }
        
        logger.info(`curl:${url},${JSON.stringify(options)}`);
        
        let ret = null;
        
        ret = await ctx.curl(url, options);
        // await new Promise(function (resolveTimeout, reject) {
        //     setTimeout(function () {
        //
        //         setTimeout(function () {
        //             ret;
        //             return reject();
        //         }, 1000)
        //     }, 1000)
        // }).catch(function(err) {
        //     ret;
        //     logger.error(err);
        // });
        
        return ret;
    }
    
    async post(query, timeout, headers, data, dataType = 'json', contentType) {
        const {logger, config, ctx, service, app} = this;
        const url = `${httpbinDomain}/post${query}`;
        const options = {method: 'POST', headers, data};
    
        if (timeout) {
            options.timeout = timeout;
        }
        if (contentType) {
            options.contentType = contentType;
        }
        if (dataType) {
            options.dataType = dataType;
        }
    
        logger.info(`curl:${url},${JSON.stringify(options)}`);
        
        return await ctx.curl(url, options);
    }
    
    async put(query, timeout, headers, data, dataType = 'json', contentType) {
        const {logger, config, ctx, service, app} = this;
        const url = `${httpbinDomain}/put${query}`;
        const options = {method: 'PUT', headers, data};
    
        if (timeout) {
            options.timeout = timeout;
        }
        if (contentType) {
            options.contentType = contentType;
        }
        if (dataType) {
            options.dataType = dataType;
        }
    
        logger.info(`curl:${url},${JSON.stringify(options)}`);
        
        return await ctx.curl(url, options);
    }
    
    async delete(query, timeout, headers, dataType = 'json') {
        const {logger, config, ctx, service, app} = this;
        const url = `${httpbinDomain}/delete${query}`;
        const options = {method: 'DELETE', headers};
    
        if (timeout) {
            options.timeout = timeout;
        }
        if (dataType) {
            options.dataType = dataType;
        }
    
        logger.info(`curl:${url},${JSON.stringify(options)}`);
    
        return await ctx.curl(url, options);
    }
    
}

module.exports = HttpbinService;
