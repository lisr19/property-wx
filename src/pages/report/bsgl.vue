<template>
	<view  class="wrap">
		<view  class="head-bar">
			<view  class="bg"></view >
		</view >
		<u-sticky>
			<view  class="card">
				<p class="name"><em></em>报事管理</p>
				<view class="btn btn1" @click="showAddBox">新增</view>
			</view >
			<view  class="card card2">
				<view class="input-box"><span>报事人：</span><input v-model="skey_bsr" class="uni-input" name="num"></view>
				<view class="btn" @click="getbsList">查询</view>
			</view >
		</u-sticky>
		<view class="items">
			<view class="null" v-if="dataList.length===0">
				暂无数据
			</view>
			<view class="item" v-for="(item,index) in dataList" :key="index">
				<p class="title">报事人：{{item.bs_bsr}}</p>
				<p>报事标题：{{item.bs_title}}</p>
				<p>报事描述：{{item.bs_ms}}</p>
				<template>
					<p  v-if="item.bs_zt===0" style="color:#FF9900">状态：未办理</p>
					<p  v-else-if="item.bs_zt===1">状态：已办理</p>
					<p  v-else-if="item.bs_zt===2">状态：已回访</p>
					<p  v-else-if="item.bs_zt===3">状态：已结束</p>
					<p  v-else>状态：已备案</p>
				</template>
				<p>报事日期：{{item.bs_dt}}</p>
				<p v-if="item.bs_bljg">办理结果：{{item.bs_bljg}}</p>
				<span class="iconfont iconshanchu2x"  @click="delItem(item)"></span>
				<span class="iconfont iconbianji12x" v-if="item.bs_zt===0" @click="editItem(item)"></span>
				<span class="iconfont iconguidang2x"  v-if="item.bs_zt===3" @click="gdItem(item)"></span>
			</view>
		</view>
		<uni-pagination class="page-fix" show-icon="true" :total="total" pageSize="10" @change="chagePage"></uni-pagination>
		<uni-drawer :visible="false" ref="leftBox">
			<leftMenu @closeMenu="closeMenu"></leftMenu>
		</uni-drawer>
		<u-modal v-model="showTip" show-cancel-button :content="tipContent" @confirm="delBs"></u-modal>
		<u-modal  v-model="showAdd" ref="uModal" show-cancel-button  :show-title="false" :async-close="true" width="700rpx" @confirm="submit">
			<view class="slot-content" >
				<h6 style="margin: 20rpx 0;text-align: center">{{isEdit?'报事编辑':'报事新增'}}</h6>
				<u-form :model="form" ref="uForm" >
					<u-form-item label="标题" label-width="120"  prop="bs_title">
						<u-input  :border="true" v-model="form.bs_title"/>
					</u-form-item>
					<u-form-item label="报事人" label-width="120" prop="bs_bsr">
						<u-input  :border="true" v-model="form.bs_bsr" />
					</u-form-item>
					<u-form-item label="日期" label-width="120" prop="bs_dt">
						<u-input  type="select"   disabled :border="true" v-model="form.bs_dt" @click="showTime=true"/>
					</u-form-item>
					<u-form-item label="来源" label-width="120" prop="bs_ly_name">
						<u-input  :border="true"  v-model="form.bs_ly_name"  type="select" @click="showLy=true"/>
					</u-form-item>
					<u-form-item label="办理人" label-width="120" prop="bs_blr">
						<u-input  :border="true"   v-model="form.bs_blr"  type="select" @click="showSr=true"/>
					</u-form-item>
					<u-form-item label="描述" label-width="120"  prop="bs_ms" >
						<u-input :border="true" v-model="form.bs_ms" type="textarea"/>
					</u-form-item>
					<u-form-item label="附图" label-width="120"  prop="" >
						<u-upload width="150"  ref="uUpload" :form-data="uploadData"  :format="['jpg','jpeg','png']" :header="myHeader"
								  :before-upload="beforeUpload"	 name="upfile"  :action="action" :file-list="fileList"  @on-remove="handleRemove"
						></u-upload>
					</u-form-item>
				</u-form>
			</view>
		</u-modal>
		<u-select v-model="showLy" :list="list" @confirm="confirmLy"></u-select>
		<u-select v-model="showSr" :list="rsList" @confirm="confirmSr"></u-select>
		<u-picker mode="time" v-model="showTime" @confirm="confirmTime" ></u-picker>
	</view >
</template>

<script>
	import uniDrawer from "@/components/uni-drawer/uni-drawer.vue"
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	import uniBadge from "@/components/uni-badge/uni-badge.vue"
	import leftMenu from "@/components/left-menu/left-menu.vue"
	import uniPagination from '@/components/uni-pagination/uni-pagination.vue'
	import {getbsList,delBs,getbsAdd,eidtItem,lookItem} from "@/utils/api/index"
	import {getRslist,delFile} from "@/utils/api/comment"
	export default {
		components: {uniDrawer,uniIcons,uniBadge,leftMenu,uniPagination},
		data() {
			return {
				uploadData:{
					lm_ftitle:'',
					dh_number:'',
				},
				action: 'http://120.24.0.130:11008/wechat/pic/upload_file',
				myHeader: { authorization: uni.getStorageSync('token')},
				fileList: [],
				skey_bsr:'',
				rsList:[],
				tipContent:'',
				form: {
					bs_title:'',
					bs_dt:'',
					bs_ly_name:'',
					bs_blr:'',
				},
				rules:{
					bs_title: [
						{
							required: true,
							message: '请输入标题',
						}
					],
					bs_bsr: [
						{
							required: true,
							message: '请输入报事人',
						}
					],
					bs_dt: [
						{
							required: true,
							message: '请选择日期',
							trigger: ['change', 'blur']
						}
					],
					bs_ly_name: [
						{
							required: true,
							message: '请选择来源',
							trigger: ['change', 'blur']
						}
					],
					bs_blr: [
						{
							required: true,
							message: '请选择办理人',
							trigger: ['change', 'blur']
						}
					],
					bs_ms: [
						{
							required: true,
							message: '请输入描述',
						}
					],

				},
				list: [
					{
						value: '1',
						label: '线上'
					},
					{
						value: '2',
						label: '线下'
					}
				],
				showLy:false,
				showSr:false,
				showTime:false,
				dataList:[],
				currIndex:0,
				current: 0,
				total:0,
				showTip:false,
				showAdd:false,
				currbsdh:'',
				isEdit:false,
				delIndex:0,
				delId:0,
				dh_number:'',
			}
		},
		onLoad() {
			this.getbsList()
			this.getRslist()
		},
		onReady() {
		},
		methods: {
			beforeUpload(index, list) {
				if(this.isEdit){
					this.uploadData.dh_number=this.form.bs_dh
					this.uploadData.lm_ftitle='报事'
				}
			},
			handleRemove(index){
				this.delIndex = index
				this.fileList.forEach((item,index)=>{
					if(this.delIndex===index){
						this.delId = item.picid
					}
				})
				console.log(this.delId);
				this.delFile({picid:this.delId})
			},
			showAddBox(){
				this.showAdd = true
				this.fileList = []
				this.form = {}
				this.isEdit = false
				this.dh_number=new Date().getTime()
				this.uploadData.dh_number=this.dh_number
				this.uploadData.lm_ftitle='报事'
			},
			editItem(item){
				this.showAdd =true
				this.isEdit =true
				this.form = item
				if(item.bs_ly===0){
					this.form.bs_ly_name = '线上'
				}else {
					this.form.bs_ly_name = '线下'
				}
				this.lookItem({id:item.bs_id})
			},

			submit() {
				this.$refs.uForm.setRules(this.rules)
				console.log(this.form);
				setTimeout(()=>{
					this.$refs.uForm.validate(valid => {
						console.log(valid);
						if (valid) {
							console.log('验证通过');
							if(this.isEdit){
								this.eidtItem()
							}else {
								this.getbsAdd(this.form)
							}
							this.showAdd = false;
						} else {
							console.log('验证失败');
						}
					});
					this.$refs.uModal.clearLoading();
				},100)



			},
			confirmTime(e){
				console.log(e);
				this.form.bs_dt = e.year + '-'+e.month+'-'+e.day
				// console.log(new Date().getTime());

			},
			confirmLy(e) {
				this.form.bs_ly_name = e[0].label
				this.form.bs_ly = e[0].value
			},
			confirmSr(e){
				this.form.bs_blr = e[0].label
				this.form.bs_blrid = e[0].value
			},
			delItem(item,index){
				this.tipContent ='确定删除此记录吗？'
				this.showTip =true
				this.currbsdh = item.bs_dh
				this.currIndex = index
			},
			async delFile(params){
				let res = await delFile(params)
				if(res.code === 0){

				}else {

				}
			},
			gdItem(item,index){
				this.showTip =true
				this.tipContent ='确定备案此记录吗？'
				this.currbsdh = item.bs_dh
				this.currIndex = index
			},
			async getRslist(params){
				let res = await getRslist(params)
				if(res.code === 0){
					let list = res.data
					list.forEach((i,index)=>{
						this.rsList.push({label:i.bmry_name,value:i.bmry_id})
					})
					// console.log(this.rsList);
				}else {

				}
			},
			async lookItem(params){
				this.fileList=[]
				let res = await lookItem(params)
				if(res.code === 0){
					res.data.bs_fj.forEach((i,index)=>{
						this.fileList.push({url:i.pic_phat,picid:i.dh_number,index:index})
					})
					console.log(this.fileList);
				}else {

				}
			},
			async eidtItem(){
				let params = {
					add1:1,
					id:this.form.bs_id,
					dh_number:this.form.bs_dh,
					bs_title:this.form.bs_title,
					bs_bsr:this.form.bs_bsr,
					bs_ly:this.form.bs_ly,
					bs_blrid:this.form.bs_blrid,
					bs_blr:this.form.bs_blr,
					bs_ms:this.form.bs_ms,
					bs_dt:this.form.bs_dt,
				}
				// console.log(params);
				let res = await eidtItem(params)
				if(res.code === 0){
					uni.showToast({
						title: '编辑成功',
						icon: 'none',
						mask: false
					})
					this.getbsList()
				}else {
					// uni.showToast({
					// 	title: '编辑失败',
					// 	icon: 'none',
					// 	mask: false
					// })
				}
			},
			async getbsAdd(params){
				params.dh_number = this.dh_number
				console.log(params);
				let res = await getbsAdd(params)
				if(res.code === 0){
					this.getbsList()
				}else {
					uni.showToast({
						title: '添加失败',
						icon: 'none',
						mask: false
					})
				}
			},
			async delBs(){
				if(this.tipContent==='确定删除此记录吗？'){
					let params ={
						id:this.currbsdh,
						del:1
					}
					let res = await delBs(params)
					if(res.code === 0){
						this.getbsList()
						uni.showToast({
							title: '删除成功',
							icon: 'none',
							mask: false
						})
					}else {
						uni.showToast({
							title: '删除失败',
							icon: 'none',
							mask: false
						})
					}
				}else {
					let params ={
						id:this.currbsdh,
						del:2
					}
					let res = await delBs(params)
					if(res.code === 0){
						this.getbsList()
						uni.showToast({
							title: '确定备案成功',
							icon: 'none',
							mask: false
						})
					}else {
						uni.showToast({
							title: '备案失败',
							icon: 'none',
							mask: false
						})
					}
				}

			},
			async getbsList(params){
				if(this.skey_bsr){
					params.skey_bsr=this.skey_bsr
				}
				console.log(params);
				let res = await getbsList(params)
				if(res.code === 0){
					this.dataList = res.data.data
					this.total = res.data.count
				}else {

				}
			},
			chagePage(e){
				console.log(e);
				this.getbsList({page:e.current})
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
		font-size: 24rpx;
		color: #666666;
		line-height: 36rpx;
		.head-bar{
			font-family:PingFangSC-Medium,PingFang SC;
			font-weight:500;
			color:rgba(255,255,255,1);
			height:336rpx;
			background:rgba(6,25,104,1);
			position: fixed;
			top: 0;
			width: 100%;
			z-index: 9;
			.bg{
				top: -140rpx;
				border-radius: 50%;
				width: 750rpx;
				background: -webkit-linear-gradient(327deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.2) 100%);
				background: linear-gradient(123deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.15) 100%);
				position: absolute;
				left: -170rpx;
				height: 700rpx;
			}
		}
		.card{
			background:rgba(255,255,255,1);
			box-shadow:0rpx 4rpx 12rpx 0rpx rgba(0,0,0,0.09);
			border-radius:10rpx;
			width:90%;
			position: absolute;
			top: 30rpx;
			left:5%;
			z-index: 10;
			font-weight:500;
			color:rgba(51,51,51,1);
			padding: 30rpx;
			box-sizing: border-box;
			.input-box{
				display: flex;
				align-items: center;
				justify-content: center;
				margin-bottom: 12px;
				font-size:28rpx;
				padding: 0 20rpx;
				.uni-input{
					flex: 1;
					height:28px;
					line-height: 28px;
					background:rgba(255,255,255,1);
					border-radius:8px;
					border:1px solid rgba(230,230,230,1);
					padding-left: 5px;
				}
			}
			.name{
				font-size:36rpx;
				font-family:PingFangSC-Semibold,PingFang SC;
				font-weight:600;
				color:rgba(51,51,51,1);
				line-height:44rpx;
				margin-bottom: 34rpx;
				display: flex;
				align-items: center;
				em{
					width:14rpx;
					height:14rpx;
					background:#00D29C;
					display: inline-block;
					margin-right: 12rpx;
					border-radius: 50%;
				}
			}
			.btn{
				width:230rpx;
				height:74rpx;
				text-align: center;
				line-height: 74rpx;
				border-radius:16rpx;
				font-size:36rpx;
				font-weight:400;
				color:rgba(255,255,255,1);
				background:rgba(4,17,73,1);
				margin-top: 26rpx;
			}
			.btn1{
				background:#017AFF;
				position: absolute;
				right: 30rpx;
				top: 35rpx;
				margin: 0;
			}
		}
		.card2{
			top: 190rpx;
		}
		.tab {
			height: 80rpx;
			position: absolute;
			z-index: 9;
			background: #ffffff;
			top: 375rpx;
			width: 100%;
			padding: 0 38rpx;
			.active{
				color: #077AFF;
			}
		}
		.items{
			padding: 420rpx 0 100rpx;
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			overflow: auto;
			font-size:28rpx;
			font-family:PingFangSC-Regular,PingFang SC;
			font-weight:400;
			color:rgba(122,122,122,1);
			.item{
				width:690rpx;
				background:rgba(255,255,255,1);
				border-radius:10rpx;
				/*background: #00D29C;*/
				margin-top: 20rpx;
				padding: 24rpx 48rpx;
				box-sizing: border-box;
				line-height: 1.8;
				box-shadow:0 6rpx 8rpx 2rpx rgba(0,0,0,0.09);
				position: relative;
				.iconshanchu2x{
					position: absolute;
					top: 10rpx;
					right: 20rpx;
					font-size: 34rpx;
				}
				.iconguidang2x{
					position: absolute;
					top: 50rpx;
					right: 6rpx;
					font-size: 68rpx;
				}
				.iconbianji12x{
					position: absolute;
					top: 70rpx;
					right: 18rpx;
					font-size: 36rpx;
				}
				.title{
					font-size:32rpx;
					font-weight:500;
					color:rgba(89,89,89,1);
				}
			}

		}
	}
	.slot-content{
		padding: 10rpx 26rpx;
	}
</style>
