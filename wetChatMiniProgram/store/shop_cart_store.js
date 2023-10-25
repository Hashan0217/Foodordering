import {
	addShoppingCart,
} from "@/api/dishes.js"



export default ({
	namespaced: true,
	// 数据仓库中心
	state: {
		//购物车数据
		shopPingCartDate: [],
		//商品总价
		totalPrice: 0,

	},

	//处理仓库
	mutations: {
		clearState(state) {
			state.shopPingCartDate = []
		},
		setShopPingCartData(state, data) {
			let totalPrice = 0
			data.forEach(item => {
				totalPrice += item.total_price
			})
			state.totalPrice = totalPrice
			state.shopPingCartDate = data
		}

	},
	//触发
	actions: {
		//存储查看 购物车商品
		async setshopPingCartDate(ctx, data) {

			const getData = []
			data.forEach(item => {
				const itemData = {
					dishId: item._id,
					setmealId: 0,
					number: item.quantity,
					price: item.unitprice,
					// dishFlavor:[]
				}
				getData.push(itemData)
			})
			const res = await addShoppingCart(getData)
			if (res.data.code == 200) {
				ctx.commit("setShopPingCartData", data)
				return true
			} else {
				return false
			}




		},


	}
})