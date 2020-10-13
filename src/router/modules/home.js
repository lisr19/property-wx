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
		path: '/page2/pages/tenant/tenant',
		name: '租户信息',
	},
	{
		path: '/page2/pages/tenant/parking',
		name: '车位信息',
	},
	{
		path: '/page2/pages/tenant/activity',
		name: '活动管理',
	},
	{
		path: '/page2/pages/tenant/building',
		name: '收楼管理',
	},
	{
		path: '/page2/pages/tenant/activity-detail',
		name: '活动详情',
	},
	{
		path: '/page2/pages/tenant/building-detail',
		name: '收楼详情',
	},
	{
		path: '/page2/pages/tenant/examine',
		name: '活动审核',
	},
	{
		path: '/page2/pages/tenant/decoration-inspection',
		name: '装修巡检',
	},
	{
		path: '/page2/pages/tenant/decoration-process-management',
		name: '装修过程管理',
	},
	{
		path: '/page2/pages/tenant/decoration-process-audit',
		name: '装修过程审核',
	},
	{
		path: '/page2/pages/tenant/charge',
		name: '收费审核',
	},
	{
		path: '/page2/pages/tenant/file',
		name: '归档记录',
	},
	{
		path: '/page2/pages/tenant/return',
		name: '活动回访',
	},
	{
		path: '/page2/pages/tenant/leaving',
		name: '租户留言',
	},
	{
		path: '/page2/pages/finance/charging-manage',
		name: '计费管理',
	},
	{
		path: '/page2/pages/finance/approval',
		name: '计费审批',
	},
	{
		path: '/page2/pages/finance/approval-detail',
		name: '计费详情',
	},
	{
		path: '/page2/pages/finance/bond',
		name: '保证金管理',
	},
	{
		path: '/page2/pages/finance/break-money',
		name: '违约金管理',
	},
	{
		path: '/page2/pages/finance/incidental',
		name: '杂费管理',
	},
	{
		path: '/page2/pages/finance/pay-count',
		name: '缴费汇总',
	},
	{
		path: '/pages/inspection/index',
		name: '巡检',
	},
	{
		path: '/pages/inspection/xunjian',
		name: '开始巡检',
	},
	{
		path: '/pages/equipment/plan',
		name: '保养计划',
	},
	{
		path: '/pages/index/detail',
		name: '详情',
	},
	{
		path: '/page2/pages/warehouse/goods',
		name: '物品管理',
	},
	{
		path: '/page2/pages/warehouse/ck-look',
		name: '库存查询',
	},
	{
		path: '/pages/expatriate/fwjl',
		name: '服务记录',
	},
	{
		path: '/page2/pages/report/bsgl',
		name: '报事管理',
	},
	{
		path: '/page2/pages/report/bsbl',
		name: '报事办理',
	},
	{
		path: '/page2/pages/report/bsba',
		name: '报事备案',
	},
	{
		path: '/pages/equipment/byys',
		name: '保养验收',
	},
	{
		path: '/pages/archives/da-look',
		name: '档案查询',
	},
	{
		path: '/pages/archives/remind',
		name: '到期提醒',
	}
]
export default home