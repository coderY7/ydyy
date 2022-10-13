<template>
	<view>
		<u-navbar :bgColor="bgColor" :placeholder="true" leftIcon='tags' leftIconColor='#f60506' leftText='设置'
			title="首页" @leftClick="leftClick">
		</u-navbar>

		<view class="container">
			<view class="unit1">
				<!--        近期查询日期-->
				<view class="recent">
					<view class="ubut" v-for="(item,index) in datelist">
						<button @click="getdata(item,index)" :class="{'active':xzindex==index}">{{item.name}}</button>
					</view>
				</view>
				<!-- 选择时间-->
				<view class="xzbox">
					<view class="xz">
						<view class="boxname">选择时间</view>
						<view class="boxinput">
							<uni-datetime-picker type="date" :value="single" v-model="item.defval"
								@change="startdate()" />
						</view>
					</view>
					<view style="font-size: 16rpx">(默认当天)</view>
				</view>

				<!-- 选择门店 -->
				<view class="xzbox">
					<view class="xz">
						<view class="boxname">选择分店</view>
						<view class="boxinput">
							<view>
								<uni-section type="line">
									<uni-data-select v-model="xzfd" :localdata="fdlist"></uni-data-select>
								</uni-section>
							</view>
						</view>
					</view>
					<view style="font-size: 16rpx">(默认全部分店)</view>
				</view>

				<view>实时销售分析</view>
				
				<view class="unit1box">
					<view class="box">
						<view class="boxitem" v-for="(item,index) in Object.entries(ybpdata.table0[0])">
							<view class="box_left">
								<image></image>
							</view>
							<view class="box_right">
								<view>{{item[1]}}</view>
								<view>{{item[0]?item[0]:''}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="charts-box">
				<qiun-data-charts type="column" :opts="optsA" :chartData="chartDataA" />
			</view>
			<view class="charts-box">
				<qiun-data-charts type="pie" :opts="optsC" :chartData="chartDataC" />
			</view>
		</view>


	</view>
</template>

<script>
	import {
		getFenDian,
		getpctodayssale,
		getappsalereport //仪表盘数据
	} from '../../network/api.js';
	import dayjs from 'dayjs'; // ES 2015

	export default {
		data() {
			return {
				fdlist: '', //分店列表
				xzfd: '', //选择的分店
				xzindex: '3',
				bgColor: '#4f99ff', //动态背景
				three: '', //近三天
				one: '', //近一天
				yue: '',
				sdate: '', //快报查询日期
				datelist: '',
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
							width: 30,
							activeBgColor: "#000000",
							activeBgOpacity: 0.08
						}
					}
				},
				chartDataC: {},
				ybpdata: '',
				optsC: {
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
				},
			};
		},
		onReady() {
			//this.getServerDataA();
			this.getServerDataC();
		},
		onShow() {
			this.sdate = dayjs().format('YYYY-MM-DD') // 获取当前时间
			let one = dayjs().unix() - 24 * 60 * 60 // 获取前一天时间戳
			this.one = dayjs.unix(one).format('YYYY-MM-DD')
			let three = dayjs().unix() - 24 * 60 * 60 * 3 //前三天时间戳
			let yue = dayjs().unix() - 24 * 60 * 60 * 30 //前三天时间戳
			this.yue = dayjs.unix(yue).format('YYYY-MM-DD')
			this.three = dayjs.unix(three).format('YYYY-MM-DD')
			let datelist = [{
				name: '前一月',
				value: this.yue
			}, {
				name: '前三天',
				value: this.three
			}, {
				name: '前一天',
				value: this.one
			}, {
				name: '当天',
				value: this.sdate
			}]
			this.datelist = datelist

			//处理分店下拉框数据
			this.fdlist = uni.getStorageSync('basic').FDINFO
			let cxfdbh = [];
			this.fdlist.forEach((item) => {
				let datas = {}
				datas.value = item.fdbh;
				datas.text = item.fdmc
				cxfdbh.push(datas)
			})
			this.fdlist = cxfdbh

			this.getdata()
		},
		onLoad() {
			uni.setStorageSync('cxbb', true)
		},
		watch: {
			xzfd: function(now, old) {
				if (now) {
					this.getdata()
				}
			},
			sdate: function(now, old) {
				if (now) {
					this.getdata()
				}

			}
		},
		methods: {
			getdata(item, index) {
				this.xzindex = index
				let getpcadmindaysaledata = {
					access_token: uni.getStorageSync('access_token'),
					saledate: item ? item.value : this.sdate,
					datamark: 'ssale',
					selfdbh: this.xzfd ? this.xzfd : 'ALL',
					sn: uni.getStorageSync('sn')
				}
				getappsalereport(getpcadmindaysaledata).then((res) => {
					console.log('仪表盘数据', JSON.parse(JSON.stringify(res)))
					let data = JSON.parse(JSON.stringify(res))
					this.ybpdata = data
				})
			},
			//开始日期
			startdate(e) {
				console.log(e);
				this.sdate = e
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

					//处理条形图数据
					let coldata = []
					let cbe = []
					let ose = []
					this.ybpdata.table2.forEach((item) => {
						cbe.push(item.库存成本额)
						ose.push(item.库存零售额)
						coldata.push(item.大类名称)
					})
					res.categories = coldata
					res.series = [{
						name: '库存成本额',
						data: cbe
					}, {
						name: '库存零售额',
						data: ose
					}]


					this.chartDataA = JSON.parse(JSON.stringify(res));
				}, 500);
			},

			getServerDataC() {
				//模拟从服务器获取数据时的延时
				setTimeout(() => {
					//模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接

					let data = [];
					this.ybpdata.table3.forEach((item) => {
						let a = {}
						a.name = item['标识']
						a.value = item['总数']
						data.push(a)
					})
					let res = {
						series: [{
							data: data
						}]
					};
					this.chartDataC = JSON.parse(JSON.stringify(res));
				}, 500);
			},


			//设置
			leftClick() {
				console.log('tiaozhuan');
				uni.navigateTo({
					url: '../../pages/myset/myset'
				})
			},


		},

	}
</script>

<style lang="scss">
	u-navbar {
		background-color: #4f99ff;
	}

	.container {
		margin: 0 20rpx;
	}

	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
	}

	.box {
		.boxitem {
			width: 40%;
			display: inline-flex;
			align-items: center;
			margin: 20rpx 5%;	
		}

		.box_left {
			width: 70rpx;
			height: 70rpx;
			border-radius: 50%;
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: #4f99ff;
			margin-right: 50rpx;

			image {
				margin: 0;
				padding: 0;
				height: 0;
			}
		}

		.box_right {
			display: flex;
			flex-direction: column;
			align-items: center;
			font-size: 24rpx;
		}
	}

	.recent {
		display: inline-flex;
		justify-content: flex-start;
		margin: 20rpx 0;
	}

	.ubut {
		font-size: 12px;
		width: 120rpx;
		margin-right: 10rpx;

		button {
			border-radius: 0.5;
			width: 100%;
			font-size: 20rpx;
			text-align: center;
		}
	}

	.active {
		background-color: #4f99ff;
	}

	.xzbox {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20rpx;
	}

	.xz {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		width: 70%;

		.boxname {
			font-size: 24rpx;
			flex: 1;
		}

		.boxinput {
			margin: 0 20rpx;
			flex: 3;
		}
	}
</style>
