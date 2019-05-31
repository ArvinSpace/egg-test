'use strict';

/**
 * Author: Arvin
 * Create Time: 2019-05-31 11:14
 * Description:
 */
module.exports = {
    PRODUCT_STATUS_CHANGES: {
        code: '021000',
        message: '商品信息发生变更'
    },
    EXCEED_PRODUCT_BUY_COUNT: {
        code: '022001',
        message: '超出限购件数',
        data:null
    },
    ADD_SHOPPING_CART_EXCEED_PRODUCT_BUY_COUNT: {
        code: '023002',
        message: '商品加购件数(含已加购件数)已超过库存',
        data:null
    },
    PRODUCT_SKU_STOCK_OVER: {
        code: '024003',
        message: '超出库存数量范围',
        data:null
    },
    PRODUCT_OFF_SALES : {
        code: '024004',
        message: '该商品已下架'
    }
};
