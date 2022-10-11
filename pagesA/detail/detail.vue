<template>
	<view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				datalist:''
			};
		},
    onLoad(option){
      console.log(option)
      this.datalist=JSON.parse(option.list)


    },
	}
</script>

<style lang="scss">

</style>
