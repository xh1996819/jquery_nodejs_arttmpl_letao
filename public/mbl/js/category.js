$(function () {

    // function fn() {
    //     return new Promise((resolve, reject) => {
    $.ajax({
        type: 'get',
        url: '/category/queryTopCategory',
        success: function (res) {
            let str = template('category-first', res);
            $('.cate-left .mui-scroll ul').html(str)
            resolve()
        }
    })
    //     })
    // }

    // fn().then(() => {
    //     $('.cate-left .mui-scroll ul').children('li').eq(0).click()
    // })
    function resolve() {
        $('.cate-left .mui-scroll ul').children('li').eq(0).click()
    }



    $('.cate-left .mui-scroll ul').on('click', 'li', function () {
        $(this).addClass('active').siblings().removeClass('active');

        $.ajax({
            type: 'get',
            url: '/category/querySecondCategory',
            data: {
                id: $(this).attr('data-id')
            },
            success: function (res) {
                // return console.log(res);

                let str = template('category-second', res)
                $('.cate-right .mui-scroll ul').html(str)
            }
        })
    })

    // $(document).ready(function () {
    //     $('.cate-left .mui-scroll ul').children('li').eq(0).click()
    // })

})