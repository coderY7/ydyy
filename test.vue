<template>
  <view class="box" :style="skin">
    <view class="status-bar"></view>

    <view class="box-content">
      <!-- 快报 -->
      <scroll-view :style="contentSty" scroll-y="true" :show-scrollbar="true">
              <uni-card title="部门经营概况" class="bmjygk">
                <u-subsection :list="bmLargeList" :current="bmLargeIndex" mode="subsection" activeColor="#3C9CFF" @change="bmLargeChange"></u-subsection>
                <u-tabs :list="bmMiddleList" :current="bmMiddleIndex" @click="bmMiddleClick"></u-tabs>
                <u-tabs :list="bmSmallList" :current="bmSmallIndex" @click="bmSmallClick"></u-tabs>
                <view class="tabcon" v-if="bmData.length!=0">
                  <view v-for="(v,i) in bmData">
                    <text>{{v.name}}</text>

                  </view>
                </view>
                <view v-else style="text-align:center;padding:20px 0;font-size:18px;font-weight:600;color:#000;">
                  暂无数据
                </view>
              </uni-card>



      </scroll-view>




    </view>
  </view>
</template>


<script>
// dayjs 官网：https://dayjs.fenxianglu.cn/
import dayjs from 'dayjs';
import {
  getAPPSaleReport,
  getFenDian,
} from "@/network/api.js";
export default {
  data() {
    return {
      bmLargeList: [],
      bmMiddleList: [],
      bmSmallList: [],
      bmLargeIndex: 0,
      bmMiddleIndex: -1,
      bmSmallIndex: -1,
      bmMiddleId: -1,
      bmSmallId: -1,
      bmData: [],


      collapseShow:true,
      collapseVal:["0"],
      endDate: dayjs().format('YYYY-MM-DD'),
      cellTitle: "ALL-全部",
      dateTitle: dayjs().format('YYYY-MM-DD'),
      contentSty:"",

      isGetReport:false,
      startDate: dayjs().date(dayjs().date() - 360).format('YYYY-MM-DD'),
      fdlist: [],
      appSaleData:"",
      appSdaysData:"",
      ssxsfxData: [],
      screenHeight: uni.getSystemInfoSync().screenHeight,

    };
  },
  onLoad: function(option) {
    // this.getFenDian(true)
  },
  onReady: function() {
    // 设置状态栏文字颜色为 白色
    // #ifdef APP-PLUS
    plus.navigator.setStatusBarStyle("light");
    // #endif

    uni.getSystemInfo({
      success: function(res) {
        this.contentSty={
          "height":res.screenHeight-100+"px"
        }
      }.bind(this)
    });

    let newDate=dayjs().format('YYYY-MM-DD')
    if (newDate != uni.getStorageSync('checkVersionDate')) {
      this.GetAPPSaleReport("sdays", this.cellTitle.split("-")[0], this.dateTitle)
    }

  },
  onShow() {
    // #ifdef APP-PLUS
    plus.navigator.setStatusBarStyle("light");
    // #endif
    let myAuth = uni.getStorageSync("myAuth")
    if(myAuth.indexOf("ToDaySale")>-1){
      this.collapseShow=true
    }else{
      this.collapseShow=false
    }

    // #ifdef APP-PLUS
    plus.screen.unlockOrientation()
    uni.addInterceptor('navigateTo', {
      invoke(args) { //触发前
        let arr = args.url.split("/")
        if (arr[arr.length - 1] == "analysis") {
          plus.screen.unlockOrientation()
        } else {
          plus.screen.lockOrientation("portrait-primary")
        }
      },
      complete(res) {
        uni.removeInterceptor('navigateTo')
      }
    })
    // #endif
  },

  methods: {



    GetAPPSaleReport(datamark, selfdbh, saledate) {
      var data = {
        "access_token": uni.getStorageSync("access_token"),
        "sn": uni.getStorageSync("sign").sn,
        "datamark": datamark, //ssale:获取3天内数据、实时销售与实时库存,sdays:获取15天内数据,shour时段销售,stype类别销售,sstorage类别库存
        "selfdbh": selfdbh,
        "saledate": saledate
      }

      uni.request({//测试数据接口
        url: "http://webapibeta.mzsale.com/mzato/main/app/getappsalereport",
        data: data,
        method: "POST",
        header: {
          "Content-Type": "application/json"
        },
        success: (res) => {
          this.isGetReport=true
          if (datamark == "ssale") {
            this.appSaleData=JSON.parse(res.data)

          }else if (datamark == "sdays") {
            this.appSdaysData=JSON.parse(res.data)
            console.log("测试数据接口 sdays this.appSdaysData",this.appSdaysData)

            this.BMJYGK(this.appSdaysData.table0,this.appSdaysData.table2,this.appSdaysData.table3)
          }
        }
      })


    },


    BMJYGK(data0,data2,data3) {// 部门经营概况

      this.bmLargeList = []
      for (var i in data0) {
        this.bmLargeList.push(data0[i].部门名称)
      }
      this.BMJYGKFunc(data0[this.bmLargeIndex],"data0",data0,data2,data3)

    },
    BMJYGKFunc(objs,arrName,data0,data2,data3){
      this.bmData=[]
      let reg = /^((\d+\.?\d*)|(\d*\.\d+))\%$/
      if(arrName=="data0"){
        this.bmMiddleList = []
        for (var i in data2) {
          if(objs.部门ID==data2[i].部门ID){
            this.bmMiddleId=objs.部门ID
            this.bmMiddleList.push({
              "name": data2[i].部门分组名
            })
          }
        }
        for (var j in objs) {
          if (j == "Result" || j == "部门名称" || j == "部门ID") {} else {
            let vals=reg.test(objs[j]) ? objs[j].replace("%","") : Number(objs[j]).toFixed(2)
            let isPers=reg.test(objs[j]) ? true : false
            this.bmData.push({
              "name": j,
              "value": vals,
              "isPer": isPers
            })
          }
        }
      }else if(arrName=="data2"){
        this.bmSmallList = []
        for (var i in data3) {
          if(objs.部门分组ID==data3[i].部门分组ID){
            this.bmSmallId=objs.部门分组ID
            this.bmSmallList.push({
              "name": data3[i].大类名称
            })
          }
        }
        for (var j in objs) {
          if (j == "Result" || j == "部门分组名" || j == "部门ID" || j == "部门分组ID") {} else {
            let vals=reg.test(objs[j]) ? objs[j].replace("%","") : Number(objs[j]).toFixed(2)
            let isPers=reg.test(objs[j]) ? true : false
            this.bmData.push({
              "name": j,
              "value": vals,
              "isPer": isPers
            })
          }
        }
      }else if(arrName=="data3"){
        for (var j in objs) {
          if (j == "Result" || j == "大类名称" || j == "大类ID" || j == "部门分组ID") {} else {
            let vals=reg.test(objs[j]) ? objs[j].replace("%","") : Number(objs[j]).toFixed(2)
            let isPers=reg.test(objs[j]) ? true : false
            this.bmData.push({
              "name": j,
              "value": vals,
              "isPer": isPers
            })
          }
        }
      }
      console.log("this.bmData "+arrName,this.bmData)
    },
    bmLargeChange(index){
      this.bmLargeIndex=index
      this.bmMiddleIndex=-1
      this.bmSmallIndex=-1
      this.BMJYGKFunc(this.appSdaysData.table0[this.bmLargeIndex],"data0",this.appSdaysData.table0,this.appSdaysData.table2,this.appSdaysData.table3)
    },
    bmMiddleClick(event){
      this.bmMiddleIndex=event.index
      this.bmSmallIndex=-1
      let tempArr=[]
      for(var i in this.appSdaysData.table2){
        if(this.appSdaysData.table2[i].部门ID==this.bmMiddleId){
          tempArr.push(this.appSdaysData.table2[i])
        }
      }
      this.BMJYGKFunc(tempArr[this.bmMiddleIndex],"data2",this.appSdaysData.table0,this.appSdaysData.table2,this.appSdaysData.table3)
    },
    bmSmallClick(event){
      this.bmSmallIndex=event.index
      let tempArr=[]
      for(var i in this.appSdaysData.table3){
        if(this.appSdaysData.table3[i].部门分组ID==this.bmSmallId){
          tempArr.push(this.appSdaysData.table3[i])
        }
      }
      this.BMJYGKFunc(tempArr[this.bmSmallIndex],"data3",this.appSdaysData.table0,this.appSdaysData.table2,this.appSdaysData.table3)
    },
  },
  computed:{
    skin(){
      return this.$store.state.skin;
    }
  },
}
</script>

<style lang="scss" scoped>
.box{
  background-image: linear-gradient(to bottom, var(--linear-bg) 0%, #fff 50%, #fff 100%);

  .status-bar {
    background-color: transparent;
  }

  .box-content {
    /deep/.u-tabbar{
      z-index: 10 !important;

      uni-image{
        width: 20px;
        height: 20px;
      }
    }
    // 快报................................................................
    .play-btn{
      display: inline-block;
      width: 60px;
      height: 24px;
      text-align: center;
      line-height: 24px;
      border: 1px solid #3c9cff;
      border-radius: 5px;
      color: #3c9cff;
    }
    .playBtnDisabled{
      display: inline-block;
      width: 60px;
      height: 24px;
      text-align: center;
      line-height: 24px;
      border: 1px solid #e7e9eb;
      border-radius: 5px;
      color: #3c9cff;
      background-color: #e7e9eb;
      .play-btn{
        border: 1px solid #e7e9eb;
      }
    }
    /deep/.uni-collapse{
      background-color: transparent;
      .uni-collapse-item__title{
        background-color: #fff;
        .uni-collapse-item__title-box {
          height: 44px;
          line-height: 44px;
          padding: 0 30px 0 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .uni-icons{
          color: #323232 !important;
        }
      }

      .uni-collapse-item__wrap {
        width: 100%;
        background-color: transparent;

        .uni-collapse-item__wrap-content {
          width: 100%;

          .uni-card {
            box-sizing: border-box;
          }
        }
      }

      .uni-collapse-item__wrap-content>* {
        width: 100%;
      }
    }

    .mychart {
      margin-top: 10px;
      width: 100%;
      min-height: 250px;
      display: flex;
      justify-content: center;
    }

    /deep/.bmjygk .uni-card__content {
      padding: 0 !important;
    }

    .tabcon>uni-view {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px;
      border-bottom: 1px solid #EAEBEC;
    }

    /deep/.uni-drawer {
      .uni-scroll-view-content {
        box-sizing: border-box;
        padding: 10px 0;

        .list{
          padding:8px;
          border-bottom: 1px solid #EAEBEC;
        }
        .list:nth-child(even){
          background-color: #FAFAFA;
        }
      }
    }

    /deep/.uni-card {
      margin: 0 0 10px !important;
    }

    /deep/.ssxsfx .uni-card__content {
      overflow: hidden;

      .ssxsfx-view {
        width: 50%;
        float: left;
        margin-bottom: 10px;
        overflow: hidden;

        .ssxsfx-color {
          width: 44px;
          height: 44px;
          border-radius: 50px;
          float: left;
          margin-right: 10px;
        }

        .ssxsfx-right {
          float: left;
          .ssxsfx-val{
            font-size: 16px;
          }
        }
      }
    }
  }
}
</style>
<style lang="scss">
page {

}
</style>
