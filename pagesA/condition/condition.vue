<template>
	<view>
	<!-- 	<u-navbar :title="title" :placeholder="true" @leftClick="leftClick">
		</u-navbar> -->
		<view class="">
			<view class="unit1_box">
				<view>开始日期📅</view>
				<uni-datetime-picker type="date" :clear-icon="false" v-model="start" />
			</view>
			<view class="unit1_box">
				<view>结束日期📅</view>
				<uni-datetime-picker type="date" :clear-icon="false" v-model="end" />
			</view>
		</view>
		
		<button @click="isquery()">查询</button>
	</view>
</template>

<script>
	import {
			checkSjSale,//商家销售
			getQuerySyySaleJK,//收银缴款
		saleCWbb,//销售日报
		queryBMSalebb,//部门分析
		fdSuperSale,//大类分析
		fdSaleAnalyze,//门店分析
		fdSPTypeAnalyze,//大类指标
		cwsjjxcInfo,//应付账款
		spkcinfo,//商品详情
		qySpkcinfo,//商品库存详情
		custombb,//销售客单统计
		query002,//顾客消费分析
		querySPSalebb//商品销售综合
		} from '../../network/api.js'
	export default {
		data() {
			return {
				title: '',
				start: '', //开始时间
				end: '', //结束时间
			};
		},
		onLoad(option) {
			let query = JSON.parse(option.item)
			this.title = query.report
		},
		methods: {
			//自定义返回
			leftClick() {
				uni.navigateBack({
					delta: 1
				});
			},
			maskClick(e) {
				console.log('----maskClick事件:', e);
			},
			//查询
			isquery(){
				var port;
				switch(this.title){
					case '商家销售':
					port=checkSjSale
					break;
					case '收银缴款查询':
					port=getQuerySyySaleJK
					break;
					case '销售日报':
					port=saleCWbb
					break;
					case '部门分析':
					port=queryBMSalebb
					break;
					case '大类分析':
					port=fdSuperSale
					break;
					case '门店分析':
					port=fdSaleAnalyze
					break;
					case '大类指标':
					port=fdSPTypeAnalyze
					break;
					case '应付账款':
					port=cwsjjxcInfo
					break;
					case '商品详情':
					port=spkcinfo
					break;
					case '销售客单统计':
					port=custombb
					break;
					case '顾客消费分析':
					port=query002
					break;
					case '商品销售综合':
					port=querySPSalebb
					break;
					default:
					console.log('未必配接口');
					break;
				}
				port().then((res)=>{
					console.log('查询到的数据',res)
				})
			}
		}
	}
</script>

<style lang="scss">
.unit1_box{
	display: flex;
	justify-content: center;
	
}
</style>
