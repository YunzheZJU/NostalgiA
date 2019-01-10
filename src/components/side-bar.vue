<template>
    <div class="side-bar" :class="sideBarClass" v-click-outside="handleClickOutside">
        <div class="toggle-handle" @click="handleToggle">
            <SideBarIcon :mode="iconMode"></SideBarIcon>
        </div>
        <div class="resize-handle" v-drag.prevent="resizeHandlers"></div>
        <ul>
            <li v-for="(content, index) in listContents" :key="index">
                {{ content }}
            </li>
        </ul>
    </div>
</template>

<script>
import Drag from 'directives/drag';
import ClickOutside from 'directives/clickoutside';

import SideBarIcon from 'components/side-bar-icon';

export default {
    name: 'side-bar',
    components: {SideBarIcon},
    directives: {Drag, ClickOutside},
    props: {
        width: {
            type: Number,
            required: true,
        },
        resizable: {
            type: Boolean,
            required: true,
        },
    },
    data () {
        return {
            resizeHandlers: {
                mouseDown: this.handleResizeMouseDown,
                mouseMove: this.handleResizeMouseMove,
                mouseUp: this.handleResizeMouseUp,
                touchStart: this.handleResizeTouchStart,
                touchMove: this.handleResizeTouchMove,
                touchEnd: this.handleResizeTouchEnd,
            },
            listContents: [
                'AAA',
                'BBB',
                'CCC',
            ],
        };
    },
    computed: {
        sideBarClass () {
            return {
                'expanded': !this.$store.state.uiState.sideBarIsCollapsed,
                'resizable': this.resizable,
            };
        },
        iconMode () {
            return this.$store.state.uiState.sideBarIsCollapsed ? 'menu' : 'back';
        },
    },
    methods: {
        handleToggle () {
            this.$store.commit('setSideBarIsCollapsed', !this.$store.state.uiState.sideBarIsCollapsed);
        },
        handleResizeMouseDown (event) {
            this.listContents.push('mouseDown');
            // Not accurate in IE!
            // this.__WIDTH__ = Number(window.getComputedStyle(this.$el, null).width.replace('px', ''));
            this.__WIDTH__ = this.$el.clientWidth;
            this.__START_X__ = event.pageX;
        },
        handleResizeMouseMove (event) {
            const width = event.pageX - this.__START_X__ + this.__WIDTH__;
            this.listContents.push(width);
            this.$emit('update:width', width);
        },
        handleResizeMouseUp () {
            this.listContents.push('mouseUp');
        },
        handleResizeTouchStart (event) {
            this.listContents.push('touchStart');
            this.__WIDTH__ = this.$el.clientWidth;
            this.__START_X__ = event.changedTouches[0].pageX;
        },
        handleResizeTouchMove (event) {
            const width = event.changedTouches[0].pageX - this.__START_X__ + this.__WIDTH__;
            this.listContents.push(width);
            this.$emit('update:width', width);
        },
        handleResizeTouchEnd () {
            this.listContents.push('touchEnd');
        },
        handleClickOutside () {
            if (this.$store.state.uiState.appSize === 'mobile') {
                this.$store.commit('setSideBarIsCollapsed', true);
            }
        },
    },
};
</script>

<style scoped lang="less">
    @import "../style";

    .side-bar {
        position   : relative;
        padding    : 10px 20px;
        background : @black-2;
        box-sizing : border-box;
        transition : left .2s, min-width .2s, max-width .2s;

        &.expanded {
            .toggle-handle {
                left : 0;
            }
        }

        .toggle-handle {
            position    : absolute;
            left        : 100%;
            margin-left : 20px;
            transition  : all .2s;
        }

        &.resizable .resize-handle {
            display : block;
        }

        .resize-handle {
            @width : 26px;
            @borderWidth : 5px;

            display      : none;
            position     : absolute;
            top          : 0;
            bottom       : 0;
            right        : -@width / 2;
            width        : @width;
            border       : solid transparent;
            border-width : 0 @borderWidth;
            background   : @black-2 padding-box;
            opacity      : 0;
            cursor       : ew-resize;
            box-sizing   : border-box;
            transition   : opacity .2s .1s;

            &:after {
                @height : 20px;
                @width : 4px;

                content      : '';
                display      : none;
                position     : absolute;
                top          : 50%;
                left         : 50%;
                width        : @width;
                height       : @height;
                margin       : (-@height / 2) (-@width / 2);
                border       : 1px solid;
                border-color : transparent white;
            }

            &:hover {
                opacity : 1;
            }

            &:active, &:focus {
                background : @black padding-box;

                &:after {
                    display : block;
                }
            }
        }

        ul {
            margin-top : 30px;

            li {

            }
        }
    }
</style>