<template>
	<view class="content">
		<niu-guide v-if="showGuide" ref="guide" :fStyle="fStyle" :layout="layout" :elements="elements"></niu-guide>
	</view>
</template>

<script>
	import elements, {
		pageLayout,fStyle
	} from "./elements.js"
	export default {
		data() {
			let isLaunched = uni.getStorageSync("launchflag")
			return {
				showGuide: isLaunched ? false : true,
				layout: pageLayout,
				fStyle: fStyle,
				elements: elements()
			}
		},
		onLoad() {
			if (!this.showGuide) {
				uni.redirectTo({
					url: "/pages/login/reg"
				})
			}
		},
		onReady() {
			this.$refs.guide && this.$refs.guide.register("checkToWhere", () => {
				uni.setStorage({
					key: "launchflag",
					data: true,
					complete() {
						uni.redirectTo({
							url: "/pages/login/reg"
						})
					}
				})
			})
		},
		methods: {

		}
	}
</script>
<style>
	page {
		height: 100%;
	}
</style>
<style scoped>
	.content {
		height: 100%;
	}
</style>
