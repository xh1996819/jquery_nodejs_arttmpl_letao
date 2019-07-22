$(function () {
    var addressStr;
    $.ajax({
        type: 'get',
        url: '/address/queryAddress',
        success: function (res) {
            console.log(res);
            addressStr = res
            let str = template('info', res)
            $('#address').html(str)
        }
    })

    //删除地址按钮相关事件
    $('#address').on('tap', '#delAddress', function () {
        mui.confirm('是否删除当前地址信息', '', ['否', '是'], (e) => {
            console.log(e);
            if (e.index === 1) {
                console.log($(this).parents('li').attr('data-id'));
                $.ajax({
                    type: 'post',
                    url: '/address/deleteAddress',
                    data: {
                        id: $(this).parents('li').attr('data-id')
                    },
                    success: function (res) {
                        console.log(res);
                        if (res.success) {
                            mui.toast('删除成功', { duration: 'short', type: 'div' })
                            setTimeout(() => {
                                location.reload()
                            }, 1000)
                        }

                    }
                })
            } else {
                mui.swipeoutClose(this.parentNode.parentNode)
            }

        })
    })

    //编辑地址按钮相关事件
    $('#address').on('tap', '#updAddress', function () {
        // console.log($(this).parents('li').attr('data-id'));
        let id = $(this).parents('li').attr('data-id')
        // console.log(addressStr);
        addressStr.forEach(item => {
            if (item.id == id) {
                console.log(item);
                localStorage.setItem('addressMsg', JSON.stringify(item))
                setTimeout(() => {
                    location.href = 'addAddress.html?isUpdate=1'
                })
            }
        });
    })
})