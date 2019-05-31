'use strict';

/**
 * Author: Arvin
 * Create Time: 2019-05-31 11:14
 * Description:
 */
module.exports = {
    SECKILL_PRODUCT_SKU_STOCK_OVER: {
        code: '090001',
        message: '秒杀商品库存不足',
        data:null
    },
    PRODUCT_NOT_ON_SHELF: {
        code: '090002',
        message: '秒杀商品未上架'
    },
    PRODUCT_NOT_EXISTS: {
        code: '090003',
        message: '秒杀商品不存在'
    },
    BUY_COUNT_OVER_OUT: {
        code: '090004',
        message: '已超出限购件数'
    },
    PRODUCT_SKU_NOT_ON_SHELF: {
        code: '090005',
        message: '秒杀商品规格无效'
    },
    SECKILL_ACTIVITY_END: {
        code: '090006',
        message: '秒杀活动已结束'
    },
    PRODUCT_SELL_OUT: {
        code: '090007',
        message: '商品已售完'
    }
};
