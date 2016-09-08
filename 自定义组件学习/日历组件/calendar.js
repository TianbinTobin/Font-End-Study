/**
 * 文件名：calendar
 * 版权：Copyright 2002-2007 SDZN. All Rights Reserved.
 * 描述： 辅助线web端任教信息-handler
 * 修改人： tianbin
 * 修改时间：
 * 修改内容：新增
 */

$(document).ready(function () {
    new Calendar($("#calendar"));
});

var Calendar = function (view) {
    this.view = view;
    this.calendarStatus = null;

    this.date = new Date().getDate();
    this.year = new Date().getFullYear();
    this.month = new Date().getMonth() + 1;

    this.init();
    this.calendarPopup.append(this.calendarView);
};

Calendar.noDayTemplate = '<span class="calendar-day-item"></span>';
Calendar.dayTemplate = '<button class="calendar-day-value calendar-day-item"></button>';

Calendar.prototype.init = function () {

    this.calendarLabel = this.view.find("[sid=calendar-label]");
    this.calendarPopup = this.view.find("[sid=calendar-popup]");
    this.calendarView = $($("#calendar-template").html());
    this.calendarDay = this.calendarView.find("[sid=calendar-main]");
    this.previousView = this.calendarView.find("[sid=previous]");
    this.nowView = this.calendarView.find("[sid=now]");
    this.nextView = this.calendarView.find("[sid=next]");

    this.calendarLabel.on("click", this, this.labelClick);
    this.previousView.on("click", this, this.previousClick);
    this.nextView.on("click", this, this.nextClick);
    this.nowView.on("click", this, this.nowClick);

    this.calendarHide();
    this.loadDay();
};

Calendar.prototype.labelClick = function (e) {
    var self = e.data;

    if (self.calendarStatus) {
        self.calendarHide();
    } else {
        self.calendarShow();
    }
};

Calendar.prototype.nowClick = function (e) {
    var self = e.data;

    self.date = new Date().getDate();
    self.year = new Date().getFullYear();
    self.month = new Date().getMonth() + 1;

    self.loadDay();
};

Calendar.prototype.previousClick = function (e) {
    var self = e.data;
    if (self.month > 1) {
        self.month--;
    } else {
        self.month = 12;
        self.year--;
    }

    self.loadDay();
};

Calendar.prototype.nextClick = function (e) {
    var self = e.data;
    if (self.month < 12) {
        self.month++;
    } else {
        self.month = 1;
        self.year++;
    }

    self.loadDay();
};

Calendar.prototype.calendarHide = function () {
    this.calendarView.hide();
    this.calendarStatus = false;
};

Calendar.prototype.calendarShow = function () {
    this.calendarView.show();
    this.calendarStatus = true;
    var self = this, fnClose;

    setTimeout(function () {

        $(document).on("click", fnClose = function (e) {
            if (!$(e.target).hasClass("btn")) {
                if (self.calendarStatus) {

                    self.calendarHide();
                }
                $(document).off("click", fnClose);
            }

        });
    }, 20);
};

Calendar.prototype.loadDay = function () {
    this.calendarDay.empty();
    if ((this.year % 4 == 0) && (this.year % 100 != 0 || this.year % 400 == 0)) {
        this.day = {1: 31, 2: 29, 3: 31, 4: 30, 5: 31, 6: 30, 7: 31, 8: 31, 9: 30, 10: 31, 11: 30, 12: 31};
    } else {
        this.day = {1: 31, 2: 28, 3: 31, 4: 30, 5: 31, 6: 30, 7: 31, 8: 31, 9: 30, 10: 31, 11: 30, 12: 31};
    }
    this.weeks = {0: "Sun", 1: "Mon", 2: "Tue", 3: "Wed", 4: "Thu", 5: "Fri", 6: "Sat"};
    this.firstWeek = (new Date(this.year + "-" + (this.month) + "-" + 1)).getDay();
    var dayHtml = "";
    for (var i = 0; i < this.firstWeek; i++) {
        dayHtml += Calendar.noDayTemplate;
    }
    this.calendarDay.append(dayHtml);
    this.calendarDayItem = new Array(this.day[this.month]);
    var itemView = new Array(this.day[this.month]);
    for (var j = 0; j < this.day[this.month]; j++) {
        this.calendarDayItem[j] = new CalendarDay(this.year, this.month, j + 1, (new Date(this.year + "-" + (this.month) + "-" + (j + 1))).getDay());
        this.calendarDayItem[j].addListener(this, this.display);
        itemView.push(this.calendarDayItem[j].getView());
    }
    this.calendarDay.append(itemView);
    this.week = (new Date(this.year + "-" + (this.month) + "-" + this.date)).getDay();
    this.display(this.year, this.month, this.date, this.week);
};

Calendar.prototype.display = function (year, month, day, week) {
    if (month < 10) {
        month = "0" + month;
    }
    if (day < 10) {
        day = "0" + day;
    }
    this.nowView.text(year + "-" + month + "-" + day + "-" + this.weeks[week]);
    this.calendarLabel.val(year + "-" + month + "-" + day + "-" + this.weeks[week]);
};

var CalendarDay = function (year, month, day, week) {
    this.view = $('<button class="calendar-day-value calendar-day-item"></button>');
    this.year = year;
    this.month = month;
    this.day = day;
    this.week = week;

    this.listener = null;
    this.listenerFun = null;

    this.init();
};

CalendarDay.prototype.init = function () {
    this.view.text(this.day);

    this.view.on("click", this, this.viewClick);
};

CalendarDay.prototype.viewClick = function (e) {
    var self = e.data;

    if (self.listener) {
        self.listenerFun.call(self.listener, self.year, self.month, self.day, self.week);
    }
};

CalendarDay.prototype.getView = function () {

    return this.view;
};

CalendarDay.prototype.addListener = function (listener, listenerFun) {
    this.listener = listener;
    this.listenerFun = listenerFun;
};