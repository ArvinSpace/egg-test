'use strict';

const path = require('path');

module.exports = appInfo => {
    appInfo.env = appInfo.env || process.env.EGG_SERVER_ENV || 'local';
    process.env.EGG_SERVER_ENV = appInfo.env;
    
    const logDir = path.join(['dev', 'test', 'prod'].includes(appInfo.env) ? '/mydata' : appInfo.baseDir, '/logs/egg-test');
    // const logDir = path.join(appInfo.baseDir, '/logs/egg-test');
    
    console.log(`appInfo.env:${appInfo.env},EGG_SERVER_ENV:${process.env.EGG_SERVER_ENV}`);
    console.log(`logDir:${logDir}`);
    
    return {
        // keys: 'arvin',
        
        APP_NAME: '90秒',
        
        cluster: {
            listen: {
                port: 6666,
                hostname: '0.0.0.0',
            }
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
        
        customLoader: {
            // 定义在 app 上的属性名 app.message
            message: {
                // 相对于 app.config.baseDir
                directory: 'app/message',
                // 如果是 ctx 则使用 loadToContext
                inject: 'app',
                caseStyle: 'lower',
                // 是否加载框架和插件的目录
                loadunit: false,
                call: false,
            },
            
            // 定义在 app 上的属性名 app.redis
            redis: {
                // 相对于 app.config.baseDir
                directory: 'app/redis',
                // 如果是 ctx 则使用 loadToContext
                inject: 'app',
                caseStyle: 'lower',
                // 是否加载框架和插件的目录
                loadunit: false,
                call: true,
            }
        },
        
        mysql: {
            // 所有数据库配置的默认值
            default: {
                debug: false,
                charset: 'utf8mb4',
            },
            
            // 是否加载到 app 上，默认开启
            app: true,
            
            // 是否加载到 agent 上，默认关闭
            agent: false,
        },
        
        sequelize: {},
        
        middleware: [
            'robot'
        ],
        
        robot: {
            ua: []
        },
        
        alidayu: {
            appkey: '',
            appsecret: '',
        },
        
        mxtong: {
            UserID: '',
            Account: '',
            Password: '',
        },
        
        yxt: {
            YXT_SMS_URL: 'http://new.yxuntong.com/emmpdata/sms/Submit?v=2.0',
            YXT_SMS_ACCOUNT: '',
            YXT_SMS_PWD: '',
        },
    };
};
