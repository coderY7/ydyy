<template>
  <view>
    <u-navbar :bgColor="bgColor" :placeholder="true" leftIcon='tags' leftIconColor='#f60506' leftText='快报' title="首页"
              @leftClick="leftClick">
    </u-navbar>
    <view class="container">
      <view class="unit1" @click="notice()">
        <view class="unit1_left">
          <image class="unit1_left" src="../../static/home/tishi.png"></image>
        </view>
        <view class="unit1_right">公告获取</view>
      </view>
      <view class="unit1" @click="work()">
        <view class="unit1_left">
          <image class="unit1_left" src="../../static/home/tishi.png"></image>
        </view>
        <view class="unit1_right">待处理工作</view>
      </view>
      <view class="unit2">
        <div class="unit2box">
          <view class="unit2box_top">20</view>
          <view>待审核</view>
        </div>
        <div class="unit2box">
          <view class="unit2box_top">20</view>
          <view>待补货</view>
        </div>
        <div class="unit2box">
          <view class="unit2box_top">20</view>
          <view>待入库</view>
        </div>
        <div class="unit2box">
          <view class="unit2box_top">20</view>
          <view>库存量</view>
        </div>
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

export default {
  data() {
    return {
      bgColor: '#5199ff',
      tmplIds: 'Qj4DRaFxP2mLOwfFuyW0QHc3J0RGXgg5BalSDWwVclw', //推送模版
    };
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
        groupld: 'G001',
        dtmark: 'app2',
        recordID: '-99'
      }
      oaWorkFlow(data).then((res) => {
        if (res.err_code == '0') {
          console.log('最新工作', res)
          let item = JSON.stringify(res.data)
          uni.navigateTo({
            url: `../../pagesA/work/work?item=${item}`
          })
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
      }
      oaNoticec(datas).then((res) => {
        if (res.err_code == '0') {
          let item = JSON.stringify(res.data)
          uni.navigateTo({
            url: `../../pagesA/notice/notice?item=${item}`
          })
        }
      })
    }
  },

}
</script>

<style lang="scss">
.container {
  margin: 20rpx;
}

.unit1 {
  border: 2px solid red;
  border-style: dashed solid;
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
