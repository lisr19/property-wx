// router/modules/home.js
const home = [
	{
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/index/index',
		aliasPath:'/',  //对于h5端你必须在首页加上aliasPath并设置为/
		name: '首页',
	},
	{
		path: '/pages/home/list',
		name: '列表',
	},
	{
		path: '/pages/menu/menu',
		name: '分类',
	},
	{
		path: '/pages/house/water-price',
		name: '水电价格',
	},
	{
		path: '/pages/house/building',
		name: '楼宇设置',
	},
	{
		path: '/pages/house/add-build',
		name: '添加楼宇',
	},

]
export default home