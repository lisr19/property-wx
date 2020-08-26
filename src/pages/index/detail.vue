<template>
	<view  class="wrap">
		<p class="title">日期：{{currentTime}}</p>
		<view class="null" v-if="dataList.length===0">暂无</view>
		<view class="item" v-for="(item,index) in dataList" v-else>
			<p>内容：{{item.rc_title}}</p>
<!--			<p>日期：{{item.rc_dt}}</p>-->
		</view>
	</view >
</template>

<script>
	export default {
		data() {
			return {
				current: 0,
				total:0,
				currentTime:'',
				dataList:[]
			}
		},
		onLoad() {
			console.log(this.$Route.query);
			this.dataList = this.$Route.query.list
			this.currentTime =this.$Route.query.time
		},
		methods: {

		}
	}
</script>

<style lang="less" scoped>
	.wrap{
		font-size: 24rpx;
		color: #666666;
		line-height: 36rpx;
		.title{
			text-align: center;
			font-size: 30rpx;
			margin: 20rpx;
		}
		.item{
			border-top: solid 1rpx #DADADA;
			font-family:PingFangSC-Regular,PingFang SC;
			font-weight:400;
			color:rgba(102,102,102,1);
			padding: 20rpx 30rpx;
			line-height: 1.8;
		}
		.null{
			display: flex;
			justify-content: center;
			font-size: 32rpx;
			margin-top: 50rpx;
		}
	}
</style>
