<template>
	<view>
<view class="switch">
  <u-switch v-model="cut">qie</u-switch>
</view>
    <view>
      <view v-for="(item,index) in sumdata" class="unit4_box">
        <view>
          <view  v-for="(items,key) in Object.keys(item)">{{items}}</view>
        </view>
        <view>
          <view  v-for="(items,key) in Object.values(item)">{{items}}</view>
        </view>
      </view>
    </view>
    <!--    表格数据展示-->
    <view v-if="!cut">
      <uni-table border stripe emptyText="暂无更多数据">
        <!-- 表头行 -->
        <uni-tr>
          <uni-th align="center" v-for="(item,index) in bdt" >{{item}}</uni-th>
        </uni-tr>
        <!-- 表格数据行 -->
        <uni-tr v-for="(item,index) in result">
          <uni-td v-for="(items,key) of Object.values(item)">{{items}}</uni-td>
        </uni-tr>
      </uni-table>
    </view>

<!--    卡片显示-->
    <view v-if="cut">
<view class="container">
  <view v-for="(item,index) in result" class="box" @click="detail(item,index)">
    <view class="boxunit1">
      <text>名称:{{item['商品名称']}}</text>
      <text>¥{{item['批发价格']}}</text>
    </view>
    <view class="boxunit2">
      <text>编号:{{item['商品编码']}}</text>
      <text>库存:{{item['库存数量']}}</text>
    </view>
    <view class="boxunit3">
      <view>商家:{{item['商家编号']}}</view>
    </view>

  </view>
</view>

    </view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				bdt:[],//表头
        result:null,//查询结果
        sumdata:'',//数据汇总
        cut:false,//切换展示
      };
		},
    onLoad(option){
      console.log(option)
      this.bdt=JSON.parse(option.bdt)
      this.result=JSON.parse(option.result)
      this.sumdata=JSON.parse(option.sumdata)

    },
    methods:{
      //显示所有数据
      detail(item,index){
        console.log('跳转',item)
        let data=JSON.stringify(item)
        console.log(data)
        uni.navigateTo({
          url: `../../pagesA/detail/detail?list=${data}`
        });
      }

    }
	}
</script>

<style lang="scss">
page{
  background-color: #E5E5E5;
}
.switch{
  margin: 20rpx;
}
.container{
  margin: 20rpx 50rpx 20rpx 50rpx;

  .box{
    margin: 30rpx auto;
    width: 600rpx;
    border-radius: 30rpx;
    background-color: #ffffff;
    font-weight: 400;
    .boxunit1{
      padding: 10rpx 20rpx;
      display: flex;
      justify-content: space-between;
    }
    .boxunit2{
      padding: 10rpx 20rpx;
      display: flex;
      justify-content: space-between;
    }
    .boxunit3{
      padding: 10rpx 20rpx;
      display: flex;
    }
  }
}
.unit4_box{
  display: flex;
  justify-content: space-around;
  margin: 50rpx;
}

</style>
