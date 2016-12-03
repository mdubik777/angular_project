angular.module('organizationRecord').controller('OrganizationCtrl',[ '$http', 'employeesData', 'organizationData', OrganizationCtrl]);

function OrganizationCtrl($http, employeesData, organizationData) {

    this.organization = organizationData.get();

    this.employees = employeesData.get();

    this.orgToEdit = null;

    this.edit = function() {
        this.orgToEdit = $.extend({}, this.organization);
    };

    this.cancel = function() {
        this.orgToEdit = null;
    };

    this.save = function() {
        angular.extend(this.organization, this.orgToEdit);
        localStorage.setItem("organization",JSON.stringify(this.organization));
        this.orgToEdit = null;
    };

    this.quantity = this.employees.length;

    this.setHRManager = function() {
        var managerHR = this.employees.filter(function(employee) {
            return employee.pos == 'Начальник отдела кадров';
        });
        if (managerHR.length) {
            return managerHR[0].surname +' '+ managerHR[0].empName +  ' ' + managerHR[0].fName;
        } else {
            return 'не назначен'
        }

        };
    this.hrManager = this.setHRManager();

    this.setDirector = function() {
        var resultDirector = this.employees.filter(function(employee) {
            return employee.pos == 'Директор';
        });
        if (resultDirector.length) {
            return resultDirector[0].surname +' '+ resultDirector[0].empName +  ' ' + resultDirector[0].fName;
        } else {
            return 'не назначен'
        }

        };
    this.director =  this.setDirector();

}