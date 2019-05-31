'use strict';

/**
 * Author: Arvin
 * Create Time: 2019-04-30 14:10
 * Description:
 */

const moment = require('moment');

const healper = {
    
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
];

for (const item of helpers) {
    Object.assign(healper, item);
}

module.exports = healper;
