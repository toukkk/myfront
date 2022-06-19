Function.prototype.getName = function () {          //扩充Function的一个实例方法，获取函数名
    return this.name || this.toString().match(/function\s*([^(]*)\(/)[1];
};