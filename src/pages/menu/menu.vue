<template>
	<view  class="content">
		<view class="status_bar" :style="{height:height+'px'}"></view>
		<view  class="head-bar" :style="{top:height+'px'}">
			<view  class="bg"></view >
			<p class="title" @click="openBox">
				<span class="iconfont iconcaidan"></span><span style="z-index: 99;position: absolute;margin-left: 80rpx">物业管理系统</span></p>
			<view  class="card" :style="{top:height+62+'px'}" >
				<p class="name"><em></em>{{typeName}}</p>
				<ul class="type-items" :style="{height:listHeight+'px'}">
					<li class="item" v-for="(item,index) in typeList" :key="index" @click="openDetail(item)">{{item.name}}</li>
				</ul>
			</view >
		</view >
		<uni-drawer :visible="false" ref="leftBox">
			<leftMenu @closeMenu="closeMenu"></leftMenu>
		</uni-drawer>
	</view >
</template>

<script>
	import leftMenu from "@/components/left-menu/left-menu.vue"
	export default {
		components: {
			leftMenu
		},

		data(){
			return{
				typeName:'',
				typeList:[],
				listHeight:500,
				height:0,
			}
		},
		onLoad(){
			// 获取手机状态栏高度
			uni.getSystemInfo({
				success:(data)=>{
					// 将其赋值给this
					this.height=data.statusBarHeight;
				}
			})
		},
		onShow() {
			uni.getSystemInfo({
				success: (res)=> {
					console.log(res.windowHeight);
					this.listHeight = res.windowHeight - 142
				}
			});
			this.initData()
		},
		methods: {
			initData(){
				let type = this.$Route.query.type?this.$Route.query.type:null
				if(type===null){
					uni.getStorage({
						key: 'typeName',
						success:  (res) =>{
							this.typeName=res.data
							type=res.data
						}
					})
				}else {
					uni.setStorage({
						key:'typeName',
						data:type
					})
					this.typeName = type
				}
				switch(type) {
					case '日常工作':
						this.typeList = [
							{name:'工作台主页'},
							{name:'报事管理'},
							{name:'报事办理'},
							{name:'报事备案'}
						]
						break;
					case '房产管理':
						this.typeList = [
							{name:'楼宇设置'},
							{name:'单元设置'},
							{name:'房型（业主）设置'},
							{name:'车位设置'},
							{name:'水/电表设置'},
							{name:'水/电表价格设置'},
						]
						break;
					case '租户管理':
						this.typeList = [
							{name:'租户信息'},
							{name:'车位信息'},
							{name:'收楼管理'},
							{name:'活动管理'},
							{name:'活动审核'},
							{name:'收费审核'},
							{name:'装修巡检'},
							{name:'装修过程管理'},
							{name:'装修过程审核'},
							{name:'活动回访'},
							{name:'归档记录'},
							{name:'租户留言'},
						]
						break;
					case '财务管理':
						this.typeList = [
							// {name:'计费管理'},
							{name:'计费审批'},
							{name:'杂费管理'},
							{name:'保证金管理'},
							{name:'违约金管理'},
							{name:'缴费汇总'},
						]
						break;
					case '设备管理':
						this.typeList = [
							{name:'保养计划'},
							{name:'保养验收'},
						]
						break;
					case '仓库管理':
						this.typeList = [
							{name:'物品管理'},
							{name:'库存查询'},
						]
						break;
					case '巡检排班':
						this.typeList = [

						]
						break;
					case '档案管理':
						this.typeList = [
							{name:'档案查询'},
							{name:'到期提醒'},
						]
						break;
					case '外派管理':
						this.typeList = [
							{name:'服务记录'},
						]
						break;
				}
			},

			openDetail(item,index){
				console.log(item.name);
				if(item.name==='工作台主页'){
					this.$Router.push({name: '首页'})
				}else if(item.name==='活动审核'||item.name==='装修巡检'||item.name==='装修过程管理'||item.name==='装修过程审核'||item.name==='收费审核'){
					uni.showToast({
						title: '功能建设中',
						icon: 'none',
					})
				} else {
					this.$Router.push({name: item.name})
				}
				this.closeMenu()
			},
			openBox(){
				this.$refs.leftBox.open()
			},
			closeMenu() {
				this.$emit("closeMenu");
			}
		}
	};
</script>

<style lang="less" scoped>
	.content {
		font-size: 24rpx;
		color: #666666;
		line-height: 36rpx;
		.head-bar {
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: rgba(255, 255, 255, 1);
			height: 384rpx;
			background: rgba(6, 25, 104, 1);
			position: fixed;
			top: 0;
			width: 100%;
			z-index: 9;
			.bg {
				top: -180rpx;
				border-radius: 50%;
				width: 750rpx;
				background: -webkit-linear-gradient(327deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.2) 100%);
				background: linear-gradient(123deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.15) 100%);
				position: absolute;
				left: -170rpx;
				height: 680rpx;
			}
			.title {
				text-align: left;
				display: flex;
				align-items: center;
				padding: 26rpx 40rpx 28rpx;
				font-size: 36rpx;
				.menu {
					width: 60rpx;
					height: 60rpx;
					margin-right: 20rpx;
					z-index: 102;
				}
				.iconcaidan{
					font-size: 48rpx;
					margin-right: 30rpx;
					z-index: 99;
				}
			}
		}
		.card{
			background:rgba(248,248,248,1);
			position: absolute;
			width:90.5%;
			top: 124rpx;
			left: 5%;
			z-index: 10;
			font-size: 64rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: rgba(51, 51, 51, 1);
			box-shadow: 0 4rpx 16rpx 0 rgba(0, 0, 0, 0.06);
			border-radius: 10rpx;
			padding: 32rpx 24rpx;
			box-sizing: border-box;
			.name{
				font-size:36rpx;
				font-family:PingFangSC-Semibold,PingFang SC;
				font-weight:600;
				color:rgba(51,51,51,1);
				margin-bottom: 40rpx;
				em{
					width:14rpx;
					height:14rpx;
					background:#00D29C;
					display: inline-block;
					margin-right: 12rpx;
					border-radius: 50%;
				}
			}
			.type-items{
				font-size:32rpx;
				font-family:PingFangSC-Regular,PingFang SC;
				font-weight:400;
				color:rgba(51,51,51,1);
				line-height:22rpx;
				overflow: auto;
				.item{
					text-align: center;
					height:74rpx;
					line-height: 74rpx;
					background:rgba(255,255,255,1);
					box-shadow:0 4rpx 8rpx 0 rgba(40,40,40,0.08);
					border-radius:38rpx;
					margin-bottom: 20rpx;
				}
			}
		}
	}
</style>