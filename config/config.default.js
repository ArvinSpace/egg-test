'use strict';

const path = require('path');

module.exports = appInfo => {
    appInfo.env = appInfo.env || process.env.EGG_SERVER_ENV || 'local';
    process.env.EGG_SERVER_ENV = appInfo.env;
    
    const logDir = path.join(['dev', 'test', 'prod'].includes(appInfo.env) ? '/mydata' : appInfo.baseDir, '/logs/egg-test');
    
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
            ]
        },
    
        mysql: {
            clients: {
                nintybid_business: {
                    connectionLimit: 10,
                    host: '',
                    port: 0,
                    user: '',
                    password: '',
                    database: '',
                    debug: false,
                },
            
                nintybid_readonly: {
                    connectionLimit: 10,
                    host: '',
                    port: 0,
                    user: '',
                    password: '',
                    database: '',
                    debug: false,
                },
            },
        
            // 所有数据库配置的默认值
            default: {
                charset: 'utf8mb4',
            },
        
            // 是否加载到 app 上，默认开启
            app: true,
        
            // 是否加载到 agent 上，默认关闭
            agent: false,
        },
    };
};
