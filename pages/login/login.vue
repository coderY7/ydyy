<template>
	<view class="content">
		<view class="header">
			<image src="../../static/shilu-login/logo.png"></image>
		</view>

		<view class="list">
			<view class="list-call">
				<image class="img" src="/static/shilu-login/1.png"></image>
				<input class="sl-input" v-model="userid" type="number" maxlength="6" placeholder="输入工号" />
			</view>
			<button @click="useryz()">用户验证</button>
			<view class="list-call">
				<image class="img" src="/static/shilu-login/2.png"></image>
				<input class="sl-input" v-model="password" type="text" maxlength="32" placeholder="输入密码"
					password="true" />
			</view>

		</view>

		<view class="button-login" hover-class="button-hover" @tap="bindLogin()">
			<text>登录</text>
		</view>

		<view class="button-login" hover-class="button-hover" @tap="wxLogin()" v-if="iswx">
			<text>微信一键登录</text>
		</view>

		<view class="agreenment">
			<!-- <navigator url="forget" open-type="navigate">忘记密码</navigator>
			<text>|</text> -->
			<navigator url="reg" open-type="navigate">注册账户</navigator>
		</view>
	</view>
</template>

<script>
	import {
		usercheck,
		userfast,
		getopenid,
		usercheckapp
	} from "@/network/api.js";
	export default {
		data() {
			return {
				userid:'',
				password: '',
        iswx:uni.getStorageSync('iswx'),
        fdbh:'',
        selectRange:''
			};
		},
		onLoad() {
      this.userid=uni.getStorageSync('scandata').userid
			if (uni.getStorageSync('login')) {
				uni.reLaunch({
					url: '/pages/home/home'
				});
			}
		},
		methods: {
      //用户验证
			useryz(){
				let user={
					userid:this.userid
				}
				usercheckapp(user).then((res)=>{
          if(res.error_code==0){
            uni.setStorageSync("companyid", res.companyid)
            this.fdbh=res.fdlist[0].fdbh

            uni.setStorageSync("fdbh", res.fdlist[0].fdbh)
            this.selectRange=[]
            for(var u in res.fdlist){
              this.selectRange.push({
                "value":res.fdlist[u].fdbh,
                "text":res.fdlist[u].fdmc
              })
            }
          }else{
            uni.showToast({
              icon: 'none',
              title: res.message
            });

          }
				})
			},
      //登录
			bindLogin() {
				if (this.userid.length != 5) {
					uni.showToast({
						icon: 'none',
						title: '工号不正确'
					});
					return;
				}
				if (this.password.length < 4) {
					uni.showToast({
						icon: 'none',
						title: '密码不正确'
					});
					return;
				}
				let logindata = {
          "access_token": "",
          "companyid": uni.getStorageSync("companyid"),
          "computerid": uni.getStorageSync("uuid"),//设备唯一标识
          "fdbh": this.fdbh,
					"userid": this.userid,
					"password": this.password,
          "vtype": "login",
          "ipaddress": uni.getStorageSync("ip")
				}
				usercheck(logindata).then((res) => {
					if (res.message == 'success') {
						uni.setStorageSync('dlmc',res.companyinfo.erp_fdmc)
						uni.setStorageSync('login', true)
						// 获取用户信息
						uni.login({
							provider: 'weixin',
							success: (res) => {
								//获取code,换取openid
								console.log(res);
								let getopeniddata = {
									appid: uni.getStorageSync('appid'),
									secret: uni.getStorageSync('secret'),
									js_code: res.code
								}
								console.log(getopeniddata)
								getopenid(getopeniddata).then((res) => {
									console.log('获取到openid', res)
									//存储openid
									uni.setStorageSync('openid', res.openid)
									uni.setStorageSync('session_key', res.session_key)
									uni.setStorageSync('userid', this.userid)
									let openid = res.openid
									uni.switchTab({
										url: '/pages/home/home'
									});
								})

							}
						});

					} else {
						uni.showToast({
							icon: 'none',
							title: res.message
						});
					}

				})
			},
      //微信登录
      wxLogin(){
        let data={
          openid:uni.getStorageSync('openid')
        }
        userfast(data).then((res)=>{
					if(res.err_code=='0'){
						uni.setStorageSync('dlmc',res.data[0].dlmc)
						uni.showToast({
							icon: 'none',
							title: res.message
						});
						setTimeout(()=>{
							uni.switchTab({
								url: '/pages/home/home'
							});
						},1000)
						
					}
         
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

	.header {
		width: 161rpx;
		height: 161rpx;
		border-radius: 50%;
		margin-top: 30rpx;
		margin-left: auto;
		margin-right: auto;
	}

	.header image {
		width: 161rpx;
		height: 161rpx;
		border-radius: 50%;
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
		color: #FFFFFF;
		font-size: 34rpx;
		width: 470rpx;
		height: 100rpx;
		background: linear-gradient(-90deg, rgba(63, 205, 235, 1), rgba(188, 226, 158, 1));
		box-shadow: 0rpx 0rpx 13rpx 0rpx rgba(164, 217, 228, 0.2);
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

	.agreenment {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		font-size: 30rpx;
		margin-top: 80rpx;
		color: #FFA800;
		text-align: center;
		height: 40rpx;
		line-height: 40rpx;
	}

	.agreenment text {
		font-size: 24rpx;
		margin-left: 15rpx;
		margin-right: 15rpx;
	}
</style>
