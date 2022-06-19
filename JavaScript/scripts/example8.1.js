//输出o的属性名称和值，返回undefined
function printprops(o) {
    for (var p in o) {
        console.log(p + ":" + o[p] + "\n")
    }
}
//计算两点迪卡尔坐标距离
function distance(x1, x2, y1, y2) {
    return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
}
//计算阶乘的递归函数
function factorial(n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}
//函数表达式又是定义后直接使用,
var f = (function (n) { return n * n; }(10));  //输出f结果为100












































