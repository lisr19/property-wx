<template>
	<div class="content">
		<div class="head-bar">
			物业管理系统
		</div>
		<image class="logo" src="/static/logo.png"></image>
		<div>
			<text class="title">{{title}}</text>
			<button @click="open">路由跳转</button>
			<button @click="openBox">抽屉</button>
		</div>
		<uni-drawer :visible="false" ref="leftBox">
			<div style="padding:30px;">
				<image class="head-img" src="/static/logo.png"></image>
				<uni-list>
					<uni-list-item  title="标题文字"></uni-list-item>
					<uni-list-item title="标题文字" :show-extra-icon="true" :extra-icon="{color: '#4cd964',size: '22',type: 'contact'}"></uni-list-item>
					<uni-list-item title="日常工作" thumb="https://img-cdn-qiniu.dcloud.net.cn/new-page/hx.png"></uni-list-item>
				</uni-list>
			</div>
		</uni-drawer>
	</div>
</template>

<script>
	import uniDrawer from "@/components/uni-drawer/uni-drawer.vue"
	import uniList from "@/components/uni-list/uni-list.vue"
	import uniListItem from "@/components/uni-list-item/uni-list-item.vue"
	export default {
		components: {uniDrawer,uniList,uniListItem},
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {
			open(){
				this.$Router.push({name: '列表',params:{id:'45454'}})
				// this.$Router.push({ path: '/pages/home/list', query: { plan: 'private' }})
			},
			openBox(){
				this.$refs.leftBox.open()
			},
		}
	}
</script>

<style lang="less" scoped>
	.head-bar{
		padding: 0 60px;
		text-align:left;
		height: 52px;
		line-height: 52px;
		background:rgba(6,25,104,1);
		font-size:18px;
		font-family:PingFangSC-Medium,PingFang SC;
		font-weight:500;
		color:rgba(255,255,255,1);
	}
	.head-img{
		width:79px;
		height:79px;
	}
	.logo {
		width:200px;
	}

</style>
