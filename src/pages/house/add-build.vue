<template>
	<view  class="content">
		<h2>添加楼宇</h2>
<!--		<view class="form">-->
<!--			<form @submit="formSubmit" @reset="formReset">-->
<!--				<div class="input-box"><span>楼宇编号：</span><input  class="uni-input" name="num"></div>-->
<!--				<div class="input-box"><span>楼宇名称：</span><input class="uni-input" name="name"></div>-->
<!--				<div class="input-box"><span>地址：</span><input class="uni-input" name="name"></div>-->
<!--				<div class="input-box"><span>占地面积：</span><input class="uni-input" name="name"></div>-->
<!--				<div class="input-box"><span>总单元数：</span><input class="uni-input" name="name"></div>-->
<!--				<div class="input-box"><span>开放商：</span><input class="uni-input" name="name"></div>-->
<!--				<div class="input-box"><span>产权人：</span><input class="uni-input" name="name"></div>-->
<!--				<div class="input-box"><span>略缩图：</span>-->
<!--					<u-upload :action="action" :file-list="fileList" :max-size="5 * 1024 * 1024" max-count="3"-->
<!--							  ref="uUpload" name="imgFile" @on-uploaded="onUploaded"-->
<!--					></u-upload>-->
<!--				</div>-->
<!--				<button form-type="submit" class="btn">提交保存</button>-->
<!--			</form>-->
<!--		</view>-->
		<view class="form">
			<u-form :model="form" ref="uForm">
				<u-form-item label="楼宇编号：" prop="name" required label-width="auto">
					<u-input v-model="form.name" />
				</u-form-item>
				<u-form-item label="楼宇名称：" prop="mobile" label-width="auto">
					<u-input v-model="form.mobile"  />
				</u-form-item>
				<u-form-item label="地址：" prop="mobile" label-width="auto">
					<u-input v-model="form.mobile"  />
				</u-form-item>
				<u-form-item label="占地面积：" prop="mobile" label-width="auto">
					<u-input v-model="form.mobile"  />
				</u-form-item>
				<u-form-item label="总单元数：" prop="mobile" label-width="auto">
					<u-input v-model="form.mobile"  />
				</u-form-item>
				<u-form-item label="开放商：" prop="mobile" label-width="auto">
					<u-input v-model="form.mobile"  />
				</u-form-item>
				<u-form-item label="产权人：" prop="mobile" label-width="auto">
					<u-input v-model="form.mobile"  />
				</u-form-item>
				<u-form-item label="略缩图：" label-width="auto">
					<u-upload :action="action" :file-list="fileList" :max-size="5 * 1024 * 1024" max-count="3"
							  ref="uUpload" name="imgFile" @on-uploaded="onUploaded"
					></u-upload>
				</u-form-item>
				<view class="btn" @click="submit">提交</view>
			</u-form>
		</view>
		<view class="uni-list">
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">
					当前选择
				</view>
				<view class="uni-list-cell-db">
					<picker mode="date" :value="date" :start="startDate" @change="bindDateChange">
						<view class="uni-input">{{date}}</view>
					</picker>
				</view>
			</view>
		</view>
		<view class="">
			<view class="text-area">
				<text class="label">当前选中项目：</text>
				<text class="value" @tap="show = true">{{info || "请选择"}}</text>
			</view>
			<multiple-select
					v-model="show"
					:data="list"
					:default-selected="defaultSelected"
					@confirm="confirm"
			></multiple-select>
		</view>
	</view >
</template>

<script>
	import {} from "@/utils/api/comment"
	import multipleSelect from "@/components/multipleSelect/multipleSelect";
	export default {
		components: {multipleSelect},
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				show: false, //是否显示 - 双向绑定
				info: "",
				defaultSelected: ["3", "5"], //默认选中项
				list:[
					{
						label: "皮皮虾",
						value: "1",
					},
					{
						label: "小龙虾",
						value: "2",
						disabled: true, //禁用
					},
					{
						label: "大龙虾",
						value: "3",
					},
					{
						label: "石头蟹",
						value: "4",
					},
					{
						label: "兰花蟹",
						value: "5",
					},
					{
						label: "面包蟹",
						value: "6",
					},
					{
						label: "石斑鱼",
						value: "7",
					},
					{
						label: "鲫鱼",
						value: "8",
					},
					{
						label: "鲨鱼",
						value: "9",
					},
				],
				date: currentDate,
				numb:'',
				imageSrc: '',
				action: 'https://llz.halohealth.cn/api/0.1/upload/img',
				fileList: [],
				form: {
					name: '',
					mobile: '',
				},
				// rules: {
				// 	name: [
				// 		{
				// 			required: true,
				// 			message: '请输入姓名',
				// 			trigger: ['blur', 'change']
				// 		}
				// 	],
				// 	mobile: [
				// 		{
				// 			required: true,
				// 			message: '请输入手机号',
				// 			trigger: ['change','blur'],
				// 		},
				//
				// 	]
				// }
			}
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		methods: {
			confirm(data) {
				console.log(data);
				this.info = data.map((el) => el.label).join(",");
			},
			bindDateChange: function(e) {
				this.date = e.target.value
				console.log(this.date);
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			submit() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						console.log('验证通过');
						uni.showToast({
							title: '标题',
							duration: 2000
						});
					} else {
						console.log('验证失败');
					}
				});
			},
			onUploaded(lists) {
				console.log(lists);
				// this.fileList = lists;
			},
			chooseImage() {
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					sourceType: ['album'],
					success: (res) => {
						console.log('chooseImage success, temp path is', res.tempFilePaths[0])
						var imageSrc = res.tempFilePaths[0]
						uni.uploadFile({
							url: 'https://unidemo.dcloud.net.cn/upload',
							filePath: imageSrc,
							fileType: 'image',
							name: 'data',
							success: (res) => {
								console.log('uploadImage success, res is:', res)
								uni.showToast({
									title: '上传成功',
									icon: 'success',
									duration: 1000
								})
								this.imageSrc = imageSrc
							},
							fail: (err) => {
								console.log('uploadImage fail', err);
								uni.showModal({
									content: err.errMsg,
									showCancel: false
								});
							}
						});
					},
					fail: (err) => {
						console.log('chooseImage fail', err)
						// #ifdef MP
						uni.getSetting({
							success: (res) => {
								let authStatus = res.authSetting['scope.album'];
								if (!authStatus) {
									uni.showModal({
										title: '授权失败',
										content: 'Hello uni-app需要从您的相册获取图片，请在设置界面打开相关权限',
										success: (res) => {
											if (res.confirm) {
												uni.openSetting()
											}
										}
									})
								}
							}
						})
						// #endif
					}
				})
			},
			formSubmit(e){
				console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
				var formdata = e.detail.value
			},
			formReset: (e) =>{
				console.log('清空数据')
			}
		}
	}
</script>
<style scoped>
	/deep/ .uni-input-input, /deep/ .u-input__input{
		flex: 1;
		height:28px;
		line-height: 28px;
		background:rgba(255,255,255,1);
		border-radius:8px;
		border:1px solid rgba(230,230,230,1);
		padding-left: 5px;
		box-sizing: border-box;
	}
	/deep/ .uni-input-placeholder{
		padding-left: 10px;
	}
	/deep/.u-input__input{
		margin: 0!important;
	}
	/deep/.u-border-bottom:after{
		border: none;
	}
</style>
<style lang="less" scoped>
	.content{
		color: #666666;
		padding: 0 24px;
		font-size:14px;
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(102,102,102,1);
		line-height:20px;
		h2{
			font-size:18px;
			font-weight:600;
			color:rgba(51,51,51,1);
			margin: 20px 0;
		}
		.btn{
			width:115px;
			height:37px;
			line-height: 37px;
			background:rgba(1,122,255,1);
			border-radius:8px;
			font-size:18px;
			font-weight:600;
			color:rgba(255,255,255,1);
			margin-top: 30px;
			text-align: center;
		}
		.form{
			.input-box{
				display: flex;
				align-items: center;
				margin-bottom: 12px;
				span{
					width: 72px;
					text-align: right;
				}
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
		}
	}
	.img-up{
		width:94px;
		height:94px;
		background:rgba(247,247,247,1);
		border-radius:8px;
		border:1px solid rgba(230,230,230,1);
		.image {
			width:94px;
			height:94px;
		}
		.add-box{
			width:94px;
			height:94px;
			display: flex;
			align-items: center;
			justify-content: center;
		}

	}
</style>
