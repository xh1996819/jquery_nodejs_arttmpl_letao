$(function () {
    var previewImg = ""
    var page = 1
    var pageSize = 10
    var totalPage
    render()
    function render() {
        $.ajax({
            type: 'get',
            url: '/category/querySecondCategoryPaging',
            data: {
                page,
                pageSize
            },
            success: function (res) {
                console.log(res);
                totalPage = Math.ceil(res.total / pageSize)
                let str = template('categoryTpl', res)
                $('#categoryBox').html(str)
            }
        })
    }

    $('#prevBtn').on('click', function () {
        page--
        $(this).siblings('#nextBtn').removeClass('disabled')
        if (page <= 1) {
            page = 1
            $(this).addClass('disabled')

        }
        render()
    })
    $('#nextBtn').on('click', function () {
        page++
        $(this).siblings('#prevBtn').removeClass('disabled')
        if (page >= totalPage) {
            page = totalPage
            $(this).addClass('disabled')

        }
        render()
    })
    //渲染下拉框
    $.ajax({
        type: 'get',
        url: '/category/queryTopCategoryPaging',
        data: {
            page,
            pageSize: 100
        },
        success: function (res) {
            let str = template('firstCategoryTpl', res)
            $('#firstCategory').html(str)
        }
    })

    $('#fileUpload').fileupload({
        dataType: 'json',
        done: function (e, data) {
            console.log(data);
            $('.img-thumbnail').attr('src', data.result.picAddr)
            previewImg = data.result.picAddr
            console.log(previewImg);

        }
    })

    $('#addCategory').on('click', function () {
        let brandName = $("[name='brandName']").val()
        let categoryId = $("[name='firstCategory']").val()
        let brandLogo = previewImg

        $.ajax({
            type: 'post',
            url: '/category/addSecondCategory',
            data: {
                brandName,
                categoryId,
                brandLogo,
                hot: 0
            },
            success: function (res) {
                console.log(res);

            }
        })

    })
})