<template>
	<view  class="wrap">
		<view  class="head-bar">
			<view  class="bg"></view >
		</view >
		<u-sticky>
			<view  class="card">
				<p class="name"><em></em>查看收费计划</p>

				<view class="input-box">
					<span>租户：</span><u-input height="60"   placeholder=""  :border="border"  />
				</view>
				<view class="btn">查询</view>
			</view >
		</u-sticky>
		<view class="items">
			<view class="null" v-if="dataList.length===0">
				暂无数据
			</view>
			<view class="item" v-for="(item,index) in dataList" :key="index">
				<view style="flex: 1">
					<p class="title">租户：{{item.zhi_name}}</p>
					<p>标题：{{item.bz_title}}</p>
					<p><span>所属月份：</span>{{item.jh_zq}}</p>
					<p class="price"><span >金额：</span>{{parseFloat(item.fcfx_jzmj).toFixed(2)}}</p>
				</view>
				<view class="btn-group">
					<span class="btn" @click="passBtn(item)">通过</span>
					<span class="btn" @click="nopassBtn(item)" style="color: #C06E6E">不通过</span>
				</view>

			</view>
		</view>
		<uni-pagination class="page-fix" show-icon="true" :total="total" pageSize="10" @change="chagePage"></uni-pagination>
		<uni-drawer :visible="false" ref="leftBox">
			<leftMenu @closeMenu="closeMenu"></leftMenu>
		</uni-drawer>
		<u-picker mode="time" v-model="showTime" @confirm="confirmTime" ></u-picker>
		<u-popup v-model="showC" mode="bottom" border-radius="20" height="552rpx" closeable>
			<view class="tip-box">
				<view class="tip-content">确认不通过此条记录吗？</view>
				<view class="desc">不通过说明：
					<u-input type="textarea" v-model="reason" border class="text"/>
				</view>
				<view class="btn" @click="comNopass">确定</view>
			</view>
		</u-popup>
	</view >
</template>

<script>
	import uniDrawer from "@/components/uni-drawer/uni-drawer.vue"
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	import uniBadge from "@/components/uni-badge/uni-badge.vue"
	import leftMenu from "@/components/left-menu/left-menu.vue"
	import uniPagination from '@/components/uni-pagination/uni-pagination.vue'
	import {getfvList,editJfsp} from "@/utils/api/index"
	export default {
		components: {uniDrawer,uniIcons,uniBadge,leftMenu,uniPagination},
		data() {
			return {
				nopassData:{},
				showC:false,
				tipsContent:'',
				reason:'',
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
				currTypeName:'',
				keyName:'',
				active:0,
				index:0,
				dataList:[],
				currIndex:0,
				current: 0,
				total:0
			}
		},
		onLoad() {
			let id =this.$Route.query.id
			this.getfvList({id:id})
		},
		methods: {
			nopassBtn(item){
				this.showC=true
				this.nopassData = {
						add51:1,
						qyid:item.jmx_id,
						qydh:item.jh_dh,
						qydel:2,
						qycwid:item.cw_id,
						xid:item.fcfx_id,
						gxid:item.jh_zq,

				}
			},
			comNopass(){
				this.nopassData.lysm=this.reason
				console.log(this.nopassData);
				this.editJfsp(this.nopassData)
			},
			passBtn(item){
				console.log(item);
				uni.showModal({
					title: '提示',
					content: '确定通过此记录吗？',
					success:  (res)=> {
						if (res.confirm) {
							console.log('用户点击确定');
							this.editJfsp({
								add51:1,
								qyid:item.jmx_id,
								qydh:item.jh_dh,
								qydel:2,
								qycwid:item.cw_id,
								xid:item.fcfx_id,
								gxid:item.jh_zq
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
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
				this.getfvList({page:e.current})
			},
			async getfvList(params){
				let res = await getfvList(params)
				if(res.code === 0){
					this.dataList = res.data
					this.total = res.data.count
					console.log(res);
				}else {

				}
			},
			async editJfsp(params){
				let res = await editJfsp(params)
				if(res.code === 0){
					uni.showToast({
						title: '审核通过',
						icon: 'none',
						mask: false
					})
				}else {

				}
			},
			radioGroupChange(e) {
				// this.currType = e
				if(e==='启用用户'){
					this.getfvList()
				}else {

				}
			},
			radioChange(e,index) {
				console.log(e);
				this.currType = index
				if(index===0){
					this.getfvList()
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
				margin-top: 20rpx;
				padding: 24rpx 30rpx;
				box-sizing: border-box;
				line-height: 1.8;
				box-shadow:0 6rpx 8rpx 2rpx rgba(0,0,0,0.09);
				display: flex;
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
					align-items: center;
					justify-content: center;
					.btn{
						width:166rpx;
						height:68rpx;
						line-height: 68rpx;
						text-align: center;
						background:rgba(245,245,245,1);
						border-radius:38rpx;
						color:rgba(120,192,110,1);
						margin: 18rpx 0;
					}
				}
			}

		}
	}
	.tip-box{
		padding:10rpx 60rpx;
		font-size:28rpx;
		.tip-content{
			font-size: 36rpx;
			padding-top: 30rpx;
			font-weight:600;
			color:rgba(51,51,51,1);
		}
		.desc{
			margin: 40rpx 0 30rpx;
			.text{
				height:166rpx;
				background:rgba(250,250,250,1);
				border-radius:8rpx;
				border:2rpx solid rgba(237,237,237,1);
				margin-top: 20rpx;
			}
		}
		.btn{
			width:214rpx;
			height:86rpx;
			line-height:86rpx;
			text-align: center;
			background:rgba(1,122,255,1);
			border-radius:14rpx;
			font-size:30rpx;
			font-weight:500;
			color:rgba(255,255,255,1);
			position: absolute;
			right: 58rpx;
			bottom: 40rpx;
		}
	}
</style>
