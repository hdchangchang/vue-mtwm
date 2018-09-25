import axios from 'axios'
import jsonp from 'jsonp'// axios没有提供跨域方法

// 获取城市list
export const getCityList = () => {
  // return axios.get('/local/city.json')
  return axios.post('/ajax/v6/user/address/opencities')
}

// 获取home页面的导航信息
export const getNavData = () => {
  return axios.post('/ajax/v7/home/head')
}

// 获取附件商家列表
export const getNearbyData = () => {
  return axios.post('/ajax/v6/poi/filter')
}

// 获取search页搜索信息
export const getSearchData = () => {
  return axios.get('/ajax/v7/poi/search')
}

// 调用百度api获取关联地址,需要跨域，
export const getRelativePlace = (keyword, city) => {
  return new Promise((resolve, reject) => {
    jsonp(`http://api.map.baidu.com/place/v2/suggestion?query=${keyword}&region=${city}&city_limit=true&output=json&ak=UBxOS1GrDEBjfsGDhGWFq2jfI6r54PTj`, null, function(err, data) {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

// 调用百度api根据坐标值获取具体位置
export const getLocation = (location) => {
  return new Promise((resolve, reject) => {
    jsonp(`http://api.map.baidu.com/geocoder/v2/?&location=${location}&output=json&pois=1&ak=UBxOS1GrDEBjfsGDhGWFq2jfI6r54PTj`, null, function(err, data) {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

// 列表页面筛选条件获取
export const getFilterConditions = () => {
  return axios.get('/ajax/v6/poi/getfilterconditions')
}

