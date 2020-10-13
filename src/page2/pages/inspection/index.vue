<template>
	<view  class="wrap">
		<view  class="head-bar">
			<view  class="bg"></view >
		</view >
		<u-sticky>
			<view  class="card">
				<p class="name"><em></em>巡检任务</p>
				<view class="items-box" :style="{height:listHeight+'px'}">
					<view class="desc" v-for="(item,index) in dataList" :key="index">
						<p class="time">班次名称：{{item.xjpb_bcname}}</p>
						<p>签到点：{{item.qdd_idstr}}</p>
						<p >开始时间：{{item.xjpb_sdtime}}</p>
						<p >结束时间：{{item.xjpb_edtime}}</p>
						<span class="tip-btn" @click="starXunjian(item)">开始巡检</span>
					</view>
				</view>

				<view class="null-btn" style="font-size: 30rpx;text-align: center;margin-top: 30rpx" v-if="dataList.length===0">暂无数据</view>
			</view >
		</u-sticky>
		<uni-drawer :visible="false" ref="leftBox">
			<leftMenu @closeMenu="closeMenu"></leftMenu>
		</uni-drawer>
	</view >
</template>

<script>
	import uniDrawer from "@/components/uni-drawer/uni-drawer.vue"
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	import leftMenu from "@/components/left-menu/left-menu.vue"
	import {getXunjian,addXunjian} from "@/utils/api/index"
	export default {
		components: {uniDrawer,uniIcons,leftMenu},
		data() {
			return {
				currStep:0,
				dataList:[],
				listHeight:500,
			}
		},
		onLoad() {
			uni.getSystemInfo({
				success: (res)=> {
					this.listHeight = res.windowHeight - 130
				}
			});
			this.getXunjian()
		},
		methods: {
			starXunjian(item){
				this.$Router.push({name:'开始巡检',params:{itemData:item}})
			},
			scanCode(){
				uni.scanCode({
					onlyFromCamera: true,
					success:  (res) =>{
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
						if(res.result.includes('成功')){
							uni.showToast({
								title: '签到成功',
								icon: 'success',
							});
						}else {
							uni.showToast({
								title: '扫码失败',
								icon: 'none',
							});
						}
					}
				});
			},
			chageStep(s){
				this.currStep =s

				console.log(this.currStep);
			},
			async getXunjian(params){
				let res = await getXunjian(params)
				if(res.code === 0){
					this.dataList = res.data
				}else {

				}
			},
			async addXunjian(params){
				let res = await addXunjian(params)
				if(res.code === 0){

				}else {

				}
			},
			openBox(){
				this.$refs.leftBox.open()
			},
			closeMenu(){
				this.$refs.leftBox.close()
			},
		}
	}
</script>

<style lang="less" scoped>
	.wrap{
		font-size: 24rpx;
		color: #666666;
		line-height: 36rpx;
		.head-bar{
			font-family:PingFangSC-Medium,PingFang SC;
			font-weight:500;
			color:rgba(255,255,255,1);
			height:336rpx;
			background:rgba(6,25,104,1);
			position: fixed;
			top: 0;
			width: 100%;
			z-index: 9;
			.bg{
				top: -140rpx;
				border-radius: 50%;
				width: 750rpx;
				background: -webkit-linear-gradient(327deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.2) 100%);
				background: linear-gradient(123deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.15) 100%);
				position: absolute;
				left: -170rpx;
				height: 700rpx;
			}
		}
		.card{
			background:rgba(255,255,255,1);
			box-shadow:0rpx 4rpx 12rpx 0rpx rgba(0,0,0,0.09);
			border-radius:10rpx;
			width:90%;
			position: absolute;
			top: 60rpx;
			left:5%;
			z-index: 10;
			font-weight:500;
			color:rgba(51,51,51,1);
			padding: 30rpx;
			box-sizing: border-box;
			min-height: 500rpx;
			.name{
				font-size:36rpx;
				font-family:PingFangSC-Semibold,PingFang SC;
				font-weight:600;
				color:rgba(51,51,51,1);
				line-height:44rpx;
				margin-bottom: 34rpx;
				display: flex;
				align-items: center;
				em{
					width:14rpx;
					height:14rpx;
					background:#00D29C;
					display: inline-block;
					margin-right: 12rpx;
					border-radius: 50%;
				}
			}
			.desc{
				width:608rpx;
				min-height:170rpx;
				background:rgba(248,248,248,1);
				border-radius:10rpx;
				padding: 16rpx 20rpx;
				box-sizing: border-box;
				line-height: 2;
				font-size: 24rpx;
				position: relative;
				margin: 20rpx 0;
			}
			.tip-btn{
				position: absolute;
				right: 20rpx;
				top: 50rpx;
				padding: 10rpx 20rpx;
				text-align: center;
				border-radius: 30rpx;
				background: #007aff;
				color: #ffffff;
			}
			.hist-btn{
				position: absolute;
				right: 40rpx;
				top: 30rpx;
				font-size:28rpx;
				font-family:PingFangSC-Regular,PingFang SC;
				font-weight:400;
				color:rgba(51,51,51,1);
			}
			.items-box{
				overflow: auto;
			}
		}
		.content{
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			padding-top: 450rpx;
			font-size:28rpx;
			font-family:PingFangSC-Regular,PingFang SC;
			font-weight:400;
			color:rgba(113,129,157,1);
			.tip{
				text-align: left;
				font-size:28rpx;
				font-weight:400;
				color:rgba(159,159,159,1);
			}
			.img{
				margin-bottom: 34rpx;
			}
			.img0{
				width: 250rpx;
				height:  250rpx;
				margin-top: 120rpx;
				margin-bottom: 34rpx;

			}
			.btn{
				width:618rpx;
				height:108rpx;
				line-height:108rpx;
				text-align: center;
				background:rgba(255,255,255,1);
				box-shadow:0 8rpx 8rpx 0 rgba(7,19,63,0.19);
				border-radius:16rpx;
				border:3rpx solid rgba(1,16,76,1);
				font-size:44rpx;
				font-weight:500;
				color:rgba(1,16,76,1);
				position: absolute;
				bottom: 60rpx;
			}
			.xj-box{
				display: flex;
				align-items: center;
				justify-content: space-around;
				width: 100%;
				margin: 62rpx 82rpx;
				.item{
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					.img{
						width: 100rpx;
						height: 100rpx;
						display: flex;
						align-items: center;
						justify-content: center;
					}
				}
			}
		}
	}
</style>
