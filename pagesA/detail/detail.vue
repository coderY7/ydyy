<template>
	<view id="page">
    <view class="container">
      <view class="name">商品详细:</view>
      <view v-for="(item,key) of Object.entries(datas)" class="box">
        <view class="boxunit1">{{item[0]}} :</view>
        <view class="boxunit2">{{item[1]}}</view>
      </view>
    </view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				datas:null
			};
		},
    onLoad(option){
      console.log(option)
      this.datas=JSON.parse(option.list)
      console.log(Object.entries(this.datas));

    },
	}
</script>

<style lang="scss">
page{
  background-color: #E5E5E5;
}
.container{
  margin: 20rpx 50rpx 20rpx 50rpx;
  padding: 20rpx;
  background-color: #ffffff;
  border-radius: 20rpx;

}
.name{
  font-size: 40rpx;
  color: #4f99ff;
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
