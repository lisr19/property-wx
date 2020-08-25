import fly from '../request'


export function getPlan(params) {
    return fly.request({
        url: '/wechat/sebei/sbjh',
        method: 'get',
        body: params
    })
}



















