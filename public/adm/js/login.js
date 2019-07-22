$.ajax({
    type: 'get',
    url: '/employee/checkRootLogin',
    async: false,
    success: function (res) {
        console.log(res);
        if (res.success) {
            location.href = 'user.html'
        }
    }
})
$(function () {
    $('#loginBtn').on('click', function () {
        let username = $('[name = "username"]').val()
        let password = $('[name = "password"]').val()

        $.ajax({
            type: 'post',
            url: '/employee/employeeLogin',

            data: {
                username,
                password
            },
            success: function (res) {
                console.log(res);
                if (res.success) {
                    location.href = 'user.html'
                }
            }
        })
    })
})