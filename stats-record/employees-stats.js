angular.module('personnelRecord').factory('employeesStats',
    function($http) {
        return {
            quantityEmployees: function() {
                var self = this;
                var employeesData = localStorage.getItem('employees');

                function loadEmployeesData() {
                    $http({
                        method: 'GET',
                        url: '/json/employees.json'
                    }).then(function (response) {
                        var employees = response.data;
                        localStorage.setItem("employees", JSON.stringify(response.data));
                        return employees.length;
                    });
                }

                if(employeesData) {
                    var employees = JSON.parse(employeesData);
                    return employees.length;
                } else {
                    loadEmployeesData();
                }
            },

            quantityEmployeesPercent: function() {
                    var empLength = JSON.parse(localStorage.getItem("employees")).length;
                        return empLength/empLength * 100 + '%';
                    },

            quantityDivisions: function (item){
                    var quantity =  JSON.parse(localStorage.getItem("employees"));
                    var lengthEmp = quantity.length;
                    var arrayStrDiv = quantity.map(function(el){
                        return el.strDiv;
                    });
                    var arrayEmp = arrayStrDiv.filter(function(el){
                        return el == item;
                    });
                    return arrayEmp.length;
                    },

            quantityDivisionsPercent: function(item) {
                    var quantity =  JSON.parse(localStorage.getItem("employees"));
                    var lengthEmp = quantity.length;
                    var arrayStrDiv = quantity.map(function(el){
                        return el.strDiv;
                    });
                    var arrayEmp = arrayStrDiv.filter(function(el){
                        return el == item;
                    });

                    return (arrayEmp.length/lengthEmp * 100).toFixed(2) + '%'
                },

            countMinSalary: function() {
                var arrayEmployees = JSON.parse(localStorage.getItem("employees"));
                var arraySalary = arrayEmployees.map(function(el){
                    return +el.salary;
                });
               return arraySalary.reduce(function(min,el) {

                    return Math.min.apply(Math, arraySalary);
                }, Infinity);

            },
            countMaxSalary: function() {
                var arrayEmployees = JSON.parse(localStorage.getItem("employees"));
                var arraySalary = arrayEmployees.map(function(el){
                    return +el.salary;
                });
                return arraySalary.reduce(function(max,el) {
                    return Math.max.apply(Math, arraySalary);
                }, Infinity);

            },

            countAvgSalary: function() {
                var arrayEmployees = JSON.parse(localStorage.getItem("employees"));
                var arraySalary = arrayEmployees.map(function(el){
                    return +el.salary;
                });
                var totalSum = arraySalary.reduce(function(a, b){
                    return a + b;
                });
                var avgSum = totalSum / arraySalary.length;
                return avgSum.toFixed(2);
            },

            countWageCosts: function() {
                var arrayEmployees = JSON.parse(localStorage.getItem("employees"));
                var arraySalary = arrayEmployees.map(function(el){
                    return +el.salary;
                });
                return arraySalary.reduce(function(a, b){
                    return a + b;
                });

            },
            quantityByGender: function(gender) {
                var arrayEmployees = JSON.parse(localStorage.getItem("employees"));
                var arraySalary = arrayEmployees.map(function(el){
                    return el.gender;
                });
                var filtered = arraySalary.filter(function(el) {
                    return el == gender;
                });
                return filtered.length;
            }






        }

    }

);



