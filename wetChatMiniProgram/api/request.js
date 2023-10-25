const BASE_URL = 'http://localhost:8001/api';

const token = uni.getStorageSync('token')


let header = {
	'Content-Type': 'application/json',
	'token': token
}
/**
 * option 配置对象
 */
const request = (option) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: BASE_URL + option.url,
			method: option.method || 'GET',
			header: header,
			data: option.data || '',
			success: res => {
				resolve(res)
			},
			fail: err => {
				reject(err)
			}
		})
	})
}

export default request;