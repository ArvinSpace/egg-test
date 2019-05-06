'use strict';

module.exports = appInfo => ({
    logger: {
        level: 'DEBUG',
        consoleLevel: 'DEBUG',
    },
    
    robot: {
        ua: [
            /fuck/i,
        ]
    },
    
    keys: 'local',
    
    news: {
        pageSize: 1,
        serverUrl: 'https://api.myjson.com/bins',
    }
});
