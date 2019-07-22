$(function () {
    var page = 1
    var pageSize = 10
    var totalPage = 0
    render()
    function render() {
        $.ajax({
            type: 'get',
            url: '/category/queryTopCategoryPaging',
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

    $('#addCategory').on('click', function () {
        let categoryName = $('#categoryName').val()
        $.ajax({
            type: 'post',
            url: '/category/addTopCategory',
            data: {
                categoryName
            },
            success: function (res) {
                console.log(res);
                if (res.success) {
                    $('#categoryName').val('')
                    $('.close').click()
                    render()
                }
            }
        })
    })

})