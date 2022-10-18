<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
      uni.setStorageSync('uuid', '192.168.0.150');
      uni.setStorageSync('model', 'Test');
			uni.setStorageSync('sn', 'MOPMPI-MLKKNG-KFOLNF-QINPHH');
			uni.setStorageSync('appid', 'wxbce91b6b8e662b44');
      uni.setStorageSync("secret", '4d4c042b2ca5c9e9c5a2b07049991f41')
    },
		onShow: function() {
      // 获取设备的ip地址
          uni.request({
            url: "http://self.mzsale.com/mzsale/web/login",
            method: "GET",
            success: (res) => {
              uni.setStorageSync("ip", res.data.ip)
            }
          });
      uni.request({
        url: "http://self.mzsale.com/mzato/main/app/serct",
        method: "POST",
        header:{
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        success: (res) => {
          console.log(res.data.data[0].secret_id)
          uni.setStorageSync("secret", res.data.data[0].secret_id)
        }
      })
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
