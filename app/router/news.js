'use strict';

module.exports = app => {
    const {router, controller} = app;
    
    router.get('news_list', '/news', controller.news.list);
    // router.get('news_detail', '/news/:code', app.middleware.robot(app.config.robot, app), controller.news.detail);
    router.get('news_detail', '/news/:code', controller.news.detail);
    
    app.logger.info('news_detail url:----------------', app.url('news_detail'));
};
