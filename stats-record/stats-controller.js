angular.module('statsRecord') .config(['ChartJsProvider', function (ChartJsProvider) {
        // Configure all charts
        ChartJsProvider.setOptions({
            chartColors: [ '#FDB45C',  '#45ce95','#803690', '#00ADF9', '#DCDCDC', '#46BFBD',  '#f169a5'],
            responsive: true
        });
        // Configure all line charts
        ChartJsProvider.setOptions('pie', {
            showLines: false
        });
    }])

    .controller('Stats',['employeesData', '$scope', Stats]);

    function Stats(employeesData, $scope) {

        this.employees = employeesData.get();
        this.quantity =  this.employees.length;

        this.divisionsArray = [
            {id: 1, name: 'Отдел кадров'},
            {id: 2, name: 'Бухгалтерия'},
            {id: 3, name: 'Маркетинговый отдел'},
            {id: 4, name: 'Экономический отдел'},
            {id: 5, name: 'Коммерческий отдел'},
            {id: 6, name: 'Аппарат управления'},
            {id: 7, name: 'Торговый зал'}
        ];
        this.quantityByDivision = function(item) {
            var resultEmployees = this.employees.filter(function(employee) {
                return employee.strDiv == item.name;
            });
            if (resultEmployees.length) {
                item.size = resultEmployees.length;
                item.percent = +(resultEmployees.length / this.employees.length * 100).toFixed(2);

            } else {
                item.size = 0;
                item.percent = 0;

            }
            return  item.percent;

        };

        this.options = [
            {id: 1, gender: 'man', name:'мужской', value: "мужчин"},
            {id: 2, gender: 'woman', name: 'женский', value: "женщин"}
        ];
        this.quantityByGender = function(item) {
            var resultEmployees = this.employees.filter(function(employee) {
                return employee.gender == item.name;
            });
            if (resultEmployees.length) {
                item.size = resultEmployees.length;
                item.percent = +(resultEmployees.length / this.employees.length * 100).toFixed(2);
            } else {
                item.size = 0;
                item.percent = 0;
            }
            return  item.percent
        };

        this.pensObj =
            {id: 1, name: 'пенсионеры'};

        this.getQuantityPens = function() {
            var resultEpmPens = this.employees.filter(function(employee) {
                    return employee.pens == true;
                });
            return resultEpmPens.length;


        };
        this.getQuantityPensPercent = function() {
            var resultEpmPens = this.employees.filter(function(employee) {
                return employee.pens == true;
            });
            if (resultEpmPens.length) {
                return  +(resultEpmPens.length / this.employees.length * 100).toFixed(2);
            } else {
                return 0
            }

        };

        this.invObj =
        {id: 1, name: 'инвалиды'};

        this.getQuantityInv = function() {
            var resultEpmInv = this.employees.filter(function(employee) {
                return employee.pens == true;
            });
            return resultEpmInv.length;

        };
        this.getQuantityInvPercent = function() {
            var resultEpmInv = this.employees.filter(function(employee) {
                return employee.pens == true;
            });
            if (resultEpmInv.length) {
                return  +(resultEpmInv.length / this.employees.length * 100).toFixed(2);
            } else {
                return 0
            }

        };

        this.characterArray = [
            {id: 1, name: 'основная',value: "на основной работе"},
            {id: 2, name: 'по совместительству', value: 'по совместительству'}

        ];
        this.quantityByCharacter = function(item) {
            var resultEpmByCharacter = this.employees.filter(function(employee) {
                return employee.character == item.name;
            });
            if (resultEpmByCharacter.length) {
               item.size = resultEpmByCharacter.length;
               item.percent = +(resultEpmByCharacter.length / this.employees.length * 100).toFixed(2);
            } else {
                item.size = 0;
                item.percent = 0;

            }
            return item.percent;



        };

        this.typeArray = [
            {id: 1, name: 'постоянная', value: 'на постоянной работе'},
            {id: 2, name: 'временная', value: 'на временной работе'},
            {id: 3, name: 'сезонная', value: 'на сезонной работе'}

        ];

        this.quantityByType = function(item) {
            var resultEpmByType = this.employees.filter(function(employee) {
                    return employee.type == item.name;
            });
            if (resultEpmByType.length) {
                item.size = resultEpmByType.length;
                item.percent = +(resultEpmByType.length / this.employees.length * 100).toFixed(2);
            } else {
                item.size = 0;
                item.percent = 0;
            }
            return item.percent;
        };

        this.salaryArray = [
            {id: 1,
                name: 'максимальная ',
                countSalary: function() {
                    var arraySalary = employeesData.get().map(function(el){
                        return +el.salary;
                    });
                    if(arraySalary.length) {

                    return arraySalary.reduce(function(max,el) {

                        return Math.max.apply(Math, arraySalary);
                    }, Infinity);
                    } else {
                        return 0
                    }
                }
            },
            {id: 2, name: 'минимальная',
                countSalary: function() {
                    var arraySalary = employeesData.get().map(function(el){
                        return +el.salary;
                    });
                    if(arraySalary.length) {
                    return arraySalary.reduce(function(min,el) {

                        return Math.min.apply(Math, arraySalary);
                    }, Infinity);
                    } else {
                        return 0
                    }
                }},
            {id: 3, name: 'средняя',
                countSalary: function() {

                        var arraySalary = employeesData.get().map(function(el){
                            return +el.salary;

                        });
                    if(arraySalary.length) {
                        var totalSum = arraySalary.reduce(function(a, b){
                            return a + b;
                        });
                        var avgSum = totalSum / arraySalary.length;
                        return +avgSum.toFixed(2);
                    } else {
                        return 0
                    }

                }

            }
        ];



        this.countSalary = function(item) {
            var index = this.salaryArray.indexOf(item);
            item.size = this.salaryArray[index].countSalary();
            return this.salaryArray[index].countSalary()
        };

        this.wageObj = [
            {id: 1, value: 'за месяц'},
            {id: 1, value: 'за год'}
        ];

        this.countWageCosts = function(){
            var arraySalary = employeesData.get().map(function(el){
                return +el.salary;
        });
            if(arraySalary.length) {
                return arraySalary.reduce(function(a, b){
                    return a + b;
                });
            } else {
                return 0
            }
        };
        this.countWageCostsYear = function(){
            var arraySalary = employeesData.get().map(function(el){
                return +el.salary;
            });
            if(arraySalary.length) {
                var salary = arraySalary.reduce(function(a, b){
                    return a + b;
                });
                return salary * 12;
            } else {
                return 0
            }

        };





 //                 Departments

        this.labelsDepartments = [this.divisionsArray[0].name ,
                                this.divisionsArray[1].name ,
                                this.divisionsArray[2].name ,
                                this.divisionsArray[3].name ,
                                this.divisionsArray[4].name ,
                                this.divisionsArray[5].name ,
                                this.divisionsArray[6].name ];

        this.dataDepartments = [this.quantityByDivision(this.divisionsArray[0]),
                                this.quantityByDivision(this.divisionsArray[1]),
                                this.quantityByDivision(this.divisionsArray[2]),
                                this.quantityByDivision(this.divisionsArray[3]),
                                this.quantityByDivision(this.divisionsArray[4]),
                                this.quantityByDivision(this.divisionsArray[5]),
                                this.quantityByDivision(this.divisionsArray[6])];

        this.optionsDepartments = {
            legend: {display: true}
        };

        this.optionsDepartments = {
            legend: {display: true}
        };

//        //            Gender

        this.labelsGender = [this.options[0].value ,this.options[1].value ];
        this.dataGender = [ this.quantityByGender(this.options[0]),
                            this.quantityByGender(this.options[1])];

        this.optionsGender = {
            legend: {display: true}
        };

        //           Pensioners Invalids

        this.labelsPensionersInvalids = [this.pensObj.name ,this.invObj.name, 'остальные сотрудники' ];
        this.restEmployees = function() {
           var _employees = this.getQuantityPens(this.pensObj.id) +  this.getQuantityInv(this.invObj.id);
            return (100-(_employees /  this.quantity) * 100).toFixed(2);
        };

        this.dataPensionersInvalids = [this.getQuantityPensPercent(this.pensObj.id),
            this.getQuantityInvPercent(this.invObj.id),  this.restEmployees()];

        this.optionsPensionersInvalids = {
            legend: {display: true}
        };

        //          Character

        this.labelsCharacter = [this.characterArray[0].value , this.characterArray[1].value ];


        this.dataCharacter = [this.quantityByCharacter(this.characterArray[0]),
                             this.quantityByCharacter(this.characterArray[1])];

        this.optionsCharacter = {
            legend: {display: true}
        };

     //          Type

        this.labelsType = [this.typeArray[0].value , this.typeArray[1].value, this.typeArray[2].value ];


        this.dataType = [this.quantityByType(this.typeArray[0]),
                        this.quantityByType(this.typeArray[1]),
                        this.quantityByType(this.typeArray[2])];

        this.optionsType = {
            legend: {display: true}
        };

       //         wage


        this.labelsWage = ['заработная плата'];
        this.seriesWage = [this.salaryArray[0].name, this.salaryArray[1].name, this.salaryArray[2].name];

        this.dataWage = [
            [this.countSalary(this.salaryArray[0])],
            [ this.countSalary(this.salaryArray[1])],
            [ this.countSalary(this.salaryArray[2])]
        ];
        this.optionsWage = {
            legend: {display: true}
        };

        //         avgWage


        this.labelsAvgWage = ['заработная плата'];
        this.seriesAvgWage = [this.wageObj[0].value, this.wageObj[1].value];

        this.dataAvgWage = [
            [this.countWageCosts()],
            [ this.countWageCostsYear()]
        ];
        this.optionsAvgWage = {
            legend: {display: true}
        };


    }