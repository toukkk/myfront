//声明变量值并赋予数据类型
var x1 = 1
console.log(typeof x1);         //整数
console.log(x1);
var x2 = 0.01
console.log(typeof x2);         //整数和实数共用一种数据类型
console.log(x2);
var x3 = "hello world"          //单双引号内的文本构成的字符串
console.log(typeof x3);
console.log(x3);
var x4 = 'javascript'
console.log(typeof x4);
console.log(x4);
var x5 = true                   //布尔值 
console.log(typeof x5);
console.log(x5);
var x6 = null                   //特殊值，空
console.log(typeof x6);
console.log(x6);
var x7 = undefined              //特殊值，未定义
console.log(typeof x7);
console.log(x7);
console.log("")
    
//声明对象，字符串到值的映射的集合
var book = {
    topic: "javascript",
    fat: "true"
};
book.author = "flanagan";       //通过赋值来添加新属性
book.contents = {};
console.log(typeof book.topic);     //通过“ .”或“[]”来访问对象的属性
console.log(book.topic);
console.log(typeof book["fat"]);
console.log(book["fat"]);
console.log(typeof book);
console.log(book);
console.log("")
    
//声明数组，有四个值的数组，边界为[]
var primes = [2, 3, 5, 7];
var empty = [];                 //空数组
primes[0]                       //=>2  数组中第一个元素（默认0为第一个）
primes.length                   //=>4  数组有多少个元素
primes[primes.length - 2]       //=>8   等同primes[2], 计算[]内的数值
primes[4] = 9;                  //通过赋值加入第五个元素并赋值为9
primes[3] = 8; 	                //通过赋值改变第四个元素的值   
console.log(typeof primes[primes.length - 2]);
console.log(primes[primes.length - 2]);
console.log(typeof primes);
console.log(primes);
console.log("")
    
//对象与数组都可互相包含
var points = [
    { x: 2, y: 4 },
    { x: 4, y: 2 }];
var data = {
    trial1: [2, 4, 6],
    trial2: [6, [4, 4.0], 2]
};

//运算符,判断值相等，不等，大于，小于,逻辑判断，输出结果true或false
var x = 2, y = 3;
console.log(x == y)                 //=>false     是否相等
console.log(x != y)                 //=>true     是否不等
console.log(x >= y)                 //=>false     是否大于
console.log(x <= y)                 //=>true     是否小于
console.log("tow" == "three")       //=>false     两个字符串不等
console.log("tow" > "three")        //=>true       "tw"在字母表中索引大于"th"
console.log(false == (x == y))          //=>true  

console.log((x == 2) && (y == 3))   //=>true     &&表示与，理解为且,不可单独写，可在函数或者赋值内
console.log((x != 2) || (y == 3))   //=>true    || 表示或
console.log(!(x == 2))              //=>false      ! 表示求反
console.log("")
    
//定义函数：	函数是带名称和参数的js代码
function plus1(x) {		            //定义一个名为plus1的函数
    return x + 1;                   //返还值x+1
}
console.log(plus1(3))
var square = function (x) {         //函数也是一种值，将其赋予给变量
    return x * x;
};                                  //函数表达式完成后加;
console.log(square(plus1(3)))       //NAN  的全称    not a number NaN
//将函数值赋予给对象的属性，称为“方法”
var a = [];		                    //定义一个空数组
a.push(1, 2, 3);                      //方法push()将元素添加到数组
a.reverse();		                //方法reverse()将数组元素次序反转
console.log(typeof a);
console.log(a);
console.log("")
    
//定义方法，计算两点间的距离
points.dist = function () {             //points是前面的一个数组
    var p1 = this[0];		            //取第一个点坐标， this[]对当前数组
    var p2 = this[1];		            //取第二个点坐标
    var a = p2.x - p1.x;		        //算x轴差
    var b = p2.y - p1.y;		        //算y轴差
    return Math.sqrt(a * a + b * b);
};                                      //返回值的平方根，  Math.sqrt()是计算平方根的
console.log(typeof points.dist());
console.log(points.dist());
console.log("")
    
//if while for 语句语法
function abs1(x) {                    //求绝对值的函数
    if (x >= 0) {
        return x;
    }
    else {
        return -x;
    }
}
console.log(abs1(-4));
function abs2(n) {                    //求阶乘的函数
    var produst = 1;
    while (n > 1) {		            //循环
        produst *= n;                //produst=produst*n
        n--;
    }
    return produst;
}
console.log(abs2(4));
function abs3(n) {
    var i, produst = 1;
    for (i = 2; i <= n; i++)              //for循环需要有三步，两个分号
        produst *= i;
    return produst;
}
console.log(abs3(5));
console.log("")
    
//定义一个构造函数以初始化一个新的Point对象
function Point(x, y) {              //构造函数一般以大写开头
    this.x = x;                     //添加自身属性x,不赋值为外来x
    this.y = y;                     //将函数赋值给其他时是一个对象
}                                 //不需要返回return
var p = new Point(2, 2);             //开辟新的内存给对象p
Point.prototype.r = function () { //通过构造函数的prototype对象赋值
    return Math.sqrt(         //返回平方根
        this.x * this.x + this.y * this.y
    )
}
console.log(p.r());










