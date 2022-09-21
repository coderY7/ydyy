<template>
	<view>
		<u-navbar :title="dqbb.cxmc" :placeholder="true" @leftClick="leftClick">
		</u-navbar>

		<button @click="isquery()">查询</button>
		<view v-for="(item,index) in cxtj" @click="cxtjs(item)">
			<view>{{item.colname}}</view>
			<input type="" />
		</view>
	</view>
</template>

<script>
	import {
		getlist
	} from '../../network/api.js'
	export default {
		data() {
			return {
				dqbb: '', //当前报表
				start: '', //开始时间
				end: '', //结束时间
				cxtj: '' //查询条件
			};
		},
		onLoad(option) {
			this.cxtj = JSON.parse(option.cxdj).data //查询条件
			this.dqbb = uni.getStorageSync('dqbb') //当前分店
		},
		methods: {
			//自定义返回
			leftClick() {
				uni.navigateBack({
					delta: 1
				});
			},
      cxtjs(item){
        item.push({Convalue:''})
        console.log(item.recordid)
        let data={recordid:item.recordid}
      },
			maskClick(e) {
				console.log('----maskClick事件:', e);
			},
			//查询
			isquery() {
				let data={
					access_token:uni.getStorageSync('access_token'),
					userid:uni.getStorageSync('userid'),
					groupid:uni.getStorageSync('loginaccess').userinfo.erp_groupid,
					username:uni.getStorageSync('loginaccess').userinfo.erp_username,
					fdbh:uni.getStorageSync('fdbh'),
					condition:conditondata
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
