var whenReady = (function () {
    var funcs = [];                     //事件处理时要调用的函数              
    var ready = false;                  //用来验证事件程序是否触发，触发后会赋值为true
    //文档加载完毕后调用的事件处理程序
    function handler(event) {           //事件处理程序
        if (ready) return;              //如已经触发过则返回
        if (event.type === "readystatechange" && document.readyState !== "complete")
            return;                     //若触发readystatechange事件且文档未加载完成则返回
        for (var i = 0; i < funcs.length; i++) {
            funcs[i].call(document);    //文档循环调用事件处理函数
        }
        ready = true;                   //触发会赋值
        funcs = null;                   //清空处理函数
    }
    if (document.addEventListener) {    //添加事件监听
        document.addEventListener("DOMContentLoaded", handler, false);
        document.addEventListener("readystatechange", handler, false);
        window.addEventListener("load", handler, false);
    }
    else if (document.attachEvent()) {  //适用IE
        document.attachEvent("readystatechange", handler);
        window.attachEvent("load", handler);
    }
    return function whenReady(f) {      //返回函数
        if (ready) f.call(document);    //如加载完毕，则运行函数f
        else funcs.push(f);             //没有则将其加入事件处理函数的队列中
    }
}());