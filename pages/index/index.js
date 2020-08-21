//index.js
var app = getApp(); //调用app.js中内容

Page({
    data: {
        winHeight: "", //窗口高度
        currentTab: 0, //预设当前项的值
        scrollLeft: 0, //tab标题的滚动条位置
    },
    // 滚动切换标签样式
    switchTab: function (e) { //对应bindchange组件，用console.log打印e看结果结构
        console.log(e)
        this.setData({
            currentTab: e.detail.current //取到当前页
        });
        this.checkCor();
    },
    // 点击标题切换当前页时改变样式
    switchNav: function (e) { //对应bindtap组件
        console.log(e)
        let cur = e.target.dataset.current; //取到点击的目标值
        if (this.data.currentTaB == cur) {
            return false;
        } else {
            this.setData({
                currentTab: cur //切换到目标页面
            })
        }
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
    onLoad: function () {
        let that = this;
        //  高度自适应
        wx.getSystemInfo({ //获取系统信息
            success: function (res) {
                let clientHeight = res.windowHeight,
                    clientWidth = res.windowWidth,
                    rpxR = 750 / clientWidth;
                let calc = clientHeight * rpxR - 180;
                console.log(calc)
                that.setData({
                    winHeight: calc
                });
            }
        });
    },
    //footerTap:app.footerTap
})