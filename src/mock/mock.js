const Mock = require('mockjs') // 获取mock对象
const Random = Mock.Random // 获取random对象，随机生成各种数据，具体请翻阅文档
const domain = 'http://mockjs.com/api' // 定义默认域名，随便写
const code = 200 // 返回的状态码

// 随机生成文章数据
const listData = req => {
  console.log(req) // 请求体，用于获取参数
  let posts = [] // 用于存放文章数据的数组
  for (let i = 0; i < 10; i++) {
    let post = {
      id: Random.natural(0, 2),
      name: Random.cname(), // 随机生成名字
      status:Random.natural(0, 1),
      title: Random.csentence(10, 25), // 随机生成长度为10-25的标题
      date: Random.date() + ' ' + Random.time() // 随机生成年月日 + 时间
    }
    posts.push(post)
  }
  // 返回状态码和文章数据posts
  return {
    code,
    posts
  }
}

//水费
let waterList = {
  code: 200,
  message: 'success',
  data: {
    total: 20,
    'rows|20': [{
      'id|+1': 1,
      name: '@cname',
      'job|1': ['前端工程师', '后端工程师', 'UI工程师', '需求工程师'],
      'name|1': ['1楼', '2楼', '3楼', '4楼'],
      'sb|20006-99990': 20046,
      'price|1-10.1': 0.6,
      'state|0-1': 0,
      'time': Random.date('yyyy-MM-dd'),
      'address': Random.county(true),
      'phone': /^1[3456789][1-9]\d{8}/,
      'parking|1': ['已租', '未租'],
      "licenseNumbers": /[粤][A-Z]\d{5,7}/,
      'activeType|1':  ['装修', '其他', '清洁', '收楼','退楼']
    }]
  }
};
//详情
let detail = {
  code: 200,
  message: 'success',
  data: {
    name: '@cname',
    'price|100-300': 100,
    'state|0-1': 0,
    'time': Random.date('yyyy-MM-dd'),
    'address': Random.county(true),
    'phone': /^1[3456789][1-9]\d{8}/,
    'activeType|1':  ['装修', '其他', '清洁', '收楼','退楼'],
  }
};
let electList = {
  code: 200,
  message: 'success',
  data: {
    total: 50,
    'rows|50': [{
      'id|+1': 1,
      name: '@cname',
      'name|1': ['11楼', '21楼', '13楼', '24楼'],
      'sb|20006-99990': 20046,
      'price|1-100.1': 0.6,
      'state|0-1': 0,
    }]
  }
};

// 定义请求链接，类型，还有返回数据
Mock.mock(`${domain}/list`, 'get', listData);
Mock.mock(`${domain}/waterList`, 'get', waterList);
Mock.mock(`${domain}/electList`, 'get', electList);
Mock.mock(`${domain}/detail`, 'get', detail);
