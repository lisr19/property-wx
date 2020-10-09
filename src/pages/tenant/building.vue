<template>
	<view  class="wrap">
		<view  class="head-bar">
			<view  class="bg"></view >
		</view >
		<u-sticky>
			<view  class="card">
				<p class="name"><em></em>收楼管理</p>
				<view class="input-box"><span>租户名称：</span><input placeholder="租户名称" v-model="skey_zh" class="uni-input" name="num"></view>
				<view class="btn" @click="getfcspList">查询</view>
			</view >
<!--			<u-radio-group class="tab" v-model="value" size="45" active-color="">-->
<!--				<u-radio-->
<!--						v-for="(item, index) in listType" :key="index"-->
<!--						shape="circle"-->
<!--						:name="item.name"-->
<!--						label-size="30"-->
<!--						@change="radioChange(item,index)"-->
<!--				>-->
<!--					<span :class="{active:currType===index}">{{item.name}}</span>-->
<!--				</u-radio>-->
<!--			</u-radio-group>-->
		</u-sticky>
		<view class="items">
			<view class="null" v-if="dataList.length===0">
				暂无数据
			</view>
			<view class="item" v-for="(item,index) in dataList" :key="index">
				<view style="flex:2;padding-right: 30rpx">
					<p class="title">租户名称：{{item.zhi_name}}</p>
					<p>房号：{{item.fcfx_ph}}</p>
					<p>联系方式：{{item.zhi_tel}}</p>
					<p>建面（m³）：{{item.fcfx_jzmj}}</p>
				</view>
				<view class="more-btn" @click="openDetail(item,index)">查看详情</view>
			</view>

		</view>
		<uni-pagination class="page-fix" show-icon="true" :total="total" pageSize="10" @change="chagePage"></uni-pagination>
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
	import {getfcspList} from "@/utils/api/index"
	export default {
		components: {uniDrawer,uniIcons,uniBadge,leftMenu,uniPagination},
		data() {
			return {
				listType:[
					{
						name: '启用',
					},
					{
						name: '停用',
					},
				],
				currType:0,
				dataList:[],
				currIndex:0,
				value: '启用',
				current: 0,
				total:0,
				skey_zh:''
			}
		},
		onLoad() {
			this.getfcspList()
		},
		methods: {
			openDetail(item){
				console.log(item);
				this.$Router.push({name:'收楼详情',params:{itemDetail:item}})
			},
			chagePage(e){
				console.log(e);
				this.getfcspList({page:e.current})
			},
			async getfcspList(params){
				if(this.skey_zh){
					params.skey_zh=this.skey_zh
				}
				let res = await getfcspList(params)
				if(res.code === 0){
					this.dataList = res.data.data
					this.total = res.data.count
					console.log(res);
				}else {

				}
			},
			radioGroupChange(e) {
				// this.currType = e
				if(e==='启用'){
					this.getfcspList()
				}else {
					this.electList()
				}
			},
			radioChange(e,index) {
				console.log(e);
				this.currType = index
				if(index===0){
					this.getfcspList()
				}else {
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
			position: fixed;
			top: 140rpx;
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
				margin-top: 36rpx;
			}
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
			padding: 360rpx 0 100rpx;
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
				width:700rpx;
				background:rgba(255,255,255,1);
				border-radius:10rpx;
				/*background: #00D29C;*/
				display: flex;
				margin-top: 20rpx;
				padding: 24rpx 20rpx 24rpx 30rpx;
				box-sizing: border-box;
				line-height: 1.8;
				box-shadow:0 6rpx 8rpx 2rpx rgba(0,0,0,0.09);
				position: relative;
				.title{
					font-size:32rpx;
					font-weight:500;
					color:rgba(89,89,89,1);
				}
				span{
					color: #999999;
				}
				.more-btn{
					margin-top: 6rpx;
				}
			}

		}
	}
</style>
