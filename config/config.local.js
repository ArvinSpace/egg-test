'use strict';

module.exports = appInfo => ({
    logger: {
        level: 'DEBUG',
        consoleLevel: 'DEBUG',
        disableConsoleAfterReady: false,
    },
    
    robot: {
        ua: [
            /fuck/i,
        ]
    },
    
    news: {
        pageSize: 1,
        serverUrl: 'http://api.myjson.com/bins',
    },
    
    security: {
        csrf: false
    }
});
