<template>
	<!-- 点餐界面 -->
	<view class="user-container" v-if="token">
		<view class="contianer-info">
			<view class="info-card">
				<text>微信用户</text>
				<image src="../../static/user/touxiang.jfif" mode="" class="info-image"> </image>
			</view>
		</view>
		<view class="cotnainer-list">
			<ul class="list-info">
				<li class="list-item">
					<i class="iconfont">&#xe60b;</i>
					<text>优惠券</text>
				</li>
				<li class="list-item">
					<i class="iconfont">&#xe639;</i>
					<text>会员卡</text>
				</li>
				<li class="list-item">
					<i class="iconfont">&#xe658;</i>
					<text>我的地址</text>
				</li>
				<li class="list-item">
					<i class="iconfont">&#xe685;</i>
					<text>意见反馈</text>
				</li>
			</ul>
		</view>
	</view>
	<view class="" v-else>
		<view class="user-hint">
			<i class="iconfont">&#xe629;</i>
			<text>用微信登录</text>
		</view>
		<view class="login-btt">
			<button open-type="getPhoneNumber" @click="login">微信登录</button>
		</view>

	</view>
</template>

<script>
	import {
		userLogin,
	} from '@/api/user.js'
	export default {
		data() {
			return {
				token: '',
			}
		},
		onLoad() {
			const token = uni.getStorageSync('token')
			if (token) {
				this.token = token
			}
		},
		methods: {
			//获取code
			async login() {
				const res_code = await wx.login({
					provider: 'weixin',
				});
				const code = res_code.code
				const res_user = await userLogin(code)
				this.token = res_user.token
				uni.setStorage({
					key: 'token',
					data: res_user.token,
				})


			}
		},
		//销毁之前
		beforeDestroy() {
			clearTimeout()

		}
	}
</script>

<style scoped>
	/* 用户信息展示 */
	/* 用户 */
	.contianer-info {
		width: 100%;
		height: 200px;
		background-color: rgba(247, 212, 95);
	}

	.info-card {
		width: 100%;
		height: 200px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.info-card text {
		color: white;
		font-size: 24px;
		font-weight: bolder;
		margin-left: 20px;
	}

	.info-image {
		width: 100px;
		height: 100px;
		border-radius: 50%;
		margin-right: 20px;
	}

	/* 列表 */
	.list-info {
		width: 100%;
	}

	.list-item {
		display: flex;
		padding: 10px;
		/* justify-content: center*/
		align-items: center;
		margin: 10px;
	}

	.list-item text {
		margin-left: 10px;
	}

	/* 登录页面 */
	.user-hint {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-top: 150px;
	}

	.user-hint i {
		font-size: 150px;
	}

	.user-hint text {
		font-size: 24px;
		font-weight: bolder;
	}

	.login-btt button {
		width: 80%;
		background-color: greenyellow;
		margin: 50px auto;
	}
</style>