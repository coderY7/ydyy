<template>
	<view>
		<u-navbar title="快报" @leftClick="leftClick" :placeholder="true" :autoBack="true" leftIconColor='#f60506'>
		</u-navbar>
		<!-- 选择门店 -->
		<view class="unit1">
			<view class="unit1_box">
				<view>选择门店</view>
				<view>
					<view @click="showDrawer" type="primary">{{dianmin.fdbh}}--{{dianmin.fdmc}}</view>
					<uni-drawer ref="showRight" mode="right" :mask-click="false" >
						<view class="status_bar"></view>
						<!-- <button @click="closeDrawer" type="primary">关闭</button> -->
						<scroll-view style="height: 100%;" scroll-y="true">
							<u-radio-group 
							    v-model="fendian"
									:borderBottom="true"
									placement="column"
							    iconPlacement="right"
									>
								<u-radio
								 :customStyle="{marginBottom: '16px'}"
								 v-for="(item,key) in fendian" :key="item" :label="`${item.fdbh}-${item.fdmc}`" :name="item"  @change='groupChange()'>
								 </u-radio>
							</u-radio-group>
						</scroll-view>
						
					</uni-drawer>
				</view>
			</view>
			<view class="unit1_box">
				<view>选择时间</view>
				
				
				
			</view>
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
		getpctodayssale
	} from '../../network/api.js'
	export default {
		data() {
			return {
				mdshow: false,
				fendian: [], //分店信息
				dianmin:null,//默认店名为分店第一个
				fendianitem: null, //选择的分店
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
				//您可以通过修改 config-ucharts.js 文件中下标为 ['pie'] 的节点来配置全局默认参数，如都是默认参数，此处可以不传 opts 。实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
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
			//getpctodayssale
			let getpctodayssaledata={
				saleData:'2022-01-06'
			}
			getpctodayssale(getpctodayssaledata).then((res)=>{
				console.log('快报数据',res)
			})
		},
		onReady() {
			this.getServerDataA();
			this.getServerDataB();
			console.log(dayjs().format('YYYY-MM-DD')) // 获取当前时间
			getFenDian({
				sn: uni.getStorageSync('sn')
			}).then((res) => {
				console.log('获取门店信息', res.data)
				this.dianmin=res.data[0]//默认分店
				this.fendian = res.data
			})
		},
		methods: {
			showDrawer() {
				this.$refs.showRight.open();
				getFenDian({
					sn: uni.getStorageSync('sn')
				}).then((res) => {
					console.log('获取门店信息', res.data)
					this.fendian = res.data
				})
			},
			closeDrawer() {
				this.$refs.showRight.close();
			},
			groupChange(n){
				console.log(n)
				this.dianmin=n
				this.closeDrawer()
			},
			
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
