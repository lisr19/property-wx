<template>
	<view class="wrap">
		<image class="logo" src="/static/logo.png"></image>
		<p class="title">物业管理系统</p>
		<template>
			<view class="card">
				<p>
					<image  src="/static/logo.png"></image>
					<input  v-model="phoneNum"  placeholder='账号'  maxlength="16">
				</p>
				<p>
					<image  src="/static/logo.png"></image>
					<input  v-model="passWord"  type="password" placeholder='密码' >
				</p>
				<p>
					<input  v-model="code"  type="number" placeholder='输入验证码' maxlength="4">
					<span class="code">1564</span>
				</p>
				<view class="tips">
					<span style="display: flex;align-items: center;">
					   <checkbox value="cb" checked="true" style="transform:scale(0.8)"/>
						记住账号
					</span>
					<span style="border-bottom: 1px solid #42466D;padding-bottom: 1px">忘记密码?</span>
				</view>
				<view class="btn"  @click="">登录</view>
			</view>
		</template>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phoneNum:'',
				code:'',
				passWord:'',
				value:'apple',
				list: [
					{
						name: 'apple',
						disabled: false
					},
				],
			}
		},
		onLoad() {

		},
		methods: {
			radioChange(e) {
				// console.log(e);
			},
		}
	}
</script>

<style lang="less" scoped>
	.wrap{
		position: absolute;
		height: 100%;
		width: 100%;
		background-size:100% 100%;
		background: #EFF3F7;
		display: flex;
		flex-direction: column;
		align-items: center;
		.logo{
			text-align: center;
			width:130rpx;
			height:130rpx;
			display: block;
			margin: 92rpx auto 0;
		}
		.title{
			margin: 26rpx 0 80rpx;
		}
		.card{
			width:612rpx;
			height:684rpx;
			background:rgba(255,255,255,1);
			box-shadow:0 4rpx 16rpx 0 rgba(152,152,152,0.13);
			border-radius:30rpx;
			padding: 64rpx 60rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			flex-direction: column;
			p{
				display: flex;
				align-items: center;
				margin-bottom: 30rpx;
				width: 100%;
				.code{
					width:150rpx;
					height:64rpx;
					line-height: 64rpx;
					text-align: center;
					border-radius:40rpx;
					border:2rpx solid rgba(4,4,4,1);
					font-size:36rpx;
					font-weight:500;
					color:rgba(0,0,0,1);
				}
				image{
					width: 60rpx;
					height: 60rpx;
					margin-right: 20rpx;
				}
				input{
					height: 80rpx;
					border-bottom: 1rpx solid #ddd;
					padding-left: 20rpx;
					width: 402rpx;
				}
			}
			.tips{
				display: flex;
				align-items: center;
				justify-content: space-between;
				width: 100%;
				font-size:32rpx;
				font-family:PingFangSC-Regular,PingFang SC;
				font-weight:400;
				color:rgba(66,70,109,1);
				margin-top: 10rpx;
			}
			.btn{
				width:516rpx;
				height:80rpx;
				line-height: 80rpx;
				background:rgba(4,17,73,1);
				border-radius:30rpx;
				font-size:36rpx;
				font-weight:500;
				margin-top: 80rpx;
				color:rgba(255,255,255,1);
				text-align: center;
			}
		}

	}
</style>
