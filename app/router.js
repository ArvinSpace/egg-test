'use strict';

module.exports = app => {
    const {router, controller} = app;
    
    router.get('/', controller.home.index);
    
    router.get('/create', controller.methodtest.create);
    
    router.get('/news', controller.news.list);
    
    router.get('/news/:code', controller.news.detail);
};
