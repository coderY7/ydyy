<template>
  <view>
    <u-navbar :bgColor="bgColor" :placeholder="true" leftIcon='tags' leftIconColor='#f60506' leftText='快报' title="首页"
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


    <view class="container">
      <view class="unit1">
        <ul>
          <li v-for="(item,index) in Alllist" :key="index">
            <view class="unit1_box" @click="enter(item)">
              <view class="boxs">
                <view>
                </view>
                <view>{{item.cxmc}}</view>
              </view>
            </view>
          </li>
        </ul>
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
  condition
} from "../../network/api.js"
export default {
  data() {
    return {
      Alllist: [],
      title: '报表查询',
      bgColor: '#5199ff',
      tmplIds: 'Qj4DRaFxP2mLOwfFuyW0QHc3J0RGXgg5BalSDWwVclw', //推送模版
    };
  },
  onLoad() {
    this.isreportForm()
    uni.setStorageSync('cxbb',true)
  },
  methods: {
    //快报
    leftClick() {
      uni.navigateTo({
        url: '../../pagesA/statement/statement'
      })
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
.container {
  margin: 0 20rpx;
}

ul {
  padding: 0;
}

li {
  list-style: none;
  text-align: center;
  border-radius: 5px;
  background: skyblue;
}

ul {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
}

li {
  width: 26%;
  height: 180rpx;
  margin-right: 11%;
  font-size: 22rpx;
  margin-bottom: 5%;
}

li:nth-of-type(3n) {
  margin-right: 0;
}

li:nth-of-type(n+99) {
  margin-bottom: 0;
}

.unit1_box {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .boxs {
    display: flex;
    flex-direction: column;

  }
}
</style>
