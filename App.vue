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
      // 获取设备的ip地址
      uni.getStorage({
        key: 'ip',
        fail: function(err) {
          uni.request({
            url: "http://pv.sohu.com/cityjson?ie=utf-8",
            data: {},
            method: "POST",
            header: {
              "Content-Type": "application/json"
            },
            success: (res) => {
              let reg=/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/;
              let ip=reg.exec(res.data)
              uni.setStorageSync("ip", ip[0])
            }
          })
        }
      });
      //获取token
      // loadRefresh(){
      //   let dataes = {
      //     "access_token": "",
      //     "vtype": "login",
      //     "companyid": uni.getStorageSync("companyid"),
      //     "userid": uni.getStorageSync("userid"),
      //     "password": uni.getStorageSync("password"),
      //     "fdbh": uni.getStorageSync("fdbh"),
      //     "computerid": uni.getStorageSync("uuid"),//设备唯一标识
      //     "ipaddress": uni.getStorageSync("ip")
      //   }
      //   uni.request({
      //     url: "http://self.mzsale.com/mzato/main/app/usercheck",
      //     data: dataes,
      //     method: "POST",
      //     header: {
      //       "Content-Type": "application/json"
      //     },
      //     success: (res) => {
      //       console.log("APP 刷新 refresh_token res", res)
      //       if (res.data.error_code == 0) {
      //         uni.setStorageSync("access_token", res.data.access_token);
      //         uni.setStorageSync("refresh_token", res.data.refresh_token);
      //         uni.setStorageSync("expires_in", res.data.expires_in);
      //       } else {
      //
      //       }
      //     }
      //   })
      // }
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
