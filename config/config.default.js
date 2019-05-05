'use strict';

module.exports = appInfo => ({
    middleware: [
        'robot'
    ],
    
    robot: {
        ua: [
            /Baiduspider/i,
        ]
    },
});
