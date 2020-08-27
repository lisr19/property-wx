<template>
	<view  class="wrap">
		<view  class="head-bar">
			<view  class="bg"></view >
		</view >
		<u-sticky>
			<view  class="card">
				<p class="name"><em></em>报事管理</p>
				<view class="btn btn1" @click="showAdd=true">新增</view>
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
		<u-modal v-model="showTip" show-cancel-button content="确定删除此记录吗？" @confirm="delBs"></u-modal>
		<u-modal v-model="showAdd" show-cancel-button  :show-title="false" :async-close="true" width="700rpx" @confirm="submit">
			<view class="slot-content" >
				<u-form :model="form" ref="uForm" >
					<u-form-item label="标题" label-width="120"  prop="bs_title">
						<u-input  :border="true" v-model="form.bs_title"/>
					</u-form-item>
					<u-form-item label="报事人" label-width="120" prop="bs_bsr">
						<u-input  :border="true" v-model="form.bs_bsr" />
					</u-form-item>
					<u-form-item label="日期" label-width="120" prop="bs_dt">
						<u-input  type="select"   disabled :border="true" v-model="form.bs_dt" @click="showTime=true"/>
					</u-form-item>
					<u-form-item label="来源" label-width="120" prop="bs_ly">
						<u-input  :border="true"  v-model="form.bs_ly"  type="select" @click="showLy=true"/>
					</u-form-item>
					<u-form-item label="办理人" label-width="120" prop="bs_blr">
						<u-input  :border="true"   v-model="form.bs_blr"  type="select" @click="showLy=true"/>
					</u-form-item>
					<u-form-item label="描述" label-width="120"  prop="bs_ms" >
						<u-input :border="true" v-model="form.bs_ms" type="textarea"/>
					</u-form-item>
				</u-form>
			</view>
		</u-modal>
		<u-select v-model="showLy" :list="list" @confirm="confirmLy"></u-select>
		<u-picker mode="time" v-model="showTime" @confirm="confirmTime" ></u-picker>
	</view >
</template>

<script>
	import uniDrawer from "@/components/uni-drawer/uni-drawer.vue"
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	import uniBadge from "@/components/uni-badge/uni-badge.vue"
	import leftMenu from "@/components/left-menu/left-menu.vue"
	import uniPagination from '@/components/uni-pagination/uni-pagination.vue'
	import {getbsList,delBs,getbsAdd} from "@/utils/api/index"
	export default {
		components: {uniDrawer,uniIcons,uniBadge,leftMenu,uniPagination},
		data() {
			return {
				form: {
					bs_title:'',
					bs_bsr:'',
				},
				rules:{
					bs_title: [
						{
							required: true,
							message: '请输入标题',
						}
					],
					bs_bsr: [
						{
							required: true,
							message: '请输入报事人',
						}
					],
					bs_dt: [
						{
							required: true,
							message: '请选择日期',
						}
					],
					bs_ly: [
						{
							required: true,
							message: '请选择来源',
						}
					],
					bs_blr: [
						{
							required: true,
							message: '请选择办理人',
						}
					],
					bs_ms: [
						{
							required: true,
							message: '请输入描述',
						}
					],

				},
				list: [
					{
						value: '1',
						label: '线上'
					},
					{
						value: '2',
						label: '线下'
					}
				],
				showLy:false,
				showTime:false,
				dataList:[],
				currIndex:0,
				current: 0,
				total:0,
				showTip:false,
				showAdd:false,
				currbsdh:''
			}
		},
		onLoad() {
			this.getbsList()
		},
		onReady() {
		},
		methods: {
			submit() {
				this.$refs.uForm.setRules(this.rules)
				setTimeout(()=>{
					this.$refs.uForm.validate(valid => {
						console.log(valid);
						if (valid) {
							console.log('验证通过');
						} else {
							console.log('验证失败');
						}
					});
				},100)
				// this.showAdd = false;
			},
			confirmTime(e){
				console.log(e);
				this.form.bs_dt = e.year + '-'+e.month+'-'+e.day

			},
			confirmLy(e) {
				this.form.bs_ly = e[0].label
				// this.form.bs_ly = e[0].value
			},
			delItem(item,index){
				this.showTip =true
				this.currbsdh = item.bs_dh
				this.currIndex = index
			},
			async getbsAdd(params){
				let res = await getbsAdd(params)
				if(res.code === 0){
					this.getbsList()
				}else {
					uni.showToast({
						title: '添加失败',
						icon: 'none',
						mask: false
					})
				}
			},
			async delBs(){
				let params ={
					bs_dh:this.currbsdh,
					del:1
				}
				let res = await delBs(params)
				if(res.code === 0){
					this.getbsList()
					uni.showToast({
						title: '删除成功',
						icon: 'none',
						mask: false
					})
				}else {
					uni.showToast({
						title: '删除失败',
						icon: 'none',
						mask: false
					})
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
	.slot-content{
		padding: 10rpx 26rpx;
	}
</style>
