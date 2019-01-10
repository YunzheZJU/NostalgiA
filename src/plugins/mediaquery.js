/**
 * Created by Yunzhe on 2019/1/1.
 */

'use strict';
export default function (Vue) {
    const mediaQueryLists = {};

    Vue.prototype.$mediaQuery = {
        subscribe (queryString, onChange, key = queryString) {
            // 添加一个查询字符串
            // 支持在同一个查询字符串上多次添加侦听器
            // 缺省使用查询字符串作为内部保存用的key
            if (!mediaQueryLists[key]) {
                mediaQueryLists[key] = {
                    queryList: window.matchMedia(queryString),
                    callbacks: [onChange],
                };
            } else {
                mediaQueryLists[key].callbacks.push(onChange);
            }
            onChange(mediaQueryLists[key].queryList);
            mediaQueryLists[key].queryList.addListener(onChange);
        },
        unsubscribe (key) {
            // 删除某个查询字符串上的所有侦听器
            // 并移除这个查询字符串
            mediaQueryLists[key].callbacks.forEach(callback => {
                mediaQueryLists[key].queryList.removeListener(callback);
            });
            delete mediaQueryLists[key];
        },
        genQueryArray (breakPoints) {
            const extendedBreakPoints = [...breakPoints, Infinity];
            const queryArray = [];

            extendedBreakPoints.reduce((prevValue, currentValue, currentIndex) => {
                let queryString;
                if (currentIndex === 0) {
                    queryString = `(max-width: ${currentValue - 1}px)`;
                } else if (currentIndex === extendedBreakPoints.length - 1) {
                    queryString = `(min-width: ${prevValue}px)`;
                } else {
                    queryString = `(min-width: ${prevValue}px) and (max-width: ${currentValue - 1}px)`;
                }

                queryArray.push(queryString);

                return currentValue;
            }, 0);

            return queryArray;
        },
        subscribeSwitch (breakPoints, onChange) {
            this.genQueryArray(breakPoints).forEach((queryString, index) => {
                this.subscribe(queryString, event => {
                    if (event.matches) {
                        onChange({
                            min: index === 0 ? 0 : breakPoints[index - 1],
                            max: index === breakPoints.length ? Infinity : breakPoints[index],
                        });
                    }
                }, 'switch' + queryString);
            });
        },
        unsubscribeSwitch (breakPoints) {
            this.genQueryArray(breakPoints).forEach(queryString => {
                this.unsubscribe('switch' + queryString);
            });
        },
    };
}