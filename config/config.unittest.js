'use strict';

module.exports = appInfo => ({
    proxy: false,
    
    logger: {
        level: 'DEBUG',
        consoleLevel: 'DEBUG',
        disableConsoleAfterReady: false,
    },
    
    origin: {
        whiteList: [`http://localhost:${appInfo.pkg.run_port}`]
    },
    
    robot: {
        ua: [
            /fuck/i,
        ]
    },
    
    security: {
        // Cross-site request forgery跨站请求伪造
        csrf: false,
        
        // Server-Side Request Forgery(SSRF)，攻击者可以发起网络请求访问或者操作内部网络的资源
        ssrf: {
            ipBlackList: [
                // '10.0.0.0/8', // 支持 IP 网段
                // '127.0.0.1',  // 支持指定 IP 地址
            ],
            
            // 配置了 checkAddress 时，ipBlackList 不会生效
            checkAddress(ip) {
                // 返回true则禁止访问
                // return ip !== '127.0.0.1';
                return false;
            },
        },
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
    },
    
    sequelize: {
        datasources: [
            {
                dialect: 'mysql',
                delegate: 'buss',
                baseDir: 'dao',
                host: '',
                port: 0,
                username: '',
                password: '',
                database: '',
                logging: false,
                benchmark: true,
                define: {
                    freezeTableName: true,
                    underscored: true,
                    timestamps: false,
                    charset: 'utf8mb4',
                },
                pool: {
                    max: 10,
                }
            },
            
            {
                dialect: 'mysql',
                delegate: 'read',
                baseDir: 'dao',
                host: '',
                port: 0,
                username: '',
                password: '',
                database: '',
                // logging: false,
                benchmark: true,
                debug: true,
                define: {
                    freezeTableName: true,
                    underscored: true,
                    timestamps: false,
                    charset: 'utf8mb4',
                },
                pool: {
                    max: 10,
                }
            }
        ],
    },
    
    redis: {
        
        /** 业务 */
        host: '',
        port: 0,
        opts: {
            auth_pass: ''
        },
        
    },
    
    news: {
        pageSize: 1,
        serverUrl: 'http://api.myjson.com/bins',
    }
});
