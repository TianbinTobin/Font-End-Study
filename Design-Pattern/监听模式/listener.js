/**
 * 文件名：listener
 * 描述：监听者模式
 * 修改人： tianbin
 * 修改时间：2016/9/6
 * 修改内容：新增
 */
/**
 * 输出结果
 * f1 do something one!
 * f2 do something!
 * f1 callback invoke!
 * f1 do something two!
 */

/**事件对象*/
var Event = function (obj) {
    this.obj = obj;
    this.getSource = function () {
        return this.obj;
    };
};

/**监听对象*/
var F2 = function () {
    this.handler = function (event) {
        var f1 = event.getSource();
        console.log("f2 do something!");
        f1.callback();
    };
};

/**被监听对象*/
var F1 = function () {
    this.abc = function () {
        console.log("f1 do something one!");
        /**创建事件对象*/
        var e = new Event(this);
        /**发布事件*/
        this.f2.handler(e);
        console.log("f1 do something two!");
    };

    this.on = function (f2) {
        this.f2 = f2;
    };

    this.callback = function () {
        console.log("f1 callback invoke!");
    };
};

/**主函数*/
function main () {
    var f1 = new F1();
    var f2 = new F2();
    /**加入监听*/
    f1.on(f2);
    f1.abc();
}

/**运行主函数*/
main();