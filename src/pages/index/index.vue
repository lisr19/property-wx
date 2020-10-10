<template>
	<view class="content">
		<view class="head-bar">
			<view class="bg"></view>
			<p class="title">
				<view class="iconfont iconcaidan" @click="openBox"></view>
				物业管理系统</p>
			<view class="tab-bar">
				<ul class="nav">
					<li :class="{active:currIndex===index}" :key="index" v-for="(item,index) in typeList" @click="tagType(index)">
						<p>{{item.name}}</p>
<!--						<uni-badge class="tip" :text="tzNum" type="error" size="small"></uni-badge>-->
					</li>
				</ul>
			</view>
			<template v-if="currIndex===0">
				<view class="card null-card" v-if="list_tz.length===0">
					<image class="menu" src="/static/null-icon.png"></image>
					<p class="null-tip">暂无通知</p>
				</view>
				<view class="card" v-else  :class="{showall:isShowAll===true}">
					<p class="msg" v-for="(item,index) in showTZ" v-if="isShowAll===false" @click="showItem(item)">
						<span class="msg-tip">{{item.tz_dtmd}}：</span>
						<span>{{item.tz_title}}</span>
					</p>
					<p class="msg" v-for="(item,index) in list_tz" v-if="isShowAll===true" @click="showItem(item)">
						<span class="msg-tip">{{item.tz_dtmd}}：</span>
						<span>{{item.tz_title}}</span>
					</p>
					<u-icon class="tip" name="arrow-down"  size="24" @click="showAll"></u-icon>
				</view>
			</template>
			<template v-else>
				<view class="card null-card" v-if="list_sw.length===0">
<!--					<span class="iconfont iconxiangzi2x"  @click="openBox"></span>-->
					<image class="menu" src="/static/null-icon.png"></image>
					<p class="null-tip">暂无提醒</p>
				</view>
				<view class="card" v-else :class="{showall:isShowAll2===true}">
					<view class="work" v-for="(item,index) in showSW" v-if="isShowAll2===false" @click="showItem2(item)">
						<p class="name">标题：{{item.sw_title}}</p>
						<p><span>类别：活动 </span><span>日期：{{item.sw_dt}}</span></p>
					</view>
					<view class="work"  v-for="(item,index) in list_sw" v-if="isShowAll2===true" @click="showItem2(item)">
						<p class="name">标题：{{item.sw_title}}</p>
						<p><span>类别：活动 </span><span>日期：{{item.sw_dt}}</span></p>
					</view>
					<u-icon class="tip" name="arrow-down"  size="26" @click="showAll2"></u-icon>
				</view>
			</template>
		</view>
		<view class="card2">
			<view class="item" @click="openDetail">
				<p class="name"><em></em>任务</p>
				<view class="desc">
					<span class="time">{{chageDate}}</span>
					<view class="txt" v-if="list_rw[0]">{{list_rw[0].rw_title}}</view>
				</view>
				<uni-icons class="icon" type="arrowright" size="18" color="#999" @click="openDeatil('任务')"></uni-icons>
			</view>
			<view class="item">
				<p class="name"><em style="background: #426FE4"></em>日程安排</p>
				<view class="desc">
					<span class="time">{{chageDate}}</span>
					<view class="txt" v-if="list_rc[0]">{{list_rc[0].rc_title}}</view>
				</view>
				<uni-icons class="icon" type="arrowright" size="18" color="#999" @click="openDeatil('日程安排')"></uni-icons>
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
		<u-popup v-model="showDetail" mode="center">
			<view class="detail">
				<p>{{itemData.tz_title}}</p>
				<p v-html="itemData.tz_noty"></p>
				<p>发布人：{{itemData.ld_una}}</p>
				<p>发布时间：{{itemData.tz_dt}}</p>
			</view>
		</u-popup>
		<u-popup v-model="showDetail2" mode="center">
			<view class="detail">
				<p>{{itemData.sw_title}}</p>
				<p>{{itemData.sw_dt}}</p>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import uniDrawer from "@/components/uni-drawer/uni-drawer.vue"
	import uniCalendar from '@/components/uni-calendar/uni-calendar.vue'
	import leftMenu from "@/components/left-menu/left-menu.vue"
	import {getDesktop} from "@/utils/api/comment"
	export default {
		components: {uniDrawer,uniCalendar,leftMenu},
		data() {
			return {
				showDetail:false,
				showDetail2:false,
				isShowAll:false,
				isShowAll2:false,
				chageDate:new Date().toISOString().slice(0, 10),
				currIndex:0,
				noticeNull:true,
				workNull:false,
				data:{},
				list_sw:[],
				list_rc:[], //日程
				list_tz:[],
				list_rw:[],
				tzNum:[],
				swNum:[],
				showlist_tz:[],
				typeList:[
					{
						name:'最新通知',
					},
					{
						name:'事务提醒',
					}
				],
				itemData:{},
				showTZ:[],
				showSW:[],
			}
		},
		onShow() {
			if(!uni.getStorageSync('token')){
				this.$Router.push({name:'登录'})
			}else {
				this.getDesktop()
			}
		},
		methods: {
			openDeatil(name){
				if(name==='任务'){
					this.$Router.push({name: '详情',params:{list:this.list_rw,time:this.chageDate}})
				}else {
					this.$Router.push({name: '详情',params:{list:this.list_rc,time:this.chageDate}})
				}
			},
			showItem(item){
				this.itemData = item
				this.showDetail = true
			},
			showItem2(item){
				this.itemData = item
				this.showDetail2 = true
			},
			showAll(){
				this.isShowAll =!this.isShowAll
			},
			showAll2(){
				this.isShowAll2 =!this.isShowAll2
			},
			async getDesktop(){
				let res = await getDesktop()
				if(res.code === 0){
					this.data= res.data
					this.list_tz = res.data.list_tz
					this.list_sw = res.data.list_sw
					this.showTZ = res.data.list_tz.slice(0,2)
					this.showSW= res.data.list_sw.slice(0,2)
					// console.log(this.showSW);
					this.list_rc = res.data.list_rc
					this.list_rw = res.data.list_rw
					let rwList = []
					let swList = []
					this.list_rw.forEach((i,index)=>{
						if(i.rc_dt===this.chageDate){
							rwList.push(i)
						}
						this.list_rw = rwList
					})
					this.list_rc.forEach((i,index)=>{
						if(i.rc_dt===this.chageDate){
							swList.push(i)
						}
						this.list_rc = swList
					})
				}else if(res.msg === 'token已过期！'){
					uni.showModal({
						title: '提示',
						content: 'token已过期,请重新登录',
						showCancel:false,
						success:  (res)=> {
							if (res.confirm) {
								uni.clearStorageSync();
								this.$Router.push({name: '登录'})
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
					// uni.showToast({
					// 	title: 'token已过期,请重新登录',
					// 	icon: 'none',
					// })
				} else {
					uni.showToast({
						title: res.msg,
						icon: 'none',
					});
				}
			},
			openDetail(){
			},
			change(e) {
				// console.log(e);
				this.chageDate = e.fulldate
				this.getDesktop()
			},
			tagType(index){
				this.currIndex =index
				this.isShowAll =false
				this.isShowAll2 =false
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
				flex-direction: column;
				font-size:28rpx;
				/*overflow: hidden;*/
				padding: 15rpx 0;
				box-sizing: border-box;
				.tip{
					position: absolute;
					bottom: -22rpx;
					width: 42rpx;
					height: 42rpx;
					background: #f1f1f1;
					border-radius: 50%;
					display: flex;
					align-items: center;
					justify-content: center;
				}
				.msg{
					padding: 15rpx 0rpx 20rpx;
					margin: 0 18rpx;
					display: flex;
					border-top: solid 1rpx #c0c0c0;
					.msg-tip{
						width: 120rpx;
					}
					span{
						text-overflow: -o-ellipsis-lastline;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						line-clamp: 2;
						-webkit-box-orient: vertical;
					}
					span:last-child{width: 480rpx}
				}
				.msg:first-child{
					border-top: none;
				}
				.work{
					font-size:28rpx;
					padding: 15rpx 18rpx;
					font-family:PingFangSC-Medium,PingFang SC;
					font-weight:500;
					color:rgba(0,0,0,1);
					width: 90%;
					border-top: solid 1rpx #c0c0c0;
					.name{
						margin-bottom: 10rpx;
						word-break:keep-all;
						white-space:nowrap;
						overflow:hidden;
						text-overflow:ellipsis;
					}
					span{
						color:#999999;
						margin-right: 30rpx;
					}
				}
				.work:first-child{
					border-top:none;
				}
				image{
					width: 120rpx;
					height: 120rpx;
					margin-right: 48rpx;
				}
				.null-tip{
					font-size:32rpx;
					font-family:PingFangSC-Regular,PingFang SC;
					font-weight:400;
					color:rgba(184,184,184,1);
				}
			}
			.showall{
				height: auto;
				padding-bottom: 40rpx;
			}
			.null-card{
				flex-direction: row;
				display: flex;
				align-items: center;
				justify-content: center;
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
			padding: 470rpx 60rpx 0;
			z-index: 1;
			position: fixed;
			width: 88%;
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
					height: 70rpx;
					.time{
						color:rgba(153,153,153,1);
						margin-right: 20rpx;
					}
					.txt{
						flex: 1;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						line-clamp: 2;
						-webkit-box-orient: vertical;
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
	.detail{
		font-size: 26rpx;
		padding: 30rpx 20rpx;
		margin: 10rpx;
		line-height: 1.8;
	}
	.nav-box{
		/deep/.uni-icons{
			font-size: 30rpx!important;
			color: #DCDCDC!important;
		}
	}
	.iconcaidan{
		font-size: 48rpx;
		margin-right: 30rpx;
		z-index: 99;
	}
</style>
