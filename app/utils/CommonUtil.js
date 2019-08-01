/* eslint-disable no-eval */
/**
 * Created by Arvin on 2016/12/19.
 */
const requestIp = require('request-ip');
const uuid = require('node-uuid');

const CommonUtil = {
    letterNumberArr: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y',
        'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0',
        '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    
    // 根据手机号码处理为9位数昵称
    getNicknameFromMobileToNine(str) {
        return str.replace(/(\d{3})\d{4}(\d{4})/, '$1*$2');
    },
    getNicknameFromUserId(userIdStr) {
        return userIdStr.replace(/(\d{3})\d{4}(\d{3})/, '$1****$2');
    },
    getNicknameFromMobile(str) {
        return str.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
    },
    isNicknameForMobile(str) {
        return /(\d{3})\*\*\*\*(\d{4})/.test(str);
    },
    trim(str) {
        if (str) {
            return str.replace(/^\s+|\s+$/g, '');
        }

        return str;
    },

    /**
     * 获取客户端IP
     * @param req
     * @return {*|string|string}
     */
    getClientIp(req) {
        return requestIp.getClientIp(req) || '';
    },

    /**
     * 工具方法：将驼峰属性转为下划线属性
     * @param text
     * @return {*}
     */
    CamelCaseToUnderline(text) {
        for (let i = 0; i < text.length; i++) {
            const c = text.charAt(i);

            if (c >= 'A' && c <= 'Z') {
                const r = `_${c.toLowerCase()}`;

                text = text.replace(new RegExp(c, 'gm'), r);
            }
        }

        return text;
    },

    /**
     * 工具方法：将下划线属性转为驼峰属性
     * @param s 驼峰属性字符串
     * @return {*} 下划线属性字符串
     */
    underlineToCamelCase(s) {
        for (let i = 0; i < s.length; i++) {
            if (s.charAt(i) === '_') {
                s = s.replace(new RegExp(`_${s.charAt(i + 1)}`, 'gm'), s.charAt(i + 1).toUpperCase());
            }
        }

        return s;
    },

    /**
     * 数组去重
     * @param arr
     * @return {Array}
     */
    arrUnique(arr) {
        const res = [];
        const obj = {};

        for (let i = 0; i < arr.length; i++) {
            if (!obj[arr[i]]) {
                res.push(arr[i]);
                obj[arr[i]] = 1;
            }
        }

        return res;
    },

    /**
     * 字符串出现的频率
     * @param s
     * @return {{}}
     */
    strFre(s) {
        const obj = {};
        let temp = null;

        for (let i = 0; i < s.length; i++) {
            temp = s.charAt(i);
            if (typeof obj[temp] == 'undefined') {
                obj[temp] = 1;
            } else {
                obj[temp] += 1;
            }
        }

        return obj;
    },

    /**
     * 数组元素出现的次数
     * @param arr
     * @return {{}}
     */
    arrFre(arr) {
        const obj = {};
        let temp = null;

        for (let i = 0; i < arr.length; i++) {
            temp = arr[i];
            if (typeof obj[temp] == 'undefined') {
                obj[temp] = 1;
            } else {
                obj[temp] += 1;
            }
        }

        return obj;
    },
    
    jsonParseToArray(jsonStr) {
        let arr = [];
        
        try {
            arr = JSON.parse(jsonStr);
        } catch (e) {
            try {
                arr = eval(`(${jsonStr})`);
            } catch (e) {
                this.logger.error(e);
                this.logger.error(jsonStr);
            }
        }
        if (!arr) {
            arr = [];
        }
        
        return arr;
    },

    jsonParseToObj(jsonStr) {
        let obj = null;

        try {
            obj = JSON.parse(jsonStr);
        } catch (e) {
            try {
                obj = eval(`(${jsonStr})`);
            } catch (e) {
                this.logger.error(e);
                this.logger.error(jsonStr);
            }
        }

        return obj;
    },

    /**
     * 随机长度的大小写字母加数字
     * @param length
     * @return {string}
     */
    randomAlphanumeric(length) {
        const randomCode = [];

        for (let i = 0; i < length; ++i) {
            randomCode.push(CommonUtil.letterNumberArr[Math.floor(Math.random() * CommonUtil.letterNumberArr.length)]);
        }

        return randomCode.join('');
    },

    /**
     * 删除手机系统版本末尾多个多余字符串，末尾多个多余的.0去掉
     * @param str
     * @return {*}
     */
    removeMobileOsVersionOverSuffix(str) {
        if (str) {
            str = str.replace(/(\.0)+$/, '');
        }

        return str;
    },

    /**
     * 保留一位小数 不补0
     * @param str
     * @return {*}
     */
    toDecimalOneNoZero(str) {
        if (str) {
            const f = Math.round(str * 10) / 10;

            str = f.toString();
        }

        return str;
    },

    /**
     * 保留两位小数 不补0
     * @param str
     * @return {*}
     */
    toDecimalTwoNoZero(str) {
        if (str) {
            const f = Math.round(str * 100) / 100;

            str = f.toString();
        }

        return str;
    },

    /**
     * 保留两位小数
     * @param str
     * @return {*}
     */
    toDecimalTwoZero(str) {
        if (str || str <= 0) {
            const f = str / 100;

            str = f.toFixed(2);

            return str;
        }
 
        return '0.00';
        
    },

    /**
     * 分转元 并处理保留实际两位小数，不保留0
     * @param str
     * @return {*}
     */
    convertFenToYuan(str) {
        if (str) {
            const yuan = str / 100;

            return CommonUtil.toDecimalTwoNoZero(yuan);
        }

        return str;
    },

    /**
     * 从数组中随机取一个
     * @param arr
     * @return {*}
     */
    randomGetFromArr(arr) {
        const arrNew = CommonUtil.shuffleArr(arr);
        const r = Math.floor(Math.random() * arrNew.length);
        const ret = arrNew[r];

        return ret;
    },

    /**
     * 打乱数组
     * @param arr
     * @return {Array.<T>|string}
     */
    shuffleArr(arr) {
        const ret = arr.concat([]);
        const leng = ret.length;
        let count = leng;

        do {
            let r = 0;

            if (count > 1) {
                r = Math.floor(Math.random() * leng);
            }
            const temp = ret[r];

            ret.splice(r, 1);
            ret.push(temp);
            count--;
        } while (count > 0);

        return ret;
    },

    /**
     * 人数格式化   21300 》 2.1万+     10400 》 1万+   230 》 200+   1328 》 1300+
     * @param str
     * @return {*}
     */
    personNumFormat(str) {
        if (str || parseInt(str, 10) >= 0) {
            str = str + 100;
            let f;

            if (str < 1000) {
                f = parseFloat(str / 100);
                if (Math.round(f) === f) {
                    str = `${f}00+`;
                } else {
                    str = `${f.toString().substring(0, f.toString().indexOf('.'))}00+`;
                }
            } else if (str >= 1000 && str < 10000) {
                f = parseFloat(str / 1000);
                if (Math.round(f) === f) {
                    str = `${f}000+`;
                } else {
                    str = `${f.toString().substring(0, f.toString().indexOf('.') + 2) * 1000}+`;
                }
            } else {
                f = parseFloat(str / 10000);
                if (Math.round(f) === f) {
                    str = `${f}万+`;
                } else {
                    str = `${this.toDecimalOneNoZero(f.toString().substring(0, f.toString().indexOf('.') + 2))}万+`;
                }
            }
        }

        return str;
    },

    /**
     * 月销量格式化  10000 = 》 1.0万
     * @param str
     * @return {*}
     */
    volumeFormat(str) {
        if (str) {
            if (str >= 10000) {
                const f = parseFloat(str / 10000);

                if (Math.round(f) === f) {
                    str = `${f}.0`;

                    return `${str}万`;
                }
                str = `${f.toString().substring(0, f.toString().indexOf('.') + 2)}万`;
            }
        }

        return `${str}`;
    },

    /**
     * 处理tag信息
     * @param freePostage
     * @param isJdDelivery
     * @return {undefined}
     */
    dealWithTagInfo(freePostage, isJdDelivery) {
        const tagList = [];

        // 是京东商品
        if (isJdDelivery && isJdDelivery === 1) {
            // 不包邮
            if (freePostage === 0) {
                tagList.push('京东物流', '满99包邮');
            } else {
                tagList.push('京东物流');
            }
        }

        return tagList;
    },

    /**
     * 获取前4张评论图片
     * @param imageList
     * @return {*}
     */
    dealWithImageList(imageList) {
        if (imageList && imageList.length > 0) {
            let imageArray = imageList.split(',');

            imageArray = imageArray.slice(0, 4);

            return imageArray.join(',');
        }

        return imageList;
    },

    /**
     * 计算商品折扣
     */
    caclProductRatio(fixedPrice, price) {
        // 商品折扣
        let productRatio = '';

        if (fixedPrice && price) {
            productRatio = (parseFloat(fixedPrice) / parseFloat(price) * 10).toFixed(1);
            productRatio = this.toDecimalOneNoZero(productRatio);
            if (productRatio < 0.1) {
                productRatio = 0.1;
            } else if (productRatio > 9.9) {
                productRatio = '';
            }
        }

        return productRatio;
    },

    /**
     * 生成无横线uuid
     * @return {string | * | void}
     */
    uuidGenerator() {
        return uuid.v4().replace(/-/g, '');
    },

    /**
     * 判断是否为购物车开始的版本
     * @param appid
     * @param version
     * @return {boolean} true:是,false:否
     */
    isShoppingCartVersion(appid, version) {
        return (appid === '1001' && version >= 9) || (appid === '1002' && version >= 9) || (appid === '1004' && version >= 5);
    },
    
    /**
     * 判断是否为1.6.0版本
     * @param appid
     * @param version
     * @return {boolean} true:是,false:否
     */
    isOnePointSixVersion(appid, version) {
        return (appid === '1001' && version >= 12) || (appid === '1002' && version >= 11) || (appid === '1004' && version >= 7);
    },

    /**
     * 替换指定特殊字符
     * @param str
     */
    replaceCharStr(str) {
        str = str.replace(/&quot;/g, '\\').replace(/&#39;/g, '"');

        return str;

    },

    /**
     * 昵称加双*处理
     * @param str
     */
    dealWithNickname(str) {
        if (!str || str.length === 0) {
            return '';
        }
        str = str.trim();
        if (str.length === 1) {
            return `${str}**`;
        }
 
        return `${str.substring(0, 1)}**${str.substring(str.length - 1)}`;
        
    },

    /**
     * 构建正确的经度或纬度，不包括空、0、无穷数、最大数、最小数
     * @param latitudeOrLongitude
     * @return {*}
     */
    buildLatitudeOrLongitude(latitudeOrLongitude) {
        /* eslint-disable eqeqeq */
        if (!latitudeOrLongitude || latitudeOrLongitude == 0 || !isFinite(latitudeOrLongitude) || latitudeOrLongitude == Number.MIN_VALUE
            || latitudeOrLongitude == Number.MAX_VALUE) {
            return null;
        }
 
        return latitudeOrLongitude;
    },

    filterDeviceId(deviceId) {
        if (!deviceId || deviceId === '0' || deviceId.includes('unknown') || deviceId === '00000000-0000-0000-0000-000000000000'
            || deviceId.match(/^[0-]+$/g)) {
            return null;
        }
 
        return deviceId;
        
    },

    /**
     * 过滤回车换行
     * @param str
     * @return {*}
     */
    newLineFilter(str) {
        if (str) {
            return str.replace(/[\r\n]/g, '');
        }

        return str;
    },
    
    /**
     * 判断是否为2.0.0版本
     * @param appid
     * @param version
     * @return {boolean} true:是,false:否
     */
    isTwoPointZeroVersion(appid, version) {
        return (appid == 1001 && version >= 13) || (appid == 1002 && version >= 12) || (appid == 1004 && version >= 7);
    },

    /**
     * 积分转换为元（100积分=1元）向下取整
     * @param str
     * @return {*}
     */
    convertIntegralToYuan(str) {
        if (str) {
            if (str == 0) {
                return 0;
            }
            const yuan = str / 100;

            return Math.floor(yuan);
        }

        return str;
    },

    /**
     * 压缩图片
     * @param images
     * @param jdSize
     * @param qnSize
     * @return {undefined}
     */
    zipProductImage(images, jdSize, qnSize) {
        if (images && images.length > 0) {
            const imgArr = images.split(',');
            const newImgArr = [];
            let img = '';

            for (let i = 0; i < imgArr.length; i++) {
                img = imgArr[i];
                // 判断连接类型(七牛)
                if (img.indexOf('qnimg') != -1) {
                    img = img + qnSize;
                }
                // 京东图片
                else {
                    const index = img.indexOf('jfs');

                    if (index != -1) {
                        img = `${img.replace(img.substring(0, index), config.common.JD_PRODUCT_IMAGE_URL_PREFIX + jdSize)}.webp`;
                    }
                }
                newImgArr.push(img);
            }

            return newImgArr.join(',');
        }

        return images;
    }

};

module.exports = CommonUtil;
