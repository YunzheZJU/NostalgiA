<template>
    <div class="app">
        <div class="content">
            <p>hello</p>
        </div>
        <SideBar class="side-bar"></SideBar>
    </div>
</template>

<script>
import SideBar from './components/side-bar';

export default {
    name: 'app',
    components: {SideBar},
};
</script>

<style scoped lang="less">
    @import "./style";

    .app {
        direction   : rtl;
        white-space : nowrap;

        & > * {
            display        : inline-block;
            vertical-align : top;
            direction      : ltr;
        }

        @sideBarWidth : 200px;
        .side-bar {
            width        : @sideBarWidth;
            height       : 100%;
            margin-right : -@sideBarWidth;
        }

        .content {
            width        : 100%;
            height       : 100%;
            padding-left : @sideBarWidth;
            box-sizing   : border-box;

            p {
                font-size  : 20px;
                background : @black-1;
            }
        }
    }
</style>