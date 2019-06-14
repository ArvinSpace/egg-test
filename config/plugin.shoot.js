'use strict';

/**
 * Author: Arvin
 * Create Time: 2019-05-14 14:33
 * Description:
 */
module.exports = {
    validate: {
        enable: true,
        package: 'egg-validate',
    },
    
    mysql: {
        enable: false,
        package: 'egg-mysql',
    },
    
    sequelize: {
        enable: false,
        package: 'egg-sequelize',
    },
};
