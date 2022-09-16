<template>
	<view class="container">
		<view>{{work.InfoTypeName}}</view>
		<view>{{work.InfoContent}}</view>
		<view>{{work.InfoDate}}</view>
		<view>{{work.whoseFDBH}}</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				work: null
			};
		},
		onLoad(option) {
			this.work = JSON.parse(option.item)
			
		},
		methods: {		
		}
	}
</script>

<style>
</style>