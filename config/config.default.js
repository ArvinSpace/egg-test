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
        ANDROID_HOST: '',
        IOS_HOST: '',
        WXMINI_HOST : '',
        WAP_HOST: '',
        PUBLIC_KEY: '',
        PUBLIC_KEY_WXMINI : '',
        PUBLIC_KEY_IOS : '',
        PUBLIC_KEY_ANDROID : '',
    
        ipHeaders: 'X-Real-IP, X-Forwarded-For',
        maxProxyCount: 1,
        hostHeaders: 'Host',
        
        cluster: {
            listen: {
                port: appInfo.pkg.run_port,
                hostname: '0.0.0.0',
            }
        },
        
        logger: {
            dir: logDir,
        },
        
        logrotator: {
            filesRotateByHour: [
                path.join(logDir, `${appInfo.name}-web.log`),
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
    
        onerror: {
            // eslint-disable-next-line handle-callback-err
            all(err, ctx) {
                // 在此处定义针对所有响应类型的错误处理方法
                // 注意，定义了 config.all 之后，其他错误处理方法不会再生效
                ctx.body = JSON.stringify(ctx.app.message.common.SYSTEM_EXCEPTION);
                ctx.status = 500;
            },
            // eslint-disable-next-line handle-callback-err
            html(err, ctx) {
                // html hander
                ctx.body = 'error';
                ctx.status = 500;
            },
            // eslint-disable-next-line handle-callback-err
            json(err, ctx) {
                // json hander
                ctx.body = {...ctx.app.message.common.SYSTEM_EXCEPTION};
                ctx.status = 500;
            },
        },
    
        onClientError: async (err, socket, app) => {
            app.logger.error(err);
        
            return {
                status: 200,
                body: {...app.message.common.SYSTEM_EXCEPTION},
            };
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
            'origin',
            'xss',
            'robot',
            'signVerfy',
            'loginVerify'
        ],
        loginVerify: {
            match: '*/u',
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
