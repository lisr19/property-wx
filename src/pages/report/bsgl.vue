<template>
	<view  class="wrap">
		<view  class="head-bar">
			<view  class="bg"></view >
		</view >
		<u-sticky>
			<view  class="card">
				<p class="name"><em></em>报事管理</p>
				<view class="btn btn1">新增</view>
			</view >
			<view  class="card card2">
				<view class="input-box"><span>报事人：</span><input class="uni-input" name="num"></view>
				<view class="btn">查询</view>
			</view >
		</u-sticky>
		<view class="items">
			<view class="item" v-for="(item,index) in dataList" :key="index">
				<p class="title">报事人：{{item.bs_bsr}}</p>
				<p>报事描述：{{item.bs_ms}}</p>
				<template>
					<p  v-if="item.bs_zt===0" style="color:#FF9900">状态：未办理</p>
					<p  v-else-if="item.bs_zt===4">状态：办理结束</p>
					<p  v-else>状态：已办理</p>
				</template>
				<p>报事日期：{{item.bs_dt}}</p>
				<p v-if="item.bs_bljg">办理结果：{{item.bs_bljg}}</p>
				<svg class="icon" aria-hidden="true" @click="delItem(item)"><use xlink:href="#iconshanchu2x" ></use></svg>
			</view>
		</view>
<!--		<uni-pagination  show-icon="true" :total="total" pageSize="10" @change="chagePage"></uni-pagination>-->
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
	import {getbsList,delBs} from "@/utils/api/index"
	export default {
		components: {uniDrawer,uniIcons,uniBadge,leftMenu,uniPagination},
		data() {
			return {
				dataList:[],
				currIndex:0,
				current: 0,
				total:0
			}
		},
		onLoad() {
			this.getbsList()
		},
		methods: {
			delItem(item){
				this.delBs({bs_dh:item.bs_dh,del:1})
			},
			async delBs(params){
				let res = await delBs(params)
				if(res.code === 0){

				}
			},
			async getbsList(params){
				let res = await getbsList(params)
				if(res.code === 0){
					this.dataList = res.data.data
				}else {

				}
			},
			chagePage(e){
				console.log(e);
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
			top: 30rpx;
			left:5%;
			z-index: 10;
			font-weight:500;
			color:rgba(51,51,51,1);
			padding: 30rpx;
			box-sizing: border-box;
			.input-box{
				display: flex;
				align-items: center;
				justify-content: center;
				margin-bottom: 12px;
				font-size:28rpx;
				padding: 0 20rpx;
				.uni-input{
					flex: 1;
					height:28px;
					line-height: 28px;
					background:rgba(255,255,255,1);
					border-radius:8px;
					border:1px solid rgba(230,230,230,1);
					padding-left: 5px;
				}
			}
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
			.btn{
				width:230rpx;
				height:74rpx;
				text-align: center;
				line-height: 74rpx;
				border-radius:16rpx;
				font-size:36rpx;
				font-weight:400;
				color:rgba(255,255,255,1);
				background:rgba(4,17,73,1);
				margin-top: 26rpx;
			}
			.btn1{
				background:#017AFF;
				position: absolute;
				right: 30rpx;
				top: 35rpx;
				margin: 0;
			}
		}
		.card2{
			top: 190rpx;
		}
		.tab {
			height: 80rpx;
			position: absolute;
			z-index: 9;
			background: #ffffff;
			top: 375rpx;
			width: 100%;
			padding: 0 38rpx;
			.active{
				color: #077AFF;
			}
		}
		.items{
			padding: 420rpx 0 50rpx;
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			overflow: auto;
			font-size:28rpx;
			font-family:PingFangSC-Regular,PingFang SC;
			font-weight:400;
			color:rgba(122,122,122,1);
			.item{
				width:690rpx;
				background:rgba(255,255,255,1);
				border-radius:10rpx;
				/*background: #00D29C;*/
				margin-top: 20rpx;
				padding: 24rpx 48rpx;
				box-sizing: border-box;
				line-height: 1.8;
				box-shadow:0 6rpx 8rpx 2rpx rgba(0,0,0,0.09);
				position: relative;
				.icon{
					position: absolute;
					top: 20rpx;
					right: 10rpx;
					font-size: 24rpx;
				}
				.title{
					font-size:32rpx;
					font-weight:500;
					color:rgba(89,89,89,1);
				}
			}

		}
	}
</style>
