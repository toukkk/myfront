function hide(e, reflow) {                      //定义两个参数的函数
    if (reflow) {                               //如果第二个参数为真，则
        e.style.display = "none";               //第一参数e元素的display赋值为none
    }
    else {
        e.style.visibility = "hidden";          //false则，将e元素的visibility赋值为hidden
    }
}