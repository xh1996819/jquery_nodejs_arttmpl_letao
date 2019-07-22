$(function () {

    $('.getCode').on('click', function () {
        $.ajax({
            type: 'get',
            url: '/user/vCodeForUpdatePassword',
            success: function (res) {
                console.log(res.vCode);

            }
        })
    })

    $('#cfmBtn').on('tap', function () {
        let oldPassword = $('[name = "oldPassword"]').val()
        let newPassword = $('[name = "newPassword"]').val()
        let cfmPassword = $('[name = "cfmPassword"]').val()
        let vCode = $('[name = "vCode"]').val()

        if (!oldPassword || !newPassword || !vCode) {
            return mui.toast('内容不能为空', { duration: 'short', type: 'div' })
        }

        if (newPassword !== cfmPassword) {
            return mui.toast('再次输入的新密码与新密码必须保持一致', { duration: 'short', type: 'div' })
        }

        $.ajax({
            type: 'post',
            url: '/user/updatePassword',
            data: {
                oldPassword,
                newPassword,
                vCode
            },
            beforeSend: () => {
                setTimeout(() => {
                    mui('#cfmBtn').button('reset');
                }, 2000)
                mui('#cfmBtn').button('loading');
            },
            success: function (res) {

                console.log(res);
                if (res.success) {
                    mui.toast('修改成功! 跳转中...', { duration: 'short', type: 'div' })
                }
                setTimeout(() => {
                    location.href = 'login.html'
                }, 2000)

            }
        })
    })


})