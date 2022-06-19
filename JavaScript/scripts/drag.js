function drag(elementToDrag, event) {                   //elementToDrag：绝对的定位的移动元素，event：事件对象
    console.log("elementToDrag: ", elementToDrag)
    console.log("event1: ", event)
    var startX = event.clientX + window.pageXOffset;    //计算鼠标的文档坐标：鼠标初始位置+滚动条偏移量
    var startY = event.clientY + window.pageYOffset;
    var origX = elementToDrag.offsetLeft;               //元素的定位坐标
    var origY = elementToDrag.offsetTop;
    var deltaX = startX - origX;                        //计算鼠标在元素的坐标
    var deltaY = startY - origY;
    if (document.addEventListener) {                    //添加事件mousemove，mouseup
        document.addEventListener("mousemove", moveHandler, true);
        document.addEventListener("mouseup", upHandler, true);
    }
    else if (document.attachEvent) {
        elementToDrag.setCapture();
        elementToDrag.attachEvent("onmousemove", moveHandler);
        elementToDrag.attachEvent("onmouseup", upHandler);
        elementToDrag.attachEvent("onlosecapture", upHandler);
    }
    if (event.stopPropagation) {                        //不再派发事件。不让其他元素看到它
        event.stopPropagation()
    }
    else event.canceBubble = true;
    if (event.preventDefault) {                         //通知浏览器不要执行与事件关联的默认动作。
        event.preventDefault();
    }
    else event.returnValue = false;
    //mousemmove事件处理函数
    function moveHandler(event) {
        if (!event) event = window.event;
        elementToDrag.style.left = (event.clientX + window.pageXOffset - deltaX) + "px";
        elementToDrag.style.top = (event.clientY + window.pageYOffset - deltaY) + "px";
        console.log("startX1: ", event.clientX + window.pageXOffset-startX)     //输出鼠标两次移动距离
        if (event.stopPropagation) {
            event.stopPropagation()
        }
        else event.canceBubble = true;
    }
    function upHandler(event) {
        console.log("event2: ", event)
        if (!event) event = window.event;
        if (document.removeEventListener) {             //注销事件
            document.removeEventListener("mouseup", upHandler, true);
            document.removeEventListener("mousemove", moveHandler, true);
        }
        else if (document.detachEvent) {
            elementToDrag.detachEvent("onlosecapture", upHandler);
            elementToDrag.detachEvent("onmouseup", upHandler);
            elementToDrag.detachEvent("onmousemove", moveHandler);
            elementToDrag.releaseCapture();
        }
        if (event.stopPropagation) {
            event.stopPropagation()
        }
        else event.canceBubble = true;
    }
}