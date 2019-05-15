'use strict';

module.exports.create = async ctx => {
    // 组装参数
    const userid = ctx.headers.userid;
    
    ctx.logger.info(`进入create方法，userid：${userid}`);
    
    // 响应
    ctx.body = {userid};
    // ctx.status = 200;
};
