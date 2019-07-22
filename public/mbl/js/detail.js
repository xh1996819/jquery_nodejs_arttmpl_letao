$(function () {
    var id = parseInt(location.search.split('=')[1]);
    var productId
    var size
    $.ajax({
        type: 'get',
        url: '/product/queryProductDetail',
        data: { id },
        success: function (res) {
            console.log(res);
            productId = res.id
            let arr = res.size.split('-');
            let sizeArr = Array.from(new Array(parseInt(arr[1]) + 1).keys()).slice(parseInt(arr[0]))
            res.sizeArr = sizeArr
            let str = template('info', res)
            $('.mui-content').html(str)
            mui('.mui-numbox').numbox()
        }
    })

    $('.mui-content').on('click', '.size span', function () {
        $(this).toggleClass('active').siblings().removeClass('active')
        console.log($('span.active').text());
        size = $('span.active').text()
        if ($('span').hasClass('active')) {
            mui('.mui-numbox').numbox().setValue(1)
        } else {
            mui('.mui-numbox').numbox().setValue(0)
        }
    })

    $('.mui-content').on('click', '#addCart', function () {
        if (!size) {
            mui.toast("请选择尺码")
            return;
        }
        $.ajax({
            type: 'post',
            url: '/cart/addCart',
            data: {
                productId,
                num: mui('.mui-numbox').numbox().getValue(),
                size
            },
            success: function (res) {
                console.log(res);
                if (res.success) {
                    mui.confirm('添加成功,是否去购物车看看', '', ['否', '是'], (e) => {
                        console.log(e);
                        if (e.index === 1) {
                            location.href = 'cart.html'
                        }

                    })
                }
            }
        })
    })
})