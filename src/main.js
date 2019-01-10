/**
 * Created by Yunzhe on 2018/12/30.
 */

'use strict';
import '@babel/polyfill'
// 导入Vue框架
import Vue from 'vue';
import Vuex from 'vuex';
// 导入Vue插件
import VueMediaQuery from 'plugins/mediaquery'
// 导入配置
import StoreConfig from 'store'
// 导入vue组件
import App from 'app';
// 导入normalize.css
import 'normalize.css'
// 导入全局样式表
import 'style';

Vue.use(Vuex);
// noinspection JSValidateTypes
const store = new Vuex.Store(StoreConfig);

Vue.use(VueMediaQuery);

const app = document.createElement('div');
app.id = 'app';
document.getElementsByTagName('body')[0].appendChild(app);

// 创建Vue根实例
new Vue({
    el: '#app',
    store,
    render: h => h(App),
});