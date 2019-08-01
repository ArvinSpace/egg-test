'use strict';

const querystring = require('querystring');
const Controller = require('egg').Controller;

/**
 * Author: Arvin
 * Create Time: 2019-07-10 14:35
 * Description:
 */
class HttpClientController extends Controller {
    
    /**
     * 显示列表或者查询结果
     * methos：GET
     * path：/curls
     * route name：curls
     * @returns {Promise.<void>}
     */
    async index() {
        const {logger, config, ctx, service, app} = this;
        
        logger.debug(`显示列表或者查询结果，${ctx.get('Host')},${ctx.get('X-Real-IP')},${ctx.get('X-Forwarded-For')},${ctx.ip},${ctx.ips}`);
        
        ctx.answer({ret: {...app.message.common.SUCCESS}});
    }
    
    /**
     * 显示单个结果
     * methos：GET
     * path：/curls/:id
     * route name：curl
     * @returns {Promise.<void>}
     */
    async show() {
        
        const {logger, config, ctx, service, app} = this;
        
        logger.debug('显示单个结果');
        
        const {params} = ctx;
        const validateRule = {
            id: 'string'
        };
        let ret = {...app.message.common.SUCCESS};
        
        ret.data = null;
    
        try {
            ctx.validate(validateRule, params);
        } catch (e) {
            logger.error(e);
            logger.warn(e.errors);
            ret = {...app.message.common.PARAMETERS_ERROR};
            
            return ctx.answer({ret});
        }
    
        const results = await service.httpbinService.get(`?${querystring.encode(params)}`, null, null);
        
        ret.data = results.data;
        ctx.answer({ret});
    }
    
    /**
     * 新增前操作
     * methos：GET
     * path：/curls/new
     * route name：new_curl
     * @returns {Promise.<void>}
     */
    async new() {
        const {logger, config, ctx, service, app} = this;
    
        logger.debug('新增前操作');
    }
    
    /**
     * 新增操作
     * methos：POST
     * path：/curls
     * route name：curls
     * @returns {Promise.<void>}
     */
    async create() {
        const {logger, config, ctx, service, app} = this;
    
        logger.debug('新增操作');
    }
    
    /**
     * 修改前操作
     * methos：GET
     * path：/curls/:id/edit
     * route name：edit_curl
     * @returns {Promise.<void>}
     */
    async edit() {
        const {logger, config, ctx, service, app} = this;
    
        logger.debug('修改前操作');
    }
    
    /**
     * 修改操作
     * methos：PUT
     * path：/curls/:id
     * route name：curl
     * @returns {Promise.<void>}
     */
    async update() {
        const {logger, config, ctx, service, app} = this;
    
        logger.debug('修改操作');
    }
    
    /**
     * 删除操作
     * methos：DELETE
     * path：/curls/:id
     * route name：curl
     * @returns {Promise.<void>}
     */
    async destroy() {
        const {logger, config, ctx, service, app} = this;
    
        logger.debug('删除操作');
    }
    
}

module.exports = HttpClientController;
