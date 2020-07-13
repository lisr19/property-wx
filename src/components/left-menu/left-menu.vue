<template>
	<div class="nav-box">
		<div class="head-box">
			<image class="head-img" src="/static/logo.png"></image>
			<p >管理员：孙天生</p>
		</div>
		<uni-list>
			<uni-list-item v-for="(item,index) in titleArr" :key="index" :title="item.name" :thumb="item.url" @click="openMenu(item,index)"></uni-list-item>
		</uni-list>
		<div style="display: flex;justify-content: center;margin: 40rpx 0">
			<span class="btn">
				退出登录
			</span>
		</div>
	</div>
</template>

<script>
	import uniList from "@/components/uni-list/uni-list.vue"
	import uniListItem from "@/components/uni-list-item/uni-list-item.vue"
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	export default {
		name: "UniFav",
		components: {
			uniIcons,
			uniList,
			uniListItem
		},
		props: {
		},
		data(){
			return{
				titleArr:[
					{
						name:'日常工作',
						url:'/static/logo.png',
						show:false
					},
					{
						name:'房产管理',
						url:'/static/logo.png',
						show:true
					},
					{
						name:'租户管理',
						url:'/static/logo.png',
						show:true
					},
					{
						name:'财务管理',
						url:'/static/logo.png'
					},
					{
						name:'巡检预警',
						url:'/static/logo.png'
					},
					{
						name:'设备管理',
						url:'/static/logo.png'
					},
					{
						name:'仓库管理',
						url:'/static/logo.png'
					},
					{
						name:'档案管理',
						url:'/static/logo.png'
					},
					// {
					// 	name:'人事管理',
					// 	url:'/static/logo.png'
					// },
					{
						name:'外派管理',
						url:'/static/logo.png'
					},
					// {
					// 	name:'系统管理',
					// 	url:'/static/logo.png'
					// }

				]
			}
		},
		methods: {
			openMenu(item,index){
				// console.log(item.name);
				if(item.name==='房产管理'){
					// this.$Router.push({name: '房产管理'})
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
	/deep/ .uni-list-item__container{
		padding: 24rpx 28rpx 10rpx;
	}
	/deep/ .uni-list-item__content-title{
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
			border-bottom: 1rrpx solid #D9D9D9;
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
</style>