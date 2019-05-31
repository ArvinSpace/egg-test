/* eslint-disable no-eval */
'use strict';

/**
 * Author: Arvin
 * Create Time: 2019-05-31 11:14
 * Description:
 */
const request = require('request');
const TopClient = require('./TopClient').TopClient;
let client = null;
const signUtil = require('./SignUtil');

const sms = {
    smsType: {register: 'SMS_8215473', pwdChange: 'SMS_8215471', identityVerify: 'SMS_8215477'},
    smsSign: {register: '闪电拍卖', pwdChange: '闪电拍卖', identityVerify: '闪电拍卖'},
    send(recNum, smsTemplateCode, smsFreeSignName, smsParam, callback) {
        const args = {
            'sms_type': 'normal',
            rec_num: recNum,
            sms_free_sign_name: smsFreeSignName,
            sms_param: smsParam,
            sms_template_code: smsTemplateCode,
        };

        if (!client) {
            client = new TopClient({
                'appkey': this.config.alidayu.appkey,
                'appsecret': this.config.alidayu.appsecret,
                'REST_URL': 'http://gw.api.taobao.com/router/rest',
            });
        }
        
        client.execute('alibaba.aliqin.fc.sms.num.send', args, function(error) {
            if (error) {
                // callback(eval('(' + error.data + ')').error_response);
                const myData = eval(`(${error.data})`);

                if (myData) {
                    return callback(myData.error_response);
                }
                
                return callback(null);
            }
            
            return callback(null);
        }
        );
    },

    send_bymxtong(mobile, message, callback) {
        const url = `http://www.mxtong.cn:8080/GateWay/Services.asmx/DirectSend?UserID=${this.config.mxtong.UserID}
        &Account=${this.config.mxtong.Account}&Password=${this.config.mxtong.Password}&Phones=${mobile}&Content=${message}【闪电拍卖】
        &SendTime=&SendType=1&PostFixNumber=`;

        request.get(encodeURI(url), function(err) {
            if (err) {
                this.logger.error(err);

                return callback(err);
            }

            return callback(null);
        });
    },
    send_youxuntong_message(mobile, content, callback) {
        const msg = {
            'sign': `【${this.config.APP_NAME}】`, // 短信签名
            'account': this.config.yxt.YXT_SMS_ACCOUNT, // 账号
            'password': signUtil.md5_default(this.config.yxt.YXT_SMS_PWD).toLowerCase(), // 密码
            'phones': mobile, // 接收手机号码，多个手机号码用英文逗号分隔，最多1000个，不能为空
            content, // 短信内容，最多350汉字，不能为空
            'sendtime': '', // 发送时间,格式yyyyMMddHHmm,可空
            'subcode':'' // 扩展子号码，内容可空，暂不支持
        };
        const args = {
            'type' : 'json',
            'message': JSON.stringify(msg)
        };
        let ret = Object.assign({}, this.message.common.SEND_SMS_ERROR);

        request.post(this.config.yxt.YXT_SMS_URL, {form: args, json: true}, function(err, response, body) {
            if (err) {
                this.logger.error(`发送优讯通短信，失败：${err}`);
                callback(this.message.common.SYSTEM_EXCEPTION);

                return;
            }
            if (response && response.statusCode === 200 && body) {
                if (body.result != 0) {
                    this.logger.error(`发送优讯通短信，失败：${JSON.stringify(body)}`);
                    const errorStr = body.desc || '发送优讯通短信失败';

                    ret.message = errorStr;
                } else {
                    ret = Object.assign({}, this.message.common.SUCCESS);
                }
            }

            return callback(ret);
        });
    }
};

module.exports = sms;
