/**
 * Created by Yunzhe on 2018/8/30.
 */

'use strict';
export default {
    bind (el, binding) {
        el.__vueClickOutside__ = e => {
            if (binding.expression) {
                binding.value(e);
            }
        };
        el.__vueClick__ = e => {
            e.stopPropagation();
        };
        document.addEventListener('click', el.__vueClickOutside__);
        document.addEventListener('touchstart', el.__vueClickOutside__);
        el.addEventListener('click', el.__vueClick__);
        el.addEventListener('touchstart', el.__vueClick__);
    },
    unbind (el) {
        document.removeEventListener('click', el.__vueClickOutside__);
        document.removeEventListener('touchstart', el.__vueClickOutside__);
        delete  el.__vueClickOutside__;
        delete  el.__vueClick__;
    },
};