'use strict';

/**
 * Author: Arvin
 * Create Time: 2019-05-31 11:14
 * Description:
 */
const smsUtil = require('./SmsUtil');

const sms = {
    smsTemplate: {
        register: '验证码{code}，您正在注册成为90秒用户，感谢您的支持！',
        pwdChange: '验证码{code}，您正在尝试修改90秒登录密码，请妥善保管账户信息。',
        identityVerify: '验证码{code}，您正在进行90秒身份验证，打死不要告诉别人哦！',
        fastLogin: '验证码{code}，您正在进行90秒快速登录，感谢您的支持！',
        common : '验证码:{code}。验证码有效6分钟。'
    },
    sendYxtVerifyCode(mobile, content, callback) {
        smsUtil.send_youxuntong_message(mobile, content, function(results) {
            if (results.code !== '0000') {
                return callback(results);
            }
            
            return callback(null);
        });
    }
};

module.exports = sms;
