'use strict';

/**
 * Author: Arvin
 * Create Time: 2019-05-31 11:14
 * Description:
 */
module.exports = {
    PRODUCT_SKU_STOCK_OVER: {
        code: '030001',
        message: '集市商品库存不足',
        data:null
    },
    PRODUCT_NOT_ON_SHELF: {
        code: '030002',
        message: '集市商品未上架'
    },
    PRODUCT_NOT_EXISTS: {
        code: '030003',
        message: '集市商品不存在'
    },
    BUY_COUNT_OVER_OUT: {
        code: '030004',
        message: '已超出限购件数'
    },
    PRODUCT_COMMENT_OVER_LIMIT: {
        code: '030005',
        message: '商品评论长度超限'
    },
    PRODUCT_INFO_CHANGE: {
        code: '030006',
        message: '商品信息发生变更'
    },
    PRODUCT_SKU_NOT_ON_SHELF: {
        code: '030007',
        message: '集市商品规格无效'
    },
    PRODUCT_INFO_CHANGE_RE_BUY: {
        code: '030008',
        message: '商品信息发生变更，请重新选择结算'
    },
    PRODUCT_SOLD_OUT: {
        code: '030009',
        message: '宝贝已失效'
    },
    PRODUCT_SELL_OUT: {
        code: '030010',
        message: '商品已售完'
    },
    PRODUCT_NOT_EXISTS_ONLY: {
        code: '030011',
        message: '商品不存在'
    },
    STOCK_OVER_RE_BUY: {
        code: '030012',
        message: '库存不足，请更改购买数量或分批结算'
    }
};
