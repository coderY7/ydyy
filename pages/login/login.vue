<template>
	<view>
		
		<navbar title='登录' @lefts=left()></navbar>
    <view class="container">
      <view class="header">
        <image src="../../static/shilu-login/logo.png"></image>
      </view>

      <view class="list">
        <view class="list-call">
          <image class="img" src="/static/shilu-login/gh.png"></image>
          <input class="sl-input" v-model="userid" type="number" maxlength="5" placeholder="输入工号" />
        </view>
        <view class="list-call">
          <image class="img" src="/static/shilu-login/mm.png"></image>
          <input class="sl-input" v-model="password" type="text" maxlength="32" placeholder="输入密码"
                 password="true" />
        </view>
      </view>


      <view class="boxinput" v-if="isfdlist">
        <uni-section type="line">
          <uni-data-select v-model="fdbh" :localdata="fdlist" @change="change"></uni-data-select>
        </uni-section>
      </view>

      <view>
        <view class="agreenment">
          <navigator url="reg" open-type="navigate">注册账户</navigator>
        </view>
      </view>

      <view class="unit2">
        <view class="button-login" hover-class="button-hover" @tap="bindLogin()">
          <text>登录</text>
        </view>

        <view class="button-login" hover-class="button-hover" @tap="wxLogin()">
          <text>微信一键登录</text>
        </view>


      </view>

    </view>

		
	</view>
</template>

<script>
	import {
		usercheck,
		userfast,
		getopenid,
		usercheckapp,
		basic
	} from "@/network/api.js";
	import navbar from '../../components/nav.vue'
	export default {
		data() {
			return {
				bgColor: '#4f99ff', //动态背景
				userid: '',
				password: '',
				iswx: '',
				fdbh: '',
				fdlist: [], //分店列表
				isfdlist: false,
				resdata: null,
			};
		},
		components: {
		    navbar
		  },
		onLoad() {
			console.log(wx.getMenuButtonBoundingClientRect())
			this.iswx = uni.getStorageSync('iswx') //判断微信绑定
			this.userid = uni.getStorageSync('scandata').userid
		},
		watch: {
			userid: function(newValue, oldValue) {
				if (newValue.length == '5') {
					this.useryz()
				} else {}
			}
		},
		methods: {
			//自定义导航左面按钮
			left(data){
			console.log('点击左面按钮',data)
			},
			change(e) {
				console.log(e);
				uni.setStorageSync("fdbh", e)
			},
			//用户验证
			useryz() {
				let user = {
					userid: this.userid
				}
				usercheckapp(user).then((res) => {
					if (res.error_code == 0) {
						if (res.fdlist) {
							this.isfdlist = true
						};
						uni.setStorageSync("companyid", res.companyid)
						this.fdbh = res.fdlist[0].fdbh
						uni.setStorageSync("fdbh", res.fdlist[0].fdbh)
						this.fdlist = []
						for (var u in res.fdlist) {
							this.fdlist.push({
								value: res.fdlist[u].fdbh,
								text: res.fdlist[u].fdmc
							})
						}
					} else {
						this.iswx = '',
							this.fdbh = '',
							this.fdlist = [], //分店列表
							this.isfdlist = false
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
					"computerid": uni.getStorageSync("uuid"), //设备唯一标识
					"fdbh": this.fdbh,
					"userid": this.userid,
					"password": this.password,
					"vtype": "login",
					"ipaddress": uni.getStorageSync("ip")
				}
				usercheck(logindata).then((res) => {
					if (res.message == 'success') {
						uni.setStorageSync('access_token', res.access_token) //token
						uni.setStorageSync('refresh_token', res.refresh_token) //刷新
						uni.setStorageSync('dlmc', res.userinfo.erp_username) //名称
						uni.setStorageSync('loginaccess', res) //登录成功返回的数据
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
									this.openid = res.openid
									uni.switchTab({
										url: '/pages/home/home'
									});
									this.basics()
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
			wxLogin() {
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
							this.openid = res.openid
							
							let data = {
								openid: uni.getStorageSync('openid')
							}
							userfast(data).then((res) => {
								console.log(JSON.stringify(res))
								let resdata = JSON.parse(JSON.stringify(res))
								this.resdata = resdata
								console.log(resdata['error_code'], resdata['userinfos'])
								if(resdata.error_code=='500'){
									uni.showToast({
										icon: 'none',
										title: resdata.message
									});
								}else{
									uni.setStorageSync('access_token', resdata.access_token
										.access_token)
									uni.setStorageSync('dlmc', this.resdata['userinfos'].dlmc)
									uni.setStorageSync('companyid', this.resdata['userinfos']
										.CompanyID)
									uni.setStorageSync('userid', this.resdata['userinfos'].USERID)
									uni.setStorageSync('fdbh', this.resdata['userinfos'].FDBHList)
									uni.setStorageSync('groupid', this.resdata['userinfos'].GROUPID)
									this.basics()
										uni.switchTab({
											url: '/pages/home/home'
										});
								}
							})

						})
					}
				});


			},

			basics() {
				let data = {
					access_token: uni.getStorageSync('access_token'),
					dtype: 'GetBufferAll',
					companyid: uni.getStorageSync('companyid')
				}
				// basic(data).then((res)=>{
				//   console.log(res);
				// })
				uni.request({
					url: 'http://erpai.mzsale.com/mzsale/web/basic', //仅为示例，并非真实接口地址。
					data: data,
					method: 'POST',
					header: {
						'custom-header': 'hello' //自定义请求头信息
					},
					success: (res) => {
						console.log(res);
						uni.setStorageSync('basic', res.data)
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		justify-content: center;
    margin: 20rpx;
	}

	.header {
		width: 161rpx;
		height: 161rpx;
		border-radius: 50%;
		margin-top: 60rpx;
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
		padding: 0 50rpx;
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
		font-size: 28rpx;
		margin-left: 16rpx;
	}
	.unit2{
		margin-top: 160rpx;
	}

	.button-login {
		color: #FFFFFF;
		font-size: 26rpx;
		width: 260rpx;
		height: 70rpx;
    background:linear-gradient(-90deg,#52c8f1, #85d8f3);
    box-shadow: 0rpx 0rpx 13rpx 0rpx rgba(164, 217, 228, 0.2);
		border-radius: 30rpx;
		line-height: 70rpx;
		text-align: center;
		margin-left: auto;
		margin-right: auto;
		margin-top: 40rpx;
	}

	.button-hover {
    background:linear-gradient(-90deg,#52c8f1, #85d8f3);
  }

	.agreenment {
		display: flex;
    justify-content: flex-end;
		align-items: center;
		font-size: 26rpx;
		margin-top: 20rpx;
    margin-right: 50rpx;
		color: #FFA800;
		text-align: center;
		height: 40rpx;
		line-height: 40rpx;
	}


	.boxinput {
		margin: 50rpx 70rpx 0 70rpx;
	}
	
	.navbar{
		background:linear-gradient(#52c8f1, #85d8f3);
		font-size: 16px;
		.nav{
			display: flex;
			align-items: center;
			.navicon{
				padding-left: 20px;
				width: 80px;
			}
			.navname{
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
	}
	
</style>
