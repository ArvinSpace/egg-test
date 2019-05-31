'use strict';

/**
 * Author: Arvin
 * Create Time: 2019-05-31 11:14
 * Description:
 */
const validate = {

    /**
     * 验证字符串是否为空
     * @param str
     * @return {boolean}
     */
    isStrNotEmpty(str) {
        return typeof str != 'undefined' && str != null && str.toString().replace(/^\s+|\s+$/g, '') !== '';
    },

    /**
     * 验证参数是否为空
     * @param params
     * @return {boolean}
     */
    validateParamsIsNotEmpty(params) {
        for (const index in params) {
            if (!this.isStrNotEmpty(params[index])) {
                return false;
            }
        }

        return true;
    },

    /**
     * 验证是否为有效的手机号码
     * @param mobile
     * @return {boolean}
     */
    isValidMobileNum(mobile) {
        return /^1[3456789][0-9]\d{8}$/.test(mobile);
    },

    ifContains(arr, str) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] == str)
            {return true;}
        }

        return false;
    }
};

module.exports = validate;
