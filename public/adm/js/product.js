$(function () {
    var page = 1
    var pageSize = 10
    var picArr = []
    $.ajax({
        type: 'get',
        url: '/product/queryProductDetailList',
        data: {
            page,
            pageSize
        },
        success: function (res) {
            console.log(res);
            let str = template('productTpl', res)
            $('#productBox').html(str)
        }
    })

    $.ajax({
        type: 'get',
        url: '/category/querySecondCategoryPaging',
        data: {
            page,
            pageSize: 100
        },
        success: function (res) {
            console.log(res);
            let str = template('brandTpl', res)
            $('#brandBox').html(str)
        }
    })

    $('#fileUpload').fileupload({
        dataType: 'json',
        done: function (e, data) {
            console.log(data);
            picArr.push(data.result.picAddr)
            console.log(picArr);
        }
    })

    $('#addProduct').on('click', function () {
        let brandId = $('#brandOptions').val()
        let proName = $('#productName').val()
        let oldPrice = $('#productOriginPrice').val()
        let price = $('#productNowPrice').val()
        let proDesc = $('#productDescription').val()
        let size = $('#productSize').val()
        let num = $('#productNum').val()

        $.ajax({
            type: 'post',
            url: '/product/addProduct',
            data: {
                brandId,
                proName,
                oldPrice,
                price,
                proDesc,
                size,
                num,
                statu: 1
            },
            success: function (res) {
                if (res.success) {
                    location.reload()
                }
            }
        })
    })

})