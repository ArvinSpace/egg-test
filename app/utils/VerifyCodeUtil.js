'use strict';

/**
 * Author: Arvin
 * Create Time: 2019-05-31 11:14
 * Description:
 */
const VerifyCodeUtil = {
    createVerifyCode() {
        let code = '';
        const codeLength = 4;// 验证码的长度
        const selectChar = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

        for (let i = 0; i < codeLength; i++) {
            const charIndex = Math.floor(Math.random() * 10);

            code += selectChar[charIndex];
        }

        return code;
    }
};

module.exports = VerifyCodeUtil;
