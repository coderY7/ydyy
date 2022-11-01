<template>
	<view>
		<navbar title='首页' @lefts=left() leftname="设置"></navbar>
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
						<view class="boxname">选择时间:</view>
						<view class="boxinput">
							<uni-datetime-picker type="date" :value="single" v-model="item.defval"
								@change="startdate()" />
						</view>
					</view>
					<view style="font-size: 18rpx">(默认当天)</view>
				</view>

				<!-- 选择门店 -->
				<view class="xzbox">
					<view class="xz">
						<view class="boxname">选择分店:</view>
						<view class="boxinput">
							<view>
								<uni-section type="line">
									<uni-data-select v-model="xzfd" :localdata="fdlist"></uni-data-select>
								</uni-section>
							</view>
						</view>
					</view>
					<view style="font-size: 18rpx">(默认全部分店)</view>
				</view>
			</view>

      <uni-group title="实时销售分析" top="20">
        <view class="unit">
          <view class="unit1box">
            <view class="box">
              <view class="boxitem" v-for="(item,index) of ybpdata.table0[0]">
                <view class="box_left" :style="{backgroundColor:item.color}">
                  <image></image>
                </view>
                <view class="box_right">
                  <view>{{item.value==''?'0.00':item.value}}</view>
                  <view>{{item.key}}</view>
                </view>
              </view>
            </view>
          </view>
        </view>
      </uni-group>

      <uni-group title="会员分析" top="20">
        <view class="unit">
          <view class="charts-box">
            <qiun-data-charts type="ring" :opts="optsE" :chartData="chartDataE" />
          </view>

          <!-- 圆环图 -->
          <view class="own">
            <view class="ownbox" style="padding-right: 40rpx">
              <view class="uwntop">今日新增</view>
              <view class="uwnbottom">
                <view v-for="(item,key) in ybpdata.table3[1]" class="uwnbottombox">
                  <view v-if="item.key!='标识'">{{item.key}}</view>
                  <view v-if="item.key!='标识'" style="height: 30rpx;font-size: 26rpx;">{{item.value}}</view>
                </view>
              </view>
            </view>

            <view class="ownbox" style="padding-left: 40rpx">
              <view class="uwntop">昨日新增</view>
              <view class="uwnbottom">
                <view v-for="(item,key) in ybpdata.table3[2]" class="uwnbottombox">
                  <view v-if="item.key!='标识'">{{item.key}}</view>
                  <view v-if="item.key!='标识'" style="height: 30rpx;font-size: 26rpx;">{{item.value}}</view>
                </view>
              </view>
            </view>

          </view>
        </view>

      </uni-group>

      <uni-group title="销售占比" top="20">
        <view class="percent">
          <!--饼状图促销-->
          <view class="charts-box">
            <qiun-data-charts type="pie" :opts="optsB" :chartData="chartDataB" />
          </view>
          <!--饼状图会员-->
          <view class="charts-box">
            <qiun-data-charts type="pie" :opts="optsC" :chartData="chartDataC" />
          </view>
        </view>
      </uni-group>

      <uni-group title="分店销售分析" top="20">
        <view class="unit">
          <view class="charts-box">
            <qiun-data-charts
                type="column"
                :opts="optsF"
                :chartData="chartDataF"

            />
          </view>
        </view>
      </uni-group>

      <uni-group title="时段销售分析" top="20">
        <view class="unit">
          <view class="charts-box">
            <qiun-data-charts
                type="line"
                :opts="optsG"
                :chartData="chartDataG"
            />
          </view>
        </view>
      </uni-group>

      <uni-group title="部门经营分析" top="20">
        <view class="unit">
          <view class="charts-box">
            <qiun-data-charts
                type="column"
                :opts="optsA"
                :chartData="chartDataA"

            />
          </view>
        </view>

      </uni-group>

      <uni-group title="15天数据分析" top="20">
        <view class="unit">
          <!-- 折线图 -->
          <view class="charts-box">
            <qiun-data-charts type="line" :opts="optsD" :chartData="chartDataD" />
          </view>
        </view>

      </uni-group>

      <uni-group title="部门经营概况" top="20">
        <view class="unit">
          <view class="shu">
            <uni-segmented-control :current="current1" :values="list1" @clickItem="onClickItem1" styleType="button" activeColor="#4f99ff"></uni-segmented-control>

            <uni-segmented-control :current="current2" :values="list2" @clickItem="onClickItem2" styleType="text" activeColor="#4f99ff"></uni-segmented-control>

            <view class="shu3" v-if="xzshu.length!=0">
              <view class="shu3box" v-for="(item,index) in Object.entries(xzshu)">
                <view>{{item[0]}}</view>
                <view>{{item[1]}}</view>
              </view>
            </view>
          </view>
        </view>
      </uni-group>

		</view>
	</view>
</template>

<script>
	import {
		getfendians,
		getpctodayssale,
		getappsalereport, //仪表盘数据

	} from '../../network/api.js';
	import dayjs from 'dayjs'; // ES 2015
	import navbar from '../../components/nav.vue'
	export default {
		data() {
			return {
        list1:[],//分段的列表
        list2:[],//分段的列表
        current1:'',
        current2:'',
        xzshu:[],//选择的显示
        shu2data:'',//二级
        sdays:'',//15天数据
        bfb:'',//百分比图表
        cxdata:'',//促销图
        hydata:'',//会员图
				titleHeight: 0, //状态栏和导航栏的总高度
				statusBarHeight: 0, //状态栏高度
				naviBarHeight: 0, //导航栏高度
				fdlist: '', //分店列表
				xzfd: '', //选择的分店
				xzindex: '3',
				tablecolor: ["#1890FF", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4",
					"#ea7ccc", "#1890FF", "#FAC858"
				],
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
							type: "stack",
							width: 30,
							activeBgColor: "#000000",
							activeBgOpacity: 0.08
						}
					}
				},
				ybpdata: '',
        chartDataB: {},
				optsB: {
					color: ["#FC8452", "#9A60B4","#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4"],
					padding: [5, 5, 5, 5],
					extra: {
						pie: {
              rotate:true,
              customRadius:40,
							activeOpacity: 0.5,
							activeRadius: 5,
							offsetAngle: 0,
							labelWidth: 6,
							border: true,
							borderWidth: 3,
							borderColor: "#FFFFFF",
							linearType: "none"
						}
					}
				},
        chartDataC: {},
        optsC: {
          color: ["#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4"],
          padding: [5, 5, 5, 5],
          extra: {
            pie: {
              customRadius:40,
              activeOpacity: 0.5,
              activeRadius: 5,
              offsetAngle: 0,
              labelWidth: 2,
              border: true,
              borderWidth: 3,
              borderColor: "#FFFFFF",
              linearType: "none"
            }
          }
        },
				chartDataD: {},
				optsD: {
					color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4",
						"#ea7ccc"
					],
					padding: [15, 10, 0, 15],
					legend: {},
					xAxis: {
						disableGrid: true
					},
					yAxis: {
						gridType: "dash",
						dashLength: 2
					},
					extra: {
						line: {
							type: "straight",
							width: 2
						}
					}
				},
				chartDataE: {},
				optsE: {
					rotate: false,
					rotateLock: false,
					color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4",
						"#ea7ccc"
					],
					padding: [5, 5, 5, 5],
					dataLabel: true,
					legend: {
						show: true,
						position: "right",
						lineHeight: 20
					},
					title: {
						name: "收益率",
						fontSize: 10,
						color: "#666666"
					},
					subtitle: {
						name: "70%",
						fontSize: 12,
						color: "#7cb5ec"
					},
					extra: {
						ring: {
							ringWidth: 50,
							activeOpacity: 0.5,
							activeRadius: 10,
							offsetAngle: 0,
							labelWidth: 15,
							border: false,
							borderWidth: 3,
							borderColor: "#FFFFFF"
						}
					}
				},
        chartDataF: {},
        optsF: {
          color: ["#1890FF","#91CB74","#FAC858","#EE6666","#73C0DE","#3CA272","#FC8452","#9A60B4","#ea7ccc"],
          padding: [15,15,0,5],
          legend: {},
          xAxis: {
            disableGrid: true
          },
          yAxis: {
            data: [
              {
                min: 0
              }
            ]
          },
          extra: {
            column: {
              type: "stack",
              width: 50,
              activeBgColor: "#000000",
              activeBgOpacity: 0.08
            }
          }
        },
        chartDataG:{},
        optsG: {
          color: ["#1890FF","#91CB74","#FAC858","#EE6666","#73C0DE","#3CA272","#FC8452","#9A60B4","#ea7ccc"],
          padding: [15,10,0,15],
          legend: {},
          xAxis: {
            disableGrid: true
          },
          yAxis: {
            gridType: "dash",
            dashLength: 2
          },
          extra: {
            line: {
              type: "straight",
              width: 2
            }
          }
        },

			};
		},
		components: {
			navbar
		},
		onReady() {
			this.getServerDataA();
			this.getServerDataB();
			this.getServerDataC();
			this.getServerDataD();
			this.getServerDataE();
			this.getServerDataF();
			this.getServerDataG();
      this.section1()

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

			setTimeout(() => {
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
			}, 2000)
			this.getdata()
      this.getdata2()

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

			//处理数据
			manage(e) {
        let table0 = this.ybpdata.table0[0]
        let table = []
				for (var [key, value] of Object.entries(table0)) {
					table.push({
						key,
						value
					})
				}
				this.tablecolor.forEach((item, index) => {
					table[index].color = item
				})
				this.ybpdata.table0[0] = table

        //剔除会员和促销
        let newdata=[]
        for ( key of this.ybpdata.table0[0]) {
          if (key.key == '会员占比' || key.key=="促销占比") {
            newdata.push(key)
          }
        }
        this.bfb=newdata

        this.ybpdata.table0[0].forEach((item,index)=>{
          if (item.key == '会员占比') {
            let a=this.ybpdata.table0[0].splice(index,1)
          }
          if (item.key=="促销占比") {
            let a=this.ybpdata.table0[0].splice(index,1)
          }
          if (item.key=="Result") {
            let a=this.ybpdata.table0[0].splice(index,1)
          }
        })
        console.log(this.ybpdata.table0[0])
			},
//会员比和促销比
      percent(){
        //促销
        let cxdata=[]
        let a={}
        a.name=this.bfb[0].key
        a.value=this.bfb[0].value.replace("%", "")*100
        cxdata.push(a)
        let b={}
        b.name=`非${this.bfb[0].key}`
        b.value=10000-this.bfb[0].value.replace("%", "")*100
        cxdata.push(b)
        this.cxdata=cxdata
//会员
        let hydata=[]
        let c={}
        c.name=this.bfb[1].key
        c.value=this.bfb[1].value.replace("%", "")*100
        hydata.push(c)
        let d={}
        d.name=`非${this.bfb[1].key}`
        d.value=10000-this.bfb[1].value.replace("%", "")*100
        hydata.push(d)
        this.hydata=hydata
      },
			//查询数据
			getdata(item, index) {
				this.xzindex = index
				let getpcadmindaysaledata = {
					access_token: uni.getStorageSync('access_token'),
					saledate: item ? item.value : this.sdate,
					datamark: 'ssale',
					selfdbh: this.xzfd ? this.xzfd : 'ALL'
				}
				//test
				uni.request({
					url: 'http://webapibeta.mzsale.com/mzato/main/app/getappsalereport', //仅为示例，并非真实接口地址。
					data: {
						saledate: "2022-10-19",
						datamark: "ssale",
						selfdbh: "ALL",
						sn: "MOPMPI-MLKKNG-KFOLNF-QINPHH"
					},
					method: "POST",
					header: {
						'Content-Type': 'application/json',
					},
					success: (res) => {
						console.log('仪表盘数据', JSON.parse(res.data))
						let data = JSON.parse(res.data)

						this.ybpdata = data
						this.manage()
            this.percent()
					}
				});
				//实际方法
				// getappsalereport(getpcadmindaysaledata).then((res) => {
				// 	console.log('仪表盘数据', JSON.parse(JSON.stringify(res)))
				// 	let data = JSON.parse(JSON.stringify(res))
				// 	this.ybpdata = data
				// 	//处理实销数据表盘
				// 	let table0 = this.ybpdata.table0[0]
				// 	let table = []
				// 	for (var [key, value] of Object.entries(table0)) {
				// 		table.push({
				// 			key,
				// 			value
				// 		})
				// 	}
				// 	this.tablecolor.forEach((item, index) => {
				// 		table[index].color = item
				// 	})
				// 	this.ybpdata.table0[0] = table
				// })
			},
			//开始日期
			startdate(e) {
				console.log(e);
				this.sdate = e
			},
			//可视化面板
			// 部门经营分析
			getServerDataA() {
				//模拟从服务器获取数据时的延时
				setTimeout(() => {
					//模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
					let res = {
						categories: [],
						series: []
					};

					//处理柱形图数据
					let bmmc = []//名称
          let bmid=[]//ID
          let sxje=[]//实销金额
          let yjml=[]//预计毛利
          let kdbs=[]//客单笔数
					this.sdays.table0.forEach((item) => {
						bmmc.push(item['部门名称'])
            bmid.push(item['部门ID'])
            kdbs.push(parseFloat(item['客单笔数']))
            yjml.push(parseFloat(item['预计毛利']))
            sxje.push(parseFloat(item['实销金额']))
          })
					res.categories = bmmc
          res.series.push({name:'实销金额',data:sxje},
              {name:'预计毛利',data:yjml},
              {name:'客单笔数',data:kdbs})
					this.chartDataA = JSON.parse(JSON.stringify(res));
				}, 500);
			},
			//销售占比饼状图
			getServerDataB() {
				//模拟从服务器获取数据时的延时
				setTimeout(() => {
					//模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
          let res = {
            series: [
              {
                data: this.cxdata
              }
            ]
          };

					this.chartDataB = JSON.parse(JSON.stringify(res));
				}, 500);
			},
      //销售占比分析
      getServerDataC() {
        //模拟从服务器获取数据时的延时
        setTimeout(() => {
          //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
          let res = {
            series: [
              {
                data: this.hydata
              }
            ]
          };

          this.chartDataC = JSON.parse(JSON.stringify(res));
        }, 500);
      },


      //会员分析
			getServerDataE() {
				//模拟从服务器获取数据时的延时
				setTimeout(() => {
					let data = [];
					let test = this.ybpdata.table3[0]
					let title = []
					for (const [key, value] of Object.entries(test)) {
						let a = {}
						if (key == '微会员数') {
							a.name = key
							a.value = Number(value)
							data.push(a)
						}
						let b = {}
						if (key == '非微会员') {
							b.name = key
							b.value = Number(value)
							data.push(b)
						}
						let c = {}
						if (key == '总数') {
							c.name = key
							c.value = Number(value)
              data.push(c)
              title.push(c)
						}
					}
          let table1 = []
          for (var [key, value] of Object.entries(this.ybpdata.table3[1])) {
            table1.push({
              key,
              value
            })
          }
          this.ybpdata.table3[1] = table1

          let table2 = []
          for (var [key, value] of Object.entries(this.ybpdata.table3[2])) {
            table2.push({
              key,
              value
            })
          }
          this.ybpdata.table3[2] = table2



					this.optsE.title.name = title[0].name
					this.optsE.subtitle.name = title[0].value

					let res = {
						series: [{
							data: data
						}]
					};
					this.chartDataE = JSON.parse(JSON.stringify(res));
				}, 500);
			},
//分店销售分析
      getServerDataF() {
        //模拟从服务器获取数据时的延时
        setTimeout(() => {
          //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
          let res = {
            categories: ["2016","2017","2018","2019","2020","2021"],
            series: []
          };
          let table=this.ybpdata.table2
          let fd=[]
          let kdbs=[]
          let yjmle=[]
          let sxje=[]
          table.forEach((item)=>{
            fd.push(item['分店号'])
            kdbs.push(parseFloat(item['客单笔数']))
            yjmle.push(parseFloat(item['预计毛利额']))
            sxje.push(parseFloat(item['实销金额']))
          })
          res.categories=fd

          res.series.push({name:'实销金额',data:sxje},
              {name:'预计毛利额',data:yjmle},
              {name:'客单笔数',data:kdbs})
console.log(res)
          this.chartDataF = JSON.parse(JSON.stringify(res));
        }, 500);
      },
//时段分析
      getServerDataG() {
        //模拟从服务器获取数据时的延时
        setTimeout(() => {
          //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
          let res = {
            categories: ["2016","2017","2018","2019","2020","2021"],
            series: []
          };
          let table=this.ybpdata.table1
          let kdll=[]
          let kdj=[]
          let sxje=[]
          let sj=[]
          table.forEach((item)=>{
            kdll.push(item['客单流量'])
            kdj.push(parseFloat(item['平均客单价']))
            sxje.push(parseFloat(item['实销金额']))
            sj.push(item['时间段'])
          })
          res.categories=sj
          res.series.push({name:'实销金额',data:sxje},
              {name:'平均客单价',data:kdj},
              {name:'客单流量',data:kdll})
          this.chartDataG = JSON.parse(JSON.stringify(res));
        }, 500);
      },
//15天数据
      getServerDataD() {
        //模拟从服务器获取数据时的延时
        setTimeout(() => {
          //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
          let res = {
            categories: ['time'],
            series: [{
              name: "",
              data: [0,0]
            },]
          };
          this.chartDataD = JSON.parse(JSON.stringify(res));
        }, 500);
      },
      getdata2(item, index) {
        this.xzindex = index
        let getpcadmindaysaledata = {
          access_token: uni.getStorageSync('access_token'),
          saledate: item ? item.value : this.sdate,
          datamark: 'sdays',
          selfdbh: this.xzfd ? this.xzfd : 'ALL'
        }
        //test
        uni.request({
          url: 'http://webapibeta.mzsale.com/mzato/main/app/getappsalereport', //仅为示例，并非真实接口地址。
          data: {
            saledate: "2022-10-19",
            datamark: "sdays",
            selfdbh: 'ALL',
            sn: "MOPMPI-MLKKNG-KFOLNF-QINPHH"
          },
          method: "POST",
          header: {
            'Content-Type': 'application/json',
          },
          success: (res) => {
            console.log('数据', JSON.parse(res.data))
            let data = JSON.parse(res.data)
            this.sdays = data
            //默认显示数据
            this.xzshu=this.sdays.table0[0]
          }
        });
        //实际方法
        // getappsalereport(getpcadmindaysaledata).then((res) => {
        // 	console.log('仪表盘数据', JSON.parse(JSON.stringify(res)))
        // 	let data = JSON.parse(JSON.stringify(res))
        // 	this.ybpdata = data
        // 	//处理实销数据表盘
        // 	let table0 = this.ybpdata.table0[0]
        // 	let table = []
        // 	for (var [key, value] of Object.entries(table0)) {
        // 		table.push({
        // 			key,
        // 			value
        // 		})
        // 	}
        // 	this.tablecolor.forEach((item, index) => {
        // 		table[index].color = item
        // 	})
        // 	this.ybpdata.table0[0] = table
        // })
      },

      section1(){
       let list=[]
        this.sdays.table0.forEach((item)=>{
          list.push(item['部门名称'])
        })
        this.list1=list
      },
      section2(item){
        let list=[]
        let shu2=[]
          this.sdays.table2.forEach((i)=>{
            if(item['部门ID'] == i['部门ID']){
              console.log(i)
              shu2.push(i)
              list.push(i['部门分组名'])
            }
        })
        this.list2=list
        this.shu2data=shu2

      },
      onClickItem1(e) {
        if (this.current1 != e.currentIndex) {
          this.current1 = e.currentIndex;
        }
        this.xzshu=this.sdays.table0[e.currentIndex]
        this.section2(this.sdays.table0[e.currentIndex])
      },
      onClickItem2(e) {
        if (this.current2 != e.currentIndex) {
          this.current2 = e.currentIndex;
        }
        this.xzshu=this.shu2data[e.currentIndex]
      },

			//设置
			left() {
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
		margin: 20rpx;
	}

	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
	}
  .unit{
    padding: 30rpx 0;
    border-bottom: 1px silver dashed;
  }
.unitname{
  margin: 20rpx 0;
  font-size: 30rpx;
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

			font-size: 26rpx;
		}
	}

	.recent {
		display: inline-flex;
		justify-content: flex-start;
		margin-bottom: 20rpx;
	}

	.ubut {

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
		width: 80%;

		.boxname {
			font-size: 30rpx;
			flex: 1;
		}

		.boxinput {
			margin: 0 20rpx;
			flex: 3;
		}
	}

	.navbar {
		background: linear-gradient(#52c8f1, #85d8f3);
		font-size: 16px;
		position: sticky;
		z-index: 999;
		top: 0;

		.nav {
			display: flex;
			align-items: center;

			.navicon {
				padding-left: 20px;
				width: 80px;
			}
			.navname {
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
	}
  .percent{
    width: 100%;
    display: inline-flex;
    justify-content: space-around;
    align-items: center;
.charts-box{
  width: 50%;
}
  }
  .own{
    width: 100%;
    display: inline-flex;
    font-size: 22rpx;
    .ownbox{
      border-right: 1px silver dashed;
      padding: 20rpx;
      width: 48%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .uwntop{
       margin-bottom: 30rpx;
      }
      .uwnbottom{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .uwnbottombox{
          display: flex;
          flex-direction: column;
          padding: 10rpx 0;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }
  .shu{
    width: 100%;
    .shu1{
      .shu1box{
        display: inline-flex;
       justify-content: flex-start;
        margin:  0 20rpx;
      }
    }
    .shu2{
      margin: 20rpx 0;
      .shu2box{
        display: inline-flex;
        justify-content: flex-start;
        margin:  0 10rpx;
      }
    }
    .shu3{
      margin: 20rpx 50rpx 20rpx 50rpx;
      padding: 20rpx;
      background-color: #ffffff;
      border-radius: 20rpx;
      border: thick double #85d8f3;
    }
    .shu3box{
      display: flex;
      justify-content: space-between;
      padding: 10rpx;
      border-bottom: 0.5px solid #e2e2e2;
    }
  }
  page{
    background: url('../../static/shilu-login/logobj.png') no-repeat;
    background-position: center center;
    background-attachment: fixed;
  }
</style>
