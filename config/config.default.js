'use strict';

const path = require('path');

module.exports = appInfo => {
    process.env.EGG_SERVER_ENV = process.env.EGG_SERVER_ENV || 'local';
    appInfo.env = process.env.EGG_SERVER_ENV;
    
    const logDir = path.join(appInfo.env !== 'local' ? '/mydata' : appInfo.baseDir, '/logs/egg-test');
    
    console.log(`EGG_SERVER_ENV:${appInfo.env}`)
    console.log(`logDir:${logDir}`)
    
    return {
        keys: 'arvin',
        
        listen: {
            port: 7001,
            hostname: '0.0.0.0',
        },
    
        logger: {
            dir: logDir,
        },
        
        logrotator: {
            filesRotateByHour: [
                path.join(logDir, `${appInfo.name}-web.log`),
                path.join(logDir, 'common-error.log'),
                path.join(logDir, 'egg-web.log'),
                path.join(logDir, 'egg-agent.log'),
                path.join(logDir, 'egg-schedule.log'),
                path.join(logDir, 'stdout.log'),
                path.join(logDir, 'stderr.log'),
            ],
        },
        
        middleware: [
            'robot'
        ],
        
        robot: {
            ua: [
                /Baiduspider/i,
            ]
        },
    };
};
