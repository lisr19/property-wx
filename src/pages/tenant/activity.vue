<template>
	<view  class="wrap">
		<view  class="head-bar">
			<view  class="bg"></view >
		</view >
		<u-sticky>
			<view  class="card">
				<p class="name"><em></em>{{currTypeName}}管理</p>
				<view class="input-box"><span>租户名称：</span><input placeholder="租户名称" v-model.lazy="skey_zhna" class="uni-input" name="num"></view>
				<view class="btn" @click="serchBtn">查询</view>
<!--				<view class="input-box">-->
<!--					<span>范围：</span>-->
<!--					<u-input v-model="data1" placeholder=""  disabled :border="border" height="60" @click="openTime('start')" /> &#45;&#45;-->
<!--					<u-input v-model="data2" placeholder="" disabled :border="border" height="60" @click="openTime('end')" />-->
<!--				</view>-->
			</view >
			<u-radio-group class="tab" v-model="value" size="45">
				<u-radio
						v-for="(item, index) in listType" :key="index"
						shape="circle"
						:name="item.name"
						label-size="30"
						@change="radioChange(item,index)"
				>
					<span :class="{active:currType===index}">{{item.name}}</span>
				</u-radio>
			</u-radio-group>
		</u-sticky>
		<view class="items">
			<view class="item" v-for="(item,index) in dataList" :key="index">
				<p class="title">活动主题：{{item.zhhd_title}}</p>
				<p><span>活动分类：</span>{{item.name}}</p>
				<p><span>活动状态：</span>{{item.zhhd_zt===1?'未收费':'通过审核'}}</p>
				<p><span>租户名称：</span>{{item.zhhd_uname}}</p>
				<p><span>开始时间：</span>{{item.zhhd_sdt}}</p>
				<span class="more-btn" @click="openDetail(item,index)">查看详情</span>
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
	import {getzhhdList,getzhhdfList} from "@/utils/api/index"
	export default {
		components: {uniDrawer,uniIcons,uniBadge,leftMenu,uniPagination},
		data() {
			return {
				skey_zhna:'',
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
						label: '未提交'
					},
					{
						value: '2',
						label: '已提交'
					},
					{
						value: '3',
						label: '未通过审核'
					},
					{
						value: '4',
						label: '已通过审核'
					},
					{
						value: '5',
						label: '回访'
					}
				],
				listType:[
					{
						name: '租户活动',
					},
					{
						name: '非租户活动',
					},
				],
				currType:0,
				currTypeName:'租户活动',
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
			this.getzhhdList()
		},
		methods: {
			serchBtn(){
				if(this.currType===0){
					this.getzhhdList()
				}else {
					this.getzhhdfList()
				}
			},
			openDetail(item){
				this.$Router.push({name:'活动详情',params:{item:item,id:item.zhhd_dh}})
			},
			confirm(e) {
				console.log(e[0].label)
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
				console.log(e);
			},
			//租户
			async getzhhdList(){
				let params = {}
				if(this.skey_zhna){
					params.skey_zhna = this.skey_zhna
				}
				let res = await getzhhdList(params)
				if(res.code === 0){
					this.dataList = res.data.data
					this.total = res.data.count
				}else {

				}
			},
			//非租户
			async getzhhdfList(){
				let params = {}
				if(this.skey_zhna){
					params.skey_zhna = this.skey_zhna
				}
				let res = await getzhhdfList(params)
				if(res.code === 0){
					this.dataList = res.data.data
					this.total = res.data.count
				}else {

				}
			},


			// radioGroupChange(e) {
			// 	if(e==='租户活动'){
			// 		this.getzhhdList()
			// 	}else {
			// 		this.getzhhdfList()
			// 	}
			// },
			radioChange(e,index) {
				this.currType = index
				this.currTypeName = e.name
				if(this.currType===0){
					console.log(111);
					this.getzhhdList()
				}else {
					console.log(22);
					this.getzhhdfList()
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
			padding: 450rpx 0 50rpx;
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
				.title{
					font-size:32rpx;
					font-weight:500;
					color:rgba(89,89,89,1);
					width: 480rpx;
				}
				span{
					color: #999999;
				}
				.more-btn{
					position: absolute;
					right: 30rpx;
					top:16rpx;
				}
			}

		}
	}
</style>
