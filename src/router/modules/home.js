// router/modules/home.js
const home = [
	{
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/index/index',
		aliasPath:'/',  //对于h5端你必须在首页加上aliasPath并设置为/
		name: '首页',
	},
	{
		path: '/pages/login/login',
		name: '登录',
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
	{
		path: '/pages/tenant/tenant',
		name: '租户信息',
	},
	{
		path: '/pages/tenant/parking',
		name: '车位信息',
	},
	{
		path: '/pages/tenant/activity',
		name: '活动管理',
	},
	{
		path: '/pages/tenant/activity-detail',
		name: '活动详情',
	},
	{
		path: '/pages/tenant/examine',
		name: '活动审核',
	},
	{
		path: '/pages/tenant/charge',
		name: '收费审核',
	},
	{
		path: '/pages/tenant/leaving',
		name: '租户留言',
	},
	{
		path: '/pages/finance/charging-manage',
		name: '计费管理',
	},
	{
		path: '/pages/finance/approval',
		name: '计费审批',
	},
]
export default home