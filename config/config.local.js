'use strict';

module.exports = appInfo => ({
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
