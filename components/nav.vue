<template>
		<view class="navbar" :style="{'height':titleHeight + 'px'}">
			<view class="nav" :style="{'height':(titleHeight-statusBarHeight)+'px', 'padding-top':statusBarHeight + 'px',}">
				<view class="navicon" @click="isleft()">{{leftname}}</view>
				<view class="navname" style="width: calc(100% - 196px)"><view>{{title}}</view></view>
			</view>
		</view>
</template>

<script>
	export default {
		name:"nav",
		data() {
			return {
				titleHeight: 0, //状态栏和导航栏的总高度
				statusBarHeight: 0 ,//状态栏高度
				naviBarHeight:0,//导航栏高度
			};
		},
		props: {
		    title: String,
			leftname:String
		  },
		 methods: {
		    isleft(data) {
		      this.$emit('lefts',this.icons)
		    }
		  },
		created() {
			const res = uni.getSystemInfoSync()
			console.log(res)
			const system = res.osName;
			this.statusBarHeight = res.statusBarHeight;
			if (system === 'android') {
			this.titleHeight = 48 + this.statusBarHeight;
			uni.setStorageSync('statusBarHeight',this.statusBarHeight);
			uni.setStorageSync('titleHeight',this.titleHeight);
			} else if (system === 'ios') {
			this.titleHeight = 44 + this.statusBarHeight;
			uni.setStorageSync('statusBarHeight',this.statusBarHeight);
			uni.setStorageSync('titleHeight',this.titleHeight);
			}
			uni.setStorageSync('naviBarHeight',44);
			this.naviBarHeight = this.titleHeight - this.statusBarHeight
		}
	}
</script>

<style lang="scss">
.navbar{
		background:linear-gradient(-90deg,#52c8f1, #85d8f3);
		font-size: 16px;
		position: sticky;
		z-index: 99999999999999;
		top:0;
		.nav{
			display: flex;
			align-items: center;
			.navicon{
				padding-left: 20px;
				width: 80px;
			}
			.navname{
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
	}
</style>