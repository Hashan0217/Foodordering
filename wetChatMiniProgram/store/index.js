import Vue from 'vue'
import Vuex from 'vuex'

import shop_cart_store from "./shop_cart_store.js"
import dishes_store from "./dishes_store.js"
import order_store from "./order_store.js"
Vue.use(Vuex)


export default new Vuex.Store({
	modules: {
		shop_cart_store,
		dishes_store,
		order_store
	},
	strict: true,
})