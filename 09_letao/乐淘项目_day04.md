> # 乐淘项目

---



## 1.0 登录功能和用户中心



### 1.1 实现用户登录

```javascript
$(function() {
    // 1.0 给登录按钮注册点击事件
    $("#login_btn").on("click", function() {
        // 1.1 获取用户名和密码，然后进行验证
        var username = $.trim($("[name=username]").val())
        var password = $.trim($("[name=password]").val())
        if(!username) {
            mui.toast("请输入用户名")
            $("[name=username]").val("")
            return
        }
        if(!password) {
            mui.toast("请输入密码")
            $("[name=password]").val("")
            return
        }
        // 1.2 发送ajax请求，进行跳转
        $.ajax({
            type: "post",
            url: "/user/login",
            data: {
                "username": username,
                "password": password
            },
            beforeSend: function() {
                $("#login_btn").text("正在登录...")
            },
            success: function(res) {
                if(res.success) {
                    mui.toast("登录成功")

                    setTimeout(function() {
                        $("#login_btn").text("登录")
                        location.href = "user.html"
                    }, 2000)
                }
            }
        })
    })
})
```



### 1.2  会员中心展示页面

​	使用mui提供的模板进行完成

#### mui图文列表

![pc-login](images\pic-text-mui.jpg)

```html
<ul class="mui-table-view">
    <li class="mui-table-view-cell mui-media">
        <a href="javascript:;">
            <img class="mui-media-object mui-pull-left" src="../images/shuijiao.jpg">
            <div class="mui-media-body">
                幸福
                <p class='mui-ellipsis'>能和心爱的人一起睡觉，是件幸福的事情；可是，打呼噜怎么办？</p>
            </div>
        </a>
    </li>
    <li class="mui-table-view-cell mui-media">
        <a href="javascript:;">
            <img class="mui-media-object mui-pull-left" src="../images/muwu.jpg">
            <div class="mui-media-body">
                木屋
                <p class='mui-ellipsis'>想要这样一间小木屋，夏天挫冰吃瓜，冬天围炉取暖.</p>
            </div>
        </a>
    </li>
    <li class="mui-table-view-cell mui-media">
        <a href="javascript:;">
            <img class="mui-media-object mui-pull-left" src="../images/cbd.jpg">
            <div class="mui-media-body">
                CBD
                <p class='mui-ellipsis'>烤炉模式的城，到黄昏，如同打翻的调色盘一般.</p>
            </div>
        </a>
    </li>
</ul>
```



#### 文字列表

![text-list-mui](images\text-list-mui.jpg)

```html
<ul class="mui-table-view">
    <li class="mui-table-view-cell">
        <a class="mui-navigate-right">Item 1</a>
    </li>
    <li class="mui-table-view-cell">
        <a class="mui-navigate-right">Item 2</a>
    </li>
    <li class="mui-table-view-cell">
        <a class="mui-navigate-right">Item 3</a>
    </li>
</ul>
```



> #### ！！！使用 mui-text-center 可以使文字居中



​	完成最后的页面结构

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>个人中心</title>
	<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <link rel="stylesheet" href="assets/mui/css/mui.min.css">
    <link rel="stylesheet" href="assets/fontAwesome/css/font-awesome.min.css">
    <link rel="stylesheet" href="css/base.css">
    <script src="assets/mui/js/mui.min.js"></script>
    <script src="assets/zepto/zepto.min.js"></script>
    <script src="assets/artTemplate/template-native.js"></script>
    <script src="js/public.js"></script>
    <script src="js/user.js"></script>
</head>
<body>
	<header class="mui-bar mui-bar-nav my-header">
		<a href="javascript:;" class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
		<h1 class="mui-title">个人中心</h1>
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
			<span class="mui-icon fa fa-shopping-cart"></span>
			<span class="mui-tab-label">购物车</span>
		</a>
		<a class="mui-tab-item mui-active" href="user.html">
			<span class="mui-icon mui-icon-person"></span>
			<span class="mui-tab-label">会员中心</span>
		</a>
	</nav>
	<div class="mui-content">
        <ul class="mui-table-view" id="renderUser">
            <script type="text/template" id="tempUser">
                <li class="mui-table-view-cell mui-media">
                    <a href="javascript:;">
                        <img class="mui-media-object mui-pull-left" src="images/user.jpg">
                        <div class="mui-media-body">
                            <%= username %>
                            <p class='mui-ellipsis'><%= mobile %></p>
                        </div>
                    </a>
                </li>
            </script>
        </ul>
        <ul class="mui-table-view">
            <li class="mui-table-view-cell">
                <a href="modify.html" class="mui-navigate-right">修改密码</a>
            </li>
            <li class="mui-table-view-cell">
                <a class="mui-navigate-right">我的购物车</a>
            </li>
            <li class="mui-table-view-cell">
                <a class="mui-navigate-right">收货地址管理</a>
            </li>
            <li class="mui-table-view-cell">
                <a href="javascript:;" class="mui-text-center" id="logout">退出登录</a>
            </li>
        </ul>
	</div>
</body>
</html>
```



### 1.1 退出登录

```javascript
$(function() {
    // 1.0 发送ajax请求，退出登录
    $("#logout").on("tap", function() {
        $.ajax({
            type: "get",
            url: "/user/logout",
            success: function(res) {
                if(res.success) {
                    mui.toast("退出登录成功...")
                    setTimeout(function() {
                        location.href = "index.html"
                    }, 2000)
                }
            }
        })
    })
})
```



### 1.2 阻止未登录和展示用户信息

 

```javascript
var userInfo = null

// 2.0 同步发送请求，先执行这里的代码，再加载后面的标签
$.ajax({
    type: "get",
    url: "/user/queryUserMessage",
    async: false,
    success: function(res) {
        if(res.error && res.error == 400) {
            location.href = "login.html"
        } else {
            userInfo = res
        }
    }
})

$(function() {
    // 1.0 发送ajax请求，退出登录

    // 3.0 处理用户信息的动态渲染
    var html = template("tempUser", userInfo)
    $("#renderUser").html(html)
})
```



​	结构模板

```html
<script type="text/template" id="tempUser">
	<li class="mui-table-view-cell mui-media">
    	<a href="javascript:;">
        	<img class="mui-media-object mui-pull-left" src="images/user.jpg">
            <div class="mui-media-body">
            	<%= username %>
                <p class='mui-ellipsis'><%= mobile %></p>
            </div>
        </a>
	</li>
</script>
```



---



## 2.0 修改密码 

​	修改页面中的页面结构和注册中的页面结构几乎一样，可以直接去复制过来修改

### 2.1 新建页面

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <link rel="stylesheet" href="assets/mui/css/mui.min.css">
    <link rel="stylesheet" href="css/base.css">
    <script src="assets/mui/js/mui.min.js"></script>
    <script src="assets/zepto/zepto.min.js"></script>
    <script src="js/modify.js"></script>
</head>
<body>
	<header class="mui-bar mui-bar-nav my-header">
		<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
		<h1 class="mui-title">网页标题</h1>
	</header>
	<nav class="mui-bar mui-bar-tab footer my-footer">
		<a class="mui-tab-item mui-active" href="index.html">
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
	<div class="mui-content">
            <form class="mui-input-group">
                    <div class="mui-input-row">
                        <label>旧密码</label>
                        <input type="password" class="mui-input-password" placeholder="请输入密码" name="password">
                    </div>
                    <div class="mui-input-row">
                        <label>新密码</label>
                        <input type="password" class="mui-input-password" placeholder="确认密码" name="newPass">
                    </div>
                    <div class="mui-input-row">
                        <label>确认新密码</label>
                        <input type="password" class="mui-input-password" placeholder="确认密码" name="refirmNewPass">
                    </div>
                    <div class="mui-input-row">
                        <label>验证码</label>
                        <input type="text" class="mui-input-clear" placeholder="请输入验证码" name="vCode">
                        <a href="javascript:;" class="getCode">获取验证码</a>
                    </div>
                    <div class="mui-button-row">
                        <button type="button" class="mui-btn mui-btn-primary" id="register_btn">注册</button>
                    </div>
                    <a href="javascript:;" href="javascript:;" class="mui-pull-right" id="refirmNewPass">确认修改</a>
                </form>
	</div>
</body>
</html>
```

​	

### 2.2 点击按钮获取验证码

```javascript
$(function() {

    // 2.0 获取验证码
    $(".getCode").on("click", function() {
        $.ajax({
            type: "get",
            url: "/user/vCodeForUpdatePassword",
            success: function(res) {
                if(res.vCode) {
                    $("[name]=vCode").val(res.vCode)
                }
            }
        })
    })
    
})
```





### 2.3 点击按钮获取数据，发送请求

```javascript
$(function() {

    // 1.0 点击确认按钮，收集数据，发送请求
    $("#refirmNewPass").on("tap", function() {
        var password = $.trim($("[name=password]").val())
        var newPass = $.trim($("[name=newPass]").val())
        var refirmNewPass = $.trim($("[name=refirmNewPass]").val())
        var vCode = $.trim($(".vCode").val())

        // 1.1 验证密码
        if(!password) {
            mui.toast("请输入原始密码")
            $("[name=password]").val("")
            return
        }
        if(newPass != refirmNewPass) {
            mui.toast("两次输入的密码不一致！")
            $("[name=newPass], [name=refirmNewPass]").val("")
            return
        }

        // 1.2 发起ajax请求
        $.ajax({
            type: "post",
            url: "/user/updatePassword",
            data: {
                oldPassword: password,
                newPassword: newPass,
                vCode: vCode
            },
            success: function(res) {
                if(res.success) {
                    mui.toast("修改密码成功~")
                    setTimeout(function() {
                        // $("[name=password],[name=newPass], [name=refirmNewPass], [name=vCode]").val("")
                        location.href = "login.html"
                    }, 2000)
                }
            }
        })
    })

})
```



---



## 3.0 收货地址管理



#### 地址列表页面

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>收货地址</title>
	<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <link rel="stylesheet" href="assets/mui/css/mui.min.css">
    <link rel="stylesheet" href="assets/fontAwesome/css/font-awesome.min.css">
    <link rel="stylesheet" href="css/base.css">
    <script src="assets/mui/js/mui.min.js"></script>
    <script src="assets/zepto/zepto.min.js"></script>
    <script src="assets/artTemplate/template-native.js"></script>
    <script src="js/public.js"></script>
    <script src="js/address.js"></script>
    <style>
        .addAddress {
            display: block;
            height: 45px;
            line-height: 45px;
            font-size: 14px;
            color: #333;
        }
        .mui-media-body {
            font-size: 14px;
        }
    </style>
</head>
<body>
	<header class="mui-bar mui-bar-nav my-header">
		<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
		<h1 class="mui-title">收货地址</h1>
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
			<span class="mui-icon fa fa-shopping-cart"></span>
			<span class="mui-tab-label">购物车</span>
		</a>
		<a class="mui-tab-item mui-active" href="user.html">
			<span class="mui-icon mui-icon-person"></span>
			<span class="mui-tab-label">会员中心</span>
		</a>
	</nav>
	<div class="mui-content">
        <a href="addAddress.html" class="mui-text-center addAddress">点击添加收货地址</a>
        <ul class="mui-table-view" id="renderAddress">

        </ul>
	</div>
</body>
</html>

```



#### 添加地址页面

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>添加收货地址</title>
	<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <link rel="stylesheet" href="assets/mui/css/mui.min.css">
	<link rel="stylesheet" href="assets/fontAwesome/css/font-awesome.min.css">
	<link rel="stylesheet" href="assets/mui/css/mui.picker.css">
	<link rel="stylesheet" href="assets/mui/css/mui.poppicker.css">
    <link rel="stylesheet" href="css/base.css">
    <link rel="stylesheet" href="css/register.css">
	<script src="assets/mui/js/mui.min.js"></script>
	<script src="assets/mui/js/mui.picker.js"></script>
	<script src="assets/mui/js/mui.poppicker.js"></script>
	<script src="assets/zepto/zepto.min.js"></script>
	<script src="js/public.js"></script>
	<script src="js/city.js"></script>
	<script src="js/addAddress.js"></script>
</head>
<body>
	<header class="mui-bar mui-bar-nav my-header">
		<a href="javascript:;" class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
		<h1 class="mui-title">添加收货地址</h1>
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
			<span class="mui-icon fa fa-shopping-cart"></span>
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
                <input type="text" class="mui-input-clear" placeholder="收货人姓名" name="username">
            </div>
            <div class="mui-input-row">
                <input type="text" class="mui-input-clear" placeholder="请输入邮编" name="postCode">
            </div>
            <div class="mui-input-row">
                <input type="text" class="mui-input-clear" placeholder="选择省市" name="city" id="selectCity" readonly>
            </div>
            <div class="mui-input-row">
                <input type="text" class="mui-input-clear" placeholder="详细地址（门牌号）" name="detail">
            </div>
            <div class="mui-button-row">
                <button type="button" class="mui-btn mui-btn-primary" id="refrimAdd">确认添加</button>
            </div>
        </form>
	</div>
</body>
</html>
```



### 3.1 渲染地址列表

```javascript
$(function() {
    // 1.0 发起请求，渲染地址列表
    $.ajax({
        type: "get",
        url: "/address/queryAddress",
        success: function(res) {
            console.log(res)
            var html = template("temAddress", {data: res})
            $("#renderAddress").html(html)
        }
    })
})
```



​	由于数据库初始可能没有数据，所以可以先把代码写了，等添加完再看效果

```html
			<script type="text/template" id="temAddress">
                <% for(var i = data.length - 1; i >= 0; i--) { %>
                    <li class="mui-table-view-cell mui-media">
                        <div class="mui-slider-right mui-disabled">
                            <a href="javascript:;" class="mui-btn mui-btn-blue" >编辑</a>
                            <a href="javascript:;" 
                            class="mui-btn mui-btn-red delete-btn"
                            data-id="<%= data[i].id %>" >删除</a>
                        </div>
                        <div class="mui-media-body mui-slider-handle">
                            邮政编码：<%= data[i].postCode %>  收货人：<%= data[i].recipients %>
                            <p class='mui-ellipsis'>
                                <%= data[i].address %>
                                <%= data[i].addressDetail %>
                            </p>
                        </div>
                    </li>
                <% } %>
            </script>
```



### 3.2 添加收货地址



#### 3.2.1 使用插件完成省市级内容

​	引入文件, 把 city.js 复制在当前目录下引入

```html
	<link rel="stylesheet" href="assets/mui/css/mui.picker.css">
	<link rel="stylesheet" href="assets/mui/css/mui.poppicker.css">
	<script src="assets/mui/js/mui.min.js"></script>
	<script src="assets/mui/js/mui.picker.js"></script>
	<script src="assets/mui/js/mui.poppicker.js"></script>
	<script src="js/city.js"></script>
```

​	给元素添加id名和只读属性

```html
<input type="text" class="mui-input-clear" placeholder="选择省市" name="city" id="selectCity" readonly>
```



#### 3.2.2 调用插件

```javascript
$(function() {
    // 1.0 使用mui提供的组件完成功能
    // 1.1 new一个对象
    var picker = new mui.PopPicker({
        layer: 3
    }); 
    picker.setData(cityData); 
    // 1.2 当点击事件触发，获取地址内容，渲染在表单元素内
    $("#selectCity").on("tap", function() {
        picker.show(function(selectItems) {
            $("#selectCity").val(selectItems[0].text + selectItems[1].text + selectItems[2].text)
        }) 
    })
})
```



### 3.3 完成添加地址

```javascript
    // 2.0 点击确认按钮，收集验证数据，发送ajax请求
    $("#refrimAdd").on("tap", function() {
        var username = $.trim($("[name=username]").val())
        var postCode = $.trim($("[name=postCode]").val())
        var city = $.trim($("[name=city]").val())
        var detail = $.trim($("[name=detail]").val())
        if(!username) {
            mui.toast("请输入收货人姓名")
            return
        }
        if(!postCode) {
            mui.toast("请输入邮政编码")
            return
        }
        if(!city) {
            mui.toast("请选择省市")
            return
        }
        if(!detail) {
            mui.toast("请输入详细地址")
            return
        }
        // 2.2 发送ajax请求
        $.ajax({
            type: "post",
            url: "/address/addAddress",
            data: {
                address: city,
                addressDetail: detail,
                recipients: username,
                postcode: postCode
            },
            success: function(res) {
                if(res.success) {
                    mui.toast("添加地址成功~")
                    setTimeout(function() {
                        location.href = "address.html"
                    }, 2000)
                }
            }
        })

    })
```



### 3.4 删除地址

#### 3.4.1 使用mui框架提供的内容完成结构

![show-list-mui](images\show-list-mui.jpg)



![show-list2-mui](images\show-list2-mui.jpeg)



#### 3.4.2 调整好的结构如下

```html
<li class="mui-table-view-cell mui-media">
	<div class="mui-slider-right mui-disabled">
    	<a href="javascript:;" class="mui-btn mui-btn-blue" >编辑</a>
        <a href="javascript:;" class="mui-btn mui-btn-red delete-btn">删除</a>
    </div>
    <div class="mui-media-body mui-slider-handle">
    	邮政编码：100096  收货人: 吴亦凡
        <p class='mui-ellipsis'> 北京市海淀区 吴亦凡工作室</p>
	</div>
</li>
```



#### 3.4.3 完成功能

​	在 address.js文件中

```javascript
    // 2.0 通过事件委托的方式注册事件
    $("#renderAddress").on("tap", ".delete-btn", function() {
        var id = $(this).data("id");
        var li = $(this).parent().parent()
        mui.confirm("确认要删除嘛？", function(message) {
            if(message.index) {
                // 确认删除
                $.ajax({
                    type: "post",
                    url: "/address/deleteAddress",
                    data: {
                        id: id
                    },
                    success: function(res) {
                        if(res.success) {
                            location.reload()
                        }
                    }
                })
            } else {
                // 取消
                mui.swipeoutClose(li[0])
            }
        })  
    })
```

