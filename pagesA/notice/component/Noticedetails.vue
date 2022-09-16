<template>
	<view>
		<textarea :placeholder="notice.departmentName" class="feedback-textare" maxlength="-1" />
		<view>
			<view>名称:{{notice.dlmc}}</view>
			<view>发布时间:{{notice.publishTime}}</view>
			<view>结束时间:{{notice.endTime}}</view>
			<view>工号ID:{{notice.publishmanId}}</view>
		</view>
		<view>
			<u-button @click='take()'>微信推送</u-button>
		</view>
	</view>
</template>

<script>
	import {
	  sendmessage //推送消息
	} from "@/network/api.js";
	export default {
		data() {
			return {
				notice: null
			}
		},
		onLoad(option) {
			// console.log(JSON.parse(option.item))
			this.notice = JSON.parse(option.item)

		},
		methods: {
			//消息推送
			take() {
				let sendmessagedata = {
					appid: uni.getStorageSync('appid'),
					appsecert: uni.getStorageSync('secret'),
					openid: uni.getStorageSync('openid'),
					template_id: 'Qj4DRaFxP2mLOwfFuyW0QHc3J0RGXgg5BalSDWwVclw',
					data: {
						date2: {
							value: `${this.notice.publishTime}`
						},
						date3: {
							value: `${this.notice.endTime}`
						}
					}
				}
				wx.getSetting({
					withSubscriptions: true,
					success: (res) => {
						console.log('打开订阅授权', res),
							uni.requestSubscribeMessage({
								tmplIds: ['Qj4DRaFxP2mLOwfFuyW0QHc3J0RGXgg5BalSDWwVclw'],
								success: (res) => {
									console.log('用户同意订阅', res)
									sendmessage(sendmessagedata).then((res) => {
										console.log('推送', res)
									})
								},
								fail: (err) => {
									console.log(err)
								}
							})
					}
				})
			}
		}
	}
</script>

<style>
	.feedback-textare {
		margin-top: 30rpx;
		margin-bottom: 30rpx;
		height: 266rpx;
		color: #303133;
		font-size: 28rpx;
		line-height: 2em;
		width: 100%;
		box-sizing: border-box;
		padding: 20rpx 30rpx;
		border-radius: 20rpx;
		background-color: #F5F6F8;
	}
</style>
