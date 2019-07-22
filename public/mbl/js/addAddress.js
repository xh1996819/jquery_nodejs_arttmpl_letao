$(function () {
    console.log(location.search);
    console.log(location.search.split('=')[1]);
    console.log(location.search.split('=')[0]);
    var isUpdate = parseInt(location.search.split('=')[1])
    console.log(isUpdate);
    if (isUpdate === 1) {
        console.log(JSON.parse(localStorage.getItem('addressMsg')));

        let str = template('info', JSON.parse(localStorage.getItem('addressMsg')))
        console.log(str);
        $('form.mui-input-group').html(str)

        $('form.mui-input-group').on('tap', '#addAddress', function () {
            let address = $('[name = "address"]').val()
            let addressDetail = $('[name = "addressDetail"]').val()
            let recipients = $('[name = "recipients"]').val()
            let postcode = $('[name = "postcode"]').val()

            if (!address || !addressDetail || !recipients || !postcode) {
                return mui.toast('内容不能为空', { duration: 'short', type: 'div' })
            }

            $.ajax({
                type: 'post',
                url: '/address/updateAddress',
                data: {
                    id: JSON.parse(localStorage.getItem('addressMsg')).id,
                    address,
                    addressDetail,
                    recipients,
                    postcode
                },
                success: function (res) {
                    console.log(res);
                    if (res.success) {
                        location.href = 'address.html'
                    }
                }
            })
        })
    } else {
        $('#addAddress').on('tap', function () {
            let address = $('[name = "address"]').val()
            let addressDetail = $('[name = "addressDetail"]').val()
            let recipients = $('[name = "recipients"]').val()
            let postcode = $('[name = "postcode"]').val()

            if (!address || !addressDetail || !recipients || !postcode) {
                return mui.toast('内容不能为空', { duration: 'short', type: 'div' })
            }

            $.ajax({
                type: 'post',
                url: '/address/addAddress',
                data: {
                    address,
                    addressDetail,
                    recipients,
                    postcode
                },
                success: function (res) {
                    console.log(res);
                    if (res.success) {
                        location.href = 'address.html'
                    }
                }
            })
        })
    }



    var picker = new mui.PopPicker({ layer: 3 })
    picker.setData(cityData)
    $('#selectCity').on('tap', function () {
        picker.show(function (selectItems) {
            $('#selectCity').val(selectItems[0].text + selectItems[1].text + selectItems[2].text)
        })
    })




})