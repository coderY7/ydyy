<template>
	<view>
			<view class="feedback-body">
				<text class="text-black">问题反馈和意见建议
					<text style="color: red;">*</text></text>
				<textarea placeholder="请描述您遇到的问题或对本产品的建议..." v-model="sendData.feedbackContent" class="feedback-textare"
					maxlength="-1" />

				<view class="image-title">
					<text class="text-black">上传问题截图<text class="text-grey"> (选填，最多可上传6张)
						</text>
					</text>
					<view class="text-grey">{{ imgList.length }}/6</view>
				</view>
				<view class="filepicker">
					<mk-upload :sourceType="['camera','album']" :imgList="imgList" @onDelete="onDelete" @onChoose="onChoose" :maxChooseCount="9" :maxCount="9" />
				</view>

				<text class="text-black">联系方式<text class="text-grey">(选填)</text> </text>
				<input class="feedback-input" v-model="sendData.mobile" placeholder="请输入您的手机号" />
				<view class="btn">
					<u-button type="primary" text="提交" :disabled="!sendData.feedbackContent" throttleTime="1000" @click='jianyi()'></u-button>
				</view>
			</view>
	</view>
</template>

<script>
	import {getQuestion} from '../../../network/api.js'
	import mkupload from '@/components/mk-upload/mk-upload.vue';
	export default {
		components: {
			mkupload
		},
		data() {
			return {
				sendData: {
					feedbackContent: '', //反馈内容
					mobile: '', //联系方式
					imgs: []
				},
				
				imgList: []
			};
		},
		onLoad() {

		},
		methods: {
			jianyi(){
				let data={
					sn:uni.getStorageSync('sn'),
					userid:uni.getStorageSync('userid'),
					uname:'Test',
					suggest:this.sendData.feedbackContent,
					phone:"192.168.0.150",
					ztbz:'F'
				}
				getQuestion(data).then((res)=>{
					console.log('反馈建议接口数据',res)
				})
			},
			onDelete(index) {
				this.imgList.splice(index, 1);
			},
			onChoose(e) {
				var tempFilePaths = e.tempFilePaths;
				tempFilePaths.forEach((v,i,arr)=>{
					this.imgList.push(v);
				})
			}
		},
		watch: {
			imgList: function(newv, oldv) {
				if(newv.length>9){
					this.imgList=this.imgList.splice(0,9)
				}
			}
		}
	};
</script>

<style>
	.text-black {
		color: #303133;
		font-size: 32rpx;
	}

	.text-grey {
		color: #BCBCBC;
		font-size: 24rpx;
		margin-left: 15rpx;
	}

	.feedback-quick {
		padding-right: 10rpx;
		color: #606266;
		font-size: 32rpx;
	}

	.feedback-body {
		padding: 30rpx;
	}

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

	.feedback-input {
		font-size: 28rpx;
		color: #303133;
		background-color: #F5F6F8;
		border-radius: 20rpx;
		height: 100rpx;
		min-height: 100rpx;
		padding: 0 30rpx;
		margin-top: 30rpx;
		margin-bottom: 60rpx;
	}



	.btn-submit {
		border-radius: 20rpx;
		color: #FFFFFF;
		margin-top: 100rpx;
		background-color: #007AFF;
		margin-bottom: 70rpx;
	}

	.image-title {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		color: #606266;

	}

	.filepicker {
		margin-top: 30rpx;
		margin-bottom: 30rpx;
	}

	.btn {
		margin: 30rpx 30rpx 60rpx;
	}
</style>
