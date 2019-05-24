'use strict';

/**
 * Author: Arvin
 * Create Time: 2019-05-20 17:40
 * Description:
 */
const Controller = require('egg').Controller;

class AdForbiddenController extends Controller {
    
    async get() {
        const {ctx, app, service, config, logger} = this;
        const now = Date.now();
        const {os, version, appid, deviceid, userid, longitude, latitude} = ctx.headers;
        const params = [os, version, appid, deviceid, userid, longitude, latitude];
        
        logger.info(`进入广告屏蔽：${params}`);
        
        let ret = {...{code: '0000', message: '成功', data: null}}, err, results, deviceIdArr = [];
        
        ret.data = {ad_forbidden: 1};
        ctx.body = ret;
        
        if (!deviceid) {
            logger.info(`广告屏蔽结果：${params}，结果：${JSON.stringify(ret.data)}`);

            return;
        }
        
        deviceIdArr.push(deviceid);
        
        try {
            results = await service.deviceAdForbiddenService.selectDeviceAdForbiddenByDeviceIdSync({deviceIdArr});
        } catch (err) {
            logger.error(err);
            ret = {...{code: '9980', message: '系统异常'}};
            
            return;
        }
    
        if (results && results.length) {
            ret.data.ad_forbidden = results[0].marquee_forbidden;
        }
        
        return;
    }
    
    async rawQueryByReplace() {
        const {ctx, app, service, config, logger} = this;
        const now = Date.now();
        const {os, version, appid, deviceid, userid, longitude, latitude} = ctx.headers;
        const params = [os, version, appid, deviceid, userid, longitude, latitude];
        
        logger.info(`进入广告屏蔽：${params}`);
        
        let ret = {...{code: '0000', message: '成功', data: null}}, err, result, deviceIdArr = [];
        
        ret.data = {ad_forbidden: 1};
        ctx.body = ret;
        
        if (!deviceid) {
            logger.info(`广告屏蔽结果：${params}，结果：${JSON.stringify(ret.data)}`);

            return;
        }
        
        deviceIdArr.push(deviceid);
    
        try {
            result = await service.deviceAdForbiddenService.rawQueryByReplace({deviceIdArr});
        } catch (err) {
            logger.error(err);
            ret = {...{code: '9980', message: '系统异常'}};
            
            return;
        }
    
        if (result) {
            ret.data.ad_forbidden = result.marquee_forbidden;
        }
    }
    
    async rawQueryByBind() {
        const {ctx, app, service, config, logger} = this;
        const now = Date.now();
        const {os, version, appid, deviceid, userid, longitude, latitude} = ctx.headers;
        const params = [os, version, appid, deviceid, userid, longitude, latitude];
        
        logger.info(`进入广告屏蔽：${params}`);
        
        let ret = {...{code: '0000', message: '成功', data: null}}, err, results, deviceIdArr = [];
        
        ret.data = {ad_forbidden: 1};
        ctx.body = ret;
        
        if (!deviceid) {
            logger.info(`广告屏蔽结果：${params}，结果：${JSON.stringify(ret.data)}`);
            
            return;
        }
        
        deviceIdArr.push(deviceid);
        deviceIdArr.push('37643A83C103D19E6ACD05E3E63B8F76');
        
        try {
            results = await service.deviceAdForbiddenService.rawQueryByBind({deviceIdArr});
        } catch (err) {
            logger.error(err);
            ret = {...{code: '9980', message: '系统异常'}};
            
            return;
        }
    
        if (results && results.length) {
            const result = results.find(item => item.device_id === deviceIdArr[0]);
            
            if (result) {
                ret.data.ad_forbidden = result.marquee_forbidden;
            }
        }
        
        return;
    }
    
}

module.exports = AdForbiddenController;
