import {
	submitOrder,
	payOrder,
	getOreder,
	getOrederInfo
} from "@/api/order.js"
import {
	filiesPreview,

} from "@/api/dishes.js"

export default ({
	namespaced: true,
	state: {
		orderInfo: {}, //订单信息	
		checkOrderList: {}, //查看订单信息列表
		orderListInfo: [], //订单详情
		isLoding: false, //是否加载成功
	},

	//处理仓库
	mutations: {
		//存储订单信息
		setOrderInfo(state, data) {
			state.orderInfo = data
		},
		//存储查看订单列表
		setCheckOrderList(state, data) {
			const arr = []
			console.log(data);
			data.records.forEach(item => {

				if (item.status == 1) {
					arr.push(item)
				}
			})
			const itemData = {
				records: arr,
				total: data.total
			}
			state.checkOrderList = itemData
		},
		//存储订单列表的订单详情
		setOrderListInfo(state, data) {

			const itemArr = []
			data.forEach(item => {
				const total_price = item.price * item.number
				const temp = {
					att_hide: item.status == 1 ? false : true,
					att_name: "",
					image: item.image,
					name: item.name,
					onsale: true,
					quantity: item.number,
					specs: [{
						attribute: "",
						unit: item.description,
						unitprice: item.price,
					}],
					total_price: total_price,
					unit: item.description,
					unitprice: item.price,
					_id: item.dishId

				}
				itemArr.push(temp)
			})
			state.orderListInfo = itemArr


		},
		changeIsLoding(state, data) {
			state.isLoding = data
		}
	},
	//触发
	actions: {
		//下订单 且 支付
		async actionsSubmitOrder(ctx, data) {
			//下订单
			const res = await submitOrder(data)
			if (res.data.code == 200) {
				//支付
				ctx.commit("setOrderInfo", res.data.data)
				const data = {
					"payMethod": 0,
					"orderNumber": res.data.data.orderNumber
				}
				const payRes = await payOrder(data)
				if (payRes.data.code == 200) {
					return true
				}

			}
			return false

		},
		//获取订单列表
		async actionsGetOreder(ctx, data) {
			const res = await getOreder(data)
			if (res.data.code == 200) {
				ctx.commit("setCheckOrderList", res.data.data)
				return true
			}
			return false
		},
		//获取订单详情
		async actionsGetOrederInfo(ctx, data) {
			ctx.commit("changeIsLoding", false)
			const res = await getOrederInfo(data)
			if (res.data.code == 200) {
				const dataRes = await imagUrl(res.data.data.dishList)
				ctx.commit("setOrderListInfo", dataRes)
				ctx.commit("changeIsLoding", true)
				return true
			}
			return false
		}

	}
})

//图片名称 更换图片地址
function imagUrl(data) {
	let arr = []
	return new Promise((resolve, rejecte) => {
		data.forEach((item, index) => {
			filiesPreview(item.image).then((res) => {
				if (res.data.code == 200) {
					item.image = res.data.message
					arr.push(item)
				}
				if (arr.length === data.length) {
					resolve(arr)
				}
			})

		})
	})
}