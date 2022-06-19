    //用简单的函数创造简单的子类
    function defineSubclass(superclass, constructor, methods, statics) {
        constructor.prototype = inherit(superclass.prototype);
        constructor.prototype.constructor = constructor;
        if (methods) extend(constructor.prototype, methods);
        if (statics) extend(constructor, statics);
        return constructor;
    }
    //也可以通过父类的构造函数的方法来做到
    Function.prototype.extend = function (constructor, methods, statics) {
        return defineSubclass(this, constructor, methods, statics);
    }


    function extend(o, p) {             //函数表示将p对象中可枚举属性复制到对象o中，同属性名则保留对象p的属性值
        for (prop in p)
            o[prop] = p[prop];
        return o;
    }