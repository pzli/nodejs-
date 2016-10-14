 // 导入所需模块
 var http = require("http"); 
 var url = require("url"); 
 var qs = require('querystring');

  // 这里为了方便使用了全局变量
 var proverbs = [ 
		"学而不思则罔", 
		"思而不学则殆", 
        "好好学习", 
        "天天向上"
 ];


  // 创建一个 Web 服务器,监听8888端口,要注意端口是否被占用
 http.createServer(onRequest).listen(8888); 
 console.log("服务器开始运行...");


  // 请求处理函数
 function onRequest(request, response) { 
     //console.log(typeof request.url);
     // 拿到请求url的pathname  "/index"   "/"   "/adadasd" 之类的
	 var pathname = url.parse(request.url).pathname; 
     //console.log(JSON.stringify(url.parse(request.url)));
	 console.log(`接收到${pathname}的请求...`); 

     // 正常请求会随机显示原有的4条谚语加上add提交的谚语中的一个
     if (pathname === "/" || pathname === "/index") { 
		 getProverb(response); 
	 } else if (pathname === "/add") { 
         // 当点击submit提交之后
		 if (request.method.toLowerCase() == 'post') { 

			 var body = ''; 
			 request.on('data', (chunk) => { 
				 body += chunk; 
			 }); 

			 request.on('end', () => { 

				 var POST = qs.parse(body); 
                 // console.log(POST.text);
				 add(POST.text, response); 
			 }); 
		 } else { // 首次加载/add页面,显示一个textarea和submit用来提交厌遇并保存
			 addProverb(response); 
		 } 

	 } else { 
		 response.writeHead(404, { 
			"Content-Type" : "text/plain"
		 }); 
		 response.write("404 Not found"); 
		 response.end(); 
	 } 

 }


  function getProverb(response) { 
     // 随机输出谚语数组中的一个
	 var body = 
     `<html>
	  <head>
	     <meta http-equiv="Content-Type" content="text/html" charset="UTF-8" />
	  </head>
      <body style="font-size: 4em;line-height: 1.2; margin-top: 200;">
         <blockquote>
             ${proverbs[Math.floor(Math.random() * proverbs.length)]}
         </blockquote>
      </body>
	  </html>`; 
     
     // 固定三次
	 response.writeHead(200, { 
		"Content-Type" : "text/html"
	 }); 
	 response.write(body); 
	 response.end(); 

 }

  function addProverb(response) { 
     // 点击submit会跳转到/add页面并且是post方法提交
	 var body =
      `<html>
	    <head>
		<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
		</head>
        <body style="font-size: 4em;line-height: 1.2; margin-top: 200;">
			 <form action="/add" method="post">
			 <textarea name="text" rows="10" cols="60"></textarea>
			 <input type="submit" value="Submit" />
             </form>
        </body>
		</html>`; 

	 response.writeHead(200, { 
		"Content-Type" : "text/html"
	 }); 
	 response.write(body); 
	 response.end(); 

 }

  function add(proverb, response) { 

	 proverbs.push(proverb); 

	 var body =
     `<html>
	  <head>
	    <meta http-equiv="Content-Type" content="text/html" charset="UTF-8" />
	  </head>
      <body style="font-size: 4em;line-height: 1.2; margin-top: 200;">
	  <blockquote>
        ${proverb}
      </blockquote>
      </body>
	  </html>`; 

	 response.writeHead(200, { 
		"Content-Type" : "text/html"
	 }); 
	 response.write(body); 
	 response.end(); 

 }