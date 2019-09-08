// pages/item/item.js
import douban from '../../utils/douban.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'加载中',
    detail:{},
    photos:[],

  },

  clickImage() {

    wx.previewImage({
      current: this.data.photos[0], // 当前显示图片的http链接
      urls: this.data.photos
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    let url=''
    if(options.api=='movie'){
      url="/movie/subject/"
    }else if(options.api=='music'){
      url="/music/"
    }
    // console.log(url)
    douban({
      url:url+options.id,
      loadingTop:true
    }).then(
      res=>{
        console.log(res.data)
        if(res.data.msg) return
        if(options.api=='movie'){
          let photos=[]
          res.data.photos.map(item=>{
            photos.push(item.image)
          })
          this.setData({
            detail:res.data,
            photos:photos,
            title:res.data.title
          })
          wx.setNavigationBarTitle({
            title: this.data.title +"« 电影 « 豆瓣"
          })
        } else if (options.api == 'music'){
          this.setData({
            detail:{
              images: {
                large: res.data.image
              },
              title: res.data.title,
              year: res.data.attrs.pubdate,
              rating: res.data.rating,
              directors: res.data.author,
              casts: res.data.author,
              name: res.data.title,
              id: res.data.id,
              summary: res.data.summary
            }
          })
          wx.setNavigationBarTitle({
            title: res.data.title +"« 音乐 « 豆瓣",
          })
        }
      }
    )
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})