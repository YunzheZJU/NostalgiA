/**
 * Created by Yunzhe on 2018/8/28.
 */

'use strict';
export default {
    bind: function (el, binding) {
        el.__vueDragHold__ = event => {
            if (binding.modifiers.prevent) {
                event.preventDefault();
            }
            if (binding.value.mouseDown) {
                binding.value.mouseDown(event);
            }
            document.addEventListener('mousemove', el.__vueDragMoving__);
            document.addEventListener('mouseup', el.__vueDragRelease__);
        };
        el.__vueDragMoving__ = event => {
            if (binding.modifiers.prevent) {
                event.preventDefault();
            }
            if (binding.value.mouseMove) {
                binding.value.mouseMove(event);
            }
        };
        el.__vueDragRelease__ = event => {
            if (binding.modifiers.prevent) {
                event.preventDefault();
            }
            if (binding.value.mouseUp) {
                binding.value.mouseUp(event);
            }
            document.removeEventListener('mousemove', el.__vueDragMoving__);
            document.removeEventListener('mouseup', el.__vueDragRelease__);
        };
        el.__vueDragHoldTouch__ = event => {
            if (binding.modifiers.prevent) {
                event.preventDefault();
            }
            if (binding.value.touchStart) {
                binding.value.touchStart(event);
            }
            if (event.changedTouches.length === 1) {
                // 避免重复添加侦听器
                el.addEventListener('touchmove', el.__vueDragMovingTouch__);
                el.addEventListener('touchend', el.__vueDragReleaseTouch__);
                el.addEventListener('touchcancel', el.__vueDragReleaseTouch__);
            }
        };
        el.__vueDragMovingTouch__ = event => {
            if (binding.modifiers.prevent) {
                event.preventDefault();
            }
            if (binding.value.touchMove) {
                binding.value.touchMove(event);
            }
        };
        el.__vueDragReleaseTouch__ = event => {
            if (binding.modifiers.prevent) {
                event.preventDefault();
            }
            if (binding.value.touchEnd) {
                binding.value.touchEnd(event);
            }
            el.removeEventListener('touchmove', el.__vueDragMovingTouch__);
            el.removeEventListener('touchend', el.__vueDragReleaseTouch__);
            el.removeEventListener('touchcancel', el.__vueDragReleaseTouch__);
        };
        el.addEventListener('mousedown', el.__vueDragHold__);
        el.addEventListener('touchstart', el.__vueDragHoldTouch__);
    },
    unbind: function (el) {
        el.removeEventListener('mousedown', el.__vueDragHold__);
        el.removeEventListener('touchstart', el.__vueDragHoldTouch__);
        delete el.__vueDragHold__;
        delete el.__vueDragMoving__;
        delete el.__vueDragRelease__;
        delete el.__vueDragHoldTouch__;
        delete el.__vueDragMovingTouch__();
        delete el.__vueDragReleaseTouch__();
    },
};