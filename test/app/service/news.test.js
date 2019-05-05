'use strict';

/**
 * Author: Arvin
 * Create Time: 2019-04-30 16:42
 * Description:
 */

const {app, mock, assert} = require('egg-mock/bootstrap');

describe('/test/app/service/news.test.js', () => {
    it('news list', async () => {
        const ctx = app.mockContext();
        const results = await ctx.service.news.list();
        
        assert(results);
        assert(results.length === 2);
    });
});
