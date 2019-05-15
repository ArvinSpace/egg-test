'use strict';

module.exports = app => {
    const {router, controller} = app;
    
    router.get('/create', controller.methodtest.create);
    router.post('/body_parser', 'other.body_parse');
};
