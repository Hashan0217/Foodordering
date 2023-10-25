import request from './request.js'

//注册与登录
export async function userLogin(code) {
	let user_info = {
		url: '/user/login',
		method: 'POST',
		data: {
			"code": `${code}`
		}
	}
	const res = await request(user_info)
	if (res.data.code === 200) {
		const data = {
			token: res.data.data.token,
		}
		return data
	}
	if (res.data.code !== 200) {
		let err = {
			title: '用户登录请求报错误',
			description: res
		};
		return err;
	}

}