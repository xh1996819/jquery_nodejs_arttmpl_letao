$.ajax({
    type: 'get',
    url: '/employee/checkRootLogin',
    async: false,
    success: function (res) {
        console.log(res);
        if (res.error && res.error == 400) {
            location.href = 'login.html'
        }
    }
})
$(function () {
    $('.navs li').on('click', function () {
        $(this).find('ul').slideToggle()
    })

})