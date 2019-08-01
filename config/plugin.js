'use strict';

/**
 * Author: Arvin
 * Create Time: 2019-05-14 14:33
 * Description:
 */
module.exports = {
    static: {
        enable: false,
    },
    session: {
        enable: false,
    },
    i18n: {
        enable: false,
    },
    
    validate: {
        enable: true,
        package: 'egg-validate',
    },
    
    mysql: {
        enable: false,
        package: 'egg-mysql',
    },
    
    sequelize: {
        enable: true,
        package: 'egg-sequelize',
    },
    
    onerror: {
        // enable: false,
    },
};
