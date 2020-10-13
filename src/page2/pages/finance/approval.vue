<template>
	<view  class="wrap">
		<view  class="head-bar">
			<view  class="bg"></view >
		</view >
		<u-sticky>
			<view  class="card">
				<p class="name"><em></em>计费审批</p>

				<view class="input-box">
					<span>所属楼宇：</span><u-input height="60"  v-model="currTypeName" placeholder="请选择楼宇" :type="type"  :border="border" @click="" />
				</view>
				<view class="btn">查询</view>
			</view >
		</u-sticky>
		<view class="items">
			<view class="item" v-for="(item,index) in dataList" v-if="item.jh_yjzjr!==0" :key="index">
				<p class="title">收费项目：{{item.cw_title}}</p>
				<p><span>所属楼宇：</span>{{item.fc_name}}</p>
				<p><span>所属月份：</span>{{item.jh_zq}}</p>
				<p><span>开始日期：</span>{{item.jh_sdt}}</p>
				<p><span>结束日期：</span>{{item.jh_edt}}</p>
				<p class="price"><span >应缴总金额：</span>{{item.jh_yjzjr.toFixed(2)}}</p>
				<p class="price"><span >应缴总户数：</span>{{item.jh_yjzhs}}</p>
				<span @click="openDeatil(item)" class="tip" v-if="item.jh_ztspsm">已计费<u-icon name="arrow-right" style="margin-left: 10rpx" color="#D6D6D6" size="28"></u-icon></span>
				<span @click="openDeatil(item)" class="tip" style="color: #FCA302" v-else>待计费<u-icon name="arrow-right" style="margin-left: 10rpx" color="#D6D6D6" size="28"></u-icon></span>
<!--				<view class="btn-group">-->
<!--					<span class="btn">通过</span>-->
<!--					<span class="btn" style="color: #C06E6E">驳回</span>-->
<!--				</view>-->

			</view>
		</view>
		<uni-pagination class="page-fix" show-icon="true" :total="total" pageSize="10" @change="chagePage"></uni-pagination>
		<uni-drawer :visible="false" ref="leftBox">
			<leftMenu @closeMenu="closeMenu"></leftMenu>
		</uni-drawer>
		<u-select v-model="show" mode="single-column" :list="arrState"  @confirm="confirm"></u-select>
		<u-picker mode="time" v-model="showTime" @confirm="confirmTime" ></u-picker>
	</view >
</template>

<script>
	import uniDrawer from "@/components/uni-drawer/uni-drawer.vue"
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	import uniBadge from "@/components/uni-badge/uni-badge.vue"
	import leftMenu from "@/components/left-menu/left-menu.vue"
	import uniPagination from '@/components/uni-pagination/uni-pagination.vue'
	import {getjfspList} from "@/utils/api/index"
	export default {
		components: {uniDrawer,uniIcons,uniBadge,leftMenu,uniPagination},
		data() {
			return {
				show: false,
				showTime: false,
				startTime: false,
				data1: '',
				data2: '',
				type:'select',
				border: true,
				arrState: [
					{
						value: '1',
						label: '未审'
					},
					{
						value: '2',
						label: '不通过'
					},
					{
						value: '3',
						label: '通过'
					},
				],
				listType:[
					{
						name: '租户活动',
					},
					{
						name: '非租户活动',
					},
				],
				currTypeName:'',
				keyName:'',
				active:0,
				index:0,
				dataList:[],
				currIndex:0,
				value: '租户活动',
				current: 0,
				total:0
			}
		},
		onLoad() {
			this.getjfspList()
		},
		methods: {
			openDeatil(item){
				this.$Router.push({name:'计费详情',params:{id:item.jh_dh}})
			},
			confirm(e) {
				console.log(e[0].label);
				this.currTypeName=e[0].label
			},
			confirmTime(e){
				console.log(e);
				if(this.startTime){
					this.data1 = e.year + '-'+e.month+'-'+e.day
				}else{
					this.data2 = e.year + '-'+e.month+'-'+e.day
				}

			},
			chagePage(e){
				this.getjfspList({page:e.current})
			},
			async getjfspList(params){
				let res = await getjfspList(params)
				if(res.code === 0){
					this.dataList = res.data.data
					this.total = res.data.count
					console.log(res);
				}else {

				}
			},
			radioGroupChange(e) {
				// this.currType = e
				if(e==='启用用户'){
					this.getjfspList()
				}else {

				}
			},
			radioChange(e,index) {
				console.log(e);
				this.currType = index
				if(index===0){
					this.getjfspList()
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
				margin-top: 24rpx;
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
			padding: 360rpx 0 50rpx;
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			overflow: auto;
			font-size:28rpx;
			font-family:PingFangSC-Regular,PingFang SC;
			font-weight:400;
			color:#333333;
			.item{
				width:690rpx;
				background:rgba(255,255,255,1);
				border-radius:10rpx;
				/*background: #00D29C;*/
				margin-top: 20rpx;
				padding: 24rpx 30rpx;
				box-sizing: border-box;
				line-height: 1.8;
				box-shadow:0 6rpx 8rpx 2rpx rgba(0,0,0,0.09);
				position: relative;
				.tip{
					position: absolute;
					right: 20rpx;
					top: 5%;
				}
				.title{
					font-size:32rpx;
					font-weight:500;
					color:rgba(89,89,89,1);
				}
				span{
					color: #999999;
				}
				.price{
					color:rgba(10,72,130,1);
					span{
						color:rgba(10,72,130,1);
					}
				}
				.btn-group{
					display: flex;
					flex-direction: column;
					position: absolute;
					font-size:28rpx;
					top: 50rpx;
					right: 40rpx;
					.btn{
						width:206rpx;
						height:76rpx;
						line-height: 76rpx;
						text-align: center;
						background:rgba(245,245,245,1);
						border-radius:38rpx;
						color:rgba(120,192,110,1);
						margin-top: 36rpx;
					}
				}
			}

		}
	}
</style>
