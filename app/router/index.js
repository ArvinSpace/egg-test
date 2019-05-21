'use strict';

module.exports = app => {
    const {router, controller} = app;
    
    router.get('index', '/', 'home.index');
    // router.options('index', '/', 'home.index');
    
    app.logger.info('index url:----------------', app.url('index'));
};
