<template>
	<div class="nav-box">
		<div class="head-box">
			<view class="iconfont icontouxiang head-img" @click="openMenu"></view>
<!--			<image class="head-img" src="/static/logo.png"></image>-->
<!--			<svg class="icon head-img" aria-hidden="true" @click="openMenu">-->
<!--				<use xlink:href="#iconqianzhengbanli2x"></use>-->
<!--			</svg>-->
			<p >管理员：{{user_name}}</p>
		</div>
<!--		<uni-list>-->
<!--			<uni-list-item v-for="(item,index) in titleArr" :key="index" :title="item.name" @click="openMenu(item,index)">-->
<!--				<span class="iconfont" :class="item.url"></span>-->
<!--			</uni-list-item>-->
<!--		</uni-list>-->
		<template>
			<u-cell-group>
				<u-cell-item  :center="true" v-for="(item,index) in titleArr" :key="index" @click="openMenu(item,index)">
					<span class="iconfont" :class="item.url"></span>
					{{item.name}}
				</u-cell-item>
			</u-cell-group>
		</template>
		<div style="display: flex;justify-content: center;margin: 40rpx 0">
			<span class="btn" @click="quit">
				退出登录
			</span>
		</div>
	</div>
</template>

<script>
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	export default {
		name: "UniFav",
		components: {
			uniIcons,
		},
		props: {
		},
		data(){
			return{
				user_name:'',
				titleArr:[
					{
						name:'日常工作',
						url:'iconrenwu2x',
						show:false
					},
					{
						name:'租户管理',
						url:'iconfangchan2x',
						show:true
					},
					{
						name:'财务管理',
						url:'iconjiguancaiwuguanli2x'
					},
					{
						name:'巡检预警',
						url:'iconyujing2x'
					},
					{
						name:'设备管理',
						url:'iconshebei2x'
					},
					{
						name:'仓库管理',
						url:'iconcangkumingcheng2x'
					},
					{
						name:'档案管理',
						url:'icondanganguanli2x'
					},
					{
						name:'外派管理',
						url:'iconfeihanglvyouchuchafeiji8002x'
					},

				]
			}
		},
		mounted(){
			uni.getStorage({
				key: 'user_name',
				success: (res) =>{
					this.user_name = res.data
				}
			})
		},
		methods: {
			quit(){
				uni.showModal({
					title: '提示',
					content: '确定要退出吗？',
					success:  (res)=> {
						if (res.confirm) {
							uni.clearStorageSync();
							this.$Router.push({name: '登录'})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
				this.$emit("closeMenu");
			},
			openMenu(item,index){
				// console.log(item.name);
				if(item.name==='日常工作'){
					this.$Router.push({name: '分类', params:{type:'日常工作'}})
				} else  if(item.name==='房产管理'){
					this.$Router.push({name: '分类', params:{type:'房产管理'}})
				}else if(item.name==='租户管理'){
					this.$Router.push({name: '分类', params:{type:'租户管理'}})
				}else if(item.name==='财务管理'){
					this.$Router.push({name: '分类', params:{type:'财务管理'}})
				}else if(item.name==='设备管理'){
					this.$Router.push({name: '分类', params:{type:'设备管理'}})
				}else if(item.name==='仓库管理'){
					this.$Router.push({name: '分类', params:{type:'仓库管理'}})
				}else if(item.name==='档案管理'){
					this.$Router.push({name: '分类', params:{type:'档案管理'}})
				}else if(item.name==='外派管理'){
					this.$Router.push({name: '分类', params:{type:'外派管理'}})
				}else if(item.name==='巡检预警'){
					// this.$Router.push({name: '分类', params:{type:'巡检排班'}})
					this.$Router.push({name: '巡检'})
				}else {
					this.$Router.push({name: '首页'})
				}
				this.closeMenu()
			},
			closeMenu() {
				this.$emit("closeMenu");
			}
		}
	};
</script>
<style scoped>
	
	/deep/ .u-cell__value{
		text-align: left;
		padding: 8rpx 0;
		font-size:32rpx;
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(51,51,51,1);
	}
</style>
<style lang="less" scoped>
	.nav-box{
		/deep/.uni-icons{
			font-size: 30rpx!important;
			color: #DCDCDC!important;
		}
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
				font-size: 120rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				margin: 0;
			}
		}
		p{
			font-size:24rpx;
			font-family:PingFangSC-Semibold,PingFang SC;
			font-weight:600;
			color:rgba(153,153,153,1);
			line-height:34rpx;
			margin-top: 18rpx;
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
	.iconfont{
		margin-right: 20rpx;
		margin-top: 5rpx;
		font-size: 38rpx;
	}
</style>