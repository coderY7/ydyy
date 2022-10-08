<template>
	<view>
		<u-navbar title="快报" @leftClick="leftClick" :placeholder="true" :autoBack="true" leftIconColor='#f60506'>
		</u-navbar>
		<!-- 选择门店 -->
    <view class="container">
      <view class="unit1">
        <view>实时销售分析</view>
        <view class="unit1box">
          <view class="box" >
            <view class="boxitem" v-for="(item,index) in Object.entries(ybpdata.Table[0])">
              <view class="box_left" :style="{background:color}">
                <image></image>
              </view>
              <view class="box_right">
                <view>{{item[1]}}</view>
                <view>{{item[0]}}</view>
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
	import dayjs from 'dayjs'; // ES 2015
	import {
		getFenDian,
		getpctodayssale,
    getpcadmindaysale//仪表盘数据
	} from '../../network/api.js'
	export default {
		data() {
			return {
        color:'',//动态背景
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
							width: 30,
							activeBgColor: "#000000",
							activeBgOpacity: 0.08
						}
					}
				},

        chartDataC: {},
        ybpdata:'',
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
		onLoad() {
			let getpcadmindaysaledata={
				access_token:uni.getStorageSync('access_token'),
        sdate:dayjs().format('YYYY-MM-DD')// 获取当前时间
//销售日期
			}
      getpcadmindaysale(getpcadmindaysaledata).then((res)=>{
				console.log('仪表盘数据',res)
        this.ybpdata=res.data
			})
      this.colors()
		},
		onReady() {
			this.getServerDataA();

      this.getServerDataC();

      console.log(dayjs().format('YYYY-MM-DD')) // 获取当前时间

		},
		methods: {
//随机颜色
      colors(){
        let str = '#'
        let arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f']
        // 利用for 循环 循环数组 6次 累加到str里面 得到 #ff0044
        for (let i = 1; i <= 6; i++) {
          // random数组里面的索引号 随机的  每次循环都是从数组里面随机抽取一个
          let random = Math.floor(Math.random() * arr.length)
          str += arr[random]
        }
        console.log(str)
        return str
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
          let coldata=[]
          let cbe=[]
          let ose=[]
          this.ybpdata.Table2.forEach((item)=>{
            cbe.push(item.库存成本额)
            ose.push(item.库存零售额)
            coldata.push(item.大类名称)
          })
          res.categories=coldata
          res.series=[{
            name:'库存成本额',
            data:cbe
          },{
            name:'库存零售额',
            data:ose
          }]


          this.chartDataA = JSON.parse(JSON.stringify(res));
				}, 500);
			},

      getServerDataC() {
        //模拟从服务器获取数据时的延时
        setTimeout(() => {
          //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接

          let data=[];
          this.ybpdata.Table3.forEach((item)=>{
            let a={}
            a.name=item.部门分组名
            a.value=item.库存零售额
            data.push(a)
          })
          let res = {
            series: [{
              data:data
            }]
          };
          this.chartDataC = JSON.parse(JSON.stringify(res));
        }, 500);
      },

		}
	}
</script>

<style lang="scss">
  .container{
    margin: 0 20rpx;
  }
	.status_bar{
		        height: var(--status-bar-height);
		        width: 100%;   
	}
	.box{
    .boxitem{
      width: 50%;
      display: inline-flex;
      align-items: center;
      margin: 20rpx 0;
    }
    .box_left{
      width: 80rpx;
      height: 80rpx;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #4f99ff;
      margin-right: 50rpx;
      image{
        margin: 0;
        padding: 0;
        height: 0;
      }
    }
    .box_right{
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
</style>
