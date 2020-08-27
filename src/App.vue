<style lang="scss">
    /* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
    @import "uview-ui/index.scss";
</style>
<script>
	export default {

		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
    @import url('./common/less/reset.less');
    /*.icon {*/
    /*    width: 1.5em;*/
    /*    height: 1.5em;*/
    /*    vertical-align: -0.15em;*/
    /*    fill: currentColor;*/
    /*    overflow: hidden;*/
    /*    z-index: 99;*/
    /*    margin-right:0.5rem;*/
    /*}*/
</style>
