<template>
	<view>

    <u-switch v-model="cut"></u-switch>

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


    }
	}
</script>

<style lang="scss">
.unit4_box{
  display: flex;
  justify-content: space-around;
}
</style>
