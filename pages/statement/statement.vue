<template>
	<view class="container">
		<!-- <u-navbar :bgColor="bgColor" :placeholder="true" leftIcon='tags' leftIconColor='#f60506' leftText='设置'
			title="报表" @leftClick="leftClick">
		</u-navbar> -->	

    <navbar title='报表' @lefts=left() leftname="设置"></navbar>

    <view class="unit1">
			<ul>
				<li v-for="(item,index) in Alllist" :key="index">
					<view class="unit1_box" @click="enter(item)">
						<view class="boxs">
							<view class="boxsimg">
							</view>
							<view class="boxsname">{{item.cxmc}}</view>
						</view>
					</view>
				</li>
			</ul>
		</view>
	</view>
</template>

<script>
	import {
		reportForm,
		condition
	} from "../../network/api.js";
	import navbar from '../../components/nav.vue'
	export default {
		data() {
			return {
				bgColor: '#4f99ff', //动态背景
				Alllist: [],
				title: '报表查询',
			};
		},
		components: {
		    navbar
		  },
		onLoad() {
			this.isreportForm()

		},
		methods: {
			//获取报表
			isreportForm() {
				let reportFormdata = {
					access_token: uni.getStorageSync('access_token'),
					userid: '00000'
				}
				reportForm(reportFormdata).then((res) => {
					console.log('报表查询', res)
					this.Alllist = res.data
				})
			},
			enter(item) {
				console.log(item)
				uni.setStorageSync('dqbb', item) //当前报表
				let dataes = {
					access_token: uni.getStorageSync('access_token'),
					cxbh: item.cxbh
				}
				condition(dataes).then((res) => {
					console.log('查询条件', res)
					let items = JSON.stringify(res)
					uni.navigateTo({
						url: `../../pagesA/condition/condition?cxdj=${items}`
					})
				})
			},

      //设置
      left() {

        uni.navigateTo({
          url: '../../pages/myset/myset'
        })
      },
		}
	}
</script>

<style lang="scss">
	.container {
		
	}

	ul {
		padding: 0;
	}

	li {
		list-style: none;
		text-align: center;
		border-radius: 5px;
	}

	ul {
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		height: 100%;
	}

	li {
		width: 26%;
		height: 180rpx;
		margin-right: 11%;
		font-size: 22rpx;
		margin-bottom: 5%;
		display: flex;
		justify-content: center;
		align-items: center;
		
	}

	li:nth-of-type(3n) {
		margin-right: 0;
	}

	li:nth-of-type(n+99) {
		margin-bottom: 0;
	}

	.unit1 {
		margin: 50rpx 20rpx;
		
	}

	.unit1_box {
		width: 100%;
		height: 100%;
		
		.boxs {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			.boxsimg {
				width: 60rpx;
				height: 60rpx;
				border-radius: 5rpx;
				background-color: #4f99ff;
				margin-bottom: 20rpx;
			}
			.boxsname{
				font-size: 24rpx;
			}
		}
	}
  page{
    background: url('../../static/shilu-login/logobj.png') no-repeat;
    background-position: center center;
    background-attachment: fixed;
  }
</style>
