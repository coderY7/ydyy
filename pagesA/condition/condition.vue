<template>
  <view>
    <u-navbar :placeholder="true" :title="dqbb.cxmc" @leftClick="leftClick()">
    </u-navbar>
    <view v-for="(item,index) in cxtj">
      <view v-if="item.type=='字符'">
        <view class="boxname">{{ item.colname }}</view>
        <view class="boxinput">
          <u-input
              placeholder="请输入查询内容"
              border="surround"
              v-model="item.defval"
              clearable
          ></u-input>
        </view>

      </view>
      <view v-if="item.type=='开始日期'">
        <view>{{ item.colname }}</view>
        <uni-datetime-picker
            type="date"
            :value="single"
            v-model="item.defval"
            @change="startdate()"
        />
      </view>
      <view v-if="item.type=='结束日期'">
        <view>{{ item.colname }}</view>
        <uni-datetime-picker
            type="date"
            :value="single"
            v-model="item.defval"
            @change="enddate()"

        />
      </view>
      <view v-if="item.type=='多选下拉框'">
        <view>{{ item.colname }}</view>

      </view>
      <view v-if="item.type=='下拉框'">
        <view v-if="item.colname=='分店编号'">
          <view>{{ item.colname }}</view>
          <uni-section  type="line">
            <uni-data-select
                v-model="item.defval"
                :localdata="cxfdbh"
                @change="change"
            ></uni-data-select>
          </uni-section>
        </view>

        <view v-if="item.colname=='商品品牌'">
          <view>{{ item.colname }}</view>
          <uni-section  type="line">
            <uni-data-select
                v-model="item.defval"
                :localdata="cxsppp"
                @change="change"
            ></uni-data-select>
          </uni-section>
        </view>



      </view>
      <view v-if="item.type=='选择'">
        <view>{{ item.colname }}</view>

      </view>
      <view v-if="item.type=='查询下拉框'">
        <view v-if="item.colname=='商家合同'">
          <view>{{ item.colname }}</view>
          <uni-section  type="line">
            <uni-data-select
                v-model="item.defval"
                :localdata="cxsjht"
                @change="change"
            ></uni-data-select>
          </uni-section>
        </view>
      </view>

      <view v-if="item.type=='选择'">
        <view v-if="item.colname=='数据安全'">
          <view>{{ item.colname }}</view>
          <view>{{item.defval}}</view>
        </view>
      </view>
    </view>

<view class="unit3">
  <view class="unit3_box">
    <u-button @click="isquery()" type="primary">查询</u-button>
  </view>
</view>


<!--    表格数据展示-->
    <view>
      <uni-table border stripe emptyText="暂无更多数据">
        <!-- 表头行 -->
        <uni-tr>
          <uni-th align="center" v-for="(item,index) in bdt" >{{item}}</uni-th>
        </uni-tr>
        <!-- 表格数据行 -->
        <uni-tr v-for="(item,index) in result">
          <uni-td v-for="(items,key) of Object.values(item)">{{items}}</uni-td>
        </uni-tr>
      </uni-table>
    </view>
  </view>
</template>

<script>
import {
  getlist,
  getcolumns,
    query
} from '../../network/api.js'

export default {
  data() {
    return {
      dqbb: '', //当前报表
      start: '', //开始时间
      end: '', //结束时间
      cxtj: '',//查询条件
      tj: [],
      bdt:'',//表单头
      bdtdata:'',
      result:'',//查询结果
      cxfdbh:'',//查询分店编号
      cxsppp:'',//查询商品品牌
      cxsjht:''//查询商家合同
    };
  },
  onLoad(option) {
    this.cxtj = JSON.parse(option.cxdj).data //查询条件
    this.dqbb = uni.getStorageSync('dqbb') //当前报表
  },
  onShow() {
   this.cxfdbh=uni.getStorageSync('basic').FDINFO
    this.cxsppp=uni.getStorageSync('basic').PPINFO
    this.cxsjht=uni.getStorageSync('basic').SJHTTYPE
    //处理分店下拉框数据
    let cxfdbh=[];
   this.cxfdbh.forEach((item)=>{
     let datas={}
     datas.value=item.fdbh;
     datas.text=item.fdmc
     cxfdbh.push(datas)
   })
    this.cxfdbh=cxfdbh
//处理商品品牌下拉框数据
    let cxsppp=[];
    this.cxsppp.forEach((item)=>{
      let datas={}
      datas.value=item.ppbmid;
      datas.text=item.ppmc
      cxsppp.push(datas)
    })
    this.cxsppp=cxsppp

    //处理商家合同下拉框数据
    let cxsjht=[];
    this.cxsjht.forEach((item)=>{
      let datas={}
      datas.value=item.htlxid;
      datas.text=item.htlxmc
      cxsjht.push(datas)
    })
    this.cxsjht=cxsjht
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
        this.bdt=res.data
      })
    },
    //查询
    isquery() {
      this.tj=[];//清空之前填写
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
        this.result=res.data
        //this.bdt=Object.keys(this.result[0])
        //表单头处理
        let cl=res.columns
        let a=[];
        cl.forEach((item)=>{
          a.push(item.title)
        })
        this.bdt=a
      })
    }
  }
}
</script>

<style lang="scss">
.boxname{
  margin-bottom: 5rpx;
}
.boxinput{

}
.unit3{
  width: 100%;
  margin:30rpx 0;
  display: flex;
  justify-content:content;
  align-items: center;
}
.unit3_box{
height: 100%;
  width: 200px;
  margin: auto;
}
</style>
