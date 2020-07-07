<template>
	<view  class="content">
		<view  class="head-bar">
			<view  class="bg"></view >
			<p class="title"><image class="menu" src="/static/logo.png" @click="openBox"></image>物业管理系统</p>
			<view  class="card" :style="{height:listHeight+'px'}">
				<p class="name"><em></em>{{typeName}}</p>
				<ul class="type-items">
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
		props: {
		},
		data(){
			return{
				typeName:'',
				typeList:[],
				listHeight:500,
			}
		},
		onLoad() {
			uni.getSystemInfo({
				success: (res)=> {
					console.log(res.windowHeight);
					this.listHeight = res.windowHeight - 80
				}
			});
			this.initData()
		},
		methods: {
			initData(){
				console.log(this.$Route.query.type);
				let type = this.$Route.query.type
				this.typeName = type
				switch(type)
				{
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
							{name:'租户活动管理'},
							{name:'非租户活动管理'},
							{name:'租户留言'},
						]
						break;
				}
			},

			openDetail(item,index){
				console.log(item.name);
				if(item.name==='楼宇设置'){
					this.$Router.push({name: '楼宇设置'})
				}else if(item.name==='水/电表价格设置'){
					this.$Router.push({name: '水电价格'})
				} else if(item.name==='单元设置'){
					this.$Router.push({name: '单元设置'})
				}else {
					this.$Router.push({name: '首页'})
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
		font-size: 12px;
		color: #666666;
		line-height: 18px;
		.head-bar {
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: rgba(255, 255, 255, 1);
			height: 192px;
			background: rgba(6, 25, 104, 1);
			position: fixed;
			top: 0;
			width: 100%;
			z-index: 9;
			.bg {
				top: -90px;
				border-radius: 50%;
				width: 380px;
				background: -webkit-linear-gradient(327deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.2) 100%);
				background: linear-gradient(123deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.15) 100%);
				position: absolute;
				left: -85px;
				height: 340px;
			}
			.title {
				text-align: left;
				display: flex;
				align-items: center;
				padding: 13px 20px 14px;
				font-size: 18px;
				.menu {
					width: 30px;
					height: 30px;
					margin-right: 10px;
					z-index: 102;
				}
			}
		}
		.card{
			background:rgba(248,248,248,1);
			position: absolute;
			width:90.5%;
			top: 62px;
			left: 5%;
			z-index: 10;
			font-size: 32px;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: rgba(51, 51, 51, 1);
			box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.06);
			border-radius: 5px;
			padding: 16px 12px;
			box-sizing: border-box;
			.name{
				font-size:18px;
				font-family:PingFangSC-Semibold,PingFang SC;
				font-weight:600;
				color:rgba(51,51,51,1);
				margin-bottom: 20px;
				em{
					width:7px;
					height:7px;
					background:#00D29C;
					display: inline-block;
					margin-right: 6px;
					border-radius: 50%;
				}
			}
			.type-items{
				font-size:16px;
				font-family:PingFangSC-Regular,PingFang SC;
				font-weight:400;
				color:rgba(51,51,51,1);
				line-height:22px;
				.item{
					text-align: center;
					height:37px;
					line-height: 37px;
					background:rgba(255,255,255,1);
					box-shadow:0px 2px 4px 0px rgba(40,40,40,0.08);
					border-radius:19px;
					margin-bottom: 10px;
				}
			}
		}
	}
</style>