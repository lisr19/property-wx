<template>
	<view class="content">
		<view class="head-bar">
			<view class="bg"></view>
			<p class="title"><image class="menu" src="/static/logo.png" @click="openBox"></image>物业管理系统</p>
			<view class="tab-bar">
				<ul class="nav">
					<li :class="{active:currIndex===index}" :key="index" v-for="(item,index) in typeList" @click="tagType(index)">
						<p>{{item.name}}</p>
						<uni-badge class="tip" text="5" type="error" size="small"></uni-badge>
					</li>
				</ul>
			</view>
			<template v-if="currIndex===0">
				<view class="card null-card" v-if="noticeNull">
					<image class="logo" src="/static/logo.png"></image>
					<p class="null">暂无通知</p>
				</view>
				<view class="card" v-else>
					<p class="msg">
						<span class="msg-tip">假期通知：</span>
						<span>准备消防安全物业课程，安排物业管理消防设备的检查和资料的整理…</span>
					</p>
					<p class="msg">
						<span class="msg-tip">假期通知：</span>
						<span>准备消防安全物业课程，安排物业管理消防设备的检查和资料的整理…</span>
					</p>
				</view>
			</template>
			<template v-else>
				<view class="card null-card" v-if="workNull">
					<image class="logo" src="/static/logo.png"></image>
					<p class="null">暂无提醒</p>
				</view>
				<view class="card" v-else>
					<view class="work">
						<p class="name">标题：多福多寿</p>
						<p><span>来源：活动 </span><span>日期：2020-12-10</span></p>
					</view>
					<view class="work">
						<p class="name">标题：多福多寿</p>
						<p><span>来源：活动 </span><span>日期：2020-12-10</span></p>
					</view>
				</view>
			</template>
		</view>
		<view class="card2">
			<view class="item" @click="openDetail">
				<p class="name"><em></em>任务</p>
				<view class="desc">
					<span class="time">{{chageDate}}</span>
					<view class="txt">准备消防安全物业课程，安排物业管理消防设备的检查和资料的整理…</view>
				</view>
				<uni-icons class="icon" type="arrowright" size="18" color="#999"></uni-icons>
			</view>
			<view class="item">
				<p class="name"><em style="background: #426FE4"></em>日程安排</p>
				<view class="desc">
					<span class="time">{{chageDate}}</span>
					<view class="txt">准备消防安全物业课程，安排物业管理消防设备的检查和资料的整理…</view>
				</view>
				<uni-icons class="icon" type="arrowright" size="18" color="#999"></uni-icons>
			</view>
		</view>
		<view class="data-box">
			<uni-calendar
					:insert="true"
					:lunar="false"
					ref="calendar"
					@change="change"
			/>
		</view>
		<uni-drawer :visible="false" ref="leftBox">
			<leftMenu @closeMenu="closeMenu"></leftMenu>
		</uni-drawer>
	</view>
</template>

<script>
	import uniDrawer from "@/components/uni-drawer/uni-drawer.vue"
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	import uniCalendar from '@/components/uni-calendar/uni-calendar.vue'
	import uniBadge from "@/components/uni-badge/uni-badge.vue"
	import leftMenu from "@/components/left-menu/left-menu.vue"
	export default {
		components: {uniDrawer,uniIcons,uniCalendar,uniBadge,leftMenu},
		data() {
			return {
				chageDate:new Date().toISOString().slice(0, 10),
				currIndex:0,
				noticeNull:true,
				workNull:false,
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
				this.chageDate = e.fulldate
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
			closeMenu(){
				this.$refs.leftBox.close()
			},
		}
	}
</script>

<style lang="less" scoped>
	.content{
		font-size: 24rpx;
		color: #666666;
		line-height: 36rpx;
		.head-bar{
			font-family:PingFangSC-Medium,PingFang SC;
			font-weight:500;
			color:rgba(255,255,255,1);
			height:384rpx;
			background:rgba(6,25,104,1);
			position: fixed;
			top: 0;
			width: 100%;
			z-index: 9;
			.bg{
				top: -180rpx;
				border-radius: 50%;
				width: 750rpx;
				background: -webkit-linear-gradient(327deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.2) 100%);
				background: linear-gradient(123deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.15) 100%);
				position: absolute;
				left: -170rpx;
				height: 680rpx;
			}
			.title{
				text-align:left;
				display: flex;
				align-items: center;
				padding: 26rpx 40rpx 28rpx;
				font-size:36rpx;
				.menu{
					width: 60rpx;
					height: 60rpx;
					margin-right: 20rpx;
					z-index: 102;
				}
			}
			.tab-bar{
				border-bottom: solid 2rpx rgba(255,255,255,0.21);
				margin-top: 4rpx;
				ul{
					display: flex;
					padding: 0 80rpx;
					li{
						font-size:28rpx;
						font-family:PingFangSC-Regular,PingFang SC;
						font-weight:400;
						color:rgba(255,255,255,1);
						margin-right: 72rpx;
						display: flex;
						align-items: center;
						position: relative;
						.tip{
							position: absolute;
							top: -10rpx;
							right:-40rpx;
						}
					}
					li.active{
						font-size:32rpx;
						font-weight:600;
						color:rgba(255,255,255,1);
						padding-bottom: 14rpx;
						border-bottom: solid 2rpx #FFFFFF;
					}
				}
			}
			.card{
				width:90%;
				position: absolute;
				top: 200rpx;
				left:5%;
				z-index: 10;
				font-family:PingFangSC-Medium,PingFang SC;
				font-weight:400;
				color:rgba(51,51,51,1);
				height:240rpx;
				background:rgba(255,255,255,1);
				box-shadow:0rpx 4rpx 16rpx 0rpx rgba(0,0,0,0.06);
				border-radius:10rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;
				font-size:28rpx;
				.msg{
					padding: 15rpx 0rpx 20rpx;
					margin: 0 18rpx;
					display: flex;
					.msg-tip{
						width: 250rpx;
					}
				}
				.msg:first-child{
					border-bottom: solid 1rpx #c0c0c0;
				}
				.work{
					font-size:28rpx;
					padding: 15rpx 18rpx;
					font-family:PingFangSC-Medium,PingFang SC;
					font-weight:500;
					color:rgba(0,0,0,1);
					width: 90%;
					.name{
						margin-bottom: 10rpx;
					}
					span{
						color:#999999;
						margin-right: 30rpx;
					}
				}
				.work:first-child{
					border-bottom: solid 1rpx #c0c0c0;
				}
				image{
					width: 80rpx;
					height: 80rpx;
					margin-right: 48rpx;
				}
				.null{
					font-size:32rpx;
					font-family:PingFangSC-Regular,PingFang SC;
					font-weight:400;
					color:rgba(184,184,184,1);
				}
			}
			.null-card{
				flex-direction: row;
			}
		}
		.nav-box{
			height: 100%;
			overflow: auto;
			.head-box{
				padding: 26rpx 0;
				display: flex;
				align-items: center;
				flex-direction: column;
				justify-content: center;
				border-bottom: 1rpx solid #D9D9D9;
				.head-img{
					width:156rpx;
					height:156rpx;
					border-radius: 50%;
				}
			}
			p{
				font-size:24rpx;
				font-family:PingFangSC-Semibold,PingFang SC;
				font-weight:600;
				color:rgba(153,153,153,1);
				line-height:34rpx;
				margin-top: 16rpx;
			}
			.btn{
				width:310rpx;
				height:66rpx;
				line-height: 66rpx;
				border-radius:10rpx;
				border:1rpx solid rgba(0,0,0,1);
				font-family:PingFangSC-Semibold,PingFang SC;
				font-weight:500;
				color:rgba(51,51,51,1);
				font-size: 30rpx;
				text-align: center;
			}
		}
		.card2{
			height:320rpx;
			background:rgba(255,255,255,1);
			border-radius:10rpx;
			padding: 460rpx 60rpx 0;
			z-index: 1;
			position: fixed;
			.item{
				position: relative;
				margin-bottom: 28rpx;
				.name{
					font-size:32rpx;
					font-family:PingFangSC-Semibold,PingFang SC;
					font-weight:600;
					color:rgba(51,51,51,1);
					line-height:44rpx;
					margin-bottom: 14rpx;
					display: flex;
					align-items: center;
					em{
						width:14rpx;
						height:14rpx;
						background:rgba(255,17,0,1);
						display: inline-block;
						margin-right: 12rpx;
						border-radius: 50%;
					}
				}
				.desc{
					display: flex;
					.time{
						color:rgba(153,153,153,1);
						margin-right: 20rpx;
					}
					.txt{
						flex: 1;
					}
				}
				.icon{
					position: absolute;
					right: 0rpx;
					top: 4rpx;
				}
			}
		}
		.data-box{
			padding-top: 760rpx;
		}
	}
	.nav-box{
		/deep/.uni-icons{
			font-size: 30rpx!important;
			color: #DCDCDC!important;
		}
	}
</style>
