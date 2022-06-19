    //定义构造函数Set()
    function Set() {
        this.values = {};
        this.n = 0;
        this.add.apply(this, arguments);
    }
    //定义实例方法
    //将每个参数添加到this.value集合的方法
    Set.prototype.add = function () {
        for (var i = 0; i < arguments; i++) {       //遍历参数对象
            var arg = arguments[i];
            var str = Set._a2s(arg);                //用自用函数将参数转化为字符串
            if (!this.values.hasOwnProperty(str)) {  //如集合中自有属性没有该属性
                this.values[str] = arg;              //添加
                this.n++;                           //集合计数器加一
            }
        }
        return this;                                //返回对象
    };
    //删除集合元素，这些元素由参数指定的方法
    Set.prototype.remove = function () {
        for (var i = 0; i < arguments; i++) {       //遍历参数对象
            var arg = arguments[i];
            var str = Set._a2s(arg);                //用自用函数将参数转化为字符串
            if (this.values.hasOwnProperty(str)) {  //如集合中自有属性有该属性
                delete this.values[str];            //删除
                this.n--;                           //集合计数器减一
            }
        }
        return this;
    };
    //判断值是否在集合中的方法
    Set.prototype.contains = function (value) {
        return this.values.hasOwnProperty(Set._a2s(value)); //直接判断值的字符串是否为集合的自有属性
    };
    //返回集合的大小的方法
    Set.prototype.size = function () {
        return this.n;
    };
    //遍历集合自有元素，在指定上下文调用f的方法
    Set.prototype.foreach = function (f, context) {
        for (var i in this.values) {
            if (this.values.hasOwnProperty(i))
                f.call(context, this.values[i]);
        }
    };
    //内部函数Set._a2s(),用以将值于唯一字符串对应起来
    Set._a2s = function (arg) {
        switch (arg) {                      
            case null:                  //特殊原始值转化为单个字符字母
                return "n";
            case undefined:
                return "u";
            case true:
                return "t";
            case false:
                return "f";
            default:                    //其他值输出类型循环判断
                switch (typeof arg) {   
                    case "number":
                        return "#" + arg;
                    case "string":
                        return '"' + arg;
                    default:            //除了非number和string都转化为
                        return "@" + objectId(arg);
                }
        }
        function objectId(o) {              //嵌套函数u
            var prop = "|**objectid**|";    //定义个私有属性保存id
            if (!o.hasOwnProperty(prop))    
                o[prop] = Set._a2s.next++;  //不在对象中赋值
            // Set._a2s.next = 100;         //设定初始值
            return o[prop];                 //输出
        }
    };