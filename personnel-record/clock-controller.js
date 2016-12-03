angular.module('clockRecord',[]).controller('ClockCtrl',['$interval', ClockCtrl]);

function ClockCtrl($interval) {
    moment.locale('ru');
    var self = this;

    $interval(function(){self.updateTime()}, 1000);
    this.updateTime = function() {
        var currentDate = moment();
        self.currentTimeNow = currentDate.format('HH:mm:ss');
        self.day = currentDate.format('dddd');
        self.month = currentDate.format('MMMM');
        self.year = currentDate.format('YYYY');
        self.numberDay = currentDate.format('DD');
    }
}