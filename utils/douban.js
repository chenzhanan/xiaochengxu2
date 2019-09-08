
let app = getApp()

export default ({url,data,loadingTop,lodingCenter})=>new Promise((resolve,reject)=>{
 if(loadingTop){
   wx.showNavigationBarLoading()
 }else if(lodingCenter){
   wx.showLoading({
     title:"加载中"
   })
 }

  wx.request({
    // url: `${app.globalData.baseUrl}${url}`,
    url: app.globalData.baseUrl + '/v2' + url,
    data:data,
    header:{
      "content-type":"json"
    },
    method:'GET',
    success:(res)=>{
      if(loadingTop){
        wx.hideNavigationBarLoading()
      }else if(lodingCenter){
        wx.hideLoading()
      }
      resolve(res)
    },
    fail:(err)=>{
      if(loadingTop){
        wx.hideNavigationBarLoading()
      }else if(lodingCenter){
        wx.hideLoading()
      }
      reject(err)
    },
    complete:()=>{
      if (loadingTop) {
        wx.hideNavigationBarLoading()
      } else if (lodingCenter) {
        wx.hideLoading()
      }
    }
  })

})