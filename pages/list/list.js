// pages/list/list.js
import douban from '../../utils/douban.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    key:'',
    // start:10,
    list:[
      // id,image,title,futitle,year,daoyan,pingfen
    ]
  },

  update(key){
    douban({
      url:'/movie/'+key,
      data:{
        start:0,
        count:20
      },
      loadingTop:true
    }).then(
      res=>{
        // console.log(res.data)
        if(!res.data.subjects) return
        let result=[]
        res.data.subjects.map(item=>{
          let directors=[]
          item.directors.map((item,index)=>{
            directors.push(item.name)
          })
          result.push({
            id:item.id,
            image:item.images.small,
            title:item.title,
            original_title: item.original_title,
            year:item.year,
            average:item.rating.average,
            directors:directors
          })
        })
        this.setData({
          list:result
        })
        wx.stopPullDownRefresh()  //结束下拉刷新
      }
    )
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)  //上一个页面跳转传进来的数据
    this.setData({key:options.key})
    this.update(options.key)
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
    this.update(this.data.key)
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