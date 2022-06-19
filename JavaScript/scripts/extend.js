Object.defineProperty(Object.prototype, "extend", {                     //给对象添加一个extend()方法
    writable: true,
    enumerable: false,                                                  //该方法不可枚举
    configurable: true,
    value: function (o) {                                               //该方法的值为函数
        var names = Object.getOwnPropertyNames(o);                      //声明一个数组，得到o的全部自有属性名
        for (var i = 0; i < names.length; i++) {
            // if (names[i] in this) continue;                             //如果属性名已存在于跳过，this指调用该方法的对象
            var desc = Object.getOwnPropertyDescriptor(o, names[i]);    //否则将属性的属性描述符对象赋值给desc
            Object.defineProperty(this, names[i], desc)                 //给调用对象添加属性
        }
    }
});