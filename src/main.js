import Vue from 'vue'
import App from './App'
import './common/less/reset.less'
import './static/font/iconfont.js'
import router from './router'
import { RouterMount } from 'uni-simple-router'
import fly from './utils/request'
import Print from 'vue-print-nb'
Vue.use(Print);
import uView from "uview-ui";
Vue.use(uView);
// 使用 Mock
import Mock from './mock/mock' // 刚刚手写的mock.js文件
Vue.prototype.$fly = fly
App.mpType = 'app'

const app = new Vue({
  ...App
})
//v1.3.5起 H5端 你应该去除原有的app.$mount();使用路由自带的渲染方式
// #ifdef H5
RouterMount(app,'#app');
// #endif

// #ifndef H5
app.$mount(); //为了兼容小程序及app端必须这样写才有效果
// #endif



