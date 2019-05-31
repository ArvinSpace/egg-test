'use strict';

/**
 * Author: Arvin
 * Create Time: 2019-05-31 11:14
 * Description:
 */
module.exports = {
    SUCCESS: {
        code: '0000',
        message: '成功',
        data: null
    },
    SYSTEM_EXCEPTION: {
        code: '9999',
        message: '系统故障!'
    },
    SIGN_INVALID: {
        code: '9998',
        message: '签名无效'
    },
    TOKEN_EXPIRE: {
        code: '9997',
        message: '令牌无效或已过期 '
    },
    REPEAT_OPERATION: {
        code: '9996',
        message: '重复的操作'
    },
    INTERFACE_NEED_UPGRADE: {
        code: '9995',
        message: '接口需要升级'
    },
    PARAMETERS_INVALID: {
        code: '9994',
        message: '缺少参数'
    },
    NO_DATA: {
        code: '9993',
        message: '无数据'
    },
    USER_NOT_FOUND: {
        code: '9992',
        message: '用户未找到'
    },
    PROGRAM_NEED_QUIT: {
        code: '9991',
        message: '程序需要退出'
    },
    VISIT_COUNT_LIMIT: {
        code: '9990',
        message: '业务流控'
    },
    OS_IS_INVALID: {
        code: '9989',
        message: 'APP系统标识异常'
    },
    APP_ID_IS_INVALID: {
        code: '9988',
        message: 'APP应用标识异常'
    },
    THIRD_LOGIN_TYPE_IS_INVALID: {
        code: '9987',
        message: '第三方登录标识异常'
    },
    SEND_SMS_ERROR: {
        code: '9986',
        message: '发送短信异常'
    },
    NO_CHANGE: {
        code: '9985',
        message: '无修改'
    },
    USER_NOT_EQUAL: {
        code: '9984',
        message: '用户不匹配'
    },
    FORBIDDEN: {
        code: '9983',
        message: '操作不允许'
    },
    TRANS_CLOSED: {
        code: '9982',
        message: '交易关闭'
    },
    OVER_FREQUENCY: {
        code: '9981',
        message: '操作频繁'
    },
    PARAMETERS_ERROR: {
        code: '9980',
        message: '参数错误'
    },
    NETWORK_EXCEPTION: {
        code: '9979',
        message: '网络异常'
    },
    OVERSIZE_SEARCH_KEYWORDS: {
        code: '9978',
        message: '搜索关键字长度不能超出50个字符'
    },
    TRY_LATER: {
        code: '9979',
        message: '请稍候再试'
    }
};
