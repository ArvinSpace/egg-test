'use strict';

module.exports = app => {
    const {router, controller, ctx} = app;
    
    router.get('index', '/', 'home.index');
    
    app.logger.info('index url:----------------', app.url('index'));
};
