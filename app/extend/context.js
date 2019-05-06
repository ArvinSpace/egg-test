'use strict';

/**
 * Author: Arvin
 * Create Time: 2019-05-05 17:34
 * Description:
 */

module.exports = {
    get isIOS() {
        const iosReg = /iphone|ipad|ipod/i;
        
        return iosReg.test(this.get('user-agent'));
    },
    
    get isAndroid() {
        const iosReg = /android/i;
        
        return iosReg.test(this.get('user-agent'));
    }
};
