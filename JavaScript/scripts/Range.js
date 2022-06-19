    function Complex(real, imaginary) {         //定义构造函数
        if (isNaN(real) || isNaN(imaginary))
            throw new TypeError();
        this.r = real;
        this.i = imaginary;
    }
    //定义类的实例方法
    Complex.prototype.add = function (that) {       //添加另一个复数，并返回新的复数
        return new Complex(this.r + that.r, this.i + that.i);
    };
    Complex.prototype.mul = function (that) {       //与另一个复数相乘，并返回新的复数
        return new Complex(this.r * that.r - this.i * that.i, this.r * that.i + this.i * that.r);
    };
    Complex.prototype.mag = function () {           //计算复数的模，及到原点的复平面距离
        return Math.sqrt(this.r * that.r + this.i * that.i);
    };
    Complex.prototype.neg = function () {           //求负运算
        return new Complex(-this.r, -this.i);
    };
    Complex.prototype.toString = function () {      //将复数对象转化为字符串
        return "{" + this.r + "," + this.i + "}";
    };
    Complex.prototype.equals = function (that) {    //判断是否和另一复数值相同
        return that != null && that.constructor === Complex && this.r === that.r && this.i === that.i;
    };
    //定义类字段
    Complex.ZERO = new Complex(0, 0);
    Complex.ONE = new Complex(1, 0);
    Complex.I = new Complex(0, 1);
    //定义类方法
    Complex.parse = function (s) {                  //定义一个类方法，将由方法toString转化为字符串通过正则匹配解析为复数对象
        try {
            var m = Complex._format.exec(s);        //正则匹配
            return new Complex(parseFloat(m[1]), parseFloat(m[2]));
        }
        catch (e) {
            throw new TypeError("can't parse '" + s + "' as a complex number.");
        }
    };
    Complex._format = /^\{([^,]+),([^}]+)\}$/;       //定一个私有字段，下划线表示只能类内部使用，不属于共有API的部分
  