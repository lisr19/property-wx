<template>
	<view  class="wrap">
		<view  class="head-bar">
			<view  class="bg"></view >
		</view >
		<u-sticky>
			<view  class="card">
				<p class="name"><em></em>当前巡检任务</p>
				<view class="desc">
					<p class="time">班次名称：{{itemData.xjpb_bcname}}</p>
					<p >开始时间：{{itemData.xjpb_sdtime}}</p>
					<p >结束时间：{{itemData.xjpb_edtime}}</p>
				</view>
			</view >
		</u-sticky>
		<view class="content">
			<template v-if="currStep===0">
				<p v-if="address">{{address}}</p>
				<image class="img0" src="/static/dingwei.png"></image>
				<p class="">开始巡检后到指定巡检定点扫描二维码完成打卡</p>
				<view class="btn" @click="chageStep(1)">开始巡检</view>
			</template>
			<template v-if="currStep===1">
				<p class="tip">请到达指定巡检定点扫描二维码完成巡检</p>
				<view class="xj-box">
					<view class="item" v-for="(item,index) in qdList" :key=index @tap="scanCode(item,index)">
						<u-icon class="img"  name="scan" size="100"  :class="{'active':item.code===1}"></u-icon>
						<p>{{item.name}}</p>
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
	import leftMenu from "@/components/left-menu/left-menu.vue"
	import {addXunjian,saomaQd} from "@/utils/api/index"
	export default {
		components: {uniDrawer,uniIcons,leftMenu},
		data() {
			return {
				currStep:0,
				dataList:[],
				qdList:[
					{name:'签到点1',code:1},
					{name:'签到点2',code:0},
					{name:'签到点3',code:0}
				],
				itemData:{},
				longitude:'',
				latitude:'',
				address:'',

			}
		},
		onLoad() {
			this.itemData = this.$Route.query.itemData
			this.getLocation()
		},
		methods: {
			getLocation(){
				uni.getLocation({
					type: 'wgs84',
					success:  (res) =>{
						console.log('当前位置的经度：' + res.longitude);
						console.log('当前位置的纬度：' + res.latitude);
						this.latitude = res.latitude; //纬度
						this.longitude = res.longitude; //经度
						if(res.errMsg==='getLocation:ok'){
							uni.showToast({
								title: '获取当前位置成功',
								icon: 'none',
							});
						}
					}
				});
				// uni.chooseLocation({
				// 	success: (res) =>{
				// 		console.log('位置名称：' + res.name);
				// 		console.log('详细地址：' + res.address);
				// 		console.log('纬度：' + res.latitude);
				// 		console.log('经度：' + res.longitude);
				// 		this.address = res.address; //详细地址
				// 		this.latitude = res.latitude; //纬度
				// 		this.longitude = res.longitude; //经度
				// 	}
				// });
			},

			async saomaQd(params){
				console.log(params);
				let res = await saomaQd(params)
				if(res.code === 0){
					uni.showToast({
						title: '签到成功',
						icon: 'success',
					});
				}else {
					uni.showToast({
						title: '签到失败',
						icon: 'none',
					});
				}
			},
			scanCode(){
				uni.scanCode({
					onlyFromCamera: true,
					success:  (res) =>{
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
						if(res.result){
							uni.showToast({
								title: '签到成功',
								icon: 'success',
							});
							this.saomaQd({xjpb_id:this.itemData.xjpb_id,fc_id:this.itemData.fc_id,xjd_id:res.result})
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
				if(s===1){
					this.addXunjian({xjpb_id:this.itemData.xjpb_id,longit:this.longitude,lati:this.latitude})
				}
			},
			async addXunjian(params){
				let res = await addXunjian(params)
				if(res.code === 0){
					console.log('添加巡检记录成功');
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
				min-height:170rpx;
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
					.active{
						color: #A8FFAF;
					}
				}
			}
		}
	}
</style>
