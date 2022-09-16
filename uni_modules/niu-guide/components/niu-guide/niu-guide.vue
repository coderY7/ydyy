<template>
	<view class="component guide">
		<swiper class="swiper" :current="current" @change="changeSwiper">
			<swiper-item v-for="(child,i) in elements" :key="i">
				<view class="swiper-item" :style="[fStyle, computeLaoutStyle]">
					<template v-for="(item,index) in child">
						<image :key="index" v-if="item.type=='image'" :src="item.props.src" :mode="item.props.mode"
							:style="[item.cStyle, (item.anim&&current!=i)?item.beforeStyle:{}]" @click="(e)=>clickThis(e,item)">
						</image>
						<view :key="index" v-if="item.type=='block'"
							:style="[item.cStyle, (item.anim&&current!=i)?item.beforeStyle:{}]" @click="(e)=>clickThis(e,item)">
							{{(!!item.text) ? (item.text): ''}}
						</view>
					</template>
				</view>
			</swiper-item>
		</swiper>
		<view class="indicator-warpper">
			<view class="indicator" v-for="(child,i) in elements" :class="[current==i?'active':'']" :key="i"
				@click="current=i">
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			layout: {
				type: Array,
				default: []
			},
			elements: {
				type: Array,
				default: []
			},
			fStyle: {
				type: Object,
				default: {}
			},
		},
		data() {
			return {
				current: -1,
			}
		},
		computed: {
			computeLaoutStyle() {
				const style = {}
				if (this.layout.indexOf("flex") != -1) {
					style.display = 'flex'
				}
				if (this.layout.indexOf("column-center") != -1) {
					style.alignItems = 'center'
					style.flexDirection = 'column'
				}
				return style
			}
		},
		mounted() {
			setTimeout(() => {
				this.current = 0
			}, 150)
		},
		methods: {
			changeSwiper(e) {
				const num = e.target.current
				this.current = num
			},
			clickThis(e, item) {
				this[item.click] && this[item.click]()
			},
			register(name, fn) {
				if (!name) return
				if (!fn) return
				this[name] = fn
			}
		},
	}
</script>

<style lang="scss" scoped>
	.component.guide {
		height: 100%;
		padding-top: var(--status-bar-height);
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		.swiper {
			flex: 1;
			height: 0;

			.swiper-item {
				position: absolute;
				left: 0;
				right: 0;
				bottom: 0;
				top: 0;
			}
		}

		.indicator-warpper {
			position: absolute;
			bottom: 110rpx;
			left: 0;
			right: 0;
			display: flex;
			justify-content: center;

			.indicator {
				width: 10rpx;
				height: 8rpx;
				background: #E0E0E0;
				border-radius: 4rpx;
				transition: width .5s ease, background .5s ease;

				&.active {
					width: 38rpx;
					background: #11B654;
				}

				+.indicator {
					margin-left: 8rpx;
				}
			}
		}

	}
</style>
