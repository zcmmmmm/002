// pages/rank/rank.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isProject: true,
    isPath: false,
    isWeek: true,
    isMonth: false,
    //   实战周排行
    rankContentProjectWeekData: [],
    // 实战月排行
    rankContentProjectMonthData: [],
    // 路径周排行
    rankContentPathWeekData: [],
    // 路径月排行
    rankContentPathMonthData: [],
  },
  rankTap(event) {
    const currentName = event.currentTarget.dataset.name;
    let statusData = wx.getStorageSync("statusData") || {};
    if (currentName === "project") {
      Object.assign(statusData, {
        isProject: true,
        isPath: false,
      });
    }
    if (currentName === "path") {
      Object.assign(statusData, {
        isProject: false,
        isPath: true,
      });
    }
    if (currentName === "week") {
      Object.assign(statusData, {
        isWeek: true,
        isMonth: false,
      });
    }
    if (currentName === "month") {
      Object.assign(statusData, {
        isWeek: false,
        isMonth: true,
      });
    }
    this.setData(statusData);
    wx.setStorageSync("statusData", statusData);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    const that = this;
    let statusData = wx.getStorageSync("statusData");
    if (statusData) {
      this.setData({
        isProject: statusData.isProject || false,
        isPath: statusData.isPath || false,
        isWeek: statusData.isWeek || false,
        isMonth: statusData.isMonth || false,
      });
    } else {
      statusData = {
        isProject: this.data.isProject,
        isPath: this.data.isPath,
        isWeek: this.data.isWeek,
        isMonth: this.data.isMonth,
      };
    }
    wx.request({
      url:
        "https://www.fastmock.site/mock/ab7ab2dee59f6bbb0e778ea7913d0057/weixin/api/rank/getRankData/category/project/date/week",
      header: {
        "content-type": "application/json", // 默认值
      },
      success(res) {
        that.setData({
          rankContentProjectWeekData: res.data.data.courseData,
        });
      },
    });
    wx.request({
      url:
        "https://www.fastmock.site/mock/ab7ab2dee59f6bbb0e778ea7913d0057/weixin/api/rank/getRankData/category/project/date/month",
      header: {
        "content-type": "application/json", // 默认值
      },
      success(res) {
        that.setData({
          rankContentProjectMonthData: res.data.data.courseData,
        });
      },
    });
    wx.request({
      url:
        "https://www.fastmock.site/mock/ab7ab2dee59f6bbb0e778ea7913d0057/weixin/api/rank/getRankData/category/path/date/week",
      header: {
        "content-type": "application/json", // 默认值
      },
      success(res) {
        that.setData({
          rankContentPathWeekData: res.data.data.courseData,
        });
      },
    });
    wx.request({
      url:
        "https://www.fastmock.site/mock/ab7ab2dee59f6bbb0e778ea7913d0057/weixin/api/rank/getRankData/category/path/date/month",
      header: {
        "content-type": "application/json", // 默认值
      },
      success(res) {
        that.setData({
          rankContentPathMonthData: res.data.data.courseData,
        });
      },
    });
  },
  rankContentItemTap(event) {
    const courseId = event.currentTarget.dataset.id;
    const courseUrl = "/pages/course/course?id=" + courseId;
    wx.navigateTo({
      url: courseUrl,
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});
