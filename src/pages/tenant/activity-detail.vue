<template>
	<view  class="wrap">
		<u-tabs :list="listType" :is-scroll="true" :current="current" @change="change"></u-tabs>
		<view class="content">
			<template v-if="current===0">
				<p class="title">活动主题：</p>
				<p >活动分类：{{dataDetail.activeType}}</p>
				<p >开始日期：{{dataDetail.time}}</p>
				<p >结束日期：</p>
				<p >所属楼宇：</p>
				<p >房号：</p>
				<p >租户名称：{{dataDetail.name}}</p>
				<p >租户电话：{{dataDetail.phone}}</p>
				<p >负责人：</p>
				<p >活动费用：{{dataDetail.price}}</p>
				<p >描述：</p>
			</template>
			<template v-if="current===1">
				<view class="items">
					<view class="item">
						<p class="title">编号：</p>
						<p >单元/车位：{{dataDetail.activeType}}</p>
						<p >财务项目：{{dataDetail.time}}</p>
						<p >名称：</p>
						<p >规格：</p>
						<p >单位：</p>
						<p >单价：{{dataDetail.price}}</p>
						<p >数量：</p>
						<p >期限：</p>
					</view>
					<view class="item">
						<p class="title">编号：</p>
						<p >单元/车位：{{dataDetail.activeType}}</p>
						<p >财务项目：{{dataDetail.time}}</p>
						<p >名称：</p>
						<p >规格：</p>
						<p >单位：</p>
						<p >单价：{{dataDetail.price}}</p>
						<p >数量：</p>
						<p >期限：</p>
					</view>
				</view>
			</template>
			<template v-if="current===3">
				<view class="items">
					<view class="item">
						<p >审批人：{{dataDetail.name}}</p>
						<p >级别：</p>
						<p >状态：</p>
						<p >描述：</p>
						<p >日期：{{dataDetail.time}}</p>
					</view>
				</view>
			</template>
		</view>
		<uni-drawer :visible="false" ref="leftBox">
			<leftMenu @closeMenu="closeMenu"></leftMenu>
		</uni-drawer>
	</view >
</template>

<script>
	import leftMenu from "@/components/left-menu/left-menu.vue"
	import {getDetail} from "@/utils/api/comment"
	export default {
		components: {leftMenu},
		data() {
			return {
				dataDetail:{},
				listType:[
					{
						name: '基本',
					},
					{
						name: '费用',
					},
					{
						name: '资料',
					},
					{
						name: '审批',
					},
					{
						name: '过程',
					},
					{
						name: '巡检',
					},
					{
						name: '回访',
					},
				],
				currTypeName:'',
				index:0,
				dataList:[],
				currIndex:0,
				current: 0,
			}
		},
		onLoad() {
			this.getDetail()
		},
		methods: {
			change(index) {
				this.current = index;
			},
			async getDetail(params){
				let res = await getDetail(params)
				if(res.code === 200){
					this.dataDetail = res.data
					console.log(res);
				}else {

				}
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
	.wrap{
		font-size:28rpx;
		color: #6E6E6E;
		.content{
			padding:30rpx 42rpx;
			line-height: 2;
			.title{
				font-size:32rpx;
				font-weight:500;
				color:rgba(89,89,89,1);
			}
			.items{
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;
				overflow: auto;
				font-size:28rpx;
				font-family:PingFangSC-Regular,PingFang SC;
				font-weight:400;
				color:#333333;
				.item{
					width: 99%;
					background:rgba(255,255,255,1);
					border-radius:10rpx;
					margin-bottom: 20rpx;
					padding: 24rpx 30rpx;
					box-sizing: border-box;
					line-height: 1.8;
					box-shadow:0 6rpx 8rpx 2rpx rgba(0,0,0,0.09);
					position: relative;
				}

			}
		}
	}
</style>
