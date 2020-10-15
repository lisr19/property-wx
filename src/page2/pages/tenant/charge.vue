<template>
	<view  class="wrap">
		<view  class="head-bar">
			<view  class="bg"></view >
		</view >
		<u-sticky>
			<view  class="card">
				<p class="name"><em></em>收费审核</p>
				<u-radio-group class="tab" v-model="value" size="45">
					<u-radio class="u_rad" style="margin-right: 15px;"
							v-for="(item, index) in listType" :key="index"
							shape="circle"
							:name="item.name"
							label-size="30"
							@change="radioChange(item,index)"
					>
						<span :class="{active:currType===index}">{{item.name}}</span>
					</u-radio>
				</u-radio-group>
			</view >
		</u-sticky>
		<view class="items">
			<view class="null" v-if="dataList.length===0">
				暂无数据
			</view>
			<view class="item" v-for="(item,index) in dataList" :key="index">
				<view style="flex: 1">
					<p class="title">活动主题：{{item.zhhd_title}}</p>
					<template>
						<p v-if="item.zhhd_sort===1"><span>活动分类：</span>收楼</p>
						<p v-if="item.zhhd_sort===2"><span>活动分类：</span>装修</p>
						<p v-if="item.zhhd_sort===3"><span>活动分类：</span>退楼</p>
						<p v-if="item.zhhd_sort===4"><span>活动分类：</span>其他</p>
						<p v-if="item.zhhd_sort===5"><span>活动分类：</span>清洁</p>
					</template>
					<p><span>活动金额：</span>{{item.zhhd_jr}}</p>
					<p><span>所属楼宇：</span>{{item.fc_name}}</p>
					<!--<p><span>活动状态：</span>{{item.wdsp_zt}}</p>-->
					<p><span>租户名称：</span>{{item.zhhd_uname}}</p>
					<p><span>开始时间：</span>{{item.zhhd_sdt}}</p>
				</view>
				<view class="btn-group">
					<span class="btn" @click="showConfirmC(item,1)">通过</span>
					<span class="btn"  @click="showConfirmC(item,2)" style="color: #C06E6E">驳回</span>
				</view>
			</view>
		</view>
		<uni-pagination class="page-fix" show-icon="true" :total="total" pageSize="10" @change="chagePage"></uni-pagination>
		<uni-drawer :visible="false" ref="leftBox">
			<leftMenu @closeMenu="closeMenu"></leftMenu>
		</uni-drawer>
		<u-select v-model="show" mode="single-column" :list="arrState"  @confirm="confirm"></u-select>
		<u-picker mode="time" v-model="showTime" @confirm="confirmTime" ></u-picker>
<!--		确定弹窗-->
		<u-popup v-model="showC" mode="bottom" border-radius="20" height="552rpx" closeable>
			<view class="tip-box">
				<view class="tip-content">{{tipsContent}}</view>
				<view class="desc">说明：
					<u-input type="textarea" v-model="reason" border class="text"/>
				</view>
				<view class="btn">确定</view>
			</view>
		</u-popup>
	</view >
</template>

<script>
	import uniDrawer from "@/components/uni-drawer/uni-drawer.vue"
	import leftMenu from "@/components/left-menu/left-menu.vue"
	import uniPagination from '@/components/uni-pagination/uni-pagination.vue'
	import {getspList,getspList2} from "@/utils/api/index"
	export default {
		components: {uniDrawer,leftMenu,uniPagination},
		data() {
			return {
				tipsContent:'',
				reason:'',
				show: false,
				showC: false,
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
						name: '未收款',
					},
					{
						name: '已收款',
					},
				],
				currTypeName:'',
				currType:0,
				keyName:'',
				index:0,
				dataList:[],
				currIndex:0,
				value: '未收款',
				current: 0,
				total:0
			}
		},
		onLoad() {
			this.getspList()
		},
		methods: {
			showConfirmC(item,type){
				uni.showToast({
					title: '功能建设中',
					icon: 'none',
				})
				// if(type===1){
				// 	this.tipsContent = '确认通过此条记录吗？'
				// }else {
				// 	this.tipsContent = '确认驳回此条记录吗？'
				// }
				// this.showC = true
			},
			confirmC(){

			},
			openTime(e){
				if(e==='start'){
					this.startTime = true
				}else{
					this.startTime = false
				}
				this.showTime = true
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
				console.log(e);
			},
			async getspList(params){
				let res = await getspList(params)
				if(res.code === 0){
					this.dataList = res.data
					this.total = res.data.count
					console.log(res);
				}else {

				}
			},
			async getspList2(params){
				let res = await getspList2(params)
				if(res.code === 0){
					this.dataList = res.data
					this.total = res.data.count
					console.log(res);
				}else {

				}
			},
			// radioGroupChange(e) {
			// 	// this.currType = e
			// 	if(e==='启用用户'){
			// 		this.getspList()
			// 	}else {
			// 		this.getspList2()
			// 	}
			// },
			radioChange(e,index) {
				console.log(e);
				this.currType = index
				if(index===0){
					this.getspList()
				}else {
					this.getspList2()
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
			z-index: 9;
			background: #ffffff;
			top: 375rpx;
			width: 100%;
			/* #ifndef H5 */
			display: inline-block;
			/* #endif*/
			.active{
				color: #077AFF;
			}
			.u_rad{
				/* #ifndef H5 */
				display: block;
				/* #endif*/
			}
		}
		.items{
			padding: 275rpx 0 50rpx;
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
				display: flex;
				.title{
					font-size:32rpx;
					font-weight:500;
					color:rgba(89,89,89,1);
				}
				span{
					color: #999999;
				}
				.btn-group{
					display: flex;
					flex-direction: column;
					justify-content: center;
					font-size:28rpx;
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
	.tip-box{
		padding:60rpx;
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
