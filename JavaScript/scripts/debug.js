function debug(msg){                                //定义函数，msg类似x的参数
    var log = document.getElementById("debuglog");  //通过getElementById()函数在document文档中查找id为debuglog的元素，并赋予给log
    if (!log) {                                     //表示log为空时，则
        log = document.createElement("div");        //赋予log元素<div>
        log.id = "debuglog";                        //添加元素div的id为debuglog
        log.innerHTML = "<h1>Debug Log</h1>";       //定义初始内容
        document.body.appendChild(log);             //将log放在document的body的最后一个位置
    }
    var pre = document.createElement("pre");        //赋予pre <pre>标签
    var text = document.createTextNode(msg);        //将参数msg写入一个文本节点中
    pre.appendChild(text);                          //将文本添加到pre的最后
    log.appendChild(pre);                           //将pre添加到log的最后
}