// pages/search/search.js
import douban from "../../utils/douban.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page:1,
    size:20,
    subtitle:"请输入搜索内容",
    list:[],
    search:'',
    loading:false,
    hasMore:false
  },

  loadList(){
    this.setData({ subtitle: '加载中', loading: true, hasMore: true })
    let start=(this.data.page-1)*this.data.size   //计算开始条数
    this.setData({
      page:this.data.page++
    })
    douban({
      url:'/music/search',
      data:{
        q:this.data.search,
        start:start,
        count:this.data.size
      }
    }).then(
      res=>{
        // console.log(res.data)
        this.setData({loading:false,hasMore:false})
        if(res.data.musics.length<=0) return
        let result=[]
        res.data.musics.map(item=>{
          let authors=[]
          item.author.map(item=>{
            authors.push(item.name)
          })
          result.push({
            image:item.image,
            title:item.title,
            id:item.id,
            original_title: item.alt_title,
            average: item.rating.average,
            year:item.attrs.pubdate,
            directors: authors
          })
        })
        this.setData({
          list:this.data.list.concat(result)
        })
        wx.stopPullDownRefresh()  //停止下拉刷新
      }
    )
  },

  handleSearch(e){
    if(!e.detail.value) return
    this.setData({list:[],page:1})  //每次搜索钱都清空
    this.setData({subtitle:'加载中',loading:true,hasMore:true,search:e.detail.value})
    this.loadList()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this.data.list=[]
    this.data.page=1
    this.loadList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.loadList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})