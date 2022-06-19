//定义函数按参数n或者0的位置切割成新数组
function array(a, n) {
    return Array.prototype.slice.call(a, n || 0);
}
//定义函数的实参在左边
function partialLeft(f /*,....*/) {
    var args = arguments;               //外函数的实参数组赋值
    return function () {
        var a = array(args, 1);         //先插入外函数的参数
        a = a.concat(array(arguments));
        return f.apply(this, a);
    };
}
//定义函数的实参在右边
function partialRight(f /*,....*/) {
    var args = arguments;
    return function () {
        var a = array(arguments);
        a = a.concat(array(args,1));
        return f.apply(this, a);
    };
}
//实参中的undefined的被填充
function partial(f /*,....*/) {
    var args = arguments;
    return function () {
        var a = array(args, 1), j = 0;
        for (var i = 0; i < a.length; i++) {
            if (a[i] === undefined) a[i] = arguments[j++];    //使用arguments的之填充实参undefined
        }
        a = a.concat(array(arguments, j));
        return f.apply(this, a);
    }
}



































































































