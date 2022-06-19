Function.prototype.bind = function (o) {
    var str = String(this);
    var lastIndex = str.search(/\(/);
    var funName = str.substring(9, lastIndex);


    var self = this, outarguments = arguments;      //this指向调用这个函数的对象，即f.bind中的f,arguments则是指当前函数的参数组
    o[funName] = function () {                            //表示绑定函数运行后返回的函数
        var args = [], i;
        for (i = 1; i < outarguments.length; i++)   //将外函数的除了第一位的参数(表示绑定参数)加到args中，第一位便是对象o
            args.push(outarguments[i]);
        for (i = 0; i < arguments.length; i++)      //将返回函数的参数组（表示输入参数）加到args中
            args.push(arguments[i])
        return self.apply(o, args);                  //表示返回输入参数后返回的结果，self=this=f,args表示绑定参数和输入参数集合的参数组
    };

    // o[funName] = test

};