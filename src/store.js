/**
 * Created by Yunzhe on 2019/1/1.
 */

'use strict';
export default {
    state: {
        uiState: {
            sideBarIsCollapsed: false,
            notificationBarIsCollapsed: false,
            appSize: 'mobile',
        },
    },
    // 对state的一层简单包装
    getters: {},
    // 对state的原始修改
    mutations: {
        setSideBarIsCollapsed (state, boolean) {
            state.uiState.sideBarIsCollapsed = boolean;
        },
        setNotificationBarIsCollapsed (state, boolean) {
            state.uiState.notificationBarIsCollapsed = boolean;
        },
        setAppSize (state, size) {
            state.uiState.appSize = size;
        },
    },
    // 基于mutations的复杂逻辑和异步逻辑
    actions: {},
};