'use strict';

/**
 * Author: Arvin
 * Create Time: 2019-04-30 14:10
 * Description:
 */

const moment = require('moment');

module.exports = {
    
    relativeTime(time) {
        return moment(time).fromNow();
    }
    
};
