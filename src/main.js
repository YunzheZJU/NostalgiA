/**
 * Created by Yunzhe on 2018/12/30.
 */

'use strict';
// 导入Vue框架
import Vue from 'vue';
// 导入vue组件
import App from './app.vue';
// 导入normalize.css
import 'normalize.css'
// 导入全局样式表
import './style.less';

const app = document.createElement('div');
app.id = 'app';
document.getElementsByTagName('body')[0].appendChild(app);

// 创建Vue根实例
new Vue({
    el: '#app',
    render: h => h(App),
});