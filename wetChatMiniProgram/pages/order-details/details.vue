<template>
	<view class="details-view">
		<view class="order-top">
			<view class="order-remind">
				<view>下单成功，坐等开吃</view>
				<view>菜品已在制作中</view>
			</view>
		</view>
		<view class="food-list">
			<view class="food-number">
				<text class="food-num" :class="{'food-active ': food_Way}" @click="food_Way=1">堂食</text>
				<text class="food-pick" :class="{'food-active ': food_Way? false : true}" @click="food_Way=0">打包</text>
			</view>
			<view class=" foot-back">
				<block v-for="(item,index) in   shopPingCartDate" :key="index">
					<view class="foot-til">
						<text>第{{index+1}}份</text>
						<text>下单成功，坐等开吃</text>
					</view>

					<block>
						<view class="foot-deta">
							<view>
								<image :src="item.image" mode="aspectFill"></image>
							</view>
							<view class="foot-name">
								<text>{{item.name}}</text>
								<text v-show="item.good_specs != ''">{{item.good_specs}}</text>
								<text>{{item.quantity}}{{item.unit}}</text>
							</view>
							<view class="foot-total">¥{{item.total_price}}</view>
						</view>
					</block>
					<!-- 展示更多 -->
					<view class="expand-more" v-show="item.max > 3" @click="open(index)">
						<text>展开全部</text>
						<image src="/static/tab/zhankai.svg"></image>
					</view>
				</block>
				<!-- 总计 -->
				<view class="total-view">
					<view>共{{shopPingCartDate.length}}份</view>
					<view class="total-price">
						<text>总计</text>
						<text>¥{{totalPrice}} <text v-if="!food_Way">+1元</text></text>
					</view>
				</view>
				<view class="" style="height: 30px;">

				</view>
			</view>
		</view>
		<!-- 加菜 -->
		<view class="add-a-dish" v-if="close_dish">
			<view @click="pay()">支付</view>
		</view>

	</view>
</template>

<script>
	import {
		Time
	} from "@/config/time.js"
	//接口
	import {
		getShoppingCartInfo
	} from "@/api/order.js"

	//价格补0 
	export default {
		data() {
			return {
				overall: 1, //总共多少份
				comp_data: [],
				goods_data: null,
				close_dish: true,
				shopPingCartDate: [], //商品列表
				totalPrice: '', //总价格
				food_Way: 1,

			}
		},
		computed: {
			setShopPingCartDate() {
				this.shopPingCartDate = this.$store.state.shop_cart_store.shopPingCartDate
				return 0
			},
			setTotalPrice() {
				this.totalPrice = this.$store.state.shop_cart_store.totalPrice
				return 0
			}

		},
		async onLoad(option) {
			let id = option.id
			if (id) {
				await this.$store.dispatch("order_store/actionsGetOrederInfo", id)
				this.id = id
				this.orderListIndex = option.index
			}
		},
		async created() {
			const res = await getShoppingCartInfo()
		},
		methods: {
			Time,
			open(index) {
				this.$set(this.goods_data[index], 'goods_list', this.comp_data[index].goods_list)
				this.$set(this.goods_data[index], 'max', 0)
			},
			//支付
			async pay() {
				const data = {
					tableId: '1683443751646760961', //桌号   
					payMethod: 0, //支付方式
					packageAmount: this.food_Way ? 0 : 1, //打包费用
					remark: '', //备注 
				}
				const res = await this.$store.dispatch("order_store/actionsSubmitOrder", data)
				if (res) {
					uni.redirectTo({
						url: './my-pay'
					})
				} else {
					uni.showToast({
						title: '支付失败，重试',
						duration: 3000,
						icon: 'error'
					});
				}
				// uni.showModal({
				// 	title: '提示',
				// 	content: '确认支付',
				// 	success: (res) => {
				// 		if (res.confirm) {
				// 			

				// 		}
				// 	}
				// })
			},
		},
		//销毁之前
		beforeDestroy() {
			clearTimeout()

		}

	}
</script>

<style>
	page {
		background-color: #f4f4f4;
	}

	.details-view {
		position: relative;
	}

	.order-top {
		background: linear-gradient(to bottom, #f7d45f, #f7d562, #f8d561, #f9db76, #f9de80);
		height: 300rpx;
	}

	.order-remind view:nth-child(1) {
		font-size: 35rpx;
		font-weight: bold;
		padding-bottom: 20rpx;
	}

	.order-remind {
		height: 200rpx;
		padding: 50rpx 0 0 50rpx;
	}

	.food-list {
		position: absolute;
		top: 200rpx;
		left: 20rpx;
		right: 20rpx;
	}

	.food-number {
		margin-bottom: 20px;
		background: white;
		width: 100%;
		border-radius: 10px;
		height: 100px;
		display: flex;
		justify-content: center;
		align-items: center;


	}

	.food-num {
		transition: all 0.5s;
		height: 100px;
		flex: 1;
		border-radius: 10px;
		/* margin-right: 20px; */
		/* background-color: red; */
		text-align: center;
		line-height: 100px;

	}

	.food-active {
		transition: all 0.5s;
		color: #fff;
		background-color: rgb(77, 136, 255);
	}

	.food-number text {
		font-size: 24px;
		font-weight: bolder;

	}

	.food-pick {
		flex: 1;
		height: 100px;
		width: 110%;
		border-radius: 10px;
		/* margin-left: 0px; */
		/* padding-left: 30px; */
		/* background-color: rebeccapurple; */
		text-align: center;
		line-height: 100px;
		/* background-color: #54ff93; */

	}

	.foot-back {
		background-color: #fefefe;
		border-radius: 10rpx;
		padding: 0 20rpx;
		margin-bottom: 30rpx;
	}

	.foot-til {
		height: 100rpx;
		color: #999999;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.foot-deta image {
		display: block;
		width: 130rpx;
		height: 130rpx;
		border-radius: 10rpx;
	}

	.foot-deta {
		display: flex;
		justify-content: space-between;
		height: 130rpx;
		margin: 40rpx 0;
	}

	.foot-name {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 0 20rpx;
		font-size: 30rpx;
	}

	.foot-name text:nth-child(1) {
		font-size: 31rpx !important;
		font-weight: bold;
	}

	.foot-name text:nth-child(2) {
		color: #666666;
	}

	.foot-total {
		font-weight: bold;
	}

	/* 展开更多 */
	.expand-more image {
		width: 25rpx;
		height: 25rpx;
		display: block;
		padding-left: 10rpx;
	}

	.expand-more {
		display: flex;
		align-items: center;
		justify-content: center;
		color: #999999;
		font-size: 25rpx;
		padding: 30rpx 0;
		border-bottom: 1rpx solid #f1f1f2;
	}

	/* 总计 */
	.total-price {
		display: flex;
		align-items: center;
		color: #333333;
		padding-left: 40rpx;
	}

	.total-price text:nth-child(2) {
		font-size: 35rpx;
		font-weight: bold;
		padding-left: 30rpx;
	}

	.total-view {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		padding: 30rpx 0;
	}

	.total-view view:nth-child(1) {
		color: #999999;
	}

	/* 订单号 */
	.order-number text {
		display: block;
		padding: 15rpx 0;
		font-size: 28rpx;
		color: #999999;
	}

	/* 加菜 */
	.add-a-dish {
		background-color: #fefefe;
		height: 120rpx;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		box-shadow: 0rpx -1.9rpx 1rpx 1rpx #f9f9f9;
		padding: 0 20rpx;
		z-index: 9;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}

	.add-a-dish view {
		background: linear-gradient(to right, #f8da81, #f8d771, #f7d362, #f6cb4a);
		width: 200rpx;
		height: 75rpx;
		line-height: 75rpx;
		text-align: center;
		border-radius: 50rpx;
		font-weight: bold;
		margin-left: 10rpx;
	}
</style>