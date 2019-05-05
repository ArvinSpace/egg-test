'use strict';

exports.create = ctx => {
    // const createRule = {
    //     title: {type: 'string'},
    //     content: {type: 'string'},
    // };
    //
    // // 校验参数
    // await ctx.validate(createRule);
    
    // 组装参数
    const userid = ctx.headers.userid;
    
    ctx.logger.info('进入create方法，userid：' + userid);
    
    // 响应
    ctx.body = {userid};
    // ctx.status = 200;
};
