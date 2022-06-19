//定义震动动画函数
function shake(e, oncomplete, distance, time) {
    if (typeof e === "string") e = document.getElementById(e);
    if (!distance) distance = 5;
    if (!time) time = 500;
    var originalStyle = e.style.cssText;
    e.style.position = "relative";
    var start = (new Date()).getTime();
    animate();
    function animate() {
        var now = (new Date()).getTime();
        var elapsed = now - start;
        if (elapsed < time) {
            var x = distance * Math.sin(elapsed / time * 8 * Math.PI)
            e.style.left = x + "px";
            setTimeout(animate, Math.min(25, time - elapsed));
        }
        else {
            e.style.cssText = originalStyle;
            if (oncomplete) oncomplete(e);
        }
    }
}
//定义元素透明函数
function fadeOut(e, oncomplete, time) {
    if (typeof e === "string") e = document.getElementById(e);
    if (!time) time = 500;
    var start = (new Date()).getTime();
    animate();
    function animate() {
        var now = (new Date()).getTime();
        var elapsed = now - start;
        if (elapsed < time) {
            var x = elapsed / time;
            e.style.opacity = 1 - Math.sqrt(x);
            setTimeout(animate, Math.min(25, time - elapsed));
        }
        else {
            e.style.opacity = "0";
            if (oncomplete) oncomplete(e);
        }
    }
}
//引用，e参数可以是this，oncomplete参数可以是透明函数
/* <h1 type="button" onclick="shake(this,fadeOut)">javascript</h1> */   

