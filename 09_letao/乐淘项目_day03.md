# 乐淘项目ù

---



## 1.0 将搜索历史存储在本地存储

​	

### 1.1 将数组信息存在本地存储

​	使用 JSON.uglify 将数组转换为字符串

```javascript
$(function() {
    // 1.0 点击搜索按钮，发生跳转
    $("#search-btn").on("click", function() {
        // 1.1 获取文本信息
        var searchTxt = $("#search-txt").val()
        // 1.2 trim方法去掉空格，判断是否为空
        if(searchTxt.trim() == "") {
            alert("请输入查询的关键字喔~")
        } else {
            // 1.3 跳转链接，并且在url后面拼接参数
            location.href = "search-result.html?keywords=" + searchTxt
        }
    })
})
```



### 1.2 存放历史信息

​	引入模板文件，书写模板信息

```html
<script type="text/template" id="searchHis">
	<% for(var i = 0; i < items.length; i++) { %>
    	<li><a href="#"><%= items[i] %></a></li>
    <% } %>
</script>
```



​	完成2.0功能

```javascript
$(function() {
    // 2.0 声明数组，存放搜索历史信息
    var searchInfo = []

    // 2.3 判断当前  localStorage 中是否有值，并且赋值给数组
    if(localStorage.getItem("keyArr")) {
        searchInfo = JSON.parse(localStorage.getItem("keyArr"))
        // 2.4 将
        var html = template("searchHis", {items: searchInfo})
        $("#search_list").html(html)
    }
    
    $("#search-btn").on("click", function() {
        var searchTxt = $("#search-txt").val()
        
            // 2.1 把获取到的数据存储在数组中
            searchInfo.push(searchTxt)
            // 2.2 把数组所有的信息，存储在localStorage中
            localStorage.setItem("keyArr", JSON.stringify(searchInfo))
        
        if(searchTxt.trim() == "") {
            alert("请输入查询的关键字喔~")
        } else {
            location.href = "search-result.html?keywords=" + searchTxt
        }
    })
})
```



### 1.3 清空信息

```javascript
$(function() {
    //...
    
    // 3.0 点击清空历史，去掉本地存储中的数据
    $("#delAll").on("click", function() {
        searchInfo = []
        $("#search_list").html("")
        localStorage.removeItem("keyArr")
    })
})
```





---



## 2.0 显示搜索结果



### 2.1 封装获取参数信息的方法

```javascript
// 1.1 封装了一个获取地址栏相关信息的函数
function getParam(name) {
    // 通过 location.search 能够拿到地址栏问号及之后的数据， 
    // substr能够删除字符串从前往后的字符，split是以某个字符分割字符串得到数组
    var resArr = location.search.substr(1).split("&");
    // ["keywords=jfhg", "name=adfs", "age=11"]
    for(var i = 0; i < resArr.length; i++) {
        var current = resArr[i].split("=")
        // ["keywords", 'jfhg"]
        if(current[0] == name) {
            return current[1]
        }
    }
    return null
}
```



### 2.2  发起请求，渲染数据

```javascript
$(function() {
    // 1.0 获取地址栏内的数据
    var urlInfo = getParam("keywords")

    // 2.0 携带相关参数，发起ajax请求，渲染页面
    $.ajax({
        type: "get",
        url: "/product/queryProduct",
        data: {
            page: 1,
            pageSize: 6,
            proName: urlInfo
        },
        success: function(res) {
            console.log(res)

            var html = template("tempPro", res)
            $("#renderPro").html(html)
        }
    })
})
```



​	书写模板

```html
<script type="text/template" id="tempPro">
	<% for(var i = 0; i < data.length; i++) { %>
    	<li>
        	<a href="#">
            	<img src="<%= data[i].pic[0].picAddr %>" alt="">
                <p><%= data[i].proName %></p>
                <p>
                	<span>&yen;<%= data[i].price %></span>
                	<del>&yen;<%= data[i].oldPrice %></del>
                </p>
                <button class="buy-now">立即购买</button>
            </a>
     	</li>
   <% } %>
</script>
```



​	修改CSS样式

```css
div p {
    /* word-break:break-all; */
	overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
```



---



## 3.0  使用mui加载数据



> __初始化__

​	初始化方法类似下拉刷新，通过mui.init方法中pullRefresh参数配置上拉加载各项参数，如下：

```javascript
mui.init({
  pullRefresh : {
    container:refreshContainer,//待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
    up : {
      height:50,//可选.默认50.触发上拉加载拖动距离
      auto:true,//可选,默认false.自动上拉加载一次
      contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
      contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
      callback :pullfresh-function //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
    }
  }
});
```



> __结束加载__

​	加载完新数据后，需要执行endPullupToRefresh()方法，结束转雪花进度条的“正在加载...”过程

```javascript
function pullfresh-function() {
     //业务逻辑代码，比如通过ajax从服务器获取新数据；
     ......
     //注意：
     //1、加载完新数据后，必须执行如下代码，true表示没有更多数据了：
     //2、若为ajax请求，则需将如下代码放置在处理完ajax响应数据之后
     this.endPullupToRefresh(true|false);
}
```



### 3.1 在页面中加入框架

```javascript
 // 3.0 调用mui框架，下拉刷新
    mui.init({
        pullRefresh : {
          container: "#refreshContainer",//待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
          up : {
            height:50,//可选.默认50.触发上拉加载拖动距离
            auto:true,//可选,默认false.自动上拉加载一次
            contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
            contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
            callback: getData //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
          }
        }
    });
```



### 3.2 封装ajax请求

```javascript
	function getData() {
        var that = this
        // 2.0 携带相关参数，发起ajax请求，渲染页面
        $.ajax({
            type: "get",
            url: "/product/queryProduct",
            data: {
                page: 1,
                pageSize: 6,
                proName: urlInfo
            },
            success: function(res) {
                console.log(res)
                var html = template("tempPro", res)
                $("#renderPro").html(html)

                that.endPullupToRefresh(false);
            }
        })
    }
```



### 3.3 注意页面结构的调整

​	在html页面中，去掉mui-content的类名， 设置盒子的高度和浏览器剩下的高度一致，不要被盒子挤长

​	给内容套一个盒子，不给类名

```html
	<div id="refreshContainer">
        <div>
            <div class="filter mui-clearfix">
                <div class="prices">价格<span class="mui-icon mui-icon-arrowdown"></span></div>
                <div class="number">数量<span class="mui-icon mui-icon-arrowdown"></span></div>
            </div>
            <div class="product-list">
                    <ul class="mui-clearfix" id="renderPro">
                        <script type="text/template" id="tempPro">
                            <% for(var i = 0; i < data.length; i++) { %>
                                <li>
                                    <a href="#">
                                        <img src="<%= data[i].pic[0].picAddr %>" alt="">
                                        <p><%= data[i].proName %></p>
                                        <p>
                                            <span>&yen;<%= data[i].oldPrice %></span>
                                            <del>&yen;<%= data[i].price %></del>
                                        </p>
                                        <button class="buy-now">立即购买</button>
                                    </a>
                                </li>
                            <% } %>
                        </script>
                    </ul>
            </div>
        </div>
	</div>
```



​	CSS样式

```css
.filter {
    width: 98%;
    margin: 10px auto 20px;
    padding: 10px 25px;
}
.filter div {
    width: 50%;
    height: 30px;
    line-height: 30px;
    color: #666;
    font-size: 14px;
    text-align: center;
    float: left;
    background-color: #f5f5f5;
}
.filter div span {
    font-size: 12px;
}
.product-list {
    padding: 0 20px;
}
.product-list li {
    margin-bottom: 15px;
}
#refreshContainer {
    touch-action: none;
    position: absolute;
    top: 44px;
    bottom: 0;
}
```



### 3.4 关于点击排序的说明

```javascript
$(function() {
    var urlInfo = getParam("keywords")
    var page = 1
    var html = ""
    var priceSort = 1
    // 3.4 设置全局变量that
    var that = null

    function getData() {
        // tips：初次存储mui对象，后续不再执行
        if(!that) {
            that = this
        }
      	// ...底下是省略的ajax请求
    }

    // 4.0 点击价格排序，清空相关数据，重置框架，发起请求
    $(".prices").on("tap", function() {
        priceSort = priceSort == 1 ? 2 : 1
        page = 1
        html = ""
        mui('#refreshContainer').pullRefresh().refresh(true);
        getData()
    })
})
```





---



## 4.0 注册页面



​	使用mui组件快速搭建注册页面

![register](images\register.jpg)

```html
<form class="mui-input-group">
    <div class="mui-input-row">
        <label>用户名</label>
    <input type="text" class="mui-input-clear" placeholder="请输入用户名">
    </div>
    <div class="mui-input-row">
        <label>密码</label>
        <input type="password" class="mui-input-password" placeholder="请输入密码">
    </div>
    <div class="mui-button-row">
        <button type="button" class="mui-btn mui-btn-primary" >确认</button>
        <button type="button" class="mui-btn mui-btn-danger" >取消</button>
    </div>
</form>
```



### 4.1 注册页面搭建

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>注册中心</title>
	<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <link rel="stylesheet" href="assets/mui/css/mui.min.css">
    <link rel="stylesheet" href="css/base.css">
    <link rel="stylesheet" href="css/register.css">
    <script src="assets/mui/js/mui.min.js"></script>
    <script src="assets/zepto/zepto.min.js"></script>
    <script src="js/register.js"></script>
</head>
<body>
	<header class="mui-bar mui-bar-nav my-header">
		<a href="javascript:;" class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
		<h1 class="mui-title">注册中心</h1>
	</header>
	<nav class="mui-bar mui-bar-tab footer my-footer">
		<a class="mui-tab-item" href="index.html">
			<span class="mui-icon mui-icon-home"></span>
			<span class="mui-tab-label">首页</span>
		</a>
		<a class="mui-tab-item" href="category.html">
			<span class="mui-icon mui-icon-bars"></span>
			<span class="mui-tab-label">分类</span>
		</a>
		<a class="mui-tab-item" href="cart.html">
			<span class="mui-icon iconfont icon-gouwuche"></span>
			<span class="mui-tab-label">购物车</span>
		</a>
		<a class="mui-tab-item" href="user.html">
			<span class="mui-icon mui-icon-person"></span>
			<span class="mui-tab-label">会员中心</span>
		</a>
	</nav>
	<div class="mui-content my_header">
        <form class="mui-input-group">
            <div class="mui-input-row">
                <label>用户名</label>
                <input type="text" class="mui-input-clear" placeholder="请输入用户名" name="username">
            </div>
            <div class="mui-input-row">
                <label>手机号</label>
                <input type="text" class="mui-input-clear" placeholder="请输入手机号" name="mobile">
            </div>
            <div class="mui-input-row">
                <label>密码</label>
                <input type="password" class="mui-input-password" placeholder="请输入密码" name="password">
            </div>
            <div class="mui-input-row">
                <label>确认密码</label>
                <input type="password" class="mui-input-password" placeholder="确认密码" name="againPass">
            </div>
            <div class="mui-input-row">
                <label>验证码</label>
                <input type="text" class="mui-input-clear" placeholder="请输入验证码" name="vCode">
                <a href="javascript:;" class="getCode">获取验证码</a>
            </div>
            <div class="mui-button-row">
                <button type="button" class="mui-btn mui-btn-primary" id="register_btn">注册</button>
            </div>
            <a href="javascript:;" class="mui-pull-right">立即登陆</a>
        </form>
	</div>
</body>
</html>
```



### 4.2 获取验证码

```javascript
	// 2.0 获取验证码
    $(".getCode").on("click", function() {
        $.ajax({
            type: "get",
            url: "/user/vCode",
            success: function(res) {
                console.log(res)
                if(res.vCode) {
                    $("[name=vCode]").val(res.vCode)
                }
            }
        })
    })
```



### 4.3 获取数据，验证后请求接口

```javascript
	// 1.0 点击注册按钮，获取信息验证后并发送请求
    $("#register_btn").on("click", function() {
        // 1.1 获取表单元素的内容
        var username = $("[name=username]").val()
        var mobile = $("[name=mobile]").val()
        var password = $("[name=password]").val()
        var againPass = $("[name=againPass]").val()
        var vCode = $("[name=vCode]").val()

        // 1.2 验证当前的表单信息
        if(!username) {
            mui.toast("请输入用户名")
            return
        }
        if(mobile.length != 11) {
            mui.toast("请输入手机号")
            return
        }
        if(password != againPass) {
            mui.toast("两次密码不一样喔")
            return
        }
        if(!vCode) {
            mui.toast("请输入验证码")
            return
        }

        // 1.3 发送ajax请求
        $.ajax({
            type: "post",
            url: "/user/register",
            data: {
                username: username,
                password: password,
                mobile: mobile,
                vCode: vCode
            },
            success: function(res) {
                if(res.success) {
                    mui.toast("注册成功")
                    setTimeout(function() {
                        location.href = "login.html"
                    }, 2000)
                }
            }
        })
    })
```





---



## 补充：



### a链接的跳转

​	创建public.js, 使用以下代码，解决a的跳转

```javascript
$(function() {
    mui("body").on("tap", "a", function() {
        mui.openWindow({url: this.href})
    })
})
```



​	但是在category.html中，以上代码会导致左侧列表点击不动

​	所以，该页面不需要引入public.js，而是单独去写

```javascript
mui("header, nav").on("tap", "a", function() {
	mui.openWindow({url: this.href})
})
```





### 头部返回的图标

```html
<header class="mui-bar mui-bar-nav my-header">
	<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
	<h1 class="mui-title">注册中心</h1>
</header>
```

​	上面的a没有点击效果，需要给它加上href属性，由于元素有 mui-action-back 类名，于是可以直接返回了

```html
<header class="mui-bar mui-bar-nav my-header">
	<a href="javascript:;" class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
	<h1 class="mui-title">注册中心</h1>
</header>
```





###	其他

​	1， 文件引入顺序是先模块，后自己的文件，不要重复引入文件

​	2，要开启相关的环境，注意相关类名的使用不要重复





