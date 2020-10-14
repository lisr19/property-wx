<template>
	<view  class="wrap">
		<view  class="head-bar">
			<view  class="bg"></view >
		</view >
		<u-sticky>
			<view  class="card">
				<p class="name"><em></em>活动回访</p>
				<view class="input-box"><span>租户名称：</span><input placeholder="租户名称或手机号" v-model="skey_zhna" class="uni-input" name="num"></view>
				<view class="btn" @click="getlyList">查询</view>
			</view >
		</u-sticky>
		<view class="items">
			<view class="null" v-if="dataList.length===0">
				暂无数据
			</view>
			<view class="item" v-for="(item,index) in dataList" :key="index">
				<p class="title">标题：{{item.ly_title?item.ly_title:'无'}}</p>
				<p>租户：{{item.zhi_name?item.zhi_name:'无'}}</p>
				<p>留言日期：{{item.ly_dt}}</p>
				<p>回复内容：{{item.ly_hfnoty?item.ly_hfnoty:'无'}}</p>
				<p v-if="item.ly_hfuna">回复人：{{item.ly_hfuna}}</p>
				<p  v-if="item.ly_hfdt">回复日期：{{item.ly_hfdt}}</p>
				<span class="btn" @click="openHf(item)">回访</span>
			</view>
		</view>
		<uni-pagination class="page-fix" show-icon="true" :total="total" pageSize="10" @change="chagePage"></uni-pagination>
		<uni-drawer :visible="false" ref="leftBox">
			<leftMenu @closeMenu="closeMenu"></leftMenu>
		</uni-drawer>
		<u-popup v-model="showReply" mode="bottom" border-radius="20" height="552rpx" closeable>
			<view class="tip-box">
<!--				<view class="tip-content">标题</view>-->
				<view class="desc">回复内容：
					<input class="uni-input text" cursor-spacing="150" v-model="reason" />
					<!--<u-input type="textarea" v-model="reason" border class="text"/>-->
				</view>
				<view class="btn" @click="addLyhf">确定</view>
			</view>
		</u-popup>
	</view >
</template>

<script>
	import uniDrawer from "@/components/uni-drawer/uni-drawer.vue"
	import leftMenu from "@/components/left-menu/left-menu.vue"
	import uniPagination from '@/components/uni-pagination/uni-pagination.vue'
	import {getlyList,addLyhf} from "@/utils/api/index"
	export default {
		components: {uniDrawer,leftMenu,uniPagination},
		data() {
			return {
				skey_zhna:'',
				currType:0,
				showReply:false,
				reason:'',
				hf_id:'',
				dataList:[],
				currIndex:0,
				value: '启用用户',
				current: 0,
				total:0
			}
		},
		onLoad() {
			this.getlyList()
		},
		methods: {
			openHf(item){
				this.showReply=true
				this.hf_id = item.ly_id
				if(item.ly_hfnoty){
					this.reason =item.ly_hfnoty
				}else {
					this.reason = ''
				}
			},
			async addLyhf(){
				let params = {
					id:this.hf_id,
					ly_hfnoty:this.reason,
				}
				let res = await addLyhf(params)
				if(res.code === 0){
					this.getlyList()
					this.showReply=false
					uni.showToast({
						title: '回复成功',
						icon: 'none',
						mask: false
					})

				}
			},
			chagePage(e){
				this.getlyList({page:e.current})
			},
			async getlyList(params){
				if(this.skey_zhna){
					params.skey_zhna=this.skey_zhna
				}
				let res = await getlyList(params)
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
					this.getlyList()
				}else {
					this.electList()
				}
			},
			radioChange(e,index) {
				console.log(e);
				this.currType = index
				if(index===0){
					this.getlyList()
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
				.title{
					font-size:32rpx;
					font-weight:500;
					color:rgba(89,89,89,1);
				}
				.btn{
					position: absolute;
					top: 20rpx;
					right: 20rpx;
					width:206rpx;
					height:76rpx;
					line-height: 76rpx;
					background:rgba(245,245,245,1);
					border-radius:38rpx;
					text-align: center;
					color: #78C06E;
					font-size:28rpx;
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
