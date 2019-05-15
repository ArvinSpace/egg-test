'use strict';

/**
 * Author: Arvin
 * Create Time: 2019-05-14 12:41
 * Description:
 */

const Controller = require('egg').Controller;

class Other extends Controller {
    
    async body_parse() {
        const {ctx, logger} = this;
        
        logger.info('request--------:', ctx.request);
        logger.debug('headers--------:', ctx.header);
        logger.debug('query--------:', ctx.query);
        logger.info('body--------:', ctx.request.body);
        logger.info('rawBody--------:', ctx.request.rawBody);
        
        ctx.body = {
            request: ctx.request,
            header: ctx.header,
            query: ctx.query,
            body: ctx.request.body,
            raw_body: ctx.request.rawBody,
        };
    }
    
}

module.exports = Other;
