<template>
	<view class="content">
		<view class="list">
			<view class="tishi">若您发现密码有泄漏风险，可在此重新设置新密码。</view>
			<!-- <view class="list-call">
        <image class="img" src="/static/shilu-login/gh.png"></image>
        <input class="sl-input" type="number" v-model="phone" maxlength="11" placeholder="请输入手机号" />
      </view> -->
			<view class="list-call">
				<image class="img" src="/static/shilu-login/mm.png"></image>
				<input class="sl-input" type="text" v-model="password" maxlength="32" placeholder="请输入新密码"
					:password="!showPassword" />
				<image class="img" :src="showPassword?'/static/shilu-login/op.png':'/static/shilu-login/cl.png'"
					@tap="display"></image>
			</view>
			<!-- <view class="list-call">
        <image class="img" src="/static/shilu-login/3.png"></image>
        <input class="sl-input" type="number" v-model="code" maxlength="4" placeholder="验证码" />
        <view class="yzm" :class="{ yzms: second>0 }" @tap="getcode">{{yanzhengma}}</view>
      </view> -->
		</view>
		<view class="button-login" hover-class="button-hover" @tap="bindLogin()">
			<text>修改密码</text>
		</view>

	</view>
</template>

<script>
	var _this, js;
	import {
		usercheck
	} from '../../network/api.js'
	export default {
		data() {
			return {
				phone: '',
				second: 0,
				code: "",
				showPassword: false,
				password: ''
			}
		},
		onLoad() {
			_this = this;
		},
		computed: {
			yanzhengma() {
				if (this.second == 0) {
					return '获取验证码';
				} else {
					if (this.second < 10) {
						return '重新获取0' + this.second;
					} else {
						return '重新获取' + this.second;
					}
				}
			}
		},
		onUnload() {
			this.clear()
		},
		methods: {
			display() {
				this.showPassword = !this.showPassword
			},
			clear() {
				clearInterval(js)
				js = null
				this.second = 0
			},
			getcode() {
				if (this.phone.length != 11) {
					uni.showToast({
						icon: 'none',
						title: '手机号不正确'
					});
					return;
				}
				if (this.second > 0) {
					return;
				}
				_this.second = 60;
				js = setInterval(function() {
					_this.second--;
					if (_this.second == 0) {
						_this.clear()
					}
				}, 1000)

			},
			bindLogin() {
				//修改密码
				let data = {
          access_token:uni.getStorageSync('access_token'),
          ipaddress: uni.getStorageSync('uuid'),
					userid: uni.getStorageSync('userid'),
					password: this.password,
          companyid:uni.getStorageSync('companyid'),
          computerid:uni.getStorageSync('openid'),//设备唯一标识码
          fdbh:uni.getStorageSync('fdbh'),
          vtype: 'updatepw'
				}
				usercheck(data).then((res) => {
					console.log('密码修改', res)
					uni.showToast({
						title: res[0].Descrption,
						duration: 2000,
						icon: 'none'
					});
					setTimeout(() => {
						uni.navigateBack({
							delta: 1
						});
					}, 2000)

				})


			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.tishi {
		color: #999999;
		font-size: 28rpx;
		line-height: 50rpx;
		margin-bottom: 50rpx;
	}

	.list {
		display: flex;
		flex-direction: column;
		padding-top: 50rpx;
		padding-left: 70rpx;
		padding-right: 70rpx;
	}

	.list-call {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		height: 100rpx;
		color: #333333;
		border-bottom: 0.5px solid #e2e2e2;
	}

	.list-call .img {
		width: 40rpx;
		height: 40rpx;
	}

	.list-call .sl-input {
		flex: 1;
		text-align: left;
		font-size: 32rpx;
		margin-left: 16rpx;
	}

	.button-login {

		background: linear-gradient(-90deg, rgba(63, 205, 235, 0.8), rgba(188, 226, 158, 0.8));
		font-size: 34rpx;
		width: 470rpx;
		height: 100rpx;

		border-radius: 50rpx;
		line-height: 100rpx;
		text-align: center;
		margin-left: auto;
		margin-right: auto;
		margin-top: 100rpx;
	}

	.button-hover {
		background: linear-gradient(-90deg, rgba(63, 205, 235, 0.8), rgba(188, 226, 158, 0.8));
	}

	.yzm {
		color: #FF7D13;
		font-size: 24rpx;
		line-height: 64rpx;
		padding-left: 10rpx;
		padding-right: 10rpx;
		width: auto;
		height: 64rpx;
		border: 1rpx solid rgba(255, 131, 30, 1);
		border-radius: 50rpx;
	}

	.yzms {
		color: #999999 !important;
		border: 1rpx solid #999999;
	}
</style>
