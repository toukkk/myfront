function inherit(p) {                                   //定义一个继承对象函数
    if (p == null) {                                    //如果对象原型为空则报错
        throw TypeError();
    }
    else {
        if (Object.create) {                            //如果支持Object.create函数，则输出Object.create 
            return Object.create(p);
        }
    }
}