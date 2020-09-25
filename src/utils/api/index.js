import fly from '../request'


export function getPlan(params) {
    return fly.request({
        url: 'sebei/sbjh',
        method: 'get',
        body: params
    })
}
//报事管理
export function getbsList(params) {
    return fly.request({
        url: 'baoshi/bslist',
        method: 'get',
        body: params
    })
}
//报事办理
export function getbsblList(params) {
    return fly.request({
        url: 'baoshi/bsbllist',
        method: 'get',
        body: params
    })
}
//新增报事办理结果
export function addBsbljs(params) {
    return fly.request({
        url: 'baoshi/bsbljg',
        method: 'post',
        body: params
    })
}
//新增报事回访
export function addBshf(params) {
    return fly.request({
        url: 'baoshi/bsblhf',
        method: 'post',
        body: params
    })
}
//报事备案
export function getbsbaList(params) {
    return fly.request({
        url: 'baoshi/bsba',
        method: 'get',
        body: params
    })
}
export function getbsAdd(params) {
    return fly.request({
        url: 'baoshi/bsadd',
        method: 'post',
        body: params
    })
}
export function eidtItem(params) {
    return fly.request({
        url: 'baoshi/bsedit',
        method: 'post',
        body: params
    })
}export function lookItem(params) {
    return fly.request({
        url: 'baoshi/bsedit',
        method: 'get',
        body: params
    })
}
export function bshfAdd(params) {
    return fly.request({
        url: 'baoshi/bsblhf',
        method: 'post',
        body: params
    })
}
export function delBs(params) {
    return fly.request({
        url: 'baoshi/bslist',
        method: 'get',
        body: params
    })
}
export function delBsbl(params) {
    return fly.request({
        url: 'baoshi/bsbllist',
        method: 'get',
        body: params
    })
}
//设备验收
export function getsbbysList(params) {
    return fly.request({
        url: 'sebei/sbby',
        method: 'get',
        body: params
    })
}
export function ysItem(params) {
    return fly.request({
        url: 'sebei/sbby',
        method: 'post',
        body: params
    })
}
//仓库
export function getwpList(params) {
    return fly.request({
        url: 'cangku/ckwp',
        method: 'get',
        body: params
    })
}
export function getckList(params) {
    return fly.request({
        url: 'cangku/cklist',
        method: 'get',
        body: params
    })
}
//外派
export function getwpjl(params) {
    return fly.request({
        url: 'waipai/wpjl',
        method: 'get',
        body: params
    })
}
//档案
export function getdaList(params) {
    return fly.request({
        url: 'dangan/dacx',
        method: 'get',
        body: params
    })
}
export function gettxList(params) {
    return fly.request({
        url: 'dangan/datx',
        method: 'get',
        body: params
    })
}
//租户
export function getzhList(params) {
    return fly.request({
        url: 'zufu/zhhdzh',
        method: 'get',
        body: params
    })
}

//车位
export function getcarList(params) {
    return fly.request({
        url: 'zufu/zhhdcwf',
        method: 'get',
        body: params
    })
}
//收楼列表
export function getfcspList(params) {
    return fly.request({
        url: 'fangchan/fcsplist',
        method: 'get',
        body: params
    })
}

//留言
export function getlyList(params) {
    return fly.request({
        url: 'weixin/wxly',
        method: 'get',
        body: params
    })
}
//回访留言
export function addLyhf(params) {
    return fly.request({
        url: 'weixin/wxlyre',
        method: 'post',
        body: params
    })
}
//计费审批
export function getjfspList(params) {
    return fly.request({
        url: 'caiwu/cwjfsp',
        method: 'get',
        body: params
    })
}
//收费计划
export function getfvList(params) {
    return fly.request({
        url: 'caiwu/cwjfv',
        method: 'get',
        body: params
    })
}
export function editFv(params) {
    return fly.request({
        url: 'caiwu/cwjfv',
        method: 'post',
        body: params
    })
}
//杂费
export function getzfList(params) {
    return fly.request({
        url: 'caiwu/cwzf',
        method: 'get',
        body: params
    })
}
//保证金
export function getbzjList(params) {
    return fly.request({
        url: 'caiwu/cwbzj',
        method: 'get',
        body: params
    })
}

//违约金
export function getwyjList(params) {
    return fly.request({
        url: 'caiwu/cwwyj',
        method: 'get',
        body: params
    })
}
//缴费汇总
export function getjfhzList(params) {
    return fly.request({
        url: 'caiwu/cwjfhz',
        method: 'get',
        body: params
    })
}
//催缴
export function addCj(params) {
    return fly.request({
        url: 'caiwu/cwjfhz',
        method: 'get',
        body: params
    })
}
//缴费明细
export function getmxDetail(params) {
    return fly.request({
        url: 'caiwu/cwjfhzall',
        method: 'get',
        body: params
    })
}
//缴费明细
export function comTk(params) {
    return fly.request({
        url: 'caiwu/cwbzjt',
        method: 'post',
        body: params
    })
}

//计费审批通过不通过
export function editJfsp(params) {
    return fly.request({
        url: 'caiwu/cwjfvsp',
        method: 'post',
        body: params
    })
}


//租户活动管理
export function getzhhdList(params) {
    return fly.request({
        url: 'zufu/zhhdlist',
        method: 'get',
        body: params
    })
}
//非租户活动管理
export function getzhhdfList(params) {
    return fly.request({
        url: 'zufu/zhhdflist',
        method: 'get',
        body: params
    })
}
export function openActiveDetail(params) {
    return fly.request({
        url: 'zufu/zhhdopen',
        method: 'get',
        body: params
    })
}
//活动审批
export function getHdsp(params) {
    return fly.request({
        url: 'zufu/zhhdsp',
        method: 'get',
        body: params
    })
}

