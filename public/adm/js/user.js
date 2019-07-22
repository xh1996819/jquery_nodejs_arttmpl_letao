$(function () {
    var currentPage = 1;
    var pageSize = 10;
    $.ajax({
        type: 'get',
        url: '/user/queryUser',
        data: {
            page: currentPage,
            pageSize
        },
        success: function (res) {
            console.log(res);
            let str = template('userTpl', res)
            $('#userBox').html(str)
        }
    })

    $('#userBox').on('click', '#deleteBtn', function () {
        let isDelete = parseInt($(this).attr('data-isDelete'))
        let id = $(this).attr('data-id')
        // return console.log(id, isDelete);

        $.ajax({
            type: 'post',
            url: '/user/updateUser',
            data: {
                id,
                isDelete: isDelete ? 0 : 1
            },
            success: function (res) {
                console.log(res);
                if (res.success) {
                    location.reload()
                }
            }
        })
    })
})