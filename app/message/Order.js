'use strict';

/**
 * Author: Arvin
 * Create Time: 2019-05-31 11:14
 * Description:
 */
module.exports = {
    SAVE_ORDER_FAILED: {
        code: '050001',
        message: '保存订单失败'
    },
    ORDER_ADDRESS_EXCEPTION: {
        code: '050002',
        message: '订单收货地址异常'
    },
    ORDER_ADDRESS_NOT_FOUND: {
        code: '050003',
        message: '订单收货地址不存在'
    },
    ORDER_NOT_FOUND: {
        code: '050004',
        message: '订单不存在'
    },
    ORDER_NOT_PAIED: {
        code: '050005',
        message: '订单未支付'
    },
    ORDER_HAS_PAIED: {
        code: '050006',
        message: '订单已支付'
    },
    ORDER_PAY_FAIL: {
        code: '050007',
        message: '订单支付失败'
    },
    ORDER_TYPE_INVALID: {
        code: '050008',
        message: '订单类型异常'
    },
    ORDER_PAY_SUCCESS_DIRECTLY: {
        code: '050009',
        message: '订单直接支付成功'
    },
    ORDER_HAS_OVERDUE: {
        code: '050010',
        message: '订单逾期未支付'
    },
    ORDER_RESET_FAIL: {
        code: '050011',
        message: '订单重置失败'
    },
    ORDER_HAD_LOCK_SKU_STOCK: {
        code: '050012',
        message: '订单已锁定库存'
    },
    ORDER_PAY_LIMIT_TIME_OVER: {
        code: '050013',
        message: '订单已超过支付限制时间'
    },
    CANCEL_LIMIT_OVER: {
        code: '050014',
        message: '取消订单数量已超限'
    },
    ORDER_RECORD_NOT_FOUND: {
        code: '050015',
        message: '订单记录不存在'
    },
    COUPON_ONLY_USE_90S_APP: {
        code: '050016',
        message: '优惠券暂时仅在90秒APP可用'
    },
    ORDER_NEED_ADDRESS_FIRST: {
        code: '050017',
        message: '请先选择收货地址'
    },
    UPGRADE_VERSION_UPD_THE_ORDER: {
        code: '050018',
        message: '当前版本不支持修改该订单，请升级最新版本'
    }
};
