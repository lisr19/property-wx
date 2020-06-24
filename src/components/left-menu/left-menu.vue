<template>
	<div class="nav-box">
		<div class="head-box">
			<image class="head-img" src="/static/logo.png"></image>
			<p >管理员：孙天生</p>
		</div>
		<uni-list>
			<uni-list-item v-for="(item,index) in titleArr" :key="index" :title="item.name" :thumb="item.url" @click="openMenu(item,index)"></uni-list-item>
<!--			<uni-list-item title="日常工作" thumb="/static/logo.png"></uni-list-item>-->
<!--			<uni-list-item title="房产管理" thumb="/static/logo.png"></uni-list-item>-->
<!--			<uni-list-item title="租户管理" thumb="/static/logo.png"></uni-list-item>-->
<!--			<uni-list-item title="财务管理" thumb="/static/logo.png"></uni-list-item>-->
<!--			<uni-list-item title="巡检预警" thumb="/static/logo.png"></uni-list-item>-->
<!--			<uni-list-item title="设备管理" thumb="/static/logo.png"></uni-list-item>-->
<!--			<uni-list-item title="仓库管理" thumb="/static/logo.png"></uni-list-item>-->
<!--			<uni-list-item title="档案管理" thumb="/static/logo.png"></uni-list-item>-->
<!--			<uni-list-item title="人事管理" thumb="/static/logo.png"></uni-list-item>-->
<!--			<uni-list-item title="外派管理" thumb="/static/logo.png"></uni-list-item>-->
<!--			<uni-list-item title="系统管理" thumb="/static/logo.png"></uni-list-item>-->
		</uni-list>
		<div style="display: flex;justify-content: center;margin: 20px 0">
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
					{
						name:'人事管理',
						url:'/static/logo.png'
					},
					{
						name:'外派管理',
						url:'/static/logo.png'
					},
					{
						name:'系统管理',
						url:'/static/logo.png'
					}

				]
			}
		},
		methods: {
			openMenu(item,index){
				console.log(item.name);
				if(item.name==='房产管理'){
					this.$Router.push({name: '房产管理'})
				}else{
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

<style lang="less" scoped>
	.nav-box{
		/deep/.uni-icons{
			font-size: 15px!important;
			color: #DCDCDC!important;
		}
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
</style>