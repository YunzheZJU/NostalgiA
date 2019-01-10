<template>
    <div class="app">
        <div class="main" :class="classSideBarCollapsed">
            <div class="bottom-bar">
                <textarea title="input">123</textarea>
                <button>Submit</button>
            </div>
            <div class="content">
                <p v-for="x in 50" :key="x">Content</p>
            </div>
            <div class="header" :class="classSideBarCollapsed">
                <div class="title">
                    <p>Title</p>
                </div>
                <div class="tools">
                    <ul>
                        <li>T</li>
                        <li>O</li>
                        <li>O</li>
                        <li>L</li>
                        <li>S</li>
                    </ul>
                </div>
                <NotificationBar class="notification"></NotificationBar>
            </div>
        </div>
        <SideBar :style="sideBarStyle" :class="classSideBarCollapsed" :width.sync="sideBarWidth"
                 :resizable="sideBarResizable"></SideBar>
    </div>
</template>

<script>
import SideBar from './components/side-bar';
import NotificationBar from './components/notification-bar';

export default {
    name: 'app',
    components: {NotificationBar, SideBar},
    data () {
        return {
            sideBarWidth: 200,
            // Default value varies according to media query
            // sideBarIsCollapsed: false,
            // sideBarWidthRange: {
            //     mobile: {
            //         min: 320,
            //         max: 320,
            //     },
            //     tablet: {
            //         min: 50,
            //         max: 100,
            //     },
            //     desktop: {
            //         min: 200,
            //         max: 400,
            //     },
            // },
        };
    },
    computed: {
        classSideBarCollapsed () {
            return {
                'side-bar-collapsed': this.$store.state.uiState.sideBarIsCollapsed,
            };
        },
        sideBarStyle () {
            return {
                width: `${this.sideBarWidth}px`,
            };
        },
        sideBarResizable () {
            return !this.$store.state.uiState.sideBarIsCollapsed;
        },
    },
    created () {
        // Each parent will be created before any of its child components
        console.log(this.$mediaQuery.genQueryArray([768, 1200]));
        this.$mediaQuery.subscribeSwitch([768, 1200], range => {
            console.log(`media changed: (min: ${range.min}, max: ${range.max})`);
            let size;
            if (range.min === 0) {
                size = 'mobile';
            } else if (range.min === 768) {
                size = 'tablet';
            } else {
                size = 'desktop';
            }
            this.$store.commit('setAppSize', size);
            if (this.$store.state.uiState.appSize === 'mobile') {
                this.$store.commit('setSideBarIsCollapsed', true);
            }
            // const min = this.sideBarWidthRange[this.size].min;
            // const max = this.sideBarWidthRange[this.size].max;
            // this.sideBarWidth = Math.min(max, Math.max(min, this.sideBarWidth))
        });
    },
    mounted () {
        // Every child components will be mounted before their parents

    },
    destroyed () {
        this.$mediaQuery.unsubscribeSwitch([768, 1200]);
    },
};
</script>

<style scoped lang="less">
    @import "./style";

    .app {
        display        : flex;
        flex-direction : row-reverse;
        white-space    : nowrap;

        .side-bar {
            @width_mobile : 320px;
            @width_tablet_min : 50px;
            @width_tablet_max : 100px;
            @width_desktop_min : 200px;
            @width_desktop_max : 400px;

            position  : relative;
            left      : @width_mobile;
            // Width will be set in inline style
            height    : 100vh;

            // Min-width和max-width控制小、中和大屏幕之间的宽度过渡
            min-width : @width_mobile;
            max-width : 100%;

            /* Small devices */
            @media only screen and (max-width : @mobile_tablet - 1px) {
                &.side-bar-collapsed {
                    // Left控制在小屏幕上展开的位置
                    left : 0;
                }
            }

            /* Medium devices, also applied to large devices */
            @media only screen and (min-width : @mobile_tablet) {
                left      : 0;
                min-width : @width_tablet_min;
                max-width : @width_tablet_max;
            }

            /* Large devices, will cover same attributes in medium */
            @media only screen and (min-width : @tablet_desktop) {
                min-width : @width_desktop_min;
                max-width : @width_desktop_max;
            }
        }

        .main {
            display        : flex;
            flex-direction : column-reverse;
            flex-grow      : 1;
            position       : relative;
            min-width      : 0;
            height         : 100vh;
            background     : @black-3;
            overflow-y     : hidden;
            transition     : min-width .2s ease-out;

            &.side-bar-collapsed {
                min-width : 100%;
            }

            /* Small devices */
            @media only screen and (max-width : @mobile_tablet - 1px) {
                min-width : 100%;
            }

            /* Medium devices, also applied to large devices */
            @media only screen and (min-width : @mobile_tablet) {
            }

            /* Large devices, will cover same attributes in medium */
            @media only screen and (min-width : @tablet_desktop) {

            }

            .header {
                position   : relative;
                padding    : 10px 20px;
                background : @black-1;
                // An hot fix for my iPad Air 2 @iOS 9 Safari
                /*min-height: 50px;*/
                box-sizing : border-box;

                &.side-bar-collapsed .title p {
                    text-indent : 40px;
                }

                .title {
                    p {
                        font-size  : 20px;
                        transition : text-indent .2s;
                    }
                }

                .tools {
                    position : absolute;
                    top      : 10px;
                    right    : 20px;

                    /* Small devices */
                    @media only screen and (max-width : @mobile_tablet - 1px) {
                        ul li:nth-last-child(n + 2) {
                            display : none;
                        }
                    }

                    /* Medium devices, also applied to large devices */
                    @media only screen and (min-width : @mobile_tablet) {

                    }

                    /* Large devices, will cover same attributes in medium */
                    @media only screen and (min-width : @tablet_desktop) {

                    }

                    ul {
                        li {
                            display    : inline-block;
                            width      : 30px;
                            height     : 30px;
                            background : @white-4;
                        }

                        li + li {
                            margin-left : 10px;
                        }
                    }
                }

                .notification {
                    position : absolute;
                    top      : 100%;
                    left     : 0;
                }
            }

            .content {
                flex-grow                  : 1;
                position                   : relative;
                padding                    : 10px 20px;
                // Not using shorthand in sake of Firefox < 63
                overflow-x                 : hidden;
                overflow-y                 : scroll;
                // Improve iOS experience
                -webkit-overflow-scrolling : touch;

                p {

                }
            }

            .bottom-bar {
                display    : flex;
                width      : 100%;
                min-height : 100px;
                padding    : 10px;
                background : @black-2;
                box-sizing : border-box;
                transition : min-height .2s;

                /* Small devices */
                @media only screen and (max-width : @mobile_tablet - 1px) {
                    min-height : 50px;
                }

                /* Medium devices, also applied to large devices */
                @media only screen and (min-width : @mobile_tablet) {
                    min-height : 100px;
                }

                /* Large devices, will cover same attributes in medium */
                @media only screen and (min-width : @tablet_desktop) {
                    min-height : 200px;
                }

                textarea {
                    flex-grow  : 1;
                    font-size  : 16px;
                    box-sizing : border-box;
                }

                button {
                    margin-left : 10px;
                    font-size   : 16px;
                    transition  : height .2s, min-width .2s;

                    /* Small devices */
                    @media only screen and (max-width : @mobile_tablet - 1px) {
                        /*height    : 100%;*/
                        min-width : 75px;
                    }

                    /* Medium devices, also applied to large devices */
                    @media only screen and (min-width : @mobile_tablet) {
                        height    : 50px;
                        min-width : 100px;
                        align-self  : flex-end;
                    }

                    /* Large devices, will cover same attributes in medium */
                    @media only screen and (min-width : @tablet_desktop) {
                        height    : 50px;
                        min-width : 150px;
                        align-self  : flex-end;
                    }
                }
            }
        }
    }
</style>