var editor, statusline, sacebutton, idletimer;
window.onload = function () {
    if (localStorage.note == null) localStorage.note = "";
    if (localStorage.lastModified == null) localStorage.lastModified = 0;
    if (localStorage.lastSaved == null) localStorage.lastSaved = 0;
    editor = document.getElementById("editor");
    statusline = document.getElementById("editor");
    sacebutton = document.getElementById("editor");
    editor.value = localStorage.note;   //初始化数据，将保存笔记数据赋值
    editor.disabled = true;   //同步前不可编辑
    editor.addEventListener("input", function (e) {
        localStorage.note = editor.value;   //新值保存
        localStorage.lastModified = Date.now();     //保存数据输入时间
        if (idletimer) clearInterval(idletimer);     //重置计时器
        idletimer = setTimeout(sace, 5000);            //五秒指向sace()
        sacebutton.disabled = false;    //启用保存按钮
    }, false);
    sync();      //每次载入程序，都同步服务器
};
window.onbeforeunload = function () {   //每次关闭页面时间
    if (localStorage.lastModified > localStorage.lastSaved) //如textarea触发了input时间
        sace();     //保存数据到服务器
};
window.onoffline = function () {        //离线时
    status("offline");
};
window.onnoline = function () {     //返回在线状态
    sync();         //同步服务器
};
// window.applicationCahe.onupdatecache = function () {
//     status("A new version has been downloading. Reload to run it");
// }
function status(msg) {
    statusline.innerHTML = msg;
}
function sace() {
    if (idletimer) clearTimeout(idletimer); //关闭计时器
    idletimer = null;   //清空计时器值
    if (navigator.onLine) {     //如果有网
        var request = new XMLHttpRequest;   //创建请求
        request.open("PUT", "/note");
        request.send(editor.value);     //上传数据
        request.onload = function () {  //请求事件完成后
            localStorage.lastSaved = Date.now();    //更新数据上传时间
            sacebutton.disabled = true;     //关闭按钮
        };
    }
}
function sync() {
    if (navigator.onLine) {
        var request = new XMLHttpRequest;
        request.open("GET", "/note");
        request.send();
        request.onload = function () {
            var remoteModTime = 0;
            if (request.status == 200) {
                var remoteModTime = request.getResponseHeader("Last-Modified");
                remoteModTime = new Date(remoteModTime).getTime();
            }
            if (remoteModTime > localStorage.lastModified) {
                status("Newer note found on server");
                var useit = prompt("yes and no");
                var now = Date.now();
                if (useit) {
                    editor.value = localStorage.note = request.responseText;
                    localStorage.lastModified = now;
                    status("Newest version downloaded");
                }
                else
                    status("Newest version is not downloaded");
                localStorage.lastModified = now;
            }
            else {
                status("You are editing the current version of the note");
            }
            if (localStorage.lastModified > localStorage.lastSaved)
                sace();
            editor.disabled = false;      
            editor.focus();    
        };
    }
    else {
        status("can't sync while offline");
        editor.disabled = false;      //打开编辑
        editor.focus();     //焦点
    }
}
