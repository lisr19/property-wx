<template>
	<view  class="wrap">
		<view  class="head-bar">
			<view  class="bg"></view >
		</view >
		<u-sticky :enable="enable">
			<view  class="card">
				<p class="name"><em></em>{{currTypeName}}管理</p>
				<view class="input-box"><span>租户名称：</span><input placeholder="租户名称" v-model.lazy="skey_zhna" class="uni-input" name="num"></view>
				<view class="btn" @click="serchBtn">查询</view>
			</view >
			<u-radio-group class="tab2" v-model="value" size="45">
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
				<template>
					<p v-if="item.zhhd_sort===1"><span>活动分类：</span>收楼</p>
					<p v-if="item.zhhd_sort===2"><span>活动分类：</span>装修</p>
					<p v-if="item.zhhd_sort===3"><span>活动分类：</span>退楼</p>
					<p v-if="item.zhhd_sort===4"><span>活动分类：</span>其他</p>
					<p v-if="item.zhhd_sort===5"><span>活动分类：</span>清洁</p>
				</template>
				<p v-if="item.zhhd_zt===1"><span>活动状态：</span>未收费</p>
				<template v-if="item.zhhd_zt!==1">
					<p v-if="item.zhhd_spzt===1"><span>活动状态：</span>未审</p>
					<p v-if="item.zhhd_spzt===2"><span>活动状态：</span>审核中</p>
					<p v-if="item.zhhd_spzt===3"><span>活动状态：</span>不通过</p>
					<p v-if="item.zhhd_spzt===4"><span>活动状态：</span>通过审核</p>
				</template>

				<p><span>租户名称：</span>{{item.zhhd_uname}}</p>
				<p><span>开始时间：</span>{{item.zhhd_sdt}}</p>
				<span class="more-btn" @click="openDetail(item,index)">查看详情</span>
				<!--<span v-if="item.zhhd_hfdtin===0" class="gd-btn" @click="gdItem(item,index)">归档</span>-->
			</view>
		</view>
		<uni-pagination class="page-fix" show-icon="true" :total="total" pageSize="10" @change="chagePage"></uni-pagination>
		<uni-drawer :visible="false" ref="leftBox">
			<leftMenu @closeMenu="closeMenu"></leftMenu>
		</uni-drawer>
		<u-select v-model="show" mode="single-column" :list="arrState"  @confirm="confirm"></u-select>
		<u-picker mode="time" v-model="showTime" @confirm="confirmTime" ></u-picker>

		<u-modal v-model="showTip" show-cancel-button :content="tipContent" @confirm="delBs"></u-modal>
	</view >
</template>

<script>
	import uniDrawer from "@/components/uni-drawer/uni-drawer.vue"
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	import leftMenu from "@/components/left-menu/left-menu.vue"
	import uniPagination from '@/components/uni-pagination/uni-pagination.vue'
	import {getzhhdList,getzhhdfList} from "@/utils/api/index"
	export default {
		components: {uniDrawer,uniIcons,leftMenu,uniPagination},
		data() {
			return {
				showTip:false,
				tipContent:'确定归档此记录吗？',
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
				total:0,
				currdh:'',
				enable:true,
			}
		},
		onLoad() {
			this.getzhhdList()
		},
		onShow() {
			this.enable= true
		},
		onHide() {
			this.enable= false
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
			gdItem(item){
				this.showTip =true
				this.currdh = item.zhhd_dh
			},
			async delBs(){
				let params ={
					id:this.currdh,
					del:4
				}
				let res = await getzhhdList(params)
				if(res.code === 0){
					this.getzhhdList()
					uni.showToast({
						title: '归档成功',
						icon: 'none',
						mask: false
					})
				}else {
					uni.showToast({
						title: '归档失败',
						icon: 'none',
						mask: false
					})
				}
				this.showTip =false
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
				this.getzhhdList({page:e.current})
			},
			//租户
			async getzhhdList(params){
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
		.tab2 {
			height: 80rpx;
			position: fixed;
			z-index: 9;
			background: #ffffff;
			top: 430rpx;
			width: 100%;
			padding: 0 38rpx;
			.active{
				color: #077AFF;
			}
		}
		.items{
			padding: 435rpx 0 120rpx;
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
				.gd-btn{
					position: absolute;
					right: 30rpx;
					top:76rpx;
				}
			}

		}
	}
</style>
