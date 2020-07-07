<template>
	<view  class="content">
		<h2>添加楼宇</h2>
		<view class="form">
			<form @submit="formSubmit" @reset="formReset">
				<div class="input-box"><span>楼宇编号：</span><input class="uni-input" name="num"></div>
				<div class="input-box"><span>楼宇名称：</span><input class="uni-input" name="name"></div>
				<div class="input-box"><span>地址：</span><input class="uni-input" name="name"></div>
				<div class="input-box"><span>占地面积：</span><input class="uni-input" name="name"></div>
				<div class="input-box"><span>总单元数：</span><input class="uni-input" name="name"></div>
				<div class="input-box"><span>开放商：</span><input class="uni-input" name="name"></div>
				<div class="input-box"><span>产权人：</span><input class="uni-input" name="name"></div>
				<div class="input-box"><span>略缩图：</span>
<!--					<view class="img-up" >-->
<!--						<block v-if="imageSrc">-->
<!--							<image :src="imageSrc" class="image" mode="widthFix"></image>-->
<!--						</block>-->
<!--						<block v-else>-->
<!--							<view class="add-box" @click="chooseImage">选择图片</view>-->
<!--						</block>-->
<!--					</view>-->
					<u-upload :action="action" :file-list="fileList" max-count="1"
							  ref="uUpload" name="imgFile" @on-uploaded="onUploaded"
					></u-upload>
				</div>
				<button form-type="submit" class="btn">提交保存</button>
			</form>
		</view>
	</view >
</template>

<script>
	import {} from "@/utils/api/comment"
	export default {
		components: {},
		data() {
			return {
				numb:'',
				imageSrc: '',
				action: 'https://llz.halohealth.cn/api/0.1/upload/img',
				fileList: []
			}
		},
		onLoad() {

		},
		methods: {
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
