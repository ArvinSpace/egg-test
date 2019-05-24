/* eslint-disable no-multiple-empty-lines */
'use strict';

/**
 * Author: Arvin
 * Create Time: 2019-05-22 11:30
 * Description:
 */
const _ = require('lodash');
const mysql = require('mysql');

module.exports = (app, model) => {
    const {Op, INTEGER, STRING, TINYINT, DOUBLE, BIGINT} = app.Sequelize;
    
    const DeviceAdForbidden = model.define('tb_device_ad_forbidden', {
        'id': {type: INTEGER, primaryKey: true, autoIncrement: true},
        'user_id': {type: INTEGER},
        'device_id': STRING(30),
        'marquee_forbidden': TINYINT,
        'longitude': DOUBLE(10, 6),
        'latitude': DOUBLE(10, 6),
        'create_time': BIGINT,
        'update_time': BIGINT,
    },
    );
    
    DeviceAdForbidden.selectDeviceAdForbiddenByDeviceIdSync = async function({deviceIdArr = []}) {
        
        return await this.findAll({
            where: {
                device_id: {
                    [Op.in]: deviceIdArr
                }
            }
        });
    };
    
    DeviceAdForbidden.rawQueryByReplace = async function({deviceIdArr = [], options = {}}) {
        const sql = 'select `id`, `user_id`, `device_id`, `marquee_forbidden`, `longitude`, `latitude`, `create_time`, `update_time` ' +
            'from tb_device_ad_forbidden ' +
            'where device_id in(?)';
        const replacements = [
            deviceIdArr,
        ];
        const def = {
            // raw: true,
            type: model.QueryTypes.SELECT,
            model: this,
            mapToModel: true, // pass true here if you have any mapped fields
            replacements,
        };
        
        options = _.assign(def, _.cloneDeep(options));
        
        return await model.query(sql, options);
    };
    
    DeviceAdForbidden.rawQueryByBind = async function({deviceIdArr = [], op = {}}) {
        let sql = 'select ?? from ?? where device_id in(?)';
        const params = [
            op.attributes || ['id', 'user_id', 'device_id', 'marquee_forbidden', 'longitude', 'latitude', 'create_time', 'update_time'],
            'tb_device_ad_forbidden',
            deviceIdArr,
        ];
        const def = {
            type: model.QueryTypes.SELECT,
            bind: deviceIdArr,
        };
        
        deviceIdArr.forEach((item, i) => sql += ` OR device_id = $${i + 1}`);
        sql = mysql.format(sql, params);
        op = _.assign(def, _.cloneDeep(op));
        
        return await model.query(sql, op);
    };
    
    return DeviceAdForbidden;
};
