/* eslint-disable no-buffer-constructor */
'use strict';

/**
 * Author: Arvin
 * Create Time: 2019-05-31 11:14
 * Description:
 */
const crypto = require('crypto');
const validateUtil = require('./ValidateUtil');

const SignUtil = {

    /**
     * 格式化公钥
     */
    formatPubKey(pubKey) {
        let fKey = '-----BEGIN PUBLIC KEY-----\n';
        const len = pubKey.length;

        for (let i = 0; i < len;) {
            fKey = `${fKey + pubKey.substr(i, 64)}\n`;
            i += 64;
        }
        fKey += '-----END PUBLIC KEY-----';

        return fKey;
    },

    /**
     * 格式化私钥
     */
    formatPriKey(priKey) {
        let fKey = '-----BEGIN RSA PRIVATE KEY-----\n';
        const len = priKey.length;

        for (let i = 0; i < len;) {
            fKey = `${fKey + priKey.substr(i, 64)}\n`;
            i += 64;
        }
        fKey += '-----END RSA PRIVATE KEY-----';

        return fKey;
    },

    /**
     * 签名
     * @param privateKey 私钥
     * @param data 被签名的字符串
     * @param algorithm 加密方式，默认MD5
     * @return {*} 签名后的字符串
     */
    sign(privateKey, data, algorithm) {
        if (!algorithm) {
            algorithm = 'RSA-MD5';
        }
        const signer = crypto.createSign(algorithm);

        signer.update(data, 'utf8');

        return signer.sign(this.formatPriKey(privateKey), 'base64');
    },


    /**
     * @param publicKey 公钥
     * @param sign 签名字符串
     * @param data 要验签的数据
     * @param algorithm 加密方式，默认MD5
     * @return {*} 返回bool值，成功或失败
     */
    verify(publicKey, sign, data, algorithm) {
        if (!algorithm) {
            algorithm = 'RSA-MD5';
        }
        const verify = crypto.createVerify(algorithm);

        verify.update(data, 'utf8');

        return verify.verify(this.formatPubKey(publicKey), sign, 'base64');
    },

    /**
     * 将传入的对象进行字典排序
     * @param object 传入对象
     * @return {{}} 排序后的对象
     */
    sortDict: function sortDict(object) {
        const targetObject = {}, keys = Object.keys(object).sort();

        for (let i = 0, n = keys.length, key; i < n; ++i) {
            key = keys[i];
            if (validateUtil.isStrNotEmpty(key) && validateUtil.isStrNotEmpty(object[key])) {
                targetObject[key] = object[key];
            }
        }

        return targetObject;
    },

    generateOriginalSign(reqParam, path) {
        const paramStr = SignUtil.spliceParamsSortSign(reqParam);

        return `${path}?${paramStr}`;
    },

    spliceParamsSortSign(reqParam) {
        let paramStr = '';

        Object.keys(reqParam).forEach(function(key) {
            if (typeof (reqParam[key]) === 'string' && reqParam[key]) {
                paramStr += `${key}=${reqParam[key]}&`;
            } else if (typeof (reqParam[key]) === 'object' && reqParam[key]) {
                paramStr += `${SignUtil.spliceParamsSortSign(reqParam[key])}&`;
            } else if (reqParam[key]) {
                paramStr += `${key}=${reqParam[key]}&`;
            }
        });
        paramStr = paramStr.substr(0, paramStr.length - 1);

        return paramStr;
    },

    /**
     * RSA加密，PADDING:OAEP
     * @param publicKey 公钥
     * @param srcStr 明文
     * @return {*|string} 返回加密后的密文
     */
    encrypt(publicKey, srcStr) {
        const bufferArr = crypto.publicEncrypt(this.formatPubKey(publicKey), new Buffer(srcStr));

        return bufferArr.toString('base64');
    }
    ,

    /**
     * RSA解密，PADDING:OAEP
     * @param privateKey 私钥
     * @param encryptedStr 需要解密的密文
     * @return {*|string} 明文
     */
    decrypt(privateKey, encryptedStr) {
        const priBuffer = crypto.privateDecrypt(this.formatPriKey(privateKey), new Buffer(encryptedStr, 'base64'));

        return new Buffer(priBuffer).toString('utf-8');
    }
    ,

    /**
     * 将字符串进行MD5
     * @param str
     * @return 返回MD5之后的字符串
     */
    md5(str) {
        const md5 = crypto.createHash('md5');

        return md5.update(str).digest('base64');
    },

    /**
     * 将字符串进行MD5，编码默认
     * @param str
     * @return 返回MD5之后的字符串
     */
    md5_default(str) {
        const md5 = crypto.createHash('md5');

        return md5.update(str).digest('hex');
    }

};

// const cfg = require('config.default');

// console.log(SignUtil.sign(cfg.PRIVATE_KEY, '', 'RSA-SHA1'));

// console.log(SignUtil.sign(cfg.PRIVATE_KEY_IOS, '', 'RSA-SHA1'));

// console.log(SignUtil.sign(cfg.PRIVATE_KEY_ANDROID, '', 'RSA-SHA1'));

// console.log(SignUtil.sign(cfg.PRIVATE_KEY_WXMINI, ''
//     , 'RSA-SHA1'));

// console.log(SignUtil.sign(
//     '',
//     '',
//     'RSA-SHA1'));

// console.log(SignUtil.verify(
//     '',
//     '',
//     '',
//     'RSA-SHA1'));


// const commonUtil = require('./CommonUtil');

// var uuidStr = Math.floor(Math.random() * (Math.pow(10,12)) - 1) + "";
// console.warn(uuidStr + " length " + uuidStr.length);
//   uuidStr = commonUtil.randomAlphanumeric(12);
//   console.warn(uuidStr + " length " + uuidStr.length);
//   uuidStr = commonUtil.randomAlphanumeric(36);
//   console.warn(uuidStr + " length " + uuidStr.length);


// console.warn(SignUtil.md5_default('97daf574-5a8e-40b7-aa72-cca0558acbf6'));

module.exports = SignUtil;
