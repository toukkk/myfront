function enclose(content, framewidth, frameheight, contentX, contentY) {
    framewidth = Math.max(framewidth, 50);
    frameheight = Math.max(frameheight, 50);
    contentX = Math.min(contentX, 0) || 0;
    contentY = Math.min(contentY, 0) || 0;
    // 初始化 frame 元素
    var frame = document.createElement("div");
    frame.className = "enclosure";
    frame.style.width = framewidth + "px";
    frame.style.height = frameheight + "px";
    frame.style.overflow = "hidden";
    frame.style.boxSizing = "border-box";           // border-box 简化了调整 frame 大小的计算
    frame.style.webkitBoxSizing = "border-box";
    frame.style.mozBoxSizing = "border-box";
    //把frame放入到文档中，并将元素转移到frame内
    content.parentNode.insertBefore(frame, content);
    frame.appendChild(content);                     //文档内原存在元素content，所以会删除原元素
    // 确定元素相对于 frame 的位置
    content.style.position = "relative";
    content.style.left = contentX + "px";
    content.style.top = contentY + "px";
    var isMacWebkit = (navigator.userAgent.indexOf("Macintosh") !== -1 && navigator.userAgent.indexOf("Webkit") !== -1);
    var isFirefox = (navigator.userAgent.indexOf("Gecko") !== -1);
    // 注册 mousewheel 事件处理程序
    frame.onwheel = wheelHandler;               //未来浏览器用onwheel
    frame.onmousewheel = wheelHandler;          //现在大部分浏览器用的
    if (isFirefox)                              //仅Firefox浏览器
        frame.addEventListener("DOMMouseScroll", wheelHandler, false);
    //事件处理程序函数
    function wheelHandler(event) {
        var e = event || window.event;
        var deltaX = e.deltaX * -30 || e.wheelDeltaX / 4 || 0;
        var deltaY = e.deltaY * -30 || e.wheelDeltaY / 4 || (e.wheelDeltaY === undefined && e.wheelDelta / 4)
            || e.detail * -10 || 0;
        if (isMacWebkit) {
            deltaX /= 30;
            deltaY /= 30;
        }
        if (isFirefox && e.type !== "DOMMouseScroll")
            frame.removeEventListener("DOMMouseScroll", wheelHandler, false);
        var contentbox = content.getBoundingClientRect();
        var contentwidth = contentbox.right - contentbox.left;
        var contentheight = contentbox.bottom - contentbox.top;
        if (e.altKey) {
            if (deltaX) {
                framewidth -= deltaX;
                framewidth = Math.min(framewidth, contentwidth);
                framewidth = Math.max(framewidth, 50);
                frame.style.width = framewidth + "px";
            }
            if (deltaY) {
                frameheight -= deltaY;
                frameheight = Math.min(frameheight, contentheight);
                frameheight = Math.max(frameheight, 50);
                frame.style.height = frameheight + "px";
            }
        } else {
            if (deltaX) {
                var minoffset = Math.min(framewidth - contentwidth, 0);
                contentX = Math.max(contentX + deltaX, minoffset);
                contentX = Math.min(contentX, 0);
                content.style.left = contentX + "px";
            }
            if (deltaY) {
                var minoffset = Math.min(frameheight - contentheight, 0);
                contentY = Math.max(contentY + deltaY, minoffset);
                contentY = Math.min(contentY, 0);
                content.style.top = contentY + "px";
            }
        }
        if (e.preventDefault)
            e.preventDefault();
        if (e.stopPropagation)
            e.stopPropagation();
        e.cancelBubble = true;
        e.returnValue = false;
        return false;
    }
}