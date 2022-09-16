<template>
	<view>
		<!-- <u-tabs :list="tab" @click="istab()" :current="current"></u-tabs> -->
		<u-subsection :list="tab" :current="current" @change="istab()" mode="button"></u-subsection>
		<view>
			<view class="swiper" :current="current">
				<view v-for="(item,index) in itemData" :key="index">
					<view  @click="Noticedetails(item)" class="unit1">
					{{item.noticeTitle}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tab: [],
				tabsData: [],
				current: '0',
				itemData: []
			};
		},
		onLoad(option) {
          let list=JSON.parse(option.item),
				data = [];
			for (let i = 0, length = list.length; i < length; i++) {
				if (!data[list[i].typename]) {
					let arr = [];
					arr.push(list[i]);
					data[list[i].typename] = arr;
				} else {
					data[list[i].typename].push(list[i])
				}
			}
			//按公告类型分类
			// this.tabsData=data
			// console.log('公告分类成功数据', data)
			//tab获取
			let tabs = []
			for (var tab of Object.keys(data)) {
				tabs.push({
					name: tab
				})
			}

		
			this.tab = tabs
			let tablist = [];
			for (var item of Object.values(data)) {
				tablist.push({
					item
				})
			}
			this.tabsData=tablist
			
			this.istab(0)
		},
		methods: {
			istab(e) {
				this.current = e
				//当前选项数组数据
				this.itemData = this.tabsData[e].item	
			},
			//公告详情
			Noticedetails(item){
				console.log('当前选择项',item)
				let data=JSON.stringify(item)
				uni.navigateTo({
					url:`component/Noticedetails?item=${data}`
				})
			}
		}
	}
</script>

<style lang="scss">
.feedback-textare {
		margin-top: 30rpx;
		margin-bottom: 30rpx;
		height: 266rpx;
		color: #303133;
		font-size: 28rpx;
		line-height: 2em;
		width: 100%;
		box-sizing: border-box;
		padding: 20rpx 30rpx;
		border-radius: 20rpx;
		background-color: #F5F6F8;
	}
	.unit1{
	display: flex;
	height: 80rpx;
	margin-bottom: 10rpx;
	}
</style>
