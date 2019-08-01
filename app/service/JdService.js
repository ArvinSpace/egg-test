
const Service = require('egg').Service;
const commonUtil = require('../utils/CommonUtil');
const common = require('../message/Common');


class JdService extends Service {
    
    
    async getJdConfigById(jdConfigId){
        const {ctx, app, service, config, logger} = this;
        let err, results, ret;
        try{
            results = await app.read.JdConfigMapper.getJdConfigById({jdConfigId});
        }catch(err){
            throw err;
        }
        return results;
    };

    /**
     * 批量获取京东商品库存
     * @param info -{skuNums:商品和数量[{skuId:String, num:Number}], area:格式：1_0_0 (分别代表1、2、3级地址)}
     * @param callback
     * @returns {*} -e.g.{code:0000, message:成功, data:{
     * resultCode:null,  //错误码，详见“点击这里”；
       success:true,   // 执行结果成功，还是失败；
       resultMessage:""   // 错误描述
     * result: [
     *     {
     *          areaId:配送地址id e.g.1_0_0,
     *          desc:描述,
     *          skuId:商品编号,
     *          stockStateId:库存状态编号 33,39,40,36,34,99,
     *          stockStateDesc:库存状态描述
     *              33 有货 现货-下单立即发货
                    39 有货 在途-正在内部配货，预计2~6天到达本仓库
                    40 有货 可配货-下单后从有货仓库配货
                    36 预订
                    34 无货
                    99 无货开预定，此时 desc 返回的数值代表预计到货天数，并且该功能需要依赖合同上有无货开预定权限的用户，到货周期略长，谨慎采用该功能
                remainNum:剩余数量 -1未知；当库存小于5时展示真实库存数量
     *     },
     *     ...
     * ]
     * }}
     */
    
    async getNewStockById(info) {
        const {ctx, app, service, config, logger} = this;
        let err, results, ret;
        
       /* let ret = Object.assign({}, message.common.SUCCESS);
        ret.data = {};*/
        const jsonInfo = JSON.stringify(info);
        const url = 'https://bizapi.jd.com/api/stock/getNewStockById';
        this.logger.info(`批量获取库存接口，参数:${jsonInfo},URL: ${url}`);
        
        try{
            results = await app.read.JdConfigMapper.selectJdConfigAll();
    
            if (!results || results.length === 0) {
                ctx.body = common.SYSTEM_EXCEPTION;
                
                return;
            }
            
            const accessToken = results[0].access_token;
            info.token = accessToken;
    
            const response = await this.ctx.curl(url, {timeout: 2000, form: info}, {dataType: 'json'});
            if (response && response.statusCode == 200) {
                let body = response.body;
                // logger.info("批量获取库存接口结束，参数：", JSON.stringify(info), "，结果：", JSON.stringify(body));
                if (body) {
                    body = commonUtil.jsonParseToObj(body);
                    if (body.success) {
                        body.result = commonUtil.jsonParseToArray(body.result);
                        body.result[0].remainNum = 1;
                    }
                    ret.data = body;
                } else {
                    logger.error("批量获取库存接口失败，参数：", JSON.stringify(info));
                }
            }
            return ret;
            
        }catch(err){
            throw err;
        }
        
        /*jdConfigDAO.selectAll(function (err, results) {
            if (err) {
                logger.error(err);
                return callback(message.common.SYSTEM_EXCEPTION);
            }
            if (!results || results.length === 0) {
                return callback(message.common.SYSTEM_EXCEPTION);
            }

            var accessToken = results[0].access_token;
            info.token = accessToken;
            request.post(url, {timeout: 2000, form: info}, function (err, rsp, body) {
                if (err) {
                    logger.error(err);
                    return callback(message.common.NETWORK_EXCEPTION);
                }
                if (rsp && rsp.statusCode == 200) {
                    logger.info("批量获取库存接口结束，参数：", JSON.stringify(info), "，结果：", JSON.stringify(body));
                    if (body) {
                        body = commonUtil.jsonParseToObj(body);
                        if (body.success) {
                            body.result = commonUtil.jsonParseToArray(body.result);
                            body.result[0].remainNum = 1;
                        }
                        ret.data = body;
                    } else {
                        logger.error("批量获取库存接口失败，参数：", JSON.stringify(info));
                    }
                }
                return callback(ret);
            });
        });*/
        
    }
};

module.exports = JdService;
