import fly from '../request'
export function uploadImg (params) {
    return post('api/0.1/upload/img', params)
}

export function getCode(params) {
    return fly.request({
        url: '/wechat/login/logincode',
        method: 'get',
        body: params
    })
}
export function login(params) {
    return fly.request({
        url: '/wechat/login/login',
        method: 'post',
        body: params
    })
}
export function loginpwd(params) {
    return fly.request({
        url: '/wechat/login/loginpwd',
        method: 'post',
        body: params
    })
}

export function getWater(params) {
    return fly.request({
        url: '/waterList',
        method: 'get',
        body: params
    })
}
export function electList(params) {
    return fly.request({
        url: '/electList',
        method: 'get',
        body: params
    })
}

















