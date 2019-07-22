$(function () {

    console.log(getParams(location.search, 'keywords'));
    var keywords = getParams(location.search, 'keywords')
    var num = 0
    //默认价格升序排列
    var priceSort = 1;
    var that
    function getData() {
        if (!that) {
            that = this
        }
        num++
        $.ajax({
            type: 'get',
            url: '/product/queryProduct',
            data: {
                page: num,
                pageSize: 3,
                proName: keywords,
                price: priceSort
            },
            success: function (res) {
                console.log(res);
                if (res.data.length !== 0) {
                    let str = template('info', res)
                    // console.log(str);
                    $('.product-content ul').append(str)
                    that.endPullupToRefresh(false);
                } else {
                    that.endPullupToRefresh(true);
                }

            }

        })
    }

    mui.init({
        pullRefresh: {
            container: '#refreshContainer',//待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
            up: {
                height: 50,//可选.默认50.触发上拉加载拖动距离
                auto: true,//可选,默认false.自动上拉加载一次
                contentrefresh: "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
                contentnomore: '没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
                callback: getData //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            }
        }
    });

    //价格排序的点击事件
    $('#priceSort').on('tap', function () {
        priceSort = priceSort === 1 ? 2 : 1
        $('.product-content ul').html('')
        num = 0
        getData()
    })

})

function getParams(url, name) {
    var urlArr = url.substr(1).split('&')
    var res
    urlArr.forEach(item => {
        var newArr = item.split('=')
        if (newArr[0] == name) {
            res = newArr[1]
        }
    });
    return res
}