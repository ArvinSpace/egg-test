'use strict';

/**
 * Author: Arvin
 * Create Time: 2019-05-20 17:23
 * Description:
 */
const Service = require('egg').Service;

class DeviceAdForbiddenService extends Service {
    
    constructor(ctx) {
        super(ctx);
        // this.Base = this.app.mysql.get('nintybid_business');
        // this.BaseReadonly = this.app.mysql.get('nintybid_readonly');
    }
    
    async selectDeviceAdForbiddenByDeviceIdSync({deviceIdArr = []}) {
        const {ctx, app, service, config, logger} = this;
        let err, results;
        
        // try {
        //     results = await this.BaseReadonly.select('tb_device_ad_forbidden', {
        //         where: {
        //             device_id: deviceIdArr
        //         }
        //     });
        // } catch (err) {
        //     throw err;
        // }
        
        try {
            results = await app.read.DeviceAdForbiddenMapper.selectDeviceAdForbiddenByDeviceIdSync({deviceIdArr});
        } catch (err) {
            throw err;
        }
        
        // logger.debug(results);
        
        return results;
    }
    
    async rawQuery({deviceIdArr = []}) {
        const {ctx, app, service, config, logger} = this;
        let err, results;
        
        try {
            results = await app.read.DeviceAdForbiddenMapper.rawQuery({
                deviceIdArr,
                op: {
                    // raw: true,
                    plain: false,
                    // model: app.read.DeviceAdForbiddenMapper,
                    // mapToModel: true,
                    attributes: ['device_id', 'marquee_forbidden'],
                }
            });
        } catch (err) {
            throw err;
        }
        
        logger.debug(results);
        
        return results;
    }
    
    async rawQueryByReplace({deviceIdArr = []}) {
        const {ctx, app, service, config, logger} = this;
        let err, results;
        
        try {
            results = await app.read.DeviceAdForbiddenMapper.rawQueryByReplace({
                deviceIdArr,
                options: {
                    // raw: true,
                    plain: true,
                    // mapToModel: false,
                    fieldMap: {id: 'd_id'},
                    attributes: ['marquee_forbidden'],
                }
            });
        } catch (err) {
            throw err;
        }
        
        logger.debug(results);
        
        return results;
    }
    
    async rawQueryByBind({deviceIdArr = []}) {
        const {ctx, app, service, config, logger} = this;
        let err, results;
        
        try {
            results = await app.read.DeviceAdForbiddenMapper.rawQueryByBind({
                deviceIdArr,
                op: {
                    // raw: true,
                    plain: false,
                    // model: app.read.DeviceAdForbiddenMapper,
                    // mapToModel: true,
                    attributes: ['device_id', 'marquee_forbidden'],
                }
            });
        } catch (err) {
            throw err;
        }
        
        logger.debug(results);
        
        return results;
    }
    
}

module.exports = DeviceAdForbiddenService;
