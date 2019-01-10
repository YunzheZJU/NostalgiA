/**
 * Created by Yunzhe on 2018/12/31.
 */

'use strict';
export default {
    threshold (fn, interval) {
        let timeStamp = 0;
        let timeoutHandler = -1;
        return (...args) => {
            const newTime = Date.now();
            // 将前一个延时函数清除
            clearTimeout(timeoutHandler);
            timeoutHandler = -1;
            if (newTime - timeStamp > interval) {
                timeStamp = newTime;
                return fn(...args);
            } else {
                timeoutHandler = setTimeout(() => {
                    timeStamp = Date.now();
                    fn(...args);
                }, interval);
            }
        };
    },
};
