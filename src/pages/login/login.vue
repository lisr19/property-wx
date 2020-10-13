<template>
	<view class="wrap">
		<image class="logo" src="/static/logo.png"></image>
		<p class="title">物业管理系统</p>
		<template>
			<view class="card-login">
				<p>
					<span class="iconfont iconzhanghao2x"></span>
					<input  v-model="username"  placeholder='账号'  maxlength="16">
				</p>
				<p>
					<span class="iconfont iconmima2x"></span>
					<input  v-model="password"  type="password" placeholder='密码' >
				</p>
				<p>
					<input  v-model="code"  type="number" placeholder='输入验证码' maxlength="4"  @confirm="login">
					<span class="code" @click="getCode">{{codeNum}}</span>
				</p>
				<view class="tips">
					<span style="display: flex;align-items: center;">
					   <checkbox value="cb" checked="true" style="transform:scale(0.8)"/>
						记住账号
					</span>
					<span style="border-bottom: 1px solid #42466D;padding-bottom: 1px" @click="getPwd">忘记密码?</span>
				</view>
				<view class="btn"  @click="login">登录</view>
			</view>
		</template>
		<u-popup v-model="showPWD" mode="bottom" border-radius="20" height="40%" closeable>
			<view class="pwd">
				<u-input  v-model="username2" :type="type" border placeholder='账号' />
				<u-button class="btn" type="warning" @click="loginpwd">重置密码</u-button>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {login,getCode,loginpwd} from "@/utils/api/comment"
	export default {
		components: {},
		data() {
			return {
				value: '',
				type: 'text',
				username:'',
				username2:'',
				code:'',
				codeNum:'',
				password:'',
				showPWD:false,
			}
		},
		onLoad() {
			this.getCode()
		},
		methods: {
			getPwd(){
				this.showPWD = true
			},
			async getCode(){
				let res = await getCode()
				if(res.code === 0){
					this.codeNum= res.data.code
				}
			},
			async loginpwd(){
				if(!this.username2){
					return uni.showToast({
						title: '账号不能为空',
						icon: 'none',
						mask: false
					})
				}
				let params ={
					username:this.username2
				}
				let res = await loginpwd(params)
				if(res.code === 0){
					uni.showToast({
						title: '密码已重置',
						icon: 'none',
						mask: false
					})
					this.showPWD = false
				}else {
					uni.showToast({
						title: res.msg,
						icon: 'none',
						mask: false
					})
				}
			},
			async login(){
				if(!this.username){
					uni.showToast({
						title: '账号不能为空',
						icon: 'none',
						mask: false
					})
					return
				}else if(!this.password){
					uni.showToast({
						title: '密码不能为空',
						icon: 'none',
						mask: false
					})
					return
				}else if(!this.code){
					uni.showToast({
						title: '验证码不能为空',
						icon: 'none',
						mask: false
					})
					return
				}else if(this.code!=this.codeNum){
					uni.showToast({
						title: '验证码错误',
						icon: 'none',
						mask: false
					})
					return
				}
				let params = {
					username:this.username,
					password:this.password,
					code:this.code,
				}
				let res = await login(params)
				if(res.code ===0){
					let data = res.data
					uni.setStorage({key: 'token', data: data.token})
					uni.setStorage({key: 'user_id', data: data.user_id})
					uni.setStorage({key: 'user_name', data: data.user_name})
					uni.setStorage({key: 'userData', data: data})
					// this.$Router.push({name:'首页'})
					uni.redirectTo({
						url: '/pages/index/index'
					});
					console.log(res);
				}else {
					uni.showToast({
						title: res.msg,
						icon: 'none',
						mask: false
					})
				}
			},
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
		background: #EFF3F7;
		background: url("../../static/bg.png") ;
		background-size: cover;
		background-position: 50% ;
		background-repeat: no-repeat;
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
			font-size: 30rpx;
			font-weight: 600;
		}
		.card-login{
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
			.iconfont{
				font-size: 42rpx;
				margin-right: 20rpx;

			}
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
	.pwd{
		margin-top: 80rpx;
		padding: 50rpx;
		.btn{
			margin: 60rpx 0;
		}
	}
</style>
