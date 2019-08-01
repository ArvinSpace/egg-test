'use strict';

module.exports = app => {
    const {router, controller} = app;
    
    router.get('news_list', '/news', controller.news.list);
    // router.get('news_list', '/u', controller.news.list);// 会进行登录检验
    // router.get('news_list', '/u/', controller.news.list);// 会进行登录检验
    // router.get('news_list', '/news/u', controller.news.list);// 会进行登录检验
    // router.get('news_list', '/news/u/', controller.news.list);// 会进行登录检验
    // router.get('news_list', '/news/us', controller.news.list);// 不会进行登录检验
    // router.get('news_detail', '/news/:code', app.middleware.robot(app.config.robot, app), controller.news.detail);
    router.get('news_detail', '/news/:code', controller.news.detail);
    // router.get('news_detail', '/news/u/:code', controller.news.detail);// 会进行登录检验
    
    app.logger.info('news_detail url:----------------', app.url('news_detail'));
};
