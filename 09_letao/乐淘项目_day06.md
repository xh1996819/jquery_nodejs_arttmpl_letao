> # 乐淘项目

---



## 1.0 登录拦截功能



### 1.1 登录拦截

​	如果想访问非登录页，一定要同步发送请求，只有验证登录过后才会执行后续代码，不然跳回登录页

​	在common.js中操作文件

```javascript
$.ajax({
	type: "get",
	url: "/employee/checkRootLogin",
	async: false,
	success: function(res) {
		if(res.error == 400) {
			location.href = "login.html"
		}
	}
})
```



### 1.2 登录跳转

​	如果已经登录成功，再去登录页是去不了的，会直接跳转到用户首页

​	操作 login.js

```javascript
$.ajax({
	type: "get",
	url: "/employee/checkRootLogin",
	async: false,
	success: function(res) {
		if(res.success) {
			location.href = "user.html"
		}
	}
})
```



---



## 2.0 操作用户信息

​	

### 2.1 获取用户列表

​	完成请求

```javascript
$(function() {
    // 1.0 请求用户数据
    $.ajax({
        type: "get",
        url: "/user/queryUser",
        data: {
            page: 1, 
            pageSize: 10
        },
        success: function(res) {
            // console.log(res)
            var html = template("tempUser", res)
            $("#renderUser").html(html)
        }
    })
})
```

​	完成数据渲染

```html
				<script type="text/template" id="tempUser">
					<tr>
						<th>用户名</th>
						<th>电话</th>
						<th>状态</th>
						<th>操作</th>
					</tr>
					<% for (var i = 0; i < rows.length; i++) { %>
						<tr>
							<td><%= rows[i].username %></td>
							<td><%= rows[i].mobile %></td>
							<td><%= rows[i].isDelete ? "已启用" : "已禁用" %></td>
							<td>
								<button type="button" 
								class="btn <%= rows[i].isDelete ? 'btn-danger' : 'btn-success' %> edit-btn"
								data-isdelete="<%= rows[i].isDelete %>"
								data-id="<%= rows[i].id %>"
								><%= rows[i].isDelete ? "禁用" : "启用" %></button>
							</td>
						</tr>
					<% } %>
				</script>
```



### 2.2 更新用户状态

 	当点击按钮的时候，刷新当前的状态

```javascript
    // 2.0 通过事件委托给按钮注册点击事件
    $("#renderUser").on("click", ".edit-btn", function() {
        // 2.1 获取isDelate 和 id
        var isDelete = $(this).data("isdelete")
        var id = $(this).data("id")

        // 2.2 发送ajax请求
        $.ajax({
            type: "post",
            url: "/user/updateUser",
            data: {
                id: id,
                // 每次请求都设置相反的值
                isDelete: isDelete ? 0 : 1
            }, 
            success: function(res) {
                if(res.success) {
                    location.reload() // 刷新
                }
            }
        })
    })
```



---



## 3.0 一级分类操作



### 3.1 完成数据渲染

​	在 category-first.js 中完成效果

```javascript
    // 1.0 加载一级分类数据
    getData()
    function getData() {
        $.ajax({
            type: "get",
            url: "/category/queryTopCategoryPaging",
            data: {
                page: page,
                pageSize: pageSize
            },
            success: function(res) {
                // console.log(res)
                // 每一次请求结束之后，都需要计算出当前总页数最大为多少
                totalPage = Math.ceil(res.total / pageSize)
                var html = template("tempTop", res)
                $("#renderTop").html(html)
            }
        })
    }
```



​	结构渲染

```html
				<script type="text/template" id="tempTop">
					<tr>
						<th>分类的编号</th>
						<th>分类名称</th>
					</tr>
					<% for(var i = 0; i < rows.length; i++) { %>
						<tr>
							<td><%= rows[i].id %></td>
							<td><%= rows[i].categoryName %></td>
						</tr>
					<% } %>
				</script>
```



### 3.2 分页功能

```javascript
	// ** 声明变量，存储公共的数据
    var page  = 1
    var pageSize = 10
    var totalPage = 0
    
    // 2.0 点击分页按钮，实现数据的改变
    // 2.1 点击下一页
    $(".next").on("click", function() {
        page++
        if(page > totalPage) {
            page = totalPage
            alert("当前已经是最后一页了~")
        }
        getData()
    })
    // 2.2 点击上一页
    $(".prev").on("click", function() {
        page--
        if(page < 1) {
            page = 1
            alert("当前已经是第一页了~")
        }
        getData()
    })
```



### 3.2 添加数据功能

```javascript
    // 3.0 点击保存按钮，添加数据
    $("#saveData").on("click", function() {
        var topCategory = $.trim($("[name=topCategory]").val())
        if(!topCategory) {
            alert("请输入一级分类名称")
            return
        }
        $.ajax({
            type: "post",
            url: "/category/addTopCategory",
            data: {
                categoryName: topCategory
            },
            success: function(res) {
                if(res.success) {
                    location.reload()
                }
            }
        })
    })
```



---



## 4.0 二级分类操作



### 4.1 渲染数据

```javascript
	// 1.0 发送ajax请求，渲染二级分类页面
    getData()
    function getData() {
        $.ajax({
            type: "get",
            url: "/category/querySecondCategoryPaging",
            data: {
                page: page,
                pageSize: pageSize
            },
            success: function(res) {
                totalPage = Math.ceil(res.total / pageSize)
                // console.log(res)
                var html = template("tempSecond", res)
                $("#renderSecond").html(html)
            }
        })
    }
```



​	使用模板

```html
				<script type="text/template" id="tempSecond">
					<tr>
						<th>品牌编号</th>
						<th>品牌名称</th>
						<th>品牌logo</th>
						<th>所属分类</th>
					</tr>
					<% for(var i = 0; i < rows.length; i++) { %>
						<tr>
							<td><%= rows[i].id %></td>
							<td><%= rows[i].brandName %></td>
							<td>
								<img src="<%= rows[i].brandLogo %>">
							</td>
							<td><%= rows[i].categoryName %></td>
						</tr>
					<% } %>
				</script>
```



### 4.2 分页功能操作

```javascript
	// ** 声明公共的变量
    var page = 1
    var pageSize = 10
    var totalPage = 0
    
    // 2.0 点击按钮，完成分页功能
    $("#nextBtn").on("click", function() {
        page++
        if(page > totalPage) {
            page = totalPage
            alert("已经是最后一页了啊~")
        }
        getData()
    })
    $("#prevBtn").on("click", function() {
        page--
        if(page < 1) {
            page = 1
            alert("已经是第一页了啊~")
        }
        getData()
    })
```



### 4.3 操作表单的内容

#### 4.3.1 渲染一级分类数据

```javascript
// 3.0 添加分类
    $.ajax({
        type: "get",
        url: "/category/queryTopCategoryPaging",
        data: {
            page: 1,
            pageSize: 10
        },
        success: function(res) {
            // console.log(res)
            var html = template("tempTop", res)
            $(".form-control").html(html)
        }
    })
```

​	使用模板，注意给option加入id

```html
						<script type="text/template" id="tempTop">
							<option>请选择商品分类</option>
							<% for(var i = 0; i < rows.length; i++) { %>
								<option value="<%= rows[i].id %>"><%= rows[i].categoryName %></option>
							<% } %>
						</script>
```



#### 4.3.2 使用插件完成图片上传

​	第一步：引入文件，一定要按照顺序

```html
	<script src="assets/jquery-fileupload/jquery.ui.widget.js"></script>
	<script src="assets/jquery-fileupload/jquery.iframe-transport.js"></script>
	<script src="assets/jquery-fileupload/jquery.fileupload.js"></script>
```

​	第二步：写入属性，name的值很重要

```html
<div class="form-group">
	<input type="file"  class="form-control"  name="file"  id="fileUpload" 
	data-url="/category/addSecondCategoryPic">
</div>
```

​	第三部：完成最后的操作

```javascript
	var previewImg = ""
    // 3.3 使用jquery插件完成图片上传
    // tips：只是选择了一些，结果文件就已经上传，这样并不合适
    $("#fileUpload").fileupload({
        dataType: "json",
        done: function(e, data) {
            console.log(data)
            $(".img-thumbnail").attr("src", data.result.picAddr)
            previewImg = data.result.picAddr
        }
    })
```



### 4.4 完成添加操作

```javascript
	// 4.0 点击保存，收集数据，发起请求
    $("#save").on("click", function() {
        var cateId = $.trim($("[name=cateId]").val())
        var brandName = $.trim($("[name=brandName]").val())
        $.ajax({
            type: "post",
            url: "/category/addSecondCategory",
            data: {
                brandName: brandName,
                categoryId: cateId,
                brandLogo: previewImg,
                hot: 0
            },
            success: function(res) {
                if(res.success) {
                    location.reload()
                }
            }
        })
    })
```



> 通过执行这句话，让一级分类和二级分类都保持左侧导航打开

```javascript
$(".navs li").trigger("click")
```





---



## 5.0 商品详情操作



### 5.1 渲染页面

​	请求数据

```javascript
$(function() {
    // 1.0 渲染全部商品列表
    $.ajax({
        type: "get",
        url: "/product/queryProductDetailList",
        data: {
            page: 1,
            pageSize: 20
        },
        success: function(res) {
            // console.log(res)
            var html = template("tempProduct", res)
            $("#renderProduct").html(html)
        }
    })
})
```

​	完成结构模板

```html
				<script type="text/template" id="tempProduct">
					<tr>
	        			<th>商品编号</th>
	        			<th>商品名称</th>
	        			<th>商品描述</th>
	        			<th>商品库存</th>
	        			<th>商品尺寸</th>
	        			<th>是否下架</th>
	        			<th>操作</th>
					</tr>
					<% for (var i = 0; i < rows.length; i++) { %>
						<tr>
							<td><%= rows[i].id %></td>
							<td><%= rows[i].proName %></td>
							<td><%= rows[i].proDesc %></td>
							<td><%= rows[i].num %></td>
							<td><%= rows[i].size %></td>
							<td><%= rows[i].statu ? "已上架" : "已下架" %></td>
							<td>
								<button type="button" 
								class="btn <%= rows[i].statu ? 'btn-danger' : 'btn-success' %>">
								<%= rows[i].statu ? "下架" : "上架" %>
								</button>
							</td>
						</tr>
					<% } %>
				</script>
```



### 5.2 处理列表

#### 5.2.1 动态渲染二级列表功能

```javascript
	// 2.0 点击添加商品，渲染二级分类
    $.ajax({
        type: "get",
        url: "/category/querySecondCategoryPaging",
        data: {
            page: 1,
            pageSize: 100
        },
        success: function(res) {
            console.log(res)
            var html = template("tempSecond", res)
            $("#renderSecond").html(html)
        }
    })
```



​	结构模板

```html
					<script type="text/template" id="tempSecond">
						<% for(var i = 0; i < rows.length; i++) { %>
							<option value="<%= rows[i].id %>"><%= rows[i].brandName %></option>	
						<% } %>
					</script>
```



#### 5.2.2 使用插件完成图片上传

​	第一步：引入文件，一定要按照顺序

```html
    <script src="assets/jquery-fileupload/jquery.ui.widget.js"></script>
    <script src="assets/jquery-fileupload/jquery.iframe-transport.js"></script>
    <script src="assets/jquery-fileupload/jquery.fileupload.js"></script>
```

​	第二步：写入属性，name的值不再是file，而是pic1

```html
				<div class="form-group">
				   <input type="file" accept="image/jpeg" multiple 
				   id="fileupload" data-url="/product/addProductPic" name="pic1">
	    		   <p class="help-block">最多上传三张图片</p>
	    		 </div>
```

​	第三步：完成最后的功能

```javascript
	// 3.0 使用插件完成图片上传功能
    var picArr = []
    $("#fileupload").fileupload({
        dataType: "json",
        done: function(e, data) {
            picArr.push(data.result.picAddr)
        }
    })
```



### 5.3 完成数据添加

```javascript
    // 4.0 点击按钮保存所有信息
    $("#addProduct").on("click", function() {
        var proName = $.trim($("[name=proName]").val())
        var oldPrice = $.trim($("[name=oldPrice]").val())
        var price = $.trim($("[name=price]").val())
        var proDesc = $.trim($("[name=proDesc]").val())
        var size = $.trim($("[name=size]").val())
        var num = $.trim($("[name=num]").val())
        var brandId = $.trim($("[name=brandId]").val())

        $.ajax({
            type: "post",
            url: '/product/addProduct',
            data: {
                proName: proName,
                oldPrice: oldPrice,
                price: price,
                proDesc: proDesc,
                size: size,
                statu: 1,
                num: num,
                brandId: brandId,
                pic1: picArr
            },
            success: function(res) {
                console.log(res)
            }
            
        })
    })
```

