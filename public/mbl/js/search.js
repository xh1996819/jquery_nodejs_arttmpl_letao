$(function () {
    var keyArr
    var searchList = localStorage.getItem('keyArr')
    keyArr = searchList ? JSON.parse(searchList) : []

    function render() {
        let str = template('info', keyArr)
        $('.mui-table-view').html(str)
    }
    render()

    $('#search_btn').on('click', function () {
        let keyword = $(this).siblings('.mui-search').children('input').val();
        if (keyword.trim()) {
            keyArr.forEach(item => {
                if (item == keyword) {
                    keyArr.splice(keyArr.indexOf(item), 1)
                }
            });
            keyArr.unshift(keyword)
            localStorage.setItem('keyArr', JSON.stringify(keyArr))
            render()
            $(this).siblings('.mui-search').children('input').val('')
            location.href = 'search_result.html?keywords=' + keyword
        } else {
            alert('请输入要搜索商品的关键字')
        }
    })

    $('.clearHistory').on('click', function () {
        mui.confirm('是否清空历史记录', '', ['否', '是'], (e) => {
            console.log(e);
            if (e.index === 1) {
                localStorage.clear();
                keyArr = []
                render()
            }

        })

    })


})