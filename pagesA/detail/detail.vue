<template>
	<view>
		<navbar title='结果详情' @lefts=left() leftname="<"></navbar>
    <view class="container">
      <view>
        <view class="name">商品详细:</view>
      </view>
      <view v-for="(item,key) of Object.entries(datas)" class="box">
        <view class="boxunit1">{{item[0]}} :</view>
        <view class="boxunit2">{{item[1]}}</view>
      </view>
    </view>
	</view>
</template>

<script>
	import navbar from '../../components/nav.vue';
	export default {
		data() {
			return {
				datas:null,
				bgColor:'#4f99ff',
			};
		},
		components: {
		navbar
		},
    onLoad(option){
      this.datas=JSON.parse(option.list)
    },
	methods:{
		//自定义返回
		left() {
		  uni.navigateBack({
		    delta: 1
		  });
		},
	}
	}
</script>

<style lang="scss">

.container{
  margin: 20rpx 50rpx 20rpx 50rpx;
  padding: 20rpx;
  background-color: #ffffff;
  border-radius: 20rpx;
  border: thick double #85d8f3;
}
.name{
  font-size: 40rpx;
  color: #85d8f3;
  margin-left: 30rpx;
}
.box{
  margin: 20rpx ;
  display: flex;
  justify-content: space-between;
  padding: 10rpx;
  border-bottom: 0.5px solid #e2e2e2;
  .boxunit1{
    //flex: 1;
  }
  .boxunit2{
    //flex: 3;
  }
}
</style>
