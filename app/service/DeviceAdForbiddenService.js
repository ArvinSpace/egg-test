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
        this.Base = this.app.mysql.get('nintybid_business');
        this.BaseReadonly = this.app.mysql.get('nintybid_readonly');
    }
    
    async selectDeviceAdForbiddenByDeviceIdSync({deviceIdArr = []}) {
        const {ctx, app, service, config, logger} = this;
        let err, results;
    
        try {
            results = await this.BaseReadonly.select('tb_device_ad_forbidden', {
                where: {
                    device_id: deviceIdArr
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
