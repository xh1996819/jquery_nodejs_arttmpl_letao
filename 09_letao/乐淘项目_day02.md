# 乐淘项目

---



## 1.0 分页页面布局

​	

### 1.1 基本布局

​	结构基本布局

```html
	<div class="cate-content">
		<div class="cate-left">
        </div>
		<div class="cate-right">
		</div>
	</div>
```



​	CSS样式

```css

.cate-content {
    height: 100%;
    padding: 44px 0 50px 0;
    background-color: #f5f5f5;
}
.cate-left {
    width: 80px;
    height: 100%;
    float: left;
    position: relative;
    touch-action: none;
}

.cate-right {
    margin-left: 90px;
    height: 100%;
    position: relative;
    touch-action: none;
    display: flex;
    flex-direction: column;
}
```



### 1.2 区域滚动

```html
            <div class="mui-scroll-wrapper">
                <div class="mui-scroll" id="data_left">
					...
                </div>
            </div>
```

​	功能调用

```javascript
 mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0005
});
```



---



## 2.0 一级分类



### 2.1 页面加载，获取数据

```javascript
    $.ajax({
        url: '/category/queryTopCategory',
        type: 'get',
        success: function(res) {
            var str = template('cate_Left', {
                itheima: res.rows
            })
            $("#data_left").html(str)

            // 第一次请求
            $('#data_left').find('li:first-child').addClass('active')
            // $("#data_left ul > li:eq(0)").addClass("active")
            if(res.rows.length > 0) {
                var num1 = res.rows[0].id
                reqSecond(num1)
            }

        }   
    })
```



### 2.2 通过模板创建结构

```html
		<div class="cate-left">
            <div class="mui-scroll-wrapper">
                <div class="mui-scroll" id="data_left">
					<script id="cate_Left" type="text/template">
						<ul>
							<% for(var i = 0; i<itheima.length; i++) { %>
								<li data-list-id=<%= itheima[i].id %> ><a href="javascript:;"><%= itheima[i].categoryName %></a></li>
							<% } %>
						</ul>
					</script>
                </div>
            </div>
        </div>
```



​	CSS样式

```css
.cate-left ul li {
    line-height: 45px;
    border-bottom: 1px solid #ccc;
    border-right: 1px solid #ccc;
    background-color: #fff;
}
.cate-left ul li.active {
    background-color: #f5f5f5;
    border-right: 1px solid transparent;
}
.cate-left ul li a {
    color: #333;
    text-align: center;
    font-size: 14px;
}
```



---



## 3.0 二级分类



### 3.1 页面加载发起请求

```javascript
	$("#data_left").on('tap', 'li', function() {
        var listId = $(this).data('listId');
        $(this).addClass("active").siblings().removeClass("active")
        reqSecond(listId)
    })

    // 二级请求的方法
    function reqSecond(num) {
        $.ajax({
			type:'get',
			url:'/category/querySecondCategory',
			data:{
				id : num
			},
			success:function(res){
                var str = template('cate-right', res)
                $("#data_right").html(str)
			}
		})
    }
```



​	通过模板渲染页面结构

```html
	<div class="cate-right">
			<h2>
				<img src="images/title3.png" alt="">
			</h2>
			<div class="show-pro">
					<div class="mui-scroll-wrapper">
							<div class="mui-scroll" id="data_right">
								<script id="cate-right" type="text/template">
									<ul class="mui-clearfix">
										<% for(var i = 0; i < rows.length; i++) { %>
												<li>
													<a href="#">
														<img src="<%= rows[i].brandLogo %>" alt="">
														<p><%= rows[i].brandName %></p>
													</a>
												</li>
										<% } %>
			
										<% if(!rows.length) { %>
											<div class="error-pro">抱歉，暂无数据 ~</div>
										<% } %>
									</ul>
								</script>
							</div>
						</div>
			</div>
		</div>
```



### 3.2 CSS样式

```css
.cate-right h2 {
    padding: 10px 10px 0 0 ;
}
.cate-right img {
    width: 100%;
}
.cate-right ul li {
    float: left;
    width: 33.3333%;
}
.cate-right ul li a {
    padding: 10px;
}
.cate-right ul li img {
    width: 100%;
}
.cate-right ul li p {
    text-align: center;
    font-size: 14px;
    margin: 10px 0;
}
.cate-right .show-pro {
    position: relative;
    height: 100%;
    margin-top: 20px;
}
.cate-right .error-pro {
    height: 80px;
    line-height: 80px;
    text-align: center;
    color: #333;
    font-size: 18px;
    background-color: #fff;
}
```



---



## 4.0 搜索中心



### 4.1 布局结构

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
	<link rel="stylesheet" href="assets/mui/css/mui.min.css">
	<link rel="stylesheet" href="assets/fontAwesome/css/font-awesome.min.css">
    <link rel="stylesheet" href="css/base.css">
    <link rel="stylesheet" href="css/search.css">
    <script src="assets/mui/js/mui.min.js"></script>
    <script src="assets/zepto/zepto.min.js"></script>
    <script src="assets/artTemplate/template-native.js"></script>
    <script src="js/search.js"></script>
</head>
<body>
	<header class="mui-bar mui-bar-nav lt-header">
		<a href="index.html" class="mui-icon mui-icon-back mui-pull-left"></a>
		<h1 class="mui-title">搜索中心</h1>
	</header>
	<div class="mui-content">
        <div class="container">
            <div class="search">
                <input type="text" placeholder="输入搜索内容">
                <input type="button" value="搜索" id="search_btn">
            </div>
            <div class="search-list">
                <div class="search-info mui-clearfix">
                    <span class="mui-pull-left">搜索历史</span>
                    <span class="mui-pull-right fa fa-trash" id="clear_data">清空历史</span>
                </div>
                <div class="search-info-list" id="render-data">
                    <script type="text/template" id="searchList">
                        <ul class="mui-table-view">
                            <% for(var i = 0; i < data.length; i++) { %>
                                <li class="mui-table-view-cell"><%= data[i] %></li>
                            <% } %>
                        </ul>
                    </script>
                </div>
            </div>
        </div>
	</div>
</body>
</html>
```



### 4.2 CSS样式

```css

.container {
    padding: 10px;
    height: 100%;
    background: #fff;
}

.search {
    height: 30px;
    margin-top: 20px;
    padding-right: 60px;
    position: relative;
}
.search input[type="text"] {
    width: 100%;
    border: none;
    height: 30px;
    border-radius: 0;
    border: 1px solid #069;
    font-size: 14px;
}
.search input[type="button"] {
    position: absolute;
    right: 0;
    top: 0;
    width: 60px;
    height: 30px;
    border: none;
    border-radius: 0;
    background: #069;
    color: #fff;
}

.search-list {
    padding: 20px 10px;
}
.search-list .search-info {
    font-size: 14px;
    color: #333;
    line-height: 30px;
    border-bottom: 1px solid #ccc;
}
.search-list .search-info span {
    line-height: 30px;
}
.search-info-list {
    margin-top: 20px;
}
.search-list .mui-table-view::before,
.search-list .mui-table-view::after {
    display: none;
}
.search-list .mui-table-view-cell:last-child:after, 
.search-list .mui-table-view-cell:last-child:before {
    height: 1px;
}
```



### 4.3 搜索功能完善

```javascript

$(function() {
    var dataList = []
    // 1.0 给搜索按钮注册点击事件
    $("#search_btn").on('click', function() {
        // 2.0 获取文本框的值
        var str = $(this).siblings().val()
        // 3.0 检测这个值去掉前后空格后是否存在
        if(str.trim()) {
            // 4.0 携带参数跳转到搜索结果的页面
            location.href = 'search-list.html?keyword=' + str
            dataList.unshift(str)
            window.localStorage.setItem('Nsr00da2', JSON.stringify(dataList))
        }else {
            // 5.0 提示用户必须要输入内容
            mui.toast('要搜点什么嘛',{ duration:'long', type:'div' }) 
        }
        // 6.0 将文本框的值重置为空
        $(this).siblings().val("")
        renderData()
    })
    renderData();
    function renderData() {
        if(localStorage.getItem('Nsr00da2')) {
            // 刷新数组中的值
            dataList = JSON.parse(localStorage.getItem('Nsr00da2'))
            // 使用模板拼接字符串
            var str = template('searchList', {
                data: dataList
            })
            $("#render-data").html(str)
        }
    }

    $("#clear_data").on('click', function() {
        $("#render-data").html("")
        dataList = []
        localStorage.removeItem('Nsr00da2')
    })
})
```






