<template>
    <svg class="side-bar-icon" xmlns="http://www.w3.org/2000/svg" version="1.1" width="32" height="32"
         viewBox="0 0 32 32">
        <line v-for="(line, index) in position" :key="index" :x1="line.start.x" :y1="line.start.y" :x2="line.end.x"
              :y2="line.end.y"></line>
    </svg>
</template>

<script>
import TweenLite from 'gsap/TweenLite';

import iconPosition from 'data/iconposition';

export default {
    name: 'side-bar-icon',
    props: {
        mode: {
            type: String,
            required: true,
            validate: (value) => ['menu', 'back', 'close'].indexOf(value) > -1,
        },
    },
    data () {
        return {
            position: JSON.parse(JSON.stringify(iconPosition[this.mode])),
        };
    },
    watch: {
        mode (newMode) {
            Object.keys(this.position).forEach(index => {
                TweenLite.to(this.position[index].start, .2, {...iconPosition[newMode][index].start});
                TweenLite.to(this.position[index].end, .2, {...iconPosition[newMode][index].end});
            });
        },
    },
};
</script>

<style scoped lang="less">
    @import "../style";

    .side-bar-icon {
        stroke          : @black;
        stroke-linecap  : round;
        stroke-linejoin : round;
        stroke-width    : 1px;
    }
</style>