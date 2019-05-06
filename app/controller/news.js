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
     * @returns {Promise.<void>}
     */
    async list() {
        const ctx = this.ctx;
        const page = ctx.request.query.page || 1;
        const newsList = await ctx.service.news.list(page);
        
        ctx.response.body = newsList;
    }
    
    /**
     * 详情
     * @returns {Promise.<void>}
     */
    async detail() {
        const ctx = this.ctx;
        const {code} = ctx.params;
        
        ctx.logger.debug(code, ctx.isIOS, ctx.isAndroid);
    
        const ret = {...{code: '0000', message: '成功', data: null}};
        
        const result = await ctx.service.news.detail(code);
    
        if (result) {
            ret.data = result;
        }
    
        ctx.response.body = ret;
        
        return;
    }
    
}

module.exports = NewsController;
