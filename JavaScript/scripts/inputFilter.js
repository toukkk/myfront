whenReady(function () {
    //找出所有input标签
    var inputelts = document.getElementsByTagName("input");
    //循环调价事件处理监听
    for (var i = 0; i < inputelts.length; i++) {
        var elt = inputelts[i];
        if (elt.type != "text" || !elt.getAttribute("data-allowed-chars"))
            continue;
        if (elt.addEventListener) {
            elt.addEventListener("keypress", filter, false);
            elt.addEventListener("textInput", filter, false);
            elt.addEventListener("textinput", filter, false);
        }
        else if (elt.attachEvent) {
            elt.attachEvent("onkeypress", filter);
        }
    }
    //事件处理程序函数
    function filter(event) {
        var e = event || window.event;              //标准或IE模型
        var target = e.target || e.srcElement;      //标准或IE模型
        console.log("e.type", e.type);
        var text = null;
        //判定事件类型
        if (e.type === "textinput" || e.type === "textInput") {
            text = e.data;
            console.log("text1", text);
        }
        else {      //keypress事件
            var code = e.charCode || e.keyCode;
            if (code < 32 || e.charCode == 0 || e.ctrlkey || e.altkey)
                return;
            var text = String.fromCharCode(code);
            console.log("text2", text);
        }
        //
        var allowed = target.getAttribute("data-allowed-chars");
        var messageid = target.getAttribute("data-messageid");
        if (messageid)
            var messageElement = document.getElementById(messageid);
        //循环判定是否合法
        for (var i = 0; i < text.length; i++) {
            var c = text.charAt(i);
            if (allowed.indexOf(c) == -1) {         //不是数字
                if (messageElement)
                    messageElement.style.visibility = "visible";    //显现提示
                if (e.prevenDefault) e.prevenDefault();
                if (e.returnValue) e.returnValue = false;
                return false;
            }
        }
        //输入合法时执行隐藏提示
        if (messageElement) messageElement.style.visibility = "hidden";
    }
});