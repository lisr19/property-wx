<template>
	<view  class="wrap">
		<u-tabs :list="listType" :is-scroll="true" :current="current" @change="change"></u-tabs>
		<view class="content">
			<template v-if="current===0">
				<p class="title">房号：{{dataDetail.fcfx_ph}}</p>
				<p >所属楼宇：{{dataDetail.fc_name}}</p>
				<p >建面（m³）：{{dataDetail.fcfx_jzmj}}</p>
				<p >租户名称：{{dataDetail.zhi_name}}</p>
				<p >租户电话：{{dataDetail.zhi_tel}}</p>
				<p >合同期限：{{dataDetail.zhi_sdt}}至{{dataDetail.zhi_edt}}</p>
				<p >管理费：{{dataDetail.zhi_glfzzj}}</p>
				<p >管理费周转金：{{dataDetail.zhi_glfzzj}}</p>
				<p >水电费周转金：{{dataDetail.zhi_sdfzzj}}</p>
				<p >清洁费：{{dataDetail.zhi_qjf}}</p>
				<p >清洁费期限：{{dataDetail.zhi_qjfsdt}}至{{dataDetail.zhi_qjfedt}}</p>
				<p >车位：{{dataDetail.zhi_chw}}</p>
				<p >自用：0个</p>
				<p >负责人：{{dataDetail.zhi_fzr}}</p>
				<p >收楼时间：{{dataDetail.zhi_sldt}}  {{dataDetail.zhi_sltm}}</p>
				<p >水表底数：{{dataDetail.zhi_sbds}}</p>
				<p >电表底数：{{dataDetail.zhi_dbds}}</p>
				<p >设备情况：{{dataDetail.zhi_sbms}}</p>
				<p >描述：{{dataDetail.zhi_ms}}</p>
				<view >证件图片：
					<image v-if="dataDetail.zhi_picml"  :src="dataDetail.zhi_picml" class="" />
				</view>
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
					// {
					// 	name: '活动',
					// }
				],
				currTypeName:'',
				index:0,
				dataList:[],
				currIndex:0,
				current: 0,
			}
		},
		onLoad() {
			this.dataDetail = this.$Route.query.itemDetail
			console.log(this.dataDetail);
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
