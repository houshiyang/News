//index.js


Page({
    data: {
        winHeight: "", //窗口高度
        currentTab: 0, //预设当前项的值
        scrollLeft: 0, //tab标题的滚动条位置
        newsList: [],
        newsType: ''
    },

    onLoad: function () {
        let that = this;
        //  高度自适应
        wx.getSystemInfo({ //获取系统信息
            success: function (res) {
                let clientHeight = res.windowHeight,
                    clientWidth = res.windowWidth,
                    rpxR = 750 / clientWidth;
                let calc = clientHeight * rpxR - 180;
                that.setData({
                    winHeight: calc
                });
            }
        })
        this.loadNews(this.data.id)
    },

    onPullDownRefresh: function () {
        this.loadNews(this.data.id)
    },

    // 滚动切换标签样式
    switchTab: function (e) { //对应bindchange组件，用console.log打印e看结果结构
        console.log('switchTab', e)
        this.setData({
            currentTab: e.detail.current //取到当前页
        });
        switch(this.data.currentTab) {
            case 0:
                this.setData({id: 'top'})
                break;
            case 1:
                this.setData({id: 'shehui'})
                break;
            case 2:
                this.setData({id: 'guonei'})
                break;
            case 3:
                this.setData({id: 'guoji'})
                break;
            case 4:
                this.setData({id: 'yule'})
                break;
            case 5:
                this.setData({id: 'tiyu'})
                break;
            case 6:
                this.setData({id: 'junshi'})
                break;
            case 7:
                this.setData({id: 'keji'})
                break;
            case 8:
                this.setData({id: 'caijing'})
                break;
            case 9:
                this.setData({id: 'shishang'})
                break;
        };
        this.checkCor();
        this.loadNews(this.data.id)
    },

    // 点击标题切换当前页时改变样式
    switchNav: function (e) { //对应bindtap组件
        let cur = e.target.dataset.current; //取到点击的目标值
        this.setData({
            id: e.target.id
        });
        if (this.data.currentTaB == cur) {
            return false;
        } else {
            this.setData({
                currentTab: cur //切换到目标页面
            })
        }
        console.log('id', this.data.id)
        this.loadNews(this.data.id)
    },

    //判断当前横向滚动超过一屏时，设置tab标题滚动条。
    checkCor: function () {
        if (this.data.currentTab > 4) {
            this.setData({
                scrollLeft: 300
            })
        } else {
            this.setData({
                scrollLeft: 0
            })
        }
    },
    
    //footerTap:app.footerTap
    loadNews: function (id = 'top') {
        wx.request({
            url: 'https://v.juhe.cn/toutiao/index?type=' + id + '&key=d82f7b5df2af715a2178e5ba8266cc73',
            success: res => {
                this.setData({
                    newsList: res.data.result.data
                })
            }
        })
    },

    navigateToDetail: function (event) {
        console.log('event', event)
        let title = event.currentTarget.dataset.title
        let date = event.currentTarget.dataset.date
        let category = event.currentTarget.dataset.category
        let authorName = event.currentTarget.dataset.authorName
        let url = event.currentTarget.dataset.url
        let thumbnail_pic_s = event.currentTarget.dataset.thumbnail_pic_s
        let thumbnailPicS02 = event.currentTarget.dataset.thumbnailPicS02
        let thumbnailPicS03 = event.currentTarget.dataset.thumbnailPicS03
        wx.navigateTo({
          url: '../detail/detail?title=' + title + '&date=' + date + '&category=' + category + '&authorName=' + authorName + '&url=' + url + '&thumbnail_pic_s=' + thumbnail_pic_s + '&thumbnailPicS02=' + thumbnailPicS02 + '&thumbnailPicS03=' + thumbnailPicS03,
        })
    }
})