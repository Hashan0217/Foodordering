import {
	getCatgoryData,
	getDishes,
	filiesPreview,

} from "@/api/dishes.js"

export default {
	namespaced: true,
	// 数据仓库中心
	state: {
		catgoryData: [], //分类data
		dishesData: [], //商品数据
		existingDataList: [], //已获取分类数据的分类id列表
		isLoding: false, //是否加载完成
	},

	//处理仓库
	mutations: {
		//存储分类数据
		setCatgoryData(state, data) {
			const arr = []
			data.forEach(item => {
				item['sele_quantity'] = 0
				arr.push(item)
			})
			state.catgoryData = arr

		},
		//存储商品数据
		setDishesData(state, data) {
			state.existingDataList.push(data.itemData[0].categoryId)
			const itemArr = []
			data.itemData.forEach(item => {
				const temp = {
					att_hide: item.status == 1 ? false : true,
					att_name: "",
					image: item.image,
					monthlysale: '99+', //销量
					name: item.name,
					onsale: true,
					quantity: 0,
					specs: [{
						attribute: "",
						unit: item.description,
						unitprice: item.price,
					}],
					unit: item.description,
					unitprice: item.price,
					_id: item.id

				}
				itemArr.push(temp)
			})
			const newData = {
				category: data.name,
				cid: data.itemData[0].categoryId,
				good_query: itemArr
			}
			state.dishesData.push(newData)
			state.isLoding = true

		},
		//单个商品+ 更改数据
		changePlus(state, data) {

			state.dishesData[data.index].good_query[data.good_index].quantity = data.QU
			// state.dishesData[data.index].good_query[data.good_index].good_specs = data.good_specs
			state.dishesData[data.index].good_query[data.good_index].unitprice = data.unitprice
		},
		//单个商品- 更改数据
		changeReduce(state, data) {

			state.dishesData[data.index].good_query[data.good_index].quantity = data.QU
			// state.dishesData[data.index].good_query[data.good_index].good_specs = data.good_specs
			state.dishesData[data.index].good_query[data.good_index].unitprice = data.unitprice


		},
		//计算分类下 选多少商品
		changeQunint(state, data) {
			// this.catgoryData[res_index], 'sele_quantity', item.value
			state.catgoryData[data.res_index].sele_quantity = data.value
		},
		//减少分类下 选多少商品
		deleteQunint(state, data) {
			if (state.catgoryData[data.res_index].sele_quantity > 0) {
				state.catgoryData[data.res_index].sele_quantity -= 1
			}
		},
		//清空购物车
		changeEmptyData(state) {
			state.catgoryData.forEach(item => {
				item.sele_quantity = 0
			})
			state.dishesData.forEach(item => {
				item.good_query.forEach(T => {
					T.quantity = 0
				})
			})
		}

	},
	//触发
	actions: {
		//获取分类
		async actionsGetCatgoryData(ctx) {
			const res = await getCatgoryData()
			if (res.data.code == 200) {
				ctx.commit("setCatgoryData", res.data.data)
				return true
			} else {
				return false
			}
		},
		//获取商品
		async actionsGetDishes(ctx, data) {
			//检查查重
			const isExist = ctx.state.existingDataList.includes(data.id)
			if (isExist) return 0
			//获取分类
			const res = await getDishes(data.id)
			if (res.data.code == 200) {
				//获取图片地址
				const itemData = await imagUrl(res.data.data)
				//存储
				ctx.commit("setDishesData", {
					itemData,
					name: data.name
				})
				return true
			}
		},
		// //选好商品 提交购物车
		// async actionsAddShoppingCart(ctx, data) {


		// 	return false

		// },
		//清空购物车
		async actionsCleanShoppingCart(ctx) {
			ctx.commit("changeEmptyData")
			return true

			// if (res.data.code === 200) {

			// 	return true
			// }
			// return false
		},


	}
}



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