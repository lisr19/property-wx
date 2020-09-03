import fly from '../request'
export function uploadImg (params) {
    return post('uploadimg', params)
}

export function getCode(params) {
    return fly.request({
        url: 'login/logincode',
        method: 'get',
        body: params
    })
}
export function login(params) {
    return fly.request({
        url: 'login/login',
        method: 'post',
        body: params
    })
}
export function loginpwd(params) {
    return fly.request({
        url: 'login/loginpwd',
        method: 'post',
        body: params
    })
}
//工作台
export function getDesktop(params) {
    return fly.request({
        url: 'pmain/desktop',
        method: 'get',
        body: params
    })
}
//人员选择
export function getRslist(params) {
    return fly.request({
        url: 'renshi/rsygsel',
        method: 'get',
        body: params
    })
}

//数据模拟
export function getWater(params) {
    return fly.request({
        url: 'https://mockjs.com/api/waterList',
        method: 'get',
        body: params
    })
}
















