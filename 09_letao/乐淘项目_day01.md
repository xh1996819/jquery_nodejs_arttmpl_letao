#  乐淘项目

---

​	

## 1.0 任务通告

​	按需出页面，每天完成相应的代码进度

### 移动端页面

​	前端以移动端为主，有对应的后台管理页面

![mobile-1](images\mobile-1.jpg)



![mobile-2](images\mobile-2.jpg)



![mobile-3](images\mobile-3.jpg)



![mobile-4](images\mobile-4.jpg)



![mobile-5](images\mobile-5.jpg)



![mobile-6](images\mobile-6.jpg)



### 后台管理页面



![pc-login](images\pc-login.jpg)



![pc-index](images\pc-index.jpg)



![pc-index-01](images\pc-index-01.jpg)



![pc-index-02](images\pc-index-02.jpg)



![pc-index-03](images\pc-index-03.jpg)



### 1.1 开发模式

​	近几年中，随着前端的能力提升，使得第二种方式变得越来越主流

#### 后端处理动态页面

   	2013年前后，在公司招聘后端程序员的时候，都会多问一句，会不会ajax？

​	在那个时候来说，很多的前端对于数据交互并不是很理解，并且技术普遍很菜，js编程能力不强

​	所以在开发的时候，要么后端处理动态网页，也就是为什么有时候打开的网页是jsp，php后缀名结尾

​	或者干脆后端使用前端的ajax发送请求，渲染动态的网页



​	But，这样一来，后端要懂前端的东西就会越来越多，可是关于前端细枝末节的事情很多很杂

​	特别是CSS的一些样式，经常会让一些后端工程师骂娘

​	而此时这个工作就会开始甩锅，后端就让前端来修改样式，可是这里又出现了太多的内容，前端萌新也无从下手

​	所以以前的开发环境，经常见到后端给前端解释，他写的代码到底用来干什么，而前端一脸迷茫的场景

​	

​	这种情况的开发很占用效率，极大的损耗了内部交流沟通和开发额度时间

​	不过，竟然有些前端，在这样的环境下，对后端的东西越来越熟悉了

​	当然这样的人还不少



#### 前后端分离，接口化开发

​	当随着js的框架越来越多，前端职位从网页制作变成了web前端，再然后又变成前端开发工程师，甚至全栈开发

​	而且开发网页的这些萌新js能力不断变强，对项目的前后端交互也比较清楚

​	公司对于招聘前端开发的能力也不断攀升，当然还有薪资这个方面

​	然后ajax就是每个做前端都必须得会使用的技术，并且还能伴随着渲染动态页面

​	

​	So，后端工程师，只需要处理好接口，前端也不用关心他们到底在实现接口的时候用了什么框架，什么方法

​	只是开始期待能顺利拿到数据，并且拿到的是想要的，而且处理起来比较舒适的数据

​	那么即使在中间有任何问题，都是前端自己去解决了



​	再后来，有了NodeJS，前端竟然可以一个人完成项目的前后端，在仅仅使用js的情况下

​	不过这是下个阶段要说的事情



### 1.2 技术栈	



#### 页面层

![web-assets](images\web-assets.jpg)

#### 服务层

![server-info](images\server-info.jpg)





---



## 2.0 项目搭建

​	这里的环境只需要部署一次，之后只需要简单启动即可

### 2.1 安装对应软件

​	

#### 软件1： node.exe

​	安装node服务，这样不需要把项目放在固定的web容器中，随便放哪里都行

![node](images\node.jpg)

​	直接下一步，安装在c盘即可

​	安装完毕之后检查两条语句是否能执行

![node-cmd](images\node-cmd.jpg)



#### 软件2：mywrap或者phpstudy

​	安装虚拟服务器，目的仅仅只是为了给mysql提供启动服务，单独安装mysql也行

![mysql-server](images\mysql-server.jpg)



#### 软件3： navicat

​	图形化操作数据库，能较为直观的创建数据和分析数据

![server-ui](images\server-ui.jpg)



#### 启动服务

​	步骤1： 打开命令行窗口

![open-cmd](images\open-cmd.jpg)

​	步骤2：启动cmd，下载项目相关的包

![install](images\install.jpg)

​	

​	步骤3：启动项目

![start-npm](images\start-npm.jpg)



前端访问地址：localhost:3000/mobile/index.html

后端访问地址：localhost:3000/admin/login.html



### 2.2 Node安装失败的解决办法



 -  在安装程序出现2502、2503错误的解决办法

     - 以管理员身份运行cmd
     - 输入 msiexec / pakage node 安装包位置

    ![error-01](images\cmd-error.jpg)

 - 在命令行中输入 node -v 时，出现node不是内部或者外部命令，也不是可运行的程序或者批处理文件

    - 将node.exe所在文件夹配置到环境变量中

   ​

![error-01](images\error-01.jpg)



![error-02](images\error-02.jpg)



### 2.3 项目说明

![think-pro](images\think-pro.jpg)

	#### 创建自己的项目

![new-pro](images\new-pro.jpg)

#### 打开自己的项目

![open-cmd](images\open-cmd.jpg)

![start-npm](images\start-pro.jpg)



![start-url](images\start-url.jpg)



### 2.4 MUI框架

​	一般多用于在APP里面的页面

​	http://dev.dcloud.net.cn/mui/

![mui](images\mui.jpg)



#### 使用文件

![links-mui](images\links-mui.jpg)



![copy-mui](images\copy-mui.jpg)



---



## 3.0 首页搭建

![base-index](images\base-index.jpg)

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
	<script src="assets/mui/js/mui.min.js"></script>
</head>
<body>
	<header class="mui-bar mui-bar-nav lt-header">
		<h1 class="mui-title">网页标题</h1>
		<a href="" class="mui-icon mui-icon-search mui-pull-right"></a>
	</header>
	<nav class="mui-bar mui-bar-tab footer lt-footer">
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
		
	</div>
</body>
</html>
```



### 3.1 项目公共样式

​	创建base.css

```css
/* css reset */
body, ul, ol, dl, dt, dd, li, div, form, h1, h2, h3, h4, p {
	margin: 0;
	padding: 0;
}
html, body {
	height: 100%;
}
body {
	background-color: #fff;
}
ul, ol {
	list-style: none;
}
a, img {
	display: block;
}

/* header start */
.lt-header {
	background-color: #069;
}
.lt-header h1,
.lt-header a {
	color: #fff;
}
/* header end */

/* footer start */
.lt-footer {
	background-color: #069;
}
.lt-footer .mui-tab-item {
	color: #fff;
	touch-action: none;
}
.lt-footer .mui-tab-item.mui-active {
	color: darkorange;
}
/* footer end */

.mui-content {
	background-color: #fff;
}
```



### 3.2 实现轮播图

​	结构

```html
		<!-- 轮播图 -->
		<div class="mui-slider">
		  <div class="mui-slider-group mui-slider-loop">
			    <div class="mui-slider-item">
			    	<a href="#">
			    		<img src="images/banner6.png" />
			    	</a>
			    </div>
			    <div class="mui-slider-item">
			    	<a href="#">
			    		<img src="images/banner1.png" />
			    	</a>
			    </div>
			    <div class="mui-slider-item">
			    	<a href="#">
			    		<img src="images/banner2.png" />
			    	</a>
			    </div>
			    <div class="mui-slider-item">
			    	<a href="#">
			    		<img src="images/banner3.png" />
			    	</a>
			    </div>
			    <div class="mui-slider-item">
			    	<a href="#">
			    		<img src="images/banner4.png" />
			    	</a>
			    </div>
			    <div class="mui-slider-item">
			    	<a href="#">
			    		<img src="images/banner5.png" />
			    	</a>
			    </div>
			    <div class="mui-slider-item">
			    	<a href="#">
			    		<img src="images/banner6.png" />
			    	</a>
			    </div>
			    <div class="mui-slider-item">
			    	<a href="#">
			    		<img src="images/banner1.png" />
			    	</a>
			    </div>
		  </div>
		  <div class="mui-slider-indicator">
				<div class="mui-indicator mui-active"></div>
				<div class="mui-indicator"></div>
				<div class="mui-indicator"></div>
				<div class="mui-indicator"></div>
				<div class="mui-indicator"></div>
				<div class="mui-indicator"></div>
			</div>
		</div>
		<!-- /轮播图 -->
```

​	功能声明

```javascript
window.onload = function() {
	//获得slider插件对象
	var gallery = mui('.mui-slider');
	gallery.slider({
		interval:1500//自动轮播周期，若为0则不自动播放，默认为0；
	});
}
```



### 3.3 实现导航链接

​	结构

```html
<!-- 图片导航链接 -->
		<div class="nav-link-pic">
			<ul class="mui-clearfix">
				<li>
					<a href="#">
						<img src="images/nav1.png" alt="">
					</a>
				</li>
				<li>
					<a href="#">
						<img src="images/nav2.png" alt="">
					</a>
				</li>
				<li>
					<a href="#">
						<img src="images/nav3.png" alt="">
					</a>
				</li>
				<li>
					<a href="#">
						<img src="images/nav4.png" alt="">
					</a>
				</li>
				<li>
					<a href="#">
						<img src="images/nav5.png" alt="">
					</a>
				</li>
				<li>
					<a href="#">
						<img src="images/nav6.png" alt="">
					</a>
				</li>
			</ul>
		</div>
		<!-- /图片导航链接 -->
```



#### 去掉轮播图报错信息

​	touch-action: none;

​	CSS样式

```css
/* nav-pic start */
.mui-slider {
	touch-action: none;
}
.mui-content {
	background-color: #fff;
}
.nav-link-pic {
	padding: 10px;
}
.nav-link-pic ul {
	box-shadow: 2px 2px 5px #e4e4e4;
}
.nav-link-pic li {
	width: 33.3333%;
	float: left;
}
.nav-link-pic li img {
	width: 100%;
}
/* nav-pic end */
```



### 3.4 实现品牌专区

​	结构

```html
<!-- 品牌专区列表 -->
		<div class="brand-list-pic">
			<div class="title-pic">
				<img src="images/title0.png" alt="">
			</div>
			<div  class="logo-pic">
				<ul class="mui-clearfix">
					<li>
						<a href="#">
							<img src="images/brand1.png" alt="">
						</a>
					</li>
					<li>
						<a href="#">
							<img src="images/brand2.png" alt="">
						</a>
					</li>
					<li>
						<a href="#">
							<img src="images/brand3.png" alt="">
						</a>
					</li>
					<li>
						<a href="#">
							<img src="images/brand4.png" alt="">
						</a>
					</li>
					<li>
						<a href="#">
							<img src="images/brand5.png" alt="">
						</a>
					</li>
					<li>
						<a href="#">
							<img src="images/brand6.png" alt="">
						</a>
					</li>
					<li>
						<a href="#">
							<img src="images/brand7.png" alt="">
						</a>
					</li>
					<li>
						<a href="#">
							<img src="images/brand8.png" alt="">
						</a>
					</li>
				</ul>
			</div>
		</div>
		<!-- /品牌专区列表 -->
```



​	CSS样式

```css
/* brand-list-pic start */
.brand-list-pic {
	padding: 10px;
}
.title-pic img {
	width: 100%;
}
.logo-pic {
	box-shadow: 2px 2px 5px #e4e4e4;
	padding: 20px 0;
}
.logo-pic li {
	float: left;
	width: 25%;
}
.logo-pic li img {
	width: 100%;
}
/* brand-list-pic end */
```



### 3.5 实现产品布局

​	结构

```html
<!-- 运动生活专区 -->
		<div class="product-list-item">
			<div class="product-img">
				<img src="images/title1.png" alt="">
			</div>
			<div class="product-list">
				<ul>
					<li>
						<a href="#">
							<img src="images/product.jpg" alt="">
							<p class="pro-name">adidas阿迪达斯-男式-场下休闲篮球鞋S83700</p>
							<p>
								<span>￥560.00</span>
								<del>￥888.00</del>
							</p>
							<button type="button" class="mui-btn mui-btn-warning">立即购买</button>
						</a>
					</li>
					<li>
						<a href="#">
							<img src="images/product.jpg" alt="">
							<p class="pro-name">adidas阿迪达斯-男式-场下休闲篮球鞋S83700</p>
							<p>
								<span>￥560.00</span>
								<del>￥888.00</del>
							</p>
							<button type="button" class="mui-btn mui-btn-warning">立即购买</button>
						</a>
					</li>
				</ul>
			</div>
		</div>
		<!-- /运动生活专区 -->
```



​	CSS样式

```css
/* product-list-item start */
.product-list-item {
	padding: 10px;
}
.product-img img {
	width: 100%;
}
.product-list ul {
	padding: 20px 0;
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
}
.product-list ul li {
	width: 48%;
	box-shadow: 0 1px 10px #ccc;
	margin-bottom: 20px;
}
.product-list ul li a {
	padding: 5px;
}
.product-list ul li img {
	width: 100%;
}
.product-list ul li a p {
	padding: 0 5px;
	font-size: 14px;
	display: inline-block;
    overflow: hidden;
    -webkit-line-clamp: 2;
    max-height: 42px;
    word-break: break-all;
}
.product-list ul li a .pro-name {
	font-size: 16px;
    color: rgb(51, 51, 51);
    margin: 6px 0;
}
.product-list ul li a p span:first-of-type {
	color: #f40;
	margin-right: 4px;
}
.product-list ul li a .mui-btn-warning {
	display: block;
	margin: 10px auto;
}
/* product-list-item end */
```





