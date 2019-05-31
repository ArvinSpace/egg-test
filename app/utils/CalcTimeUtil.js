'use strict';

/**
 * Author: Arvin
 * Create Time: 2019-05-31 11:14
 * Description:
 */
const validateUtil = require('./ValidateUtil');

const CalcTimeUtil = {};

/**
 * 计算开始时间
 * @param param
 * @returns {null}
 */
CalcTimeUtil.calcStartTime = function(param) {
    if (!validateUtil.isStrNotEmpty(param.time_type)) {
        this.logger.error('typeTime参数错误');

        return null;
    }
    if (param.time_type === 0) { // 绝对时间
        return param.start_time;
    }
    if (!validateUtil.isStrNotEmpty(param.time_point)) {
        this.logger.error('timePoint参数错误');

        return null;
    }
    const timePointArray = param.time_point.split(',');
    let param1 = null;
    const param2 = parseInt(timePointArray[1], 10);

    if (timePointArray.length === 1) {
        param1 = parseInt(timePointArray[0], 10);

        return dateAdd(param1);
    }
    param1 = parseInt(timePointArray[0], 10);
    const offset = calcDays(param1, param2);

    return dateAdd(offset);
    
};

/**
 * 计算结束时间
 * @param param
 * @returns {*}
 */
CalcTimeUtil.calcEndTime = function(param) {
    if (!validateUtil.isStrNotEmpty(param.time_type)) {
        this.logger.error('startTime参数错误');

        return null;
    }
    if (!validateUtil.isStrNotEmpty(param.time_type)) {
        this.logger.error('typeTime参数错误');

        return null;
    }
    if (param.time_type === 0) { // 绝对时间
        return param.end_time;
    }
    if (param.time_period == null || param.time_period < 1) {
        this.logger.error('timePeriod参数错误');

        return null;
    }

    return param.start_time + param.time_period * 86400000;
};

/**
 * 获取当前时间为当前星期的第几天
 * @return {number}
 */
function getDayOfWeek() {
    const date = new Date();

    date.setTime(date.getTime());
    const result = date.getDay() + 1;

    return result;
}

function dateAdd(num) {
    const dateTime = new Date();
    const dateStr = `${dateTime.getFullYear()}-${dateTime.getMonth() + 1}-${dateTime.getDate()} 00:00:00`;
    const date = new Date(Date.parse(dateStr.replace(/-/g, '/')));
    const temp = num * (24 * 60 * 60 * 1000); // 24*60*60*1000 = 86400000 = 一天

    date.setTime(date.getTime() + temp);

    return date.getTime();
}

/**
 * 计算天数
 * @param week
 * @param num
 * @return {number}
 */
function calcDays(week, num) {
    const nowIndex = getDayOfWeek();
    let offset = 0;

    if (nowIndex > 1) {
        offset = 1 - nowIndex; //  1-? = 负数
    }
    if (null != num && num > 0) {
        offset = offset + num;
    }
    if (null != week) {
        offset = offset + 7 * week;
    }

    return offset;
}

module.exports = CalcTimeUtil;
