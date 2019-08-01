'use strict';

/**
 * Author: Meiruihao
 * Create Time: 2019/6/11
 * Description: 全局变量mapper
 */
const _ = require('lodash');
const mysql = require('mysql');

module.exports = (app, model) => {
    const {Op, INTEGER, STRING, TINYINT, DOUBLE, BIGINT} = app.Sequelize;
    
    const GlobalVariable = model.define('tb_global_variable', {
        'id': {type: INTEGER, primaryKey: true, autoIncrement: true},
        'key': {type: STRING(32)},
        'type': STRING(8),
        'value': STRING(1024),
        'remark': STRING(255),
        'create_time': BIGINT,
        'update_time': BIGINT,
    },
    );
    
    GlobalVariable.selectByKeyReadonly = async function({key}) {
        return await this.findOne({
            where: {
                key: key
            }
        });
    };
    
    return GlobalVariable;
};
