'use strict';

/**
 * Author: Arvin
 * Create Time: 2019-07-10 14:30
 * Description:
 */
module.exports = app => {
    const {router, controller} = app;
    
    router.resources('curls', '/curls', controller.httpClientController);
};

