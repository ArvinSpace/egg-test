'use strict';

/**
 * Author: Arvin
 * Create Time: 2019-04-30 14:10
 * Description:
 */

const moment = require('moment');

const helper = {
    
    relativeTime(time) {
        return moment(time).fromNow();
    }
    
};

const helpers = [
    require('../utils/CommonUtil'),
    require('../utils/ValidateUtil'),
    require('../utils/RedisLocker.class'),
    require('../utils/VerifyCodeUtil'),
    require('../utils/DateUtil'),
    require('../utils/CalcTimeUtil'),
    require('../utils/Forbidden'),
    require('../utils/HtmlUtil'),
    require('../utils/SignUtil'),
    require('../utils/SmsUtil'),
    require('../message/Common'),
];

for (const item of helpers) {
    Object.assign(helper, item);
}

module.exports = helper;
