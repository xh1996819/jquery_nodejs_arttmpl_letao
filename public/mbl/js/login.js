$(function () {
    //登录按钮的相关事件
    $('#loginBtn').on('click', function () {
        var username = $('[name = "username"]').val()
        var password = $('[name = "password"]').val()
        if (!username || !password) {
            return mui.toast('内容不能为空', { duration: 'short', type: 'div' })
        }

        $.ajax({
            type: 'post',
            url: '/user/login',
            data: {
                username,
                password
            },
            beforeSend: () => {
                setTimeout(() => {
                    mui('#loginBtn').button('reset');
                }, 2000)
                mui('#loginBtn').button('loading');
            },
            success: function (res) {
                console.log(res);
                if (res.error == 403) {
                    return mui.toast('用户名或密码错误', { duration: 'short', type: 'div' })
                }
                mui.toast('登陆成功', { duration: 'short', type: 'div' })
                setTimeout(() => {
                    location.href = 'user.html'
                }, 2000)
            }
        })
    })
})