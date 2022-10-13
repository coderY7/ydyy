<template>
  <view>
    <u-navbar :bgColor="bgColor" :placeholder="true" leftIcon='tags' leftIconColor='#f60506'  title="工作"
              @leftClick="leftClick">
    </u-navbar>
    <view class="homecontainer">
      <view class="homeunit1" @click="notice()">
        <view class="unit1_left">
          <image class="unit1_left" src="../../static/home/tishi.png"></image>
        </view>
        <view class="unit1_right">公告获取</view>
      </view>
      <view class="homeunit1" @click="work()">
        <view class="unit1_left">
          <image class="unit1_left" src="../../static/home/tishi.png"></image>
        </view>
        <view class="unit1_right">待处理工作</view>
      </view>
    </view>
  </view>
</template>
<script>
import {
  oaNoticec, //公告拉取
  oaWorkFlow, //获取最新工作信息
  sendmessage, //推送消息
} from "@/network/api.js";
import {
  reportForm,
  condition, getappsalereport
} from "../../network/api.js";
import dayjs from 'dayjs'; // ES 2015
export default {
  data() {
    return {
      Alllist: [],
      title: '报表查询',
      bgColor: '#239BFE',
      tmplIds: 'Qj4DRaFxP2mLOwfFuyW0QHc3J0RGXgg5BalSDWwVclw', //推送模版,
    };
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
    let datelist=[{name:'前一月',value:this.yue},{name:'前三天',value:this.three},{name:'前一天',value:this.one},{name:'当天',value:this.sdate}]
    this.datelist=datelist
    this.getdata()
  },
  onLoad() {
    this.isreportForm()
    
  },
  methods: {
//自定义返回
    leftClick() {
      uni.navigateBack({
        delta: 1
      });
    },


    //工作
    work() {
      let data = {
        sn: uni.getStorageSync('sn'),
        fdbh: uni.getStorageSync('fdbh'),
        userid: uni.getStorageSync('userid'),
        groupld: uni.getStorageSync('loginaccess').userinfo.erp_groupid,
        dtmark: 'app2',
        recordID: '-99',
        access_token:uni.getStorageSync('access_token')
      }
      oaWorkFlow(data).then((res) => {
        if (res.err_code == '0') {
          console.log('最新工作', res)
          let item = JSON.stringify(res.data)
          uni.navigateTo({
            url: `../../pagesA/work/work?item=${item}`
          })
        }else {
          uni.showToast({
            title: '未查询到工作信息',
            duration: 2000,
            icon:'none'
          });
        }
      })

    },

    notice() {
      let datas = {
        sn: uni.getStorageSync('sn'),
        id: '0',
        userid: uni.getStorageSync('userid'),
        nid: '0',
        startTime: '2000-01-01',
        endTime: '2099-12-30',
        typeID: '0',
        vtype: 'sel',
        content: '',
        keywords: '',
        remark: "app2",
        access_token:uni.getStorageSync('access_token')
      }
      oaNoticec(datas).then((res) => {

        if (res.err_code == '0') {
          let item = JSON.stringify(res.data)
          uni.navigateTo({
            url: `../../pagesA/notice/notice?item=${item}`
          })
        }else {
          uni.showToast({
            title: '未查询到公告信息',
            duration: 2000,
            icon:'none'
          });
        }
      })
    },

    //获取报表
    isreportForm() {
      let reportFormdata = {
        access_token:uni.getStorageSync('access_token'),
        userid: '00000'
      }
      reportForm(reportFormdata).then((res) => {
        console.log('报表查询', res)
        this.Alllist = res.data
      })
    },
    enter(item) {
      console.log(item)
      uni.setStorageSync('dqbb',item)//当前报表
      let dataes={
        access_token: uni.getStorageSync('access_token'),
        cxbh:item.cxbh
      }
      condition(dataes).then((res)=>{
        console.log('查询条件',res)
        let items = JSON.stringify(res)
        uni.navigateTo({
          url: `../../pagesA/condition/condition?cxdj=${items}`
        })
      })
    }

  },

}




</script>
<style lang="scss">
.homecontainer {
  margin: 20rpx;
}

.homeunit1 {

  margin: 20rpx 0;
  display: flex;
  align-items: center;
  height: 100rpx;
.unit1_left {
  width: 36px;
  height: 36px;
  margin-right: 20rpx;
}
}

.unit2 {
  display: flex;
  height: 150rpx;
  width: 100%;

.unit2box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 25%;
  height: 100%;
  padding: 20rpx;
.unit2box_top {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80rpx;
  height: 80rpx;
  background: goldenrod;
  margin-bottom: 20rpx;
}
}
}
</style>