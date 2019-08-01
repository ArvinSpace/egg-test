'use strict';

/**
 * Author: Arvin
 * Create Time: 2019-05-14 13:41
 * Description:
 */
module.exports = class AppBootHook {
    
    constructor(app) {
        this.app = app;
    }
    
    configWillLoad() {
        // Ready to call configDidLoad,
        // Config, plugin files are referred,
        // this is the last chance to modify the config.
        // 注意：此函数只支持同步调用
    }
    
    configDidLoad() {
        // Config, plugin files have been loaded.
        const coreMiddleware = [
            'meta',
            'notfound',
            'bodyParser',
            'securities',
        ];
    
        for (let i = 0; i < this.app.config.coreMiddleware.length; ++i) {
            if (!coreMiddleware.includes(this.app.config.coreMiddleware[i])) {
                this.app.config.coreMiddleware.splice(i--, 1);
            }
        }
    }
    
    async didLoad() {
        // All files have loaded, start plugin here.
        // 所有的配置已经加载完毕
        // 可以用来加载应用自定义的文件，启动自定义的服务
        // 例如：创建自定义应用的示例
        // 例如：加载自定义的目录
    }
    
    async willReady() {
        // All plugins have started, can do some thing before app ready
        // 所有的插件都已启动完毕，但是应用整体还未 ready
        // 可以做一些数据初始化等操作，这些操作成功才会启动应用
        // 例如：从数据库加载数据到内存缓存
    }
    
    async didReady() {
        // Worker is ready, can do some things
        // don't need to block the app boot.
    }
    
    async serverDidReady() {
        // Server is listening.
        // http / https server 已启动，开始接受外部请求
        // 此时可以从 app.server 拿到 server 的实例
    }
    
};
