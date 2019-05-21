'use strict';

/**
 * Author: Arvin
 * Create Time: 2019-05-20 17:53
 * Description:
 */

module.exports = app => {
    const {router, controller} = app;
    
    router.get('/ad_forbidden', controller.adForbidden.get);
};
