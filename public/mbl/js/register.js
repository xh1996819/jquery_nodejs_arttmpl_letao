$(function () {
    //注册按钮点击事件
    $('#regBtn').on('click', function () {
        var username = $('[name="username"]').val()
        var mobile = $('[name="mobile"]').val()
        var password = $('[name="password"]').val()
        var cfmPassword = $('[name="cfmPassword"]').val()
        var vCode = $('[name="vCode"]').val()

        if (!username || !mobile || !password || !cfmPassword || !vCode) {
            return mui.toast('内容不能为空', { duration: 'short', type: 'div' })
        }

        $.ajax({
            type: 'post',
            url: '/user/register',
            data: {
                username,
                mobile,
                password,
                vCode
            },
            success: function (res) {
                console.log(res.success);
                if (res.success) {
                    mui.toast('注册成功! 跳转中...', { duration: 'short', type: 'div' })
                }
                setTimeout(() => {
                    location.href = 'login.html'
                }, 2000)

            }
        })

    })

    //获取验证码
    $('.getCode').on('click', function () {
        $.ajax({
            type: 'get',
            url: '/user/vCode',
            success: function (res) {
                console.log(res.vCode);

            }
        })
    })
})