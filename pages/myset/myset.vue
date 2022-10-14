<template>
	<view class="page">	
		<view class="top">
			<view class="background"></view>
		</view>
		<view class="user-card">
			<view class="card">
				<view class="top">
					<view class="userImage">
						<open-data type="userAvatarUrl"></open-data>
					</view>
				</view>
				<view class="bottom">
					<view class="left">
						<view class="user-text">
							<open-data type="userNickName"></open-data>
						</view>
						<view class="user-phone">当前门店: {{dlmc}} </view>
            <view class="user-xinxi">门店编号: {{fdbh}} </view>
            <view class="user-xinxi">商户编号: {{companyid}} </view>

          </view>
					<view class="right flex-center">
						<u-icon class="icon" name="arrow-right"></u-icon>
					</view>
				</view>
			</view>
		</view>
		<view class="list-card">
			<view class="card">
				<view class="item item-bottom-solid" @click="set()">
					<view class="left flex-center">
						<image src="../../static/myIcon/qiu.png" mode="aspectFit"></image>
					</view>
					<view class="center">
						<text>应用设置</text>
					</view>
					<view class="right flex-center">
						<u-icon class="icon" name="arrow-right"></u-icon>
					</view>
				</view>
			</view>
			<view class="card">
				<view class="item item-bottom-solid" @click="feedback()">
					<view class="left flex-center">
						<image src="../../static/myIcon/1.png" mode="aspectFit"></image>
					</view>
					<view class="center">
						<text>使用反馈</text>
					</view>
					<view class="right flex-center">
						<u-icon class="icon" name="arrow-right"></u-icon>
					</view>
				</view>
			</view>
		</view>
		<view class="quit flex-center" @click="quits()">
			<view class="btn flex-center">
				退出登录
			</view>
		</view>
	</view>
</template>

<script>
import {logintype,usercheck} from "../../network/api";

export default {
		data() {
			return {
dlmc:uni.getStorageSync('dlmc'),
        fdbh:uni.getStorageSync('fdbh'),//分店编号
        companyid: uni.getStorageSync('companyid')//商家ID
			}
		},
		methods: {
			quits() {
				uni.showModal({
					title: '提示',
					content: '确认退出,清除缓存',
					success: function (res) {
						if (res.confirm) {
							console.log('用户点击确定');
              uni.navigateTo({
                url:'/pages/login/login'
              })
							 // uni.clearStorageSync();
              let data={
                vtype:'logout',
                access_token:uni.getStorageSync('access_token'),
                companyid:uni.getStorageSync('companyid'),
                userid:uni.getStorageSync('userid'),
                fdbh:uni.getStorageSync('fdbh'),
                computerid:uni.getStorageSync('openid')
              }
              console.log('退出登录成功',res)
              usercheck(data).then((res)=> {
              })
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
				//uni.setStorageSync('launchflag',true)//引导页
			},
			//应用反馈
			feedback(){
				uni.navigateTo({
					url:'./component/jianyi'
				})
			},
			//应用设置
			set(){
				console.log('打开应用设置')
				uni.navigateTo({
					url:'./component/weixin'
				})
			}
			
		}
	}
</script>





<style lang="scss" scoped>
	.top {
		height: 250rpx;
		position: relative;

		.background {
			background-color: #5199ff;
			border-bottom-left-radius: 22px;
			border-bottom-right-radius: 22px;
			position: absolute;
			height: 380rpx;
			width: 100%;
		}
	}

	.icon {
		color: #96a1ae;
		font-size: 40rpx;
	}

	.user-card {
		height: 170rpx;
		padding: 0 15px;

		.card {
			position: relative;

			height: 250rpx;
			background-color: white;
			border-radius: 5px;

			.top {
				height: 30%;
				position: relative;

				.userImage {
					position: absolute;
					bottom: 24%;
					left: 10%;
					width: 150rpx;
					height: 150rpx;
					overflow: hidden;
					border-radius: 50%;
					border: 2px solid white;
				}
			}

			.bottom {
				display: flex;
				height: 70%;

				.left {
					width: 80%;
					height: 100%;
					position: relative;

					.user-text {
						width: 100%;
						font-size: 1.6em;
						padding-left: 80rpx;
						height: 50%;
					}

					.user-phone {
						color: #96a1ae;
						padding-left: 80rpx;

						width: 100%;
						font-size: 0.9em;
					}
          .user-xinxi {
            color: #96a1ae;
            padding-left: 80rpx;

            width: 100%;
            font-size: 0.9em;
          }
				}

				.right {
					width: 20%;
					height: 50%;
				}
			}
		}
	}

	.list-card {
		padding: 0 15px;
		margin-top: 80px;

		.card {
			border-radius: 5px;
			position: relative;
			background-color: white;
			border-radius: 5px;
			padding: 5px 30px;

			.item {
				display: flex;
				height: 120rpx;

				.left {
					width: 15%;

					image {
						width: 70rpx;
						height: 70rpx;
					}
				}

				.center {
					width: 65%;
					display: flex;
					justify-content: start;
					align-items: center;
					font-size: 1.1em;
				}

				.right {
					width: 20%;
					justify-content: flex-end;
				}
			}
		}
	}

	.item-bottom-solid {
		border-bottom: 1px solid #d4d6da;
	}

	.quit {
		height: 100rpx;
		margin-top: 50px;

		.btn {
			background-color: #4f99ff;
			border-radius: 30px;
			width: 80%;
			color: white;
			font-size: 1.2em;
			height: 100%;
		}
	}

	.flex-center {
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>


