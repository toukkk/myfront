//css样式：
// #TOC { border:solid black 1px; mardin: 10px; padding: 10px; }
// .TOCEntry { font - family: sans - serif; }
// .TOCEntry a { text - decoration: none; }
// .TOCLevel1 { font - size: 16pt; font - weight: bold; }
// .TOCLevel2 { font - size: 12pt; margin - left: 5in; }
// .TOCSctNum:after { content: ": "; }
//js代码：
onload = (function () {
    var toc = document.getElementById("TOC");
    //查找容器TOC元素
    if (!toc) {
        toc = document.createElement("div");
        toc.id = "TOC";
        document.body.insertBefore(toc, document.body.firstChild);
    }
    //查找所有标题标签
    var headings;
    if (document.querySelectorAll)
        headings = document.querySelectorAll("h1,h2,h3,h4,h5,h6");
    else
        headings = findHeadings(document.body, []);
    //定义递归遍历文档body，查找标题标签
    function findHeadings(root, sects) {
        for (var c = root.firstChild; c != null; c = c.nextSibling) {
            if (c.nodeType !== 1) continue;
            if (c.tagName.length == 2 && c.tagName.charAt(0) == "h")
                sects.push(c);
            else
                findHeadings(c, sects);
        }
        return sects;
    }
    //初始化一个数组保持跟踪章节号
    var sectionNumbers = [0, 0, 0, 0, 0, 0];
    //循环已找到的标题
    for (var h = 0; h < headings.length; h++) {
        var heading = headings[h];
        //跳过TOC容器内的标题
        if (heading.parentNode == toc) continue;
        //跳过标题级别错误的
        var level = parseInt(heading.tagName.charAt[1]);
        if (isNaN(level) || level < 1 || level > 6) continue;
        //重置所有标题比他级别低的
        sectionNumbers[level - 1]++;
        for (var i = level; i < 6; i++)
            sectionNumbers[i] = 0;
        //所右标题级别组合产生 章节号
        var sectionNumber = sectionNumbers.slice(0, level).join(".");
        //将数字放在span中进行修饰
        var span = document.createElement("span");
        span.className = "TOCSectNum";
        span.innerHTML = sectionNumber;
        heading.insertBefore(span, heading.firstChild);
        //将标题和节点来连接起来，以便增加链接
        var anchor = document.createElement("a");
        anchor.a_name = "TOC" + sectionNumber;
        heading.parentNode.insertBefore(anchor, heading);
        anchor.appendChild(heading);
        //为节点增加一个链接
        var link = document.createElement("a");
        link.href = "#TOC" + sectionNumber;
        link.innerHTML = heading.innerHTML;
        //将连接放在div内
        var entry = document.createElement("div");
        entry.className = "TOCEntry TOCLevel" + level;
        entry.appendChild(link);
        //将div加到TOC容器中
        toc.appendChild(entry);
    }
});