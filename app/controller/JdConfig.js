'use strict';

const Controller = require('egg').Controller;

class JdConfigController extends Controller {

    async get() {
        const {ctx, app, service, config, logger} = this;
        
        const jd_config_id = ctx.query.jd_config_id;
        
        logger.info(`进入获取京东配置：${jd_config_id}`);
        
        let ret = {...this.app.message.common.SUCCESS}, err, results = {};
        
        if(!jd_config_id){
            ret = {...this.app.message.common.PARAMETERS_ERROR};
            ctx.response.body = ret;
            
            return;
        }
        
        try {
            results = await service.jdService.getJdConfigById(jd_config_id);
        }catch(err) {
            logger.error(err);
            ret = {...this.app.message.common.SYSTEM_EXCEPTION};
    
            return;
        }
        
        if (results && JSON.stringify(results).length > 0) {
            ret.data = results;
        }
        
        ctx.response.body = ret;
        
        return ret;
        
    }

}

module.exports = JdConfigController;
