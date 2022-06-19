function Keymap(bindings) {
    this.map = {};
    if (bindings) {                     //初始绑定的写入，可无
        for (keyid in bindings) this.bind(keyid, bindings[keyid]);
    }
}
//绑定4指定的按键标识符和指定的处理程序函数
Keymap.prototype.bind = function (key, func) {
    this.map[Keymap.normalize(key)] = func;
};
//删除指定案件标识符的绑定
Keymap.prototype.unbind = function (key) {
    delete this.map[Keymap.normalize(key)];
};
//指定HTML元素上配置Keymap
Keymap.prototype.install = function (element) {
    var keymap = this;
    function handler(event) {
        return keymap.dispatch(event, element);
    }
    if (element.addEventListener)
        element.addEventListener("keydown", handler, false);
    else if (element.attachEvent)
        element.attachEvent("onkeydown", handler);
};
//这个方法属于构造函数绑定分派按键事件
Keymap.prototype.dispatch = function (event, element) {
    var modifiers = "";             //辅助键定义
    var keyname = null;             //键名定义
    //如果有辅助键
    if (event.altKey) modifiers += "alt_";
    if (event.ctrlKey) modifiers += "ctrl_";
    if (event.metaKey) modifiers += "meta_";
    if (event.shiftKey) modifiers += "shift_";
    //如果实现3级DOW标准有key属性
    if (event.key) keyname = event.key;
    //在Safar和chrome上使用keyIdentifier属性
    else if (event.keyIdentifier && event.keyIdentifier.substring(0, 2) !== "U+")
        keyname = event.keyIdentifier;
    //否则通过keyCode到keyname的映射
    else keyname = Keymap.keyCodeTOKeyName[event.keyCode];
    if (!keyname) return;           //没找到健名则返回
    var keyid = modifiers + keyname.toLowerCase();
    var handler = this.map[keyid];  //调用与keyid对应的处理程序
    if (handler) {
        var retval = handler.call(element, event, keyid);
        //如果处理程序返回false则阻止默认操作和冒泡
        if (retval === false) {
            if (event.stopPropagation) event.stopPropagation();
            else event.cancelBubble = true;
            if (event.preventDefault) event.preventDefault();
            else event.returnValue = false;
        }
        return retval;
    }
};
//用于吧按键标识符转化为标准形式的工具函数
Keymap.normalize = function (keyid) {
    keyid = keyid.toLowerCase();
    var words = keyid.split(/\s+|[\-+_]/);
    var keyname = words.pop();
    keyname = Keymap.aliases[keyname] || keyname;
    words.sort();
    words.push(keyname);
    return words.join("_");
};
//常见按键别名
Keymap.aliases = {
    "escape": "esc",
    "delete": "del",
    "return": "enter",
    "ctrl": "control",
    "space": "spacebar",
    "ins": "insert"
};
Keymap.keyCodeTOKeyName = {
    //使用词或方向键
    8: "Backspace",
    9: "Tab",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Esc",
    32: "Spacebar",
    33: "PagaUp",
    34: "PagaDown",
    35: "End",
    36: "Home",
    37: "Left",
    38: "Up",
    39: "Rigth",
    40: "Down",
    45: "Insert",
    46: "Del",
    //主键盘数字键
    48: "0",
    49: "1",
    50: "2",
    51: "3",
    52: "4",
    53: "5",
    54: "6",
    55: "7",
    56: "8",
    57: "9",
    //字母按键，不区分大小写
    65: "a",
    66: "b",
    67: "c",
    68: "d",
    69: "e",
    70: "f",
    71: "g",
    72: "h",
    73: "i",
    74: "j",
    75: "k",
    76: "l",
    77: "m",
    78: "n",
    79: "o",
    80: "p",
    81: "q",
    82: "r",
    83: "s",
    84: "t",
    85: "u",
    86: "v",
    87: "w",
    88: "x",
    89: "y",
    90: "z",
    //数字小键盘和标点符号键
    96: "0",
    97: "1",
    98: "2",
    99: "3",
    100: "4",
    101: "5",
    102: "6",
    103: "7",
    104: "8",
    105: "9",
    106: "Multiply",
    107: "Add",
    109: "Subtract",
    110: "Decimal",
    111: "Divide",
    //功能键
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    124: "F13",
    125: "F14",
    126: "F15",
    127: "F16",
    128: "F17",
    129: "F18",
    130: "F19",
    131: "F20",
    132: "F21",
    133: "F22",
    134: "F23",
    135: "F24",
    //不需要按下shift键的标点符号键
    59: ";",
    61: "=",
    186: ";",
    187: "=",
    188: ",",
    190: ".",
    191: "/",
    192: "`",
    219: "[",
    220: "\\",
    221: "]",
    222: "'",
};