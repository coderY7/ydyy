<template>
	<view class="container">
		<u-navbar :title="title" :placeholder="true">
		</u-navbar>
		<view class="unit1">
			<ul>
				<li v-for="(item,index) in Alllist" :key="index">
					<view class="unit1_box" @click="enter(item)">
						<view class="boxs">
							<view>
							</view>
							<view>{{item.cxmc}}</view>
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
	} from "../../network/api.js"
	export default {
		data() {
			return {
				Alllist: [],
				title: '报表查询',
			};
		},
		onLoad() {
			this.isreportForm()
      uni.setStorageSync('cxbb',true)
		},
		methods: {
			//获取报表
			isreportForm() {
				let reportFormdata = {
					access_token:uni.getStorageSync('access_token'),
					userid: '00000'
				}
				reportForm(reportFormdata).then((res) => {
					console.log('报表查询', res)
					this.Alllist = res.data
				})
			},
			enter(item) {
        console.log(item)
        uni.setStorageSync('dqbb',item)//当前报表
        let dataes={
          access_token: uni.getStorageSync('access_token'),
          cxbh:item.cxbh
        }
        condition(dataes).then((res)=>{
          console.log('查询条件',res)
          let items = JSON.stringify(res)
          uni.navigateTo({
          	url: `../../pagesA/condition/condition?cxdj=${items}`
          })
        })
			}
		}
	}
</script>

<style lang="scss">
	.container {
		margin: 0 20rpx;
	}

	ul {
		padding: 0;
	}

	li {
		list-style: none;
		text-align: center;
		border-radius: 5px;
		background: skyblue;
	}

	ul {
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		height: 100%;
	}

	li {
		width: 30%;
		height: 200rpx;
		margin-right: 5%;
		margin-bottom: 5%;
	}

	li:nth-of-type(3n) {
		margin-right: 0;
	}

	li:nth-of-type(n+99) {
		margin-bottom: 0;
	}

	.unit1_box {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;

		.boxs {
			display: flex;
			flex-direction: column;

		}
	}
</style>
