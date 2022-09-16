export const pageLayout = []

export const fStyle = {
	paddingTop: "160rpx",
	margin: '0 80rpx'
}

export default () => {
	let canPlayAnim = true
	return [
		[{
			type: "block",
			anim: canPlayAnim,
			text: "跨端数量多",
			cStyle: {
				textAlign: "left",
				marginTop: "15rpx",
				fontSize: "40rpx",
				fontWeight: 500,
				color: "#11B654",
				willChange: 'transform',
				transition: 'transform .8s ease, opacity .8s ease'
			},
			beforeStyle: {
				opacity: 0,
				transform: "translateX(-800rpx) translateY(-800rpx)"
			},
		}, {
			type: "block",
			anim: canPlayAnim,
			text: "一套代码，可发布到I0S、Android、小程序、H5等多个平台。",
			cStyle: {
				textAlign: "left",
				marginTop: "18rpx",
				fontSize: "28rpx",
				color: "#55ff7f",
				willChange: 'transform',
				transition: 'transform .8s ease, opacity .8s ease'
			},
			beforeStyle: {
				opacity: 0,
				transform: "translateX(-800rpx) translateY(800rpx)"
			},
		}, {
			type: "image",
			anim: canPlayAnim,
			props: {
				src: '/static/guide/guide01.png',
				mode: 'aspectFill'
			},
			cStyle: {
				marginTop: '20%',
				height: '45%',
				width: "100%",
				transition: 'transform .8s ease, opacity .8s ease'
			},
			beforeStyle: {
				opacity: 0,
				transform: "translateY(-300rpx)"
			},
		}],
		[{
			type: "block",
			anim: canPlayAnim,
			text: "性能体验优秀",
			cStyle: {
				textAlign: "left",
				marginTop: "15rpx",
				fontSize: "40rpx",
				fontWeight: 500,
				color: "#11B654",
				willChange: 'transform',
				transition: 'transform .8s ease, opacity .8s ease'
			},
			beforeStyle: {
				opacity: 0,
				transform: "translateX(-800rpx) translateY(-800rpx)"
			},
		}, {
			type: "block",
			anim: canPlayAnim,
			text: "体验更好的Hybrid框架，加载页面速度更快。APP端支持WEEX原生渲染，可支持更流畅的用户体验。",
			cStyle: {
				textAlign: "left",
				marginTop: "18rpx",
				fontSize: "28rpx",
				color: "#55ff7f",
				willChange: 'transform',
				transition: 'transform .8s ease, opacity .8s ease'
			},
			beforeStyle: {
				opacity: 0,
				transform: "translateX(-800rpx) translateY(800rpx)"
			},
		}, {
			type: "image",
			anim: canPlayAnim,
			props: {
				src: '/static/guide/guide02.png',
				mode: 'aspectFill'
			},
			cStyle: {
				marginTop: '20%',
				height: '35%',
				width: "100%",
				transition: 'transform .8s ease, opacity .8s ease'
			},
			beforeStyle: {
				opacity: 0,
				transform: "translateY(-300rpx)"
			},
		}],
		[{
				type: "block",
				anim: canPlayAnim,
				text: "学习成本低",
				cStyle: {
					textAlign: "left",
					marginTop: "15rpx",
					fontSize: "40rpx",
					fontWeight: 500,
					color: "#11B654",
					willChange: 'transform',
					transition: 'transform .8s ease, opacity .8s ease'
				},
				beforeStyle: {
					opacity: 0,
					transform: "translateX(-800rpx) translateY(-800rpx)"
				},
			}, {
				type: "block",
				anim: canPlayAnim,
				text: "基于通用前端技术楼，采用VUE语法+微信小程序APl，无额外学习成本。",
				cStyle: {
					textAlign: "left",
					marginTop: "18rpx",
					fontSize: "28rpx",
					color: "#55ff7f",
					willChange: 'transform',
					transition: 'transform .8s ease, opacity .8s ease'
				},
				beforeStyle: {
					opacity: 0,
					transform: "translateX(-800rpx) translateY(800rpx)"
				},
			}, {
				type: "image",
				anim: canPlayAnim,
				props: {
					src: '/static/guide/guide03.png',
					mode: 'aspectFill'
				},
				cStyle: {
					marginTop: '20%',
					height: '35%',
					width: "100%",
					transition: 'transform .8s ease, opacity .8s ease'
				},
				beforeStyle: {
					opacity: 0,
					transform: "translateY(-300rpx)"
				},
			},
			{
				type: "block",
				anim: canPlayAnim,
				text: "立即体验",
				click: "checkToWhere",
				cStyle: {
					position: "absolute",
					bottom: '180rpx',
					left: '50%',
					whiteSpace: "nowrap",
					transform: "translateX(-50%)",
					textAlign: "center",
					display: 'inline-block',
					lineHeight: 1,
					padding: ' 22rpx 92rpx',
					background: '#FFFFFF',
					borderRadius: '44rpx',
					border: '1px solid #11B654',
					marginTop: '42rpx',
					fontSize: '32rpx',
					fontWeight: 500,
					color: '#11B654',
					transition: 'transform .8s ease, opacity .8s ease'
				},
				beforeStyle: {
					opacity: 0,
					transform: "translateY(200rpx)"
				},
			}
		],
	]

}
