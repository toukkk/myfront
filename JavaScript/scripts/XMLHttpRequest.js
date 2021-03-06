    //用POST方法向服务器发送纯文本
    function postMessage(msg) {
        var request = new XMLHttpRequest(); //创建新请求
        console.log("request: ", request);
        request.open("POST", "/log.php")    //向服务器段发送脚本，OST常用于HTML表单，请求主题包含额外内容，表单数据会存储在服务器数据库中。
        //第二个参数是请求主题，相当于文档的url,这个文档包含调用open()的脚本
        request.setRequestHeader("Content-Type", "text/plain");
        //POST请求需要"Content-Type"头指定请求主题的MIME类型，可以多次不同类型，互不影响
        request.send(msg);                   //发送请求主体,POST请求通常有主体，所以需要setRequestHeader指定头"Content-Type"
    }
    //获取HTTP响应的onreadystatecchange
    function getText(url, callback) {
        var request = new XMLHttpRequest();
        request.open("GET", url, false)     //get用于常规请求，适用于当url完全指定请求资源，请求对服务器无副作用,传递false实现同步
        request.onreadystatechange = function () {                      //添加事件
            if (request.readyState === 4 && request.status === 200) {   //如果请求成功
                var type = request.getResponseHeader("Content-Type");
                if (type.indexOf(xml) !== -1 && request.responseXML)
                    callback(request.responseXML);                      //Document对象响应
                else if (type === "application/json")                   //JSON响应
                    callback(JSON.parse(request.responseText));
                else if (type.match(/^text/))                           //如果响应是文本
                    callback(request.responseText);                     //把它传递给回调函数
                else
                    callback(request.responseText);                     //字符串响应
            }
        };
        request.send(null);                 //发送请求主体，GET请求无主体，所以参数为null或空，
    }
    //用于HTTP请求的编码对象
    function encodeFormData(o) {
        if (!o) return "";
        var pairs = [];
        for (var name in o) {
            if (!o.hasOwnProperty(name)) continue;
            if (typeof o[name] === "function") continue;
            var value = o[name].toString();
            name = encodeURIComponent(name.replace("%20", "+"));       //编码名字
            value = encodeURIComponent(value.replace("%20", "+"));      //编码值
            pairs.push(name + "=" + value);
        }
        return pairs.join("&");                                         //返回编码字符串
    }
    //使用表单编码数据发起一个HTTP POST请求
    function postData(url, Data, callback) {
        var request = new XMLHttpRequest();
        request.open("POST", url + "?" + encodeFormData(Data));
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.onreadystatechange = function () {                      //添加事件
            if (request.readyState === 4 && callback)                   //如果请求成功
                callback(request);
        }
        request.send(encodeFormData(Data));
    }
    //使用HTTP POST 请求上次文件
    function upText() {
        var elts = document.getElementsByTagName("input");
        for (var i = 0; i < elts.length; i++) {             //循环所有type为file的元素
            var input = elts[i];
            if (!input.type == "file") continue;
            var url = input.getAttribute("data-uploadte");  //该元素有数据上传链接的属性
            if (!url) continue;
            input.addEventListener("change", function () {  //创建事件
                var file = this.files[0];                   //去文件夹第一个子文件
                if (!file) return;
                var request = new XMLHttpRequest();         //创建请求
                request.open("POST", url);
                request.send(file);                         //上传文件主体,默认设置"Comtent-Type"头，忽略服务器响应
            }, false);
        }
    }
    //使用POST方法发送multipart/form-data请求主体
    function postFormData(url, data, callback) {            //multipart/form-data指表单同时包含文件上传元素和其他元素时
        if (typeof FormData === "undefined")                //判断FormData构造函数存在
            throw new Error("FormData is not implemented");
        var request = new XMLHttpRequest();                 //创建请求
        request.open("POST", url);
        var formdata = new FormData();                      //创建formdata对象
        for (var name in data) {
            if (!data.hasOwnProperty(name)) continue;
            if (typeof data[name] === "function") continue;
            formdata.append(name, data[name]);              //调用formdata对象append方法
        }
        request.send(formdata);                             //传入FormData对象时会自动设置"Comtent-Type"头
    }
    //监控HTTP上传进度
    function upLoading() {
        var elts = document.getElementsByClassName("fileDropTarget");
        for (var i = 0; i < elts.length; i++) {             //循环所有fileDropTarget类的元素
            var target = elts[i];
            var url = target.getAttribute("data-uploadte");  //该元素有数据上传链接的属性
            if (!url) continue;
            createFileUpLoadDropTarget(target, url);
        }
        function createFileUpLoadDropTarget(target, url) {
            var upLoading = false;
            console.log("target,url: ", target, url);
            target.ondragenter = function (event) {
                console.log("dragenter: ", dragenter);
                if (upLoading) return;
                var types = event.dataTransfer.types;
                if (types && ((types.contains && types.contains("files")) ||
                    (types.indexOf && types.indexOf("files") !== -1))) {
                    target.classList.add("wantdrop");
                    return false;
                }
            };
            target.ondragover = function (event) {
                if (!upLoading) return false;
            };
            target.ondragleave = function (event) {
                if (!upLoading) target.classList.remove("wantdrop");
            };
            target.ondrop = function (event) {
                if (!upLoading) return false;
                var files = event.dataTransfer.files;
                if (files && files.length) {
                    upLoading = true;
                    var message = "UPloading files:<ul>";
                    for (var i = 0; i < files.length; i++) {
                        message += "<li>" + files[i] + "</li>";
                    }
                    message += "</ul>";

                    target.innerHTML = message;
                    target.classList.remove("wantdrop");
                    target.classList.add("upLoading");

                    var request = new XMLHttpRequest();
                    request.open("POST", url);
                    var formdata = new FormData();
                    for (var i = 0; i < files.length; i++) {
                        formdata.append(i, files[i]);
                    }
                    request.upload.onprogress = function (event) {
                        if (event.lengthComputable) {
                            target.innerHTML = message + Math.round(e.loaded / e.total * 100) + "% Complete";
                        }
                    };
                    request.upload.onload = function (event) {
                        upLoading = false;
                        target.classList.remove("uploading");
                        target.innerHTML = "Drop files to upload";
                    };
                    request.send(formdata);
                    return false;
                }
                target.classList.remove("wantdrop");
            }
        }
    }
    //实现超时
    function timeGetText(url, timeout, callback) {
        var request = new XMLHttpRequest();
        var out = false;
        var timer = setTimeout(function () { out = true; request.abort(); }, timeout)   //超时将out值为true，请求终止
        request.open("GET", url);
        request.onreadystatechange = function () {
            if (request.readyState !== 4) return;
            if (timeout) return;
            clearTimeout(timer);                            //取消计时器
            if (request.status === 200)                     //请求成功回调responseText
                callback(request.responseText);
        };
        request.send(null);
    }
    //使用HEAD和CORS请求链接详细信息
    function headCors() {
        var supportsCORS = (new XMLHttpRequest).withCredentials == undefined;   //是否支持CORS
        //循环找到有url且没有标题的链接,并设置事件
        var links = document.getElementsByTagName("a");
        for (var i = 0; i < links.length; i++) {
            var link = links[i];
            if (!link.href) continue;
            if (link.title) continue;
            if (link.host !== location.host || link.protocol !== location.protocol) {
                link.title = "域外连接";
                if (supportsCORS) continue;             //不支持跳过
            }
            link.addEventListener("mouseover", mouseoverHandler, false);
        }
        //事件处理程序函数
        function mouseoverHandler(event) {
            var link = event.target || e.srcElement;
            var url = link.href;
            var request = new XMLHttpRequest();
            request.open("HEAD", url);
            request.onreadystatechange = function () {
                if (request.readyState !== 4) return
                if (request.status === 200) {
                    var type = request.getResponseHeader("Content-Type");
                    var size = request.getResponseHeader("Content-Length");
                    var date = request.getResponseHeader("Last-Modifiled");
                    link.title = "类型" + type + "\n" + "大小" + size + "\n" + "时间" + date;
                }
                else {
                    if (!link.title)
                        link.title = "Couldn't fetch detains:\n" + request.status + " " + request.statusText;
                }
            };
            request.send(null);
            //注销事件
            link.removeEventListener("mouseover", mouseoverHandler, false);
        }
    }