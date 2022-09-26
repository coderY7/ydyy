<template>
  <view>
    <u-navbar :placeholder="true" :title="dqbb.cxmc" @leftClick="leftClick()">
    </u-navbar>
    <view v-for="(item,index) in cxtj">
      <view v-if="item.type=='字符'">
        <view>{{ item.colname }}</view>
        <input v-model="item.defval" type="text">
      </view>
      <view v-if="item.type=='开始日期'" >
        <view>{{ item.colname }}</view>
        <uni-datetime-picker
            type="date"
            :value="single"
            @change="startdate()"
        />
      </view>
      <view v-if="item.type=='结束日期'" >
        <view>{{ item.colname }}</view>
        <uni-datetime-picker
            type="date"
            :value="single"
            @change="enddate()"
        />
      </view>
      <view v-if="item.type=='多选下拉框'">
        <view>{{ item.colname }}</view>

      </view>
      <view v-if="item.type=='下拉框'">
        <view>{{ item.colname }}</view>

      </view>
      <view v-if="item.type=='选择'">
        <view>{{ item.colname }}</view>

      </view>
      <view v-if="item.type=='查询下拉框'">
        <view>{{ item.colname }}</view>

      </view>
    </view>
    <button @click="isquery()">查询</button>
  </view>
</template>

<script>
import {
  getlist,
  getcolumns
} from '../../network/api.js'

export default {
  data() {
    return {
      dqbb: '', //当前报表
      start: '', //开始时间
      end: '', //结束时间
      cxtj: '',//查询条件
      tj: []
    };
  },
  onLoad(option) {
    this.cxtj = JSON.parse(option.cxdj).data //查询条件
    this.dqbb = uni.getStorageSync('dqbb') //当前报表
  },
  onShow() {
    console.log('表头查询')
    this.getcol()
  },
  watch: {
    tj: function (newvalue, oldvalue) {

    }
  },
  methods: {
    //自定义返回
    leftClick() {
      uni.navigateBack({
        delta: 1
      });
    },
    //开始日期
    startdate(e){
      console.log(e);
      this.start=e
    },
    //结束日期
    enddate(e){
      console.log(e);
      this.end=e

    },
    maskClick(e) {
      console.log('----maskClick事件:', e);
    },
    //列表头
    getcol() {
      let data = {
        access_token: uni.getStorageSync('access_token'),
        userid: uni.getStorageSync('userid'),
        djtype: uni.getStorageSync('dqbb').cxbh,
        fdbh: uni.getStorageSync('fdbh')
      }
      getcolumns(data).then((res) => {
        console.log('表单头', res)
      })
    },
    //查询
    isquery() {
      this.cxtj.forEach((item) => {
        this.tj.push({'Convalue': item.defval, 'recordid': item.recordid})
      })
      let data = {
        djtype: this.dqbb.cxbh,
        access_token: uni.getStorageSync('access_token'),
        userid: uni.getStorageSync('userid'),
        groupid: uni.getStorageSync('loginaccess').userinfo.erp_groupid,
        username: uni.getStorageSync('loginaccess').userinfo.erp_username,
        fdbh: uni.getStorageSync('fdbh'),
        condition: this.tj
      }
      getlist(data).then((res) => {
        console.log('查询', res)
      })
    }

  }
}
</script>

<style lang="scss">
.unit1_box {
  display: flex;
  justify-content: center;

}
</style>
