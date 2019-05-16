'use strict';

/**
 * Author: Arvin
 * Create Time: 2019-04-29 14:39
 * Description:
 */

const Controller = require('egg').Controller;

class NewsController extends Controller {
    
    /**
     * 列表
     * @return {Promise.<void>}
     */
    async list() {
        const ctx = this.ctx;
        const page = ctx.request.query.page || 1;
        const newsList = await ctx.service.news.list(page);
        
        ctx.response.body = newsList;
    }
    
    /**
     * 详情
     * @return {Promise.<void>}
     */
    async detail() {
        const ctx = this.ctx;
        const {logger, params} = ctx;
        const {code} = params;
    
    
        let ret = {...{code: '0000', message: '成功', data: null}};
        const createRule = {
            code: {type: 'string'},
        };
    
        // 校验参数
        try {
            const checkResult = ctx.validate(createRule, params);
            
            logger.debug(`checkResult:-----------------${checkResult}`);
        } catch (err) {
            logger.error(err);
            logger.warn(err.errors);
            ret = {...{code: '9980', message: '参数错误'}};
            ctx.response.body = ret;
            
            return;
        }
        
        
        logger.debug(code, ctx.isIOS, ctx.isAndroid);
        
        const result = await ctx.service.news.detail(code);
    
        if (result) {
            ret.data = result;
        }
    
        ctx.response.body = ret;
        
        return;
    }
    
}

module.exports = NewsController;
