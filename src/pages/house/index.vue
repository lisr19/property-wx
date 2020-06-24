<template>
	<div class="content">
		<div class="head-bar">
			<div class="bg"></div>
			<p class="title"><image class="menu" src="/static/logo.png" @click="openBox"></image>物业管理系统</p>
			<div class="card">
				<p class="name"><em></em>房产管理</p>
				<div class="tab-bar">
					<ul class="nav">
						<li :class="{active:currIndex===index}" :key="index" v-for="(item,index) in typeList" @click="tagType(index)">
							<p>{{item.name}}</p>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<uni-drawer :visible="false" ref="leftBox">
			<leftMenu @closeMenu="closeMenu"></leftMenu>
		</uni-drawer>
	</div>
</template>

<script>
	import uniDrawer from "@/components/uni-drawer/uni-drawer.vue"
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	import uniBadge from "@/components/uni-badge/uni-badge.vue"
	import leftMenu from "@/components/left-menu/left-menu.vue"
	export default {
		components: {uniDrawer,uniIcons,uniBadge,leftMenu},
		data() {
			return {
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
				items: [
					{
					value: 'USA',
					name: '已设置',
					checked: 'true'
					},
					{
						value: '未设置',
						name: '已设置',
					},
				],
				current: 0
			}
		},
		onLoad() {

		},
		methods: {
			tagType(index){
				this.currIndex =index
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
					li{
						font-family:PingFangSC-Regular,PingFang SC;
						font-weight:400;
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
	}
</style>
