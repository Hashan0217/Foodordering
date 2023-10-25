import Vue from 'vue'
import App from './App'
//动画css3
import './style/animat.css'
import store from '@/store/index.js'

//时间模块
let moment = require('moment')
moment.locale('zh-cn')
Vue.prototype.$Time = moment



Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App,
	store
})
app.$mount()