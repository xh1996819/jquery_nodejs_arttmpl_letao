> # 乐淘项目

---



## 1.0 修改收货地址



### 1.1 完成点击编辑按钮 

​	给编辑按钮添加自定义属性id

```html
<a href="#" data-id="<%= data[i].id %>" class="mui-btn mui-btn-blue" id="edit-btn">编辑</a>
```

​	获取id值，在

```javascript
    // 3.0 点击编辑页面，存储数据
    $("#renderAddress").on("tap", "#edit-btn", function () {
      	// 3.1 获取id
        var id = $(this).data("id")
        // 3.2 在加载数据的回调函数中，对比出对应的数据，存储的本地存储中
        for (var i = 0; i < address.length; i++) {
            if (id == address[i].id) {
              	// 3.3 通过把对象转换成字符串的方法，存储在这里
                localStorage.setItem("addressInfo", JSON.stringify(address[i]))
                break
            }
        }
        location.href = "addAddress.html?isEdit=1"
    })
```



### 1.2 操作添加收货地址页面

​	实现思路

```tex
1.0 传参数
	在address.html中，点击添加地址，在url后面添加 ?isEdit=0
  	在address.js中，点击编辑按钮之后，location.href对应的地址后面添加 ?isEdit=1
```

```html
<a href="addAddress.html?isEdit=0" class="mui-text-center addAddress">点击添加收货地址</a>
```



```tex
2.0 在addAddress.js中操作
	2.1 获取url对应参数的那个函数，放到 public.js 中，并且保证addAddress.html引入了文件

	2.2 全局判断 
		如果 isEdit 是1
			通过 localStorage 获取对象 item ，渲染数据
		如果 isEdit 是0
			不做操作
	** 如果使用了模板，则需要写else，如果没有使用，则只用添加if即可

	2.3 以下部分，放在确认按钮操作的tap事件中
		2.3.1 声明 data 变量，把 ajax 中的 data 提取出来
			  声明 url 变量，值为空字符串

		2.3.2 判断 
			如果 isEdit 是1
				ajax中的 url 是修改地址的接口
				在 data 中增加一个id  使用上面的 item 的id，上面的 if 语句没有局部作用域
			如果 isEdit 是0
				ajax中的 url 是添加地址的接口

		2.3.3 在success的回调函数中，
			如果 isEdit 是1 
				提示修改成功
			如果isEdit是0
				提示添加成功
```

```javascript
 	var isEdit = parseInt(getParam("isEdit"))

	if(isEdit) {
        // 3.0 如果页面加载对应的缓存中存在数据，就直接渲染
        if(localStorage.getItem("addressInfo")) {
            var item = JSON.parse(localStorage.getItem("addressInfo"))
            $("[name=username]").val(item.recipients)
            $("[name=postCode]").val(item.postCode)
            $("[name=city]").val(item.address)
            $("[name=detail]").val(item.addressDetail)
        }
    }

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

        var url = ""
        var data = {
            address: city,
            addressDetail: detail,
            recipients: username,
            postcode: postCode
        }

        if(isEdit) {
            url = "/address/updateAddress"
            data.id = item.id
        } else {
            url = "/address/addAddress"
        }

        // 2.2 发送ajax请求
        $.ajax({
            type: "post",
            url: url,
            data: data,
            success: function(res) {
                if(res.success) {
                    if(isEdit) {
                        mui.toast("修改地址成功~")
                    } else {
                        mui.toast("添加地址成功~")
                    }
                    setTimeout(function() {
                        location.href = "address.html"
                    }, 2000)
                }
            }
        })
```





---



## 2.0 商品详情页布局

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>产品详情</title>
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <link rel="stylesheet" href="assets/mui/css/mui.min.css">
    <link rel="stylesheet" href="assets/fontAwesome/css/font-awesome.min.css">
    <link rel="stylesheet" href="css/base.css">
    <link rel="stylesheet" href="css/detail.css">
    <script src="assets/mui/js/mui.min.js"></script>
    <script src="assets/zepto/zepto.min.js"></script>
    <script src="assets/artTemplate/template-native.js"></script>
    <script src="js/public.js"></script>
    <script src="js/detail.js"></script>
</head>

<body>
    <header class="mui-bar mui-bar-nav my-header">
        <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
        <h1 class="mui-title">产品详情</h1>
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
            <span class="mui-icon fa fa-shopping-cart"></span>
            <span class="mui-tab-label">购物车</span>
        </a>
        <a class="mui-tab-item" href="user.html">
            <span class="mui-icon mui-icon-person"></span>
            <span class="mui-tab-label">会员中心</span>
        </a>
    </nav>
    <div class="mui-content">
        <div class="layer"></div>
        <div class="setItem mui-clearfix">
            <div class="num mui-pull-left">
                数量：
                <div class="mui-numbox numbox" data-numbox-step='1' data-numbox-min='1' data-numbox-max='100'>
                    <button class="mui-btn mui-numbox-btn-minus" type="button">-</button>
                    <input class="mui-numbox-input" type="number" id="getNum"/>
                    <button class="mui-btn mui-numbox-btn-plus" type="button">+</button>
                </div>
            </div>
            <div class="kucun mui-pull-left">
                库存：
                <span></span>件
            </div>
        </div>
        <div class="submit-btn mui-clearfix">
            <a href="#">查看购物车</a>
            <a href="javascript:;" id="addCart">加入购物车</a>
        </div>
    </div>
</body>

</html>
```



​	CSS完成效果

```css
.pro-title {
    padding: 0 20px;
    font-size: 16px;
    color: #333;
}
.pro-title h3 {
    font-size: 18px;
    line-height: 26px;
}
.pro-price {
    padding: 0 20px;
    font-size: 14px;
    color: #666;
    line-height: 24px;
    margin: 10px 0;
}
.pro-price .new-price {
    font-size: 24px;
    color: orange;
    vertical-align: baseline;
    padding-right: 10px;
}
.pro-size {
    padding: 0 20px;
}
.pro-size span {
    display: inline-block;
    width: 28px;
    height: 28px;
    line-height: 28px;
    border: 1px solid #ccc;
    margin-bottom: 10px;
    margin-left: 10px;
    text-align: center;
    color: #333;
}
.pro-size span.active {
    background-color: #f30;
    color: #fff;
}
.setItem {
    padding: 20px;
}
.kucun {
    margin-top: 6px;
    margin-left: 20px;
}
.submit-btn {
    padding: 20px;
}  
.submit-btn a {
    float: left;
    width: 50%;
    height: 30px;
    line-height: 30px;
    color: #fff;
    text-align: center;
}
.submit-btn a:first-of-type {
    background-color: orange;
}
.submit-btn a:last-of-type {
    background-color: #f30;
}
```



### 2.2 商品详情页数据展示

​	给search-result.html渲染页面的时候，给每一个a链接加入后缀的id

```html
<!-- 省略前后代码 -->
									<a href="detail.html?id=<%= data[i].id %>">
                                        <img src="<%= data[i].pic[0].picAddr %>" alt="">
                                        <p><%= data[i].proName %></p>
                                        <p>
                                            <span>&yen;<%= data[i].oldPrice %></span>
                                            <del>&yen;<%= data[i].price %></del>
                                        </p>
                                        <button class="buy-now">立即购买</button>
                                    </a>
<!-- -->
```



#### 2.2.1 动态渲染数据

```javascript
$(function() {
    // 1.0 获取id，发起ajax请求
    var id = getParam("id");
    
    $.ajax({
        type: "get",
        url: "/product/queryProductDetail",
        data: {
            id: id
        },
        success: function(res) {
            console.log(res)
            proId = res.id

            var html = template("tempDetail", res)
            $(".layer").html(html)

            //获得slider插件对象
            var gallery = mui('.mui-slider');
            gallery.slider();

            $(".kucun span").text(res.num)
            mui(".mui-numbox").numbox().setOption('max', res.num)
        }
    })

    // 2.0 尺码元素注册点击事件，做排他
    $(".layer").on("tap", ".pro-size span", function() {
        $(this).addClass("active").siblings().removeAttr("class")
    })
})
```

​	

#### 2.2.2 模板数据

```html
	<script type="text/template" id="tempDetail">
        <!-- 轮播图 -->
        <div class="mui-slider">
            <div class="mui-slider-group">
                <% for(var i = 0; i < pic.length; i++) { %>
                    <div class="mui-slider-item"><img src="<%= pic[i].picAddr %>" /></div>
                <% } %>
            </div>
        </div>
        <!-- 产品标题 -->
        <div class="pro-title">
            <h3><%= proName %></h3>
        </div>
        <!-- 产品价格 -->
        <div class="pro-price">
            <p>价格：
                <span class="new-price">&yen; <%= price %></span>
                <del class="old-price">&yen; <%= oldPrice %></del>
            </p>
        </div>
        <!-- 产品尺码 -->
        <div class="pro-size">
            <% var arr = size.split('-') %>
            <p>尺码：
                <% for(var i = arr[0]; i < arr[1]; i++) { %>
                    <span><%= i %></span>
                <% } %>
            </p>
        </div>
    </script>
```



### 2.3 加入购物车

```javascript
    var proId = null;
    // 3.0 点击加入购物车，发送ajax请求
    $("#addCart").on("tap", function() {
        var size = $(".pro-size > p > span.active").text();
        if(!size) {
            mui.toast("请选择尺码~")
        }

        $.ajax({
            type: "post",
            url: "/cart/addCart",
            data: {
                productId: proId,
                num: $("#getNum").val(),
                size: size
            },
            success: function(res) {
                // console.log(res)
                mui.confirm("添加购物车成功，去看看把!", function(message) {
                    if(message.index) {
                        location.href = "cart.html"
                    }
                })
            }
        })
    })
```



---



## 3.0 后台管理页面



​	复制一份静态页面，扔在public文件夹中

### 3.1 实现登录功能

​	给按钮添加id名

```html
<button type="button" class="btn btn-primary" id="login">登录</button>
```

​	添加js效果

```javascript
$(function() {
    // 1.0 点击登录, 收集数据，验证后发起请求
    $("#login").on("click", function() {
        var username = $.trim($(".form-username").val())
        var password = $.trim($(".form-password").val())
        if(!username) {
            alert("请输入用户名")
            return
        }
        if(!password) {
            alert("请输入密码")
            return
        }

        // 发起ajax请求，携带参数
        $.ajax({
            type: "post",
            url: "/employee/employeeLogin",
            data: {
                username: username,
                password: password
            },
            success: function(res) {
                // console.log(res)
                if(res.success) {
                    location.href = "user.html"
                }
            }
        })
    })
})
```



### 2.2 实现退出功能

​	操作user.html

```html
					<li>
	                        <a href="javascript:;" class="login_out_bot">
	                            <i class="fa fa-sign-out"></i> 退出
	                        </a>
	                    </li>
```

​	操作common.js

```javascript
	// 1.0 退出登录
	$(".login_out_bot").on("click", function(res) {
		$.ajax({
			type: "get",
			url: "/employee/employeeLogout",
			success: function(res) {
				if(res.success) {
					location.href = "login.html"
				}
			}
		})
	})
```




