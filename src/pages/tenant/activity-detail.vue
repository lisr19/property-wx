<template>
	<view  class="wrap">
		<u-tabs :list="listType" :is-scroll="true" :current="current" @change="change"></u-tabs>
		<view class="content">
			<template v-if="current===0">
				<!--<p class="title">活动主题：{{dataDetail.zhhd_title}}</p>-->
				<p >活动分类：{{dataDetail.activeType}}</p>
				<p >开始日期：{{dataDetail.sfx_sdt}}</p>
				<p >结束日期：{{dataDetail.sfx_edt}}</p>
				<p >所属楼宇：</p>
				<p >房号：</p>
				<p >租户名称：{{dataDetail.zhi_name}}</p>
				<p >租户电话：{{dataDetail.phone}}</p>
				<p >负责人：</p>
				<p >活动费用：{{dataDetail.price}}</p>
				<p >描述：{{dataDetail.sfx_cwna}}</p>
			</template>
			<template v-if="current===1">
				<view class="items">
					<view class="item" v-for="item in cw_mx">
						<p class="title">编号：{{item.sfx_no}}</p>
						<p >单元/车位：{{item.sfx_fh}}</p>
						<p >财务项目：{{item.sfx_cwna}}</p>
						<p >名称：{{item.sfx_title}}</p>
						<p >规格：{{item.sfx_gg}}</p>
						<p >单位：{{item.sfx_dw}}</p>
						<p >单价：{{item.sfx_dj}}</p>
						<p >数量：{{item.sfx_sl}}</p>
						<p >期限：{{item.sfx_sdt}}至{{item.sfx_edt}}</p>
					</view>
				</view>
				<view class="null-btn" v-if="cw_mx.length===0">暂无数据</view>
			</template>
			<template v-if="current===2">
				<view class="items">
					<image :src="item.pic_phat" alt="" v-for="(item,index) in data_fj"></image>
				</view>
				<view class="null-btn" v-if="data_fj.length===0">暂无数据</view>
			</template>
			<template v-if="current===3">
				<view class="items">
					<view class="item" v-for="(item,index) in data_listspr">
						<p >审批人：{{item.sp_una}}</p>
						<p >级别：{{item.sp_cx}}</p>
						<p >状态：{{item.wdsp_zt===2?'通过':'未审'}}</p>
						<p >描述：{{item.wdsp_ms?item.wdsp_ms:'无'}}</p>
						<p >日期：{{item.ld_dt}}</p>
					</view>
				</view>
				<view class="null-btn" v-if="data_listspr.length===0">暂无数据</view>
			</template>
			<template v-if="current===4">
				<view class="items">
					<view class="item" v-for="(item,index) in data_listgc">
						<p >状态：{{item.hdgc_zt===2?'通过':'不须审批'}}</p>
						<template>
							<p v-if="item.hdgc_jd===1">进度：进场</p>
							<p v-if="item.hdgc_jd===2">进度：施工</p>
							<p v-if="item.hdgc_jd===3">进度：整改</p>
							<p v-if="item.hdgc_jd===4">进度：整改验收</p>
							<p v-if="item.hdgc_jd===5">进度：验收</p>
							<p v-if="item.hdgc_jd===6">进度：完工</p>
						</template>
						<p >巡检人：{{item.hdgc_xjna}}</p>
						<p >审批规则：{{item.hdgc_spna?item.hdgc_spna:'暂无'}}</p>
						<p >说明：{{item.hdgc_ms}}</p>
						<p >日期：{{item.hdgc_dt}}</p>
					</view>
				</view>
				<view class="null-btn" v-if="data_listgc.length===0">暂无数据</view>
			</template>
			<template v-if="current===5">
				<view class="items">
					<view class="item" v-for="(item,index) in data_listxj">
						<p >巡检人：{{item.zhhd_fzr}}</p>
						<p >巡检日期：{{item.ld_dt}}</p>
						<p >备注：{{item.zxxj_bz}}</p>
					</view>
				</view>
				<view class="null-btn" v-if="data_listxj.length===0">暂无数据</view>
			</template>
			<template v-if="current===6">
				<view class="items">
					<view class="item" v-for="(item,index) in data_listhf">

					</view>
				</view>
				<view class="null-btn" v-if="data_listhf.length===0">暂无数据</view>
			</template>
		</view>
		<uni-drawer :visible="false" ref="leftBox">
			<leftMenu @closeMenu="closeMenu"></leftMenu>
		</uni-drawer>
	</view >
</template>

<script>
	import leftMenu from "@/components/left-menu/left-menu.vue"
	import {openActiveDetail} from "@/utils/api/index"
	import Image from "@dcloudio/uni-h5/src/core/view/components/image/index";
	export default {
		components: {
			Image,
			leftMenu},
		data() {
			return {
				itemInfor:{},
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
				data_listspr:[],
				cw_mx:[],
				data_fj:[],
				data_listgc:[],
				data_listhf:[],
				data_listxj:[],
			}
		},
		onLoad() {
			this.itemInfor = this.$Route.query.item
			console.log(this.itemInfor);
			this.getDetail({id:this.$Route.query.id})
		},
		methods: {
			change(index) {
				this.current = index;
			},
			async getDetail(params){
				let res = await openActiveDetail(params)
				if(res.code === 0){
					this.dataDetail = res.data.cw_mx[0]
					this.cw_mx =  res.data.cw_mx
					this.data_fj =  res.data.data_fj
					this.data_listspr =  res.data.data_listspr
					this.data_listgc =  res.data.data_listgc
					this.data_listxj =  res.data.data_listxj
					this.data_listhf =  res.data.data_listhf
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
	.null-btn{
		text-align: center;
		font-size: 32rpx;
		margin-top: 20rpx;
	}
</style>
