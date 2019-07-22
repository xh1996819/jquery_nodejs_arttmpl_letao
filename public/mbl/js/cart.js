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
    $.ajax({
        type: 'get',
        url: '/cart/queryCart',
        success: function (res) {
            console.log(res);
            let str = template('info', res)
            $('#cartUlBox').html(str)
        }
    })
})