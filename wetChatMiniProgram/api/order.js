import request from './request.js'

//根据购物车的数据
export async function getShoppingCartInfo() {

	const info = {
		url: `/user/shoppingCart/list`,
		method: 'GET',
	}

	const res = await request(info)

	return res

}

//提交订单
export async function submitOrder(data) {

	const info = {
		url: `/user/order/submit`,
		method: 'POST',
		data
	}
	const res = await request(info)
	return res

}

//支付接口
export async function payOrder(data) {

	const info = {
		url: `/user/order/payment`,
		method: 'PUT',
		data
	}
	const res = await request(info)
	return res

}

//查看订单
export async function getOreder(data) {

	const info = {
		url: `/user/order/historyOrders`,
		method: 'POST',
		data
	}
	const res = await request(info)
	return res

}
//获取订单详情
export async function getOrederInfo(data) {

	const info = {
		url: `/user/order/orderDetail/${data}`,
		method: 'GET',
		data
	}
	const res = await request(info)
	return res

}