
angular.module('personnelRecord').factory('employeesData',
    function($http) {
        var employees = [];
        return {
            resolver: function(){
                var employeesLS = localStorage.getItem('employees');
                if(employeesLS) {
                    employees = JSON.parse(employeesLS);
                    return employees;

                } else {

                    return $http({
                        method: 'GET',
                        url: 'json/employees.json'
                    })
                        .success(function(data){
                            employees = data;
                            localStorage.setItem('employees', JSON.stringify(employees));
                        })
                        .error(function() {
                            employees = [];
                        });
                }
            },
            get() {
                return employees;
            }
        };
    }
);