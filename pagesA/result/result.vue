<template>
	<view>
	<navbar title='查询结果' @lefts=left()></navbar>
    <view class="container">
      <view class="fixation">
        <view class="switch">
          <selectSwitch @change="changeSwitch" />
        </view>
        <view class="box1">
          <view v-for="(item,index) in Object.entries(sumdata[0])" class="unit4_box">
            <view>
              <view class="unit4_box_item">
                <view class="unit4_box_value">{{item[1]}}</view>
              </view>
              <view class="unit4_box_item">
                <view class="unit4_box_key">{{item[0]}}</view>
              </view>
            </view>

          </view>
        </view>
      </view>
      <!--    表格数据展示-->
      <view v-if="!cut">
        <view class="tablebox">
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
      </view>

      <!--    卡片显示-->
      <view v-if="cut">
        <view class="card">
          <view v-for="(item,index) in result" class="box" @click="detail(item,index)">
            <view class="boxunit1">
              <text class="boxunit1_name">名称:{{item['商品名称']}}</text>
              <text class="boxunit1_name">¥{{item['批发价格']}}</text>
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
	</view>
</template>

<script>
	import selectSwitch from "@/components/xuan-switch/xuan-switch.vue";
	import navbar from '../../components/nav.vue'
	export default {
		data() {
			return {
        bgColor:'#4f99ff',
        bdt:[],//表头
        result:null,//查询结果
        sumdata:'',//数据汇总
        cut:false,//切换展示
      };
		},
		components: {
		selectSwitch,
		navbar
		},
    onLoad(option){
      console.log(option)
      this.bdt=JSON.parse(option.bdt)
      this.result=JSON.parse(option.result)
      this.sumdata=JSON.parse(option.sumdata)

    },
    methods:{
		//自定义返回
		    left() {
		      uni.navigateBack({
		        delta: 1
		      });
		    },
		changeSwitch(isSwitch){ 
			// console.log(isSwitch)
			this.cut=!this.cut
			},
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
.container{

}
.switch{
  margin: 20rpx;
}
.card{
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
  .box{
    margin: 20rpx 0;
    width: 700rpx;
    border-radius: 30rpx;
    background-color: #ffffff;
    font-weight: 400;
    .boxunit1{
      padding: 20rpx 20rpx;
      display: flex;
      justify-content: space-between;
      font-size: 40rpx;
	  border-bottom: 1px #E5E5E5 solid;
      .boxunit1_name{
        color: #52c8f1;
      }
    }
    .boxunit2{
      font-size: 30rpx;
      padding: 10rpx 20rpx;
      display: flex;
      justify-content: space-between;
    }
    .boxunit3{
      font-size: 30rpx;
      padding: 10rpx 20rpx;
      display: flex;
    }
  }
}
.tablebox{
  margin: 0 20rpx;
}
.box1{
  margin: 20rpx auto;
  background-color: #ffffff;
  border-radius: 30rpx;
  width: 700rpx;
  display: flex;
  justify-content: space-between;
}
.unit4_box{
 display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20rpx;
  .unit4_box_item{
    font-size: 30rpx;
    margin: 20rpx;
    .unit4_box_value{
      font-size: 40rpx;
      color: #52c8f1;
    }
    .unit4_box_key{
      font-size: 26rpx;
    }
  }
}
.fixation{
  top: 150rpx;
  position: -webkit-sticky;
  position: sticky;
  z-index: 9999999;
  background-color: #E5E5E5;
  padding: 20rpx 0;
}
</style>
