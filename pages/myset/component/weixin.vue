<template>
	<view class="container">
		<!-- 分列 -->
		<view class="box">
      <view class="name">微信设置</view>
			<view v-for='(item,index) in setlist' :key='index' class="unit1">
				<view>{{item.name}}</view>
				<view>
					<u-switch v-model="item.is" @change="asyncChange(item)"></u-switch>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		logintype
	} from '../../../network/api.js'
	export default {
		data() {
			return {
				setlist: [{
					name: '微信绑定',
					is: uni.getStorageSync('iswx') ? uni.getStorageSync('iswx') : false
				},
				{
					name:'修改密码',
					is:false
				}]
			}
		},
		onLoad() {},
		methods: {
			asyncChange(item) {
				console.log(item)
				//微信设置
				if (item.name == '微信绑定') {
					uni.showModal({
						content: item.is ? '确定要绑定微信吗' : '确定要解绑微信吗',
						success: (res) => {
							if (res.confirm) {
								if (item.is) {
									let wxdata = {
										openid: uni.getStorageSync('openid'),
										userid: uni.getStorageSync('userid'),
										type: 'ins'
									}
									logintype(wxdata).then((res) => {
										console.log('微信绑定成功', res)
										uni.setStorageSync('iswx', true),

											uni.showToast({
												title: res.message,
												duration: 2000,
												icon: 'none'
											});
									})
								} else {
									let data = {
										userid: uni.getStorageSync('userid'),
										openid: uni.getStorageSync('openid'),
										typeinfo: 'rewx',
										type: 'remove'
									}
									logintype(data).then((res) => {
										console.log('微信解绑成功', res)
										uni.setStorageSync('iswx', false),
											uni.showToast({
												title: res.message,
												duration: 2000,
												icon: 'none'
											});
									})
								}
							} else if (res.cancel) {
								item.is = false
							}
						}
					})
				}
				//修改密码
				if(item.name=='修改密码'){
					uni.navigateTo({
						url:'../../login/forget'
					})
				}
			}
		}
	}
</script>

<style lang="scss">
.container{
margin: 20rpx 20rpx 0 20rpx;
  .name{
    font-size: 35rpx;
    color: #4f99ff;
margin-bottom: 20rpx;
  }
  .box{
    padding: 20rpx;
  }
 .unit1{
  display: flex;
  justify-content: space-between;
  margin-bottom: 20rpx;
   padding-bottom: 10rpx;
   border-bottom: 1px solid #d4d6da;
 }
}

</style>
