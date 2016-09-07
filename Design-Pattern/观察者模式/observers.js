/**
 * 文件名：observers
 * 描述：观察者模式
 * 修改人： tianbin
 * 修改时间：2016/9/6
 * 修改内容：新增
 */
/**
 * 运行结果
 * f do something!
 * f1 do something!
 * 苹果
 * 桃子
 * 香蕉
 * f callback invoke!
 * f2 do something!
 * 苹果
 * 桃子
 * 香蕉
 * f callback invoke!
 * f do something two!
 */

/**观察者对象1*/
var F1 = function () {
    this.update = function (observable, obj) {
        console.log("f1 do something!");
        for (var i = 0, len = obj.length; i < len; i++) {
            console.log(obj[i]);
        }
        observable.callback();
    }
};

/**观察者对象2*/
var F2 = function () {
    this.update = function (observable, obj) {
        console.log("f2 do something!");
        for (var i = 0, len = obj.length; i < len; i++) {
            console.log(obj[i]);
        }
        observable.callback();
    }
};

/**被观察对象*/
var F = function () {
    /**保存所有观察者*/
    var observers = [];

    this.abc = function () {
        console.log("f do something!");
        var data = ["苹果", "桃子", "香蕉"];

        /**通知所有观察者*/
        this.notifyObservers(data);
        console.log("f do something two!");
    };

    this.addObserver = function (observer) {
        observers.push(observer);
    };

    this.callback = function () {
        console.log("f callback invoke!");
    };

    this.notifyObservers = function (arg) {
        if (observers.length === 0) {
            return false;
        }
        for (var i = 0, len = observers.length; i < len; i++) {
            observers[i].update(this, arg);
        }
    };
};

/**主函数*/
function main () {
    var f = new F();
    var f1 = new F1();
    var f2 = new F2();
    /**加入观察者*/
    f.addObserver(f1);
    f.addObserver(f2);

    f.abc();
}

/**运行主函数*/
main();
