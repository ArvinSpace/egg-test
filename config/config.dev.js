'use strict';

module.exports = appInfo => ({
    logger: {
        level: 'DEBUG',
        consoleLevel: 'DEBUG',
        disableConsoleAfterReady: false,
    },
    
    news: {
        pageSize: 2,
        serverUrl: 'http://api.myjson.com/bins',
    },
});
