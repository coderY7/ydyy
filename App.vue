<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
      uni.setStorageSync('uuid', '192.168.0.150');
      uni.setStorageSync('model', 'Test');
			uni.setStorageSync('sn', 'MOPMPI-MLKKNG-KFOLNF-QINPHH');
			uni.setStorageSync('appid', 'wxbce91b6b8e662b44');
			uni.setStorageSync('secret', '4d4c042b2ca5c9e9c5a2b07049991f41');
		},
		onShow: function() {
			if(!uni.getStorageSync('openid')){
				console.log('登录退出了，请重新登录')
			}
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	
	/*每个页面公共css */
</style>
