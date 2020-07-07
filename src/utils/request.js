import Config from '@/Config'

import Fly from 'flyio/dist/npm/wx'
let fly = new Fly
const token = uni.getStorageSync('token')
fly.config.timeout = 30000 // 超时
fly.config.baseURL = Config.baseURL // 基地址,配置在一个文件中。
fly.config.params = {} // 设置公共参数



//添加请求拦截器
fly.interceptors.request.use((request) => {
	uni.showLoading({
		title: "加载中",
		mask:true
	});
	request.headers['content-type']= 'application/json';
	if (uni.getStorageSync('token')) {
		request.headers.authorization = uni.getStorageSync('token')
	}
	return request;
});

//添加响应拦截器
fly.interceptors.response.use(
	(response) => {
	  setTimeout(()=>{
      uni.hideLoading();
    },300)
		return response.data;//请求成功之后将返回值返回
	},
	(err) => {
		//请求出错，根据返回状态码判断出错原因
		console.log(err);
		uni.hideLoading();
		if(err){
			uni.showModal({
			title:'提示',
			content: '网络错误，请稍后再试'
     	 })
			return "请求失败";
		}
	}
);

export default fly;
