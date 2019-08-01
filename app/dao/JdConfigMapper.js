'use strict';

const _ = require('lodash');
const mysql = require('mysql');

module.exports = (app, model) => {
    
    const {Op, BIGINT, INTEGER, STRING} = app.Sequelize;
    
    const JdConfig = model.define('tb_jd_config', {
            'id': {type: INTEGER(11), primaryKey: true, autoIncrement: true},
            'uid': {type: STRING(64)},
            'access_token': {type: STRING(64)},
            'refresh_token': {type: STRING(64)},
            'time': {type: BIGINT(20)},
            'expires_in': {type: BIGINT(20)},
            'refresh_token_expires': {type: BIGINT(20)},
            'operator': {type: STRING(32)},
            'create_time': BIGINT,
            'update_time': BIGINT,
        },
    );
    
    JdConfig.selectJdConfigAll = async function(){
        return await this.findAll();
    };
    
    JdConfig.getJdConfigById = async function({jdConfigId}) {
        return await this.findOne({
            where :{
                id : jdConfigId
            }
        });
    };
    
    return JdConfig;

};
