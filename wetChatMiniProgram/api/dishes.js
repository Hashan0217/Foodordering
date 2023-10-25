import request from './request.js'

//获取分类
export async function getCatgoryData() {

	const info = {
		url: '/user/category/list',
		method: 'GET',
		data: {
			"current": "",
			"size": "",
			"name": "",
			"type": ""
		}
	}

	const res = await request(info)

	return res

}

//根据分类获取商品
export async function getDishes(data) {

	const info = {
		url: `/user/dish/list/${data}`,
		method: 'GET',

	}

	const res = await request(info)

	return res

}
//预览文件
export async function filiesPreview(data) {
	let previewInfo = {
		url: '/file/preview',
		method: 'POST',
		data: {
			fileName: data
		}
	}

	const res = await request(previewInfo)
	return res
}

//购物车添加商品
export async function addShoppingCart(data) {
	let addShopInfo = {
		url: '/user/shoppingCart/save',
		method: 'POST',
		data
	}

	const res = await request(addShopInfo)
	return res
}