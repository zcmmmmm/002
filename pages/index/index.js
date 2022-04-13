// index.js
// 获取应用实例
const app = getApp();
// 轮播图
Page({
  data: {
    currentId: 1,
    currentArea: "recommend",
    swiperImgUrl: [],
    recommendItemData: [],
    searchResultArray: [],
    navigatorData: [
      {
        name: "recommend",
        text: "推荐",
        url: "/resources/recommend.png",
        className: "navigator-recommend",
      },
      {
        name: "project",
        text: "实战",
        url: "/resources/project.png",
        className: "navigator-project",
      },
      {
        name: "path",
        text: "路径",
        url: "/resources/path.png",
        className: "navigator-path",
      },
      {
        name: "activity",
        text: "活动",
        url: "/resources/activity.png",
        className: "navigator-activity",
      },
    ],
    activityData:[],
  },
  navigatorTap(event) {
    const currentNavigatorName = event.currentTarget.dataset.name;
    this.setData({
      currentNavigatorName: currentNavigatorName,
      currentArea: currentNavigatorName,
    });
  },
  inputChange(event) {
    const inputValue = event.detail.value;
    this.setData({
      searchResultArray: this.data.recommendItemData.filter((obj) => {
        return obj.recommendItemContent.recommendItemContentTitle
          .toUpperCase()
          .includes(inputValue.toUpperCase());
      }),
    });
    // console.log(this.data.searchResultArray);
  },
  swiperItemChange(event) {
    this.setData({
      currentId: event.detail.currentItemId,
    });
  },
  recommendMoreTap(){
    wx.navigateTo({
      url: '/pages/rank/rank',
    })
  },
  onLoad() {
    const that = this;
    wx.request({
      url:
        "https://www.fastmock.site/mock/ab7ab2dee59f6bbb0e778ea7913d0057/weixin/api/index/getSwiperData",
      header: {
        "content-type": "application/json", // 默认值
      },
      success(res) {
        that.setData({
          swiperImgUrl: res.data.data.urls,
        });
      },
    });
    wx.request({
      url:
        "https://www.fastmock.site/mock/ab7ab2dee59f6bbb0e778ea7913d0057/weixin/api/index/getRecommendItemData",
      header: {
        "content-type": "application/json", // 默认值
      },
      success(res) {
        that.setData({
          recommendItemData: res.data.data.recommendItemData,
          searchResultArray: res.data.data.recommendItemData,
        });
      },
    });
    wx.request({
      url:
        "https://www.fastmock.site/mock/ab7ab2dee59f6bbb0e778ea7913d0057/weixin/api/index/getActivity",
      header: {
        "content-type": "application/json", // 默认值
      },
      success(res) {
        that.setData({
          activityData: res.data.data.urls,
        });
      },
    });
  },
});
