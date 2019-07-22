var userMessage = null;
$.ajax({
    type: 'get',
    url: '/user/queryUserMessage',
    async: false,
    success: function (res) {
        console.log(res);

        if (res.error && res.error === 400) {
            location.href = 'login.html'
        }
        userMessage = res;
    }
})
$(function () {
    $('#loginOut').on('click', function () {
        $.ajax({
            type: 'get',
            url: '/user/logout',
            success: function (res) {
                if (res.success) {
                    mui.toast('登出成功', { duration: 'short', type: 'div' })
                    setTimeout(() => {
                        location.href = 'index.html'
                    }, 1500)
                }
            }

        })
    })

    //模板引擎渲染数据
    let str = template('info', userMessage)
    $('#userMessage').html(str)
})