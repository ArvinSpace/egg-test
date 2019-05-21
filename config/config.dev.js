'use strict';

module.exports = appInfo => ({
    proxy: false,
    
    logger: {
        level: 'DEBUG',
        consoleLevel: 'DEBUG',
        disableConsoleAfterReady: false,
    },
    
    news: {
        pageSize: 2,
        serverUrl: 'http://api.myjson.com/bins',
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
    }
});
