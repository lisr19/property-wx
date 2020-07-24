<template>
	<view  class="wrap">
		<view  class="head-bar">
			<view  class="bg"></view >
		</view >
		<u-sticky>
			<view  class="card">
				<p class="name"><em></em>巡检任务</p>
				<view class="desc">
					<p class="time">2020-07-15</p>
					<p >任务：2020-07-15</p>
					<p >班次：2020-07-15</p>
				</view>
				<span class="hist-btn">巡检记录</span>
			</view >
		</u-sticky>
		<view class="content">
			<template v-if="currStep===0">
				<image class="img" src="/static/logo.png"></image>
				<p class="">开始巡检后到指定巡检定点扫描二维码完成打卡</p>
				<view class="btn" @click="chageStep(1)">开始巡检</view>
			</template>
			<template v-if="currStep===1">
				<p class="tip">请到达指定巡检定点扫描二维码完成巡检</p>
				<view class="xj-box">
					<view class="item">
						<u-icon class="img"  name="scan" size="100" color="#A8FFAF"></u-icon>
						<p>B栋201</p>
					</view>
					<view class="item" @tap="scanCode">
						<u-icon class="img"  name="scan" size="100" ></u-icon>
						<p>B栋211</p>
					</view>
					<view class="item" @tap="scanCode">
						<u-icon class="img"  name="scan" size="100" ></u-icon>
						<p>B栋231</p>
					</view>
				</view>
				<view class="btn" style="background: #C3C3C3;color: #ffffff;border:none" @click="chageStep(2)">巡检中</view>
			</template>
			<template v-if="currStep===2">
				<view class="btn" style="background: #0a4882;color: #ffffff" @click="chageStep(0)">巡检完成</view>
			</template>
		</view>
		<uni-drawer :visible="false" ref="leftBox">
			<leftMenu @closeMenu="closeMenu"></leftMenu>
		</uni-drawer>
	</view >
</template>

<script>
	import uniDrawer from "@/components/uni-drawer/uni-drawer.vue"
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	import uniBadge from "@/components/uni-badge/uni-badge.vue"
	import leftMenu from "@/components/left-menu/left-menu.vue"
	import uniPagination from '@/components/uni-pagination/uni-pagination.vue'
	import {getWater,electList} from "@/utils/api/comment"
	export default {
		components: {uniDrawer,uniIcons,uniBadge,leftMenu,uniPagination},
		data() {
			return {
				currStep:0,
				dataList:[],
			}
		},
		onLoad() {
			this.getWater()
		},
		methods: {
			scanCode(){
				uni.scanCode({
					onlyFromCamera: true,
					success:  (res) =>{
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
						if(res.result==='成功'){
							uni.showToast({
								title: '扫码成功',
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
			async getWater(params){
				let res = await getWater(params)
				if(res.code === 200){
					this.dataList = res.data.rows
					this.total = res.data.total
					console.log(res);
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
				height:170rpx;
				background:rgba(248,248,248,1);
				border-radius:10rpx;
				padding: 16rpx 20rpx;
				box-sizing: border-box;
				line-height: 2;
				font-size: 24rpx;
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
