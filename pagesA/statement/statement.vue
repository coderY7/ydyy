<template>
	<view>
		<u-navbar title="快报" @leftClick="leftClick" :placeholder="true" :autoBack="true" leftIconColor='#f60506'>
		</u-navbar>
		<!-- 选择门店 -->
    <view class="container">
      <view class="unit1">
<!--        近期查询日期-->
        <view class="recent">
          <view class="ubut" v-for="(item,index) in datelist">
            <button @click="getdata(item,index)" :class="{'active':xzindex==index}" >{{item.name}}</button>
          </view>

        </view>
        <view>实时销售分析</view>
        <view class="unit1box">
          <view class="box" >
            <view class="boxitem" v-for="(item,index) in Object.entries(ybpdata.Table[0])">
              <view class="box_left">
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
	} from '../../network/api.js';
	
	
	export default {
		data() {
			return {
        active:false,
        xzindex:'3',
        color:'',//动态背景
        three:'',//近三天
        one:'',//近一天
        yue:'',
				sdate:'',//快报查询日期
        datelist:'',
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
		},
		onReady() {
			this.getServerDataA();
      this.getServerDataC();


		},
		onShow() {
			this.sdate=dayjs().format('YYYY-MM-DD') // 获取当前时间
      let one=dayjs().unix()-24*60*60// 获取前一天时间戳
      this.one=dayjs.unix(one).format('YYYY-MM-DD')
      let three=dayjs().unix()-24*60*60*3//前三天时间戳
      let yue=dayjs().unix()-24*60*60*30//前三天时间戳
      this.yue=dayjs.unix(yue).format('YYYY-MM-DD')
      this.three=dayjs.unix(three).format('YYYY-MM-DD')
      let datelist=[{name:'前一月',value:this.yue,active:false},{name:'前三天',value:this.three,active:false},{name:'前一天',value:this.one,active:false},{name:'当天',value:this.sdate,active:false}]
      this.datelist=datelist
      this.getdata()

    },
		methods: {
      leftClick(){
        uni.navigateBack({
          delta: 1
        });
      },
      getdata(item,index){
this.xzindex=index
        let getpcadmindaysaledata={
          access_token:uni.getStorageSync('access_token'),
          sdate:item?item.value:this.sdate
        }
        getpcadmindaysale(getpcadmindaysaledata).then((res)=>{
          console.log('仪表盘数据',res)
          this.ybpdata=res.data
        })
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
  .recent{
    display: inline-flex;
    justify-content: flex-start;
    margin-bottom: 20rpx;
  }
  .ubut{
    font-size: 12px;
    width: 120rpx;
    margin-right: 10rpx;
    button{
      border-radius: 0.5;
      width: 100%;
      font-size: 20rpx;
      text-align: center;
    }
  }
  .active{
    background-color: #4f99ff;
  }
</style>
