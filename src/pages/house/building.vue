<template>
	<view  class="content">
		<view  class="head-bar">
			<view  class="bg"></view >
			<p class="title"><image class="menu" src="/static/logo.png" @click="openBox"></image>物业管理系统</p>
			<view  class="card">
				<p class="name"><em></em>楼宇管理</p>
				<div class="btn" @click="addModel">
					新增
				</div>
			</view >
		</view >
		<view class="wrap">
			<view class="uni-row title"  v-if="currIndex==0" >
				<view class="flex-item ">状态</view>
				<view class="flex-item">所属楼宇</view>
				<view class="flex-item">水表编号</view>
				<view class="flex-item">水费价单</view>
			</view>
			<view class="uni-row title"  v-else >
				<view class="flex-item">状态</view>
				<view class="flex-item">所属楼宇</view>
				<view class="flex-item">电表编号</view>
				<view class="flex-item">电表价单</view>
			</view>
			<view class="uni-row"  v-for="(item,index) in dataList" :key="index">
				<view class="flex-item">{{item.state}}</view>
				<view class="flex-item">{{item.name}}</view>
				<view class="flex-item">{{item.sb}}</view>
				<view class="flex-item">{{item.price}}</view>
			</view>
		</view>
		<uni-pagination title="标题文字" show-icon="true" :total="total" pageSize="10" @change="chagePage"></uni-pagination>
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
				dataList:[
					{
						state:'0',
						name:'智慧园区',
						sb:'F141',
						price:'3'
					},
					{
						state:'0',
						name:'智慧园区',
						sb:'F14199789',
						price:'3'
					},
					{
						state:'1',
						name:'智慧园区',
						sb:'F142',
						price:'3.5'
					}
				],
				title: 'Hello',
				currIndex:0,
				typeList:[
					{
						name:'水表收费设置',
					},
					{
						name:'电表收费设置',
					}
				],
				list: [
					{
						name: '已设置',
					},
					{
						name: '未设置',
					},
				],
				value: '已设置',
				current: 0,
				total:0
			}
		},
		onLoad() {
			this.getWater()
		},
		methods: {
			addModel(){
				this.$Router.push({name:'添加楼宇'})
			},
			chagePage(e){
				console.log(e);
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
			async electList(params){
				let res = await electList(params)
				if(res.code === 200){
					this.dataList = res.data.rows
					this.total = res.data.total
					console.log(res);
				}else {

				}
			},
			tagType(index){
				this.currIndex =index
				if(index===0){
					this.getWater()
				}else {
					this.dataList = []
					this.electList()
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
	.content{
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
			.title{
				text-align:left;
				display: flex;
				align-items: center;
				padding: 30rpx 40rpx 28rpx;
				font-size:36rpx;
				.menu{
					width: 60rpx;
					height: 60rpx;
					margin-right: 20rpx;
					z-index: 102;
				}
			}
			.card{
				height:146rpx;
				background:rgba(255,255,255,1);
				box-shadow:0rpx 4rpx 12rpx 0rpx rgba(0,0,0,0.09);
				border-radius:10rpx;
				width:90%;
				position: absolute;
				top: 140rpx;
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
					margin-bottom: 30rpx;
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
					background:rgba(1,122,255,1);
					border-radius:16rpx;
					font-size:36rpx;
					font-weight:400;
					color:rgba(255,255,255,1);
					position: absolute;
					right: 50rpx;
					top:36rpx;
				}
			}
		}
		.wrap{
			font-size:28rpx;
			font-family:PingFangSC-Regular,PingFang SC;
			font-weight:400;
			color:#333333;
			line-height:40rpx;
			text-align: center;
			padding:350rpx 0 0;
			background:rgba(255,255,255,1);
			border-radius:10rpx;
			.title{
				color: #999999;
			}
			.uni-row{
				display: flex;
				align-items: center;
				justify-content: space-between;
				.flex-item{
					flex: auto;
					margin: 16rpx 0;
				}
			}
		}
	}
</style>
