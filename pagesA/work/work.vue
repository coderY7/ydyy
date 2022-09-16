<template>
	<view>
		<view class="unit1">
			<view v-for="(item, index) in work" :key="index">
				<view class="unit1_box" @click="minutework(item)">
					<view class="box_left"></view>
					<view class="box_right">
						<view class="box_right_top">
							<view>{{item.authoritygradename}}</view>
							<view>{{item.InfoDate}}</view>
						</view>
						<view class="box_right_bottom">{{item.ztsm}}</view>
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
				work: null
			};
		},
		onLoad(option) {
			this.work = JSON.parse(option.item)
		},
		methods: {
			minutework(item) {
				 const data=JSON.stringify(item);
				uni.navigateTo({
					url:`./component/minutework?item=${data}`
				})
			}
		}
	}
</script>

<style lang="scss">
	.unit1_box {
		margin: 0 20rpx;
		border-radius: 5px;
		display: flex;
		justify-content: space-between;
		height: 100rpx;
		width: auto;
		margin-bottom: 10px;
background-color: #eee;
		.box_left {
			width: 16%;
			
		}

		.box_right {
			width: 80%;
		
			.box_right_top {
				display: flex;
				justify-content: space-between;
			}

			.box_right_bottom {
				margin-top: 8px;
			}
		}
	}
</style>
