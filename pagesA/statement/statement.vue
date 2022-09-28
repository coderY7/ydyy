<template>
	<view>
		<u-navbar title="快报" @leftClick="leftClick" :placeholder="true" :autoBack="true" leftIconColor='#f60506'>
		</u-navbar>
		<!-- 选择门店 -->
		<view class="unit1">


		</view>

		<view class="charts-box">
			<qiun-data-charts type="column" :opts="optsA" :chartData="chartDataA" />
		</view>
		<view class="charts-box">
			<qiun-data-charts type="pie" :opts="optsB" :chartData="chartDataB" />
		</view>
	</view>
</template>

<script>
	import dayjs from 'dayjs'; // ES 2015
	import {
		getFenDian,
		getpctodayssale,
    getpcadmindaysale//仪表盘数据
	} from '../../network/api.js'
	export default {
		data() {
			return {
				getpctodayssaledata:'',//快报查询日期
				chartDataA: {},
				optsA: {
					color: ["#1890FF", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4",
						"#ea7ccc"
					],
					padding: [15, 15, 0, 5],
					legend: {},
					xAxis: {
						disableGrid: true
					},
					yAxis: {
						data: [{
							min: 0
						}]
					},
					extra: {
						column: {
							type: "group",
							width: 20,
							activeBgColor: "#000000",
							activeBgOpacity: 0.08
						}
					}
				},
				chartDataB: {},
				optsB: {
					color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4"],
					padding: [5, 5, 5, 5],
					extra: {
						pie: {
							activeOpacity: 0.5,
							activeRadius: 10,
							offsetAngle: 0,
							labelWidth: 15,
							border: true,
							borderWidth: 3,
							borderColor: "#FFFFFF",
							linearType: "custom"
						}
					}
				}

			};
		},
		onLoad() {
			let getpcadmindaysaledata={
				access_token:uni.getStorageSync('access_token'),
        sdate:dayjs().format('YYYY-MM-DD')// 获取当前时间
//销售日期
			}
      getpcadmindaysale(getpcadmindaysaledata).then((res)=>{
				console.log('仪表盘数据',res)
			})
		},
		onReady() {
			this.getServerDataA();
			this.getServerDataB();
			console.log(dayjs().format('YYYY-MM-DD')) // 获取当前时间

		},
		methods: {

			
			//可视化面板
			getServerDataA() {
				//模拟从服务器获取数据时的延时
				setTimeout(() => {
					//模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
					let res = {
						categories: ["2016", "2017", "2018", "2019", "2020", "2021"],
						series: [{
								name: "目标值",
								data: [35, 36, 31, 33, 13, 34]
							},
							{
								name: "完成量",
								data: [18, 27, 21, 24, 6, 28]
							}
						]
					};
					this.chartDataA = JSON.parse(JSON.stringify(res));
				}, 500);
			},
			getServerDataB() {
				//模拟从服务器获取数据时的延时
				setTimeout(() => {
					//模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
					let res = {
						series: [{
							data: [{
								"name": "一班",
								"value": 50
							}, {
								"name": "二班",
								"value": 30
							}, {
								"name": "三班",
								"value": 20
							}, {
								"name": "四班",
								"value": 18
							}, {
								"name": "五班",
								"value": 8
							}]
						}]
					};
					this.chartDataB = JSON.parse(JSON.stringify(res));
				}, 500);
			},
		}
	}
</script>

<style lang="scss">
	.unit1 {}
	.status_bar{
		        height: var(--status-bar-height);
		        width: 100%;   
	}
	
</style>
