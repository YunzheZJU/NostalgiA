<template>
    <transition>
        <div class="notification-bar" v-show="!$store.state.uiState.notificationBarIsCollapsed">
            <p>Notification</p>
            <div class="close" @click="handleClose"></div>
        </div>
    </transition>
</template>

<script>
export default {
    name: 'notification-bar',
    methods: {
        handleClose () {
            this.$store.commit('setNotificationBarIsCollapsed', true);
        },
    },
    mounted () {
        setInterval(() => {
            this.$store.commit('setNotificationBarIsCollapsed', !this.$store.state.uiState.notificationBarIsCollapsed);
        }, 3000);
    },
};
</script>

<style scoped lang="less">
    @import "../style";

    .notification-bar {
        @padding-y : 5px;
        @padding-x : 20px;
        position   : relative;
        padding    : @padding-y @padding-x;
        background : @white-7;
        box-sizing : border-box;
        width      : 100%;

        @keyframes backgroundSpread {
            0% {
                width       : 0;
                margin-left : 50%;
            }
            100% {
                width       : 100%;
                margin-left : 0;
            }
        }

        @keyframes contentFadeIn {
            0% {
                transform: translateY(-50%);
                opacity  : 0;
            }
            15% {
                transform: translateY(-50%);
                opacity  : 0;
            }
            100% {
                transform: translateY(0);
                opacity : 1;
            }
        }

        @keyframes everythingFadeOut {
            0% {
                transform: translateY(0);
                opacity : 1;
            }
            30% {
                transform: translateY(20%);
            }
            100% {
                transform: translateY(-50%);
                opacity  : 0;
            }
        }

        &.v-enter-active {
            animation : backgroundSpread .8s;

            p, .close {
                animation: contentFadeIn .6s ;
            }
        }

        &.v-leave-active {
            animation: everythingFadeOut .5s ease-in;
        }

        p {
            text-align : center;
        }

        .close {
            position   : absolute;
            top        : @padding-y;
            right      : @padding-x;
            width      : 24px;
            height     : 24px;
            background : @black-4;
        }
    }
</style>