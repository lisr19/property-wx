<template>
	<view  class="content">
		<view  class="head-bar">
			<view  class="bg"></view >
			<p class="title"><image class="menu" src="/static/logo.png" @click="openBox"></image>物业管理系统</p>
			<view  class="card">
				<p class="name"><em></em>房产管理</p>
				<view  class="tab-bar">
					<ul class="nav">
						<li :class="{active:currIndex===index}" :key="index" v-for="(item,index) in typeList" @click="tagType(index)">
							<p>{{item.name}}</p>
						</li>
					</ul>
					<u-radio-group v-model="value" @change="radioGroupChange" size="45" active-color="#000">
						<u-radio
								@change="radioChange"
								v-for="(item, index) in list" :key="index"
								shape="circle"
								:name="item.name"
								label-size="30"
						>
							{{item.name}}
						</u-radio>
					</u-radio-group>
				</view >
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
			// 选中某个单选框时，由radio时触发
			radioChange(e) {
				// console.log(e);
			},
			// 选中任一radio时，由radio-group触发
			radioGroupChange(e) {
				console.log(e);
				if(e==='已设置'){

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
<style scoped>
	/deep/ .uni-list-item__container{
		padding: 8px 14px 3px;
	}
	/deep/ .uni-list-item__content-title{
		font-size:16px;
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(51,51,51,1);
	}
</style>
<style lang="less" scoped>
	.content{
		font-size: 12px;
		color: #666666;
		line-height: 18px;
		.head-bar{
			font-family:PingFangSC-Medium,PingFang SC;
			font-weight:500;
			color:rgba(255,255,255,1);
			height:192px;
			background:rgba(6,25,104,1);
			position: fixed;
			top: 0;
			width: 100%;
			z-index: 9;
			.bg{
				top: -70px;
				border-radius: 50%;
				width: 380px;
				background: -webkit-linear-gradient(327deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.2) 100%);
				background: linear-gradient(123deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.15) 100%);
				position: absolute;
				left: -85px;
				height: 350px;
			}
			.title{
				text-align:left;
				display: flex;
				align-items: center;
				padding: 15px 20px 14px;
				font-size:18px;
				.menu{
					width: 30px;
					height: 30px;
					margin-right: 10px;
					z-index: 102;
				}
			}
			.card{
				width:90%;
				position: absolute;
				top: 70px;
				left:5%;
				z-index: 10;
				font-weight:500;
				color:rgba(51,51,51,1);
				background:rgba(255,255,255,1);
				border-radius:5px;
				height:160px;
				box-shadow:0px 2px 6px 0px rgba(0,0,0,0.09);
				padding: 15px;
				box-sizing: border-box;
				image{
					width: 40px;
					height: 40px;
					margin-right: 24px;
				}
				.name{
					font-size:16px;
					font-family:PingFangSC-Semibold,PingFang SC;
					font-weight:600;
					color:rgba(51,51,51,1);
					line-height:22px;
					margin-bottom: 15px;
					display: flex;
					align-items: center;
					em{
						width:6px;
						height:7px;
						background:#00D29C;
						display: inline-block;
						margin-right: 6px;
						border-radius: 50%;
					}
				}
			}
			.tab-bar{
				border-bottom: solid 1.5px rgba(255,255,255,0.21);
				margin-top: 5px;
				ul{
					display: flex;
					margin: 10px 0 25px;
					li{
						margin-right:20px;
						display: flex;
						align-items: center;
						position: relative;
						justify-content: center;
						font-size:14px;
						width:124px;
						height:36px;
						color: #111548;
						border:1px solid rgba(17,21,72,1);
						border-radius:8px;
						font-family:PingFangSC-Medium,PingFang SC;
						font-weight:500;
					}
					li.active{
						background:rgba(52,142,255,1);
						border-radius:8px;
						font-weight:500;
						color:rgba(255,255,255,1);
						border:none;
					}
				}
			}
		}
		.wrap{
			font-size:14px;
			font-family:PingFangSC-Regular,PingFang SC;
			font-weight:400;
			color:#333333;
			line-height:20px;
			text-align: center;
			padding:240px 0 0;
			.title{
				color: #999999;
			}
			.uni-row{
				display: flex;
				align-items: center;
				justify-content: space-between;
				.flex-item{
					flex: auto;
					margin: 8px 0;
				}
			}
		}
	}
</style>
