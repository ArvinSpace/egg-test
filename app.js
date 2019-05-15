'use strict';

/**
 * Author: Arvin
 * Create Time: 2019-05-14 13:41
 * Description:
 */

module.exports = app => {
    app.config.coreMiddleware = [
        'meta',
        'notfound',
        'bodyParser',
        'securities',
        'eggLoaderTrace'
    ];
};
