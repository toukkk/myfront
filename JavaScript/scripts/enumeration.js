function extend(o, p) {             //函数表示将p对象中可枚举属性复制到对象o中，同属性名则保留对象p的属性值
    for (prop in p)
        o[prop] = p[prop];
    return o;
}
function merge(o, p) {              //函数表示将p对象中可枚举属性复制到对象o中，但相同属性名的值保留对象o的
    for (prop in p) {
        if (prop in o) continue;
        o[prop] = p[prop];
    }
    return o;
}
function restrict(o, p) {           //函数表示对象o保留所有与对象p同名属性的属性
    for (prop in o) {
        if (!(prop in p)) delete o[prop];
    }
    return o;
}
function subtract(o, p) {           //函数表示对象o删除所有与对象p同名属性的属性
    for (prop in o) {
        if (prop in p) delete o[prop];
    }
    return o;
}
function union(o, p) {              //函数表示建立一个新对象，保留对o和p所有属性，同属性名则保留对象p的属性值
    return extend(extend({}, o), p);
}
function intersection(o, p) {       //函数表示建立一个新对象，保留对o和p共同拥有的属性，同属性名则保留对象o的属性值
    return restrict(extend({}, o), p);
}
function keys(o) {                  //函数表示将对象o的所有可枚举自有属性名赋值给数组result
    if (typeof o !== "object") throw TypeError();
    var result = [];
    for (prop in o) {
        if (!o.hasOwnproperty("prpo")) continue;
        result.push(prop);
    }
    return result;
}