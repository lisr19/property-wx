<template>
	<div class="content">
		<div class="head-bar">
			<div class="bg"></div>
			<p class="title"><image class="menu" src="/static/logo.png" @click="openBox"></image>物业管理系统</p>
			<div class="tab-bar">
				<ul class="nav">
					<li :class="{active:currIndex===index}" v-for="(item,index) in typeList" @click="tagType(index)">
						<p>{{item.name}}</p>
						<uni-badge class="tip" text="5" type="error" size="small"></uni-badge>
					</li>
				</ul>
			</div>
			<div class="card">
				<image class="logo" src="/static/logo.png"></image>
				<p class="null">暂无通知</p>
			</div>
		</div>
		<div class="card2">
			<div class="item" @click="openDetail">
				<p class="name"><em></em>任务</p>
				<div class="desc">
					<span class="time">上午 9:10</span>
					<div class="txt">准备消防安全物业课程，安排物业管理消防设备的检查和资料的整理…</div>
				</div>
				<uni-icons type="arrowright" size="18" color="#999"></uni-icons>
			</div>
			<div class="item">
				<p class="name"><em style="background: #426FE4"></em>日程安排</p>
				<div class="desc">
					<span class="time">上午 9:10</span>
					<div class="txt">准备消防安全物业课程，安排物业管理消防设备的检查和资料的整理…</div>
				</div>
				<uni-icons type="arrowright" size="18" color="#999"></uni-icons>
			</div>
		</div>
		<view style="margin-top: 20px">
			<uni-calendar
					:insert="true"
					:lunar="false"
					:start-date="'2019-3-2'"
					@change="change"
			/>
		</view>
		<uni-drawer :visible="false" ref="leftBox">
			<div class="nav-box">
				<div class="head-box">
					<image class="head-img" src="/static/logo.png"></image>
					<p >管理员：孙天生</p>
				</div>
				<uni-list>
					<uni-list-item title="日常工作" thumb="https://img-cdn-qiniu.dcloud.net.cn/new-page/hx.png"></uni-list-item>
					<uni-list-item title="房产管理" thumb="https://img-cdn-qiniu.dcloud.net.cn/new-page/hx.png"></uni-list-item>
					<uni-list-item title="租户管理" thumb="https://img-cdn-qiniu.dcloud.net.cn/new-page/hx.png"></uni-list-item>
					<uni-list-item title="财务管理" thumb="https://img-cdn-qiniu.dcloud.net.cn/new-page/hx.png"></uni-list-item>
					<uni-list-item title="巡检预警" thumb="https://img-cdn-qiniu.dcloud.net.cn/new-page/hx.png"></uni-list-item>
					<uni-list-item title="设备管理" thumb="https://img-cdn-qiniu.dcloud.net.cn/new-page/hx.png"></uni-list-item>
					<uni-list-item title="仓库管理" thumb="https://img-cdn-qiniu.dcloud.net.cn/new-page/hx.png"></uni-list-item>
					<uni-list-item title="档案管理" thumb="https://img-cdn-qiniu.dcloud.net.cn/new-page/hx.png"></uni-list-item>
					<uni-list-item title="人事管理" thumb="https://img-cdn-qiniu.dcloud.net.cn/new-page/hx.png"></uni-list-item>
					<uni-list-item title="外派管理" thumb="https://img-cdn-qiniu.dcloud.net.cn/new-page/hx.png"></uni-list-item>
					<uni-list-item title="系统管理" thumb="https://img-cdn-qiniu.dcloud.net.cn/new-page/hx.png"></uni-list-item>
				</uni-list>
				<div style="display: flex;justify-content: center;margin-top: 20px">
					<span class="btn">
						退出登录
					</span>
				</div>
			</div>
		</uni-drawer>
	</div>
</template>

<script>
	import uniDrawer from "@/components/uni-drawer/uni-drawer.vue"
	import uniList from "@/components/uni-list/uni-list.vue"
	import uniListItem from "@/components/uni-list-item/uni-list-item.vue"
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	import uniCalendar from '@/components/uni-calendar/uni-calendar.vue'
	import uniBadge from "@/components/uni-badge/uni-badge.vue"
	export default {
		components: {uniDrawer,uniList,uniListItem,uniIcons,uniCalendar,uniBadge},
		data() {
			return {
				title: 'Hello',
				currIndex:0,
				typeList:[
					{
						name:'最新通知',
					},
					{
						name:'事务提醒',
					}
				],
			}
		},
		onLoad() {

		},
		methods: {
			openDetail(){
				console.log(122);
			},
			change(e) {
				console.log(e);
			},
			tagType(index){
				this.currIndex =index
			},
			open(){
				this.$Router.push({name: '列表',params:{id:'45454'}})
			},
			openBox(){
				this.$refs.leftBox.open()
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
				}
			}
			.tab-bar{
				border-bottom: solid 1.5px rgba(255,255,255,0.21);
				margin-top: 5px;
				ul{
					display: flex;
					padding: 0 40px;
					li{
						font-size:14px;
						font-family:PingFangSC-Regular,PingFang SC;
						font-weight:400;
						color:rgba(255,255,255,1);
						margin-right: 36px;
						display: flex;
						align-items: center;
						position: relative;
						.tip{
							position: absolute;
							top: -5px;
							right:-20px;
						}
					}
					li.active{
						font-size:16px;
						font-weight:600;
						color:rgba(255,255,255,1);
						padding-bottom: 7px;
						border-bottom: solid 2px #FFFFFF;
					}
				}
			}
			.card{
				width:90%;
				position: absolute;
				top: 110px;
				left:5%;
				z-index: 10;
				font-size:32px;
				font-family:PingFangSC-Medium,PingFang SC;
				font-weight:500;
				color:rgba(51,51,51,1);
				height:120px;
				background:rgba(255,255,255,1);
				box-shadow:0px 2px 8px 0px rgba(0,0,0,0.06);
				border-radius:5px;
				display: flex;
				align-items: center;
				justify-content: center;
				image{
					width: 40px;
					height: 40px;
					margin-right: 24px;
				}
				.null{
					font-size:16px;
					font-family:PingFangSC-Regular,PingFang SC;
					font-weight:400;
					color:rgba(184,184,184,1);
				}
			}
		}
		.nav-box{
			height: 100%;
			overflow: auto;
			.head-box{
				padding: 13px 0;
				display: flex;
				align-items: center;
				flex-direction: column;
				justify-content: center;
				border-bottom: 0.5px solid #D9D9D9;
				.head-img{
					width:78px;
					height:78px;
					border-radius: 50%;
				}
			}
			p{
				font-size:12px;
				font-family:PingFangSC-Semibold,PingFang SC;
				font-weight:600;
				color:rgba(153,153,153,1);
				line-height:17px;
				margin-top: 8px;
			}
			.btn{
				width:155px;
				height:33px;
				line-height: 33px;
				border-radius:5px;
				border:1px solid rgba(0,0,0,1);
				font-family:PingFangSC-Semibold,PingFang SC;
				font-weight:500;
				color:rgba(51,51,51,1);
				font-size: 15px;
				text-align: center;
			}
		}
		.card2{
			height:160px;
			background:rgba(255,255,255,1);
			border-radius:5px;
			padding: 255px 30px 0;
			z-index: 100;
			.item{
				position: relative;
				margin-bottom: 20px;
				.name{
					font-size:16px;
					font-family:PingFangSC-Semibold,PingFang SC;
					font-weight:600;
					color:rgba(51,51,51,1);
					line-height:22px;
					margin-bottom: 10px;
					display: flex;
					align-items: center;
					em{
						width:6px;
						height:7px;
						background:rgba(255,17,0,1);
						display: inline-block;
						margin-right: 6px;
						border-radius: 50%;
					}
				}
				.desc{
					display: flex;
					.time{
						color:rgba(153,153,153,1);
						margin-right: 10px;
					}
					.txt{
						flex: 1;
					}
				}
				.uni-icons{
					position: absolute;
					right: 0px;
					top: 2px;
				}
			}
		}
	}
	.nav-box{
		/deep/.uni-icons{
			font-size: 15px!important;
			color: #DCDCDC!important;
		}
	}
</style>
