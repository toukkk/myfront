function isArrayLike(o) {               //定义一个函数判断o是否是类数组或数组
    var len = o.length;
    if (o &&                            //排除null或者undefined
        // Object.prototype.toString.call(o) === "object" &&     //判断o是否是类数组
        typeof o === "object" &&        //o是对象，排除字符串，和函数
        isFinite(len) &&                //长度属性值为有限数
        len >= 0 &&                     //长度属性值为正数
        len === Math.floor(len) &&      //长度属性值为整数
        len < 4294967296)               //长度属性x小于2的32次方
        return true;                    //以上全满足，则为类数组
    else
        return false;
}