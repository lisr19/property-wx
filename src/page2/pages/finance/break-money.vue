<template>
	<view  class="wrap">
		<view  class="head-bar">
			<view  class="bg"></view >
		</view >
		<u-sticky>
			<view  class="card">
				<p class="name"><em></em>违约金</p>
				<view class="input-box">
					<span>租户名称：</span><u-input height="60"  v-model="skey_zh"  :border="border"/>
				</view>
<!--				<view class="input-box">-->
<!--					<span>年月：</span><u-input height="60"  v-model="data1" disabled :border="border" @click="openTime"/>-->
<!--				</view>-->
				<view class="btn" @click="getwyjList">查询</view>
			</view >
			<u-radio-group class="tab" v-model="value" size="45" active-color="">
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
			<view class="null" v-if="dataList.length===0">
				暂无数据
			</view>
			<view class="item" v-for="(item,index) in dataList" :key="index">
				<p class="title">租户：{{item.zhi_name}}</p>
				<p>收费名称：{{item.bz_title}}</p>
				<p><span>截止日期：</span>{{item.wyj_qxdt}}</p>
				<p><span>欠费月份：</span>{{item.wyj_mm}}</p>
				<p><span>欠费天数：</span>120</p>
				<p class="price2">欠费总额：{{item.wyj_zjr.toFixed(2)}}</p>
				<view class="btn-group">
					<view class="btn"  @click="delBtn(item,index)">
						<span class="iconfont iconbianzu62x"></span>删除
					</view>
				</view>
				<span class="state" v-if="item.wyj_zt===0">未缴</span>
				<span class="state" style="color: #999999" v-else>已缴</span>
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
	import {getwyjList} from "@/utils/api/index"
	export default {
		components: {uniDrawer,uniIcons,uniBadge,leftMenu,uniPagination},
		data() {
			return {
				skey_zh:'',
				show: false,
				showList: false,
				showTime: false,
				startTime: false,
				data1: '',
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
						name: '已缴',
					},
					{
						name: '未缴',
					},
				],
				currType:1,
				currTypeName:'',
				keyName:'',
				active:0,
				index:0,
				dataList:[],
				currIndex:0,
				value: '已缴',
				current: 0,
				total:0,
				isDel:false
			}
		},
		onLoad() {
			this.getwyjList({skey_zt:1})
		},
		methods: {
			openTime(e){
				this.showTime = true
			},
			delBtn(item,index){
				console.log(this.isDel);
				uni.showModal({
					title: '提示',
					content: '确定删除此记录吗？',
					success:  (res)=> {
						if (res.confirm) {
							console.log('用户点击确定');
							this.isDel= true
							this.getwyjList({id:item.wyj_id,del:1})
							setTimeout(()=>{
								this.isDel= false
								this.getwyjList()
							},100)
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
				this.data1 = e.year + '-'+e.month+'-'+e.day

			},
			chagePage(e){
				this.getwyjList({page:e.current})
			},
			async getwyjList(params){
				if(this.currType===1){
					params.skey_zt = 1
				}else {
					params.skey_zt = 0
				}
				if(this.skey_zh){
					params.skey_zh=this.skey_zh
				}
				let res = await getwyjList(params)
				if(res.code === 0){
					this.dataList = res.data.data
					this.total = res.data.count
					console.log(res);
				}
				this.isDel =false
			},
			radioChange(e,index) {
				this.currType = index+1
				if(this.currType===1){
					this.getwyjList({skey_zt:1})
				}else {
					this.getwyjList({skey_zt:0})
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
			background: #FAFBFD;
			top: 360rpx;
			width: 100%;
			padding: 0 38rpx;
			.active{
				color: #077AFF;
			}
		}
		.items{
			padding: 420rpx 0 100rpx;
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
				}
				span{
					color: #999999;
				}
				.price{
					color:#C5C5C5;
					span{
						color:#7A7A7A;
					}
				}
				.price2{
					color:#A00000;
				}
				.btn-group{
					display: flex;
					align-items: center;
					.iconfont{
						margin-right: 15rpx;
						font-size: 36rpx;
					}
					.btn{
						text-align: center;
						color: #7892B9;
						margin-top: 30rpx;
						margin-right: 64rpx;
						display: flex;
						align-items: center;
					}
				}
				.state{
					position: absolute;
					top: 20rpx;
					right: 26rpx;
					font-size:28rpx;
					font-family:PingFangSC-Regular,PingFang SC;
					font-weight:400;
					color:rgba(255,153,0,1);
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
