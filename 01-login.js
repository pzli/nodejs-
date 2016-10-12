
console.log("请输入用户名: ");

// 定义一个JSON来保存用户名和密码信息
var users = {
    "admin":"123",
    "user":"123"
};

// 由于当用户成功输入了用户名之后,用户再输入密码,没法保存上一次的input,所以可以定义一个username来保存是哪个username登录,并且可以用这个来判断是否成功输入了用户名
var username = "";
// nodejs都是非阻塞的,所以每次用户按enter都会触发这个事件
process.stdin.on("data",(input) => {
    // input不是字符串,是Object对象,要先toString()转换成字符串,并且在命令行下换行也是一个字符,要用trim()(ES5中的方法)方法去掉左右两边的空格
    input = input.toString().trim();
    if(!username) { //如果没有成功输入正确的用户名,接着判断username的输入
        if(Object.keys(users).indexOf(input) == -1){
            // 输入的input用户名不存在
            console.log("输入的用户名不存在");
            console.log("请重新输入用户名: ");
        } else {
            // 输入的input用户名存在
            console.log(`${input} 请输入密码: `);
            username = input;
        }
    } else { // 表示已经输入了正确的用户名,接下来的input是密码,判断密码是否正确
        if(input == users[username]) { // 密码输入正确
            console.log("密码正确,欢迎您");
            process.exit();
        } else { // 密码输入错误
            console.log("密码错误,请重新输入密码: ");

        }
    }

})

