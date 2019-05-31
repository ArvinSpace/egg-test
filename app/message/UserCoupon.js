'use strict';

/**
 * Author: Arvin
 * Create Time: 2019-05-31 11:14
 * Description:
 */
module.exports = {
    NOT_EXISTS: {
        code: '060001',
        message: '用户优惠券不存在'
    },
    NOT_IN_TIME: {
        code: '060002',
        message: '用户优惠券不在有效期'
    },
    MISMATCH: {
        code: '060003',
        message: '用户优惠券不符合使用条件'
    },
    USED: {
        code: '060004',
        message: '用户优惠券已使用'
    },
    CANT_USE_COUPON: {
        code: '060005',
        message: '不可用优惠券'
    },
    NOT_EXISTS_OR_CANT_USE_COUPON: {
        code: '060006',
        message: '用户优惠券不存在或不可用'
    },
    CANT_USE_COUPON_AT_PRODUCT: {
        code: '060007',
        message: '此商品不可使用商品优惠券'
    },
    CANT_USE_POSTAGE_COUPON_AT_PRODUCT: {
        code: '060008',
        message: '此商品不可使用运费券'
    },
    NOT_EXISTS_OR_CANT_USE_PRODUCT_COUPON: {
        code: '060009',
        message: '用户商品优惠券不存在或不可用'
    },
    NOT_EXISTS_OR_CANT_USE_POSTAGE_COUPON: {
        code: '060010',
        message: '用户运费券不存在或不可用'
    },
    USE_POSTAGE_COUPON_NEED_ADDRESS_FIRST: {
        code: '060011',
        message: '使用运费券需要先填写地址'
    },
    UPGRADE_VERSION_USE_THE_COUPON: {
        code: '060012',
        message: '当前版本不支持使用该券，请升级最新版本'
    }
};
