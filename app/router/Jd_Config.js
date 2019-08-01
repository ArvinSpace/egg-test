'use strict';

module.exports = app => {
    const {router, controller} = app;
    
    router.get('/jd_config/get', controller.jdConfig.get);
}
