<template>
	<!-- 我的订单 -->
	<view>
		<block v-for="(item,index) in checkOrderList.records" :key="index">
			<view class="my-order-view" @click="check(item.id,item.status,index)">
				<view class="my-order-name">
					<text>小关关餐饮店</text>
					<text>{{item.status == 1 ? '已完成' : '待结账'}}</text>
				</view>
				<view class="my-order-number">
					<view>
						<view>
							<text>桌台名称 ：</text>
							<text>{{item.tableName}}</text>
						</view>
						<view class="my-order-time">
							<text>取餐码 ：</text>
							<text>{{item.deliverCode}}</text>
						</view>
						<view class="my-order-time">
							<text>下单时间 ：</text>
							<text>{{item.orderTime}}</text>
						</view>
					</view>
					<view class="my-order-price">¥{{item.amount}}</view>
				</view>
			</view>
		</block>
		<view style="height: 100rpx;"></view>
	</view>
</template>

<script>
	//价格补0 
	const Price = require('e-commerce_price')
	import {
		mapState
	} from "vuex"
	export default {

		data() {
			return {
				Price,
				res_data: [{
						transac_status: 'none',
						table_number: 1,
						order_time: '2021-11-9 20:12',
						sett_amount: '13'
					}, {
						transac_status: 'none',
						table_number: 1,
						order_time: '2021-11-9 20:12',
						sett_amount: '13'
					},
					{
						transac_status: 'none',
						table_number: 1,
						order_time: '2021-11-9 20:12',
						sett_amount: '13'
					},
					{
						transac_status: 'none',
						table_number: 1,
						order_time: '2021-11-9 20:12',
						sett_amount: '13'
					},
					{
						transac_status: 'none',
						table_number: 1,
						order_time: '2021-11-9 20:12',
						sett_amount: '13'
					}
				]
			}
		},
		computed: {
			...mapState('order_store', ["checkOrderList", ])
		},
		methods: {
			// 跳转订单详情页面
			async check(id, status, index) {
				//支付成功，展示成功后页面
				if (status) {
					//请求跳转页面所需的数据
					uni.showLoading({
						title: '加载中'
					});
					const res = await this.$store.dispatch("order_store/actionsGetOrederInfo", id)
					uni.hideLoading();
					//数据请求成功后
					if (res) {
						uni.navigateTo({
							url: `../order-details/my-pay?id=${id}&index=${index}`
						})
					} else {
						//失败后
						uni.hideToast();
						uni.showToast({
							title: '网络不好',
							icon: 'error',
							duration: 2000
						});
					}


				}

			}
			//获取数据

		},
		onLoad() {
			const token = uni.getStorageSync('token')
			if (!token) {
				uni.showModal({
					title: '未登录',
					content: '请登录账号',
					success: function(res) {
						if (res.confirm) {
							uni.redirectTo({
								url: '../user-page/user'
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});

			}

			//请求历史订单
			const data = {
				"page": "1",
				"pageSize": "10",

			}
			this.$store.dispatch("order_store/actionsGetOreder", data)
		},
		//销毁之前
		beforeDestroy() {
			clearTimeout()

		}
	}
</script>

<style scoped>
	page {
		background-color: #5555ff;
	}

	.my-order-view {
		background-color: rgb(247, 212, 95);
		border-radius: 10rpx;
		margin: 20px 10px;
		padding: 20rpx;
		border-bottom: 5px solid #ffff08;
	}

	.my-order-name {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-bottom: 20rpx;
		color: #303030;
		border-bottom: 1px solid #ffffff;
	}

	.my-order-name text:nth-child(1) {
		font-weight: bold;
	}

	.my-order-number {
		padding-top: 20rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: #4d4d4d;
		font-weight: 600;
	}

	.my-order-time {
		padding-top: 20rpx;
	}

	.my-order-price {
		color: #000000 !important;
		font-weight: bold;
	}
</style>