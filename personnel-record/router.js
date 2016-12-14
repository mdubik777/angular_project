angular.module('personnelRecord')
    .config(function($stateProvider, $urlRouterProvider) {


        $stateProvider

            .state('organization-form', {
                url: "organization-record/organization-form",
                templateUrl: "organization-record/organization-form.html",
                controller: "OrganizationCtrl",
                controllerAs: "Ctrl",
                resolve: {
                    init: function(organizationData) {
                        return organizationData.resolver();
                    },
                    initEmployees: function(employeesData) {
                        return employeesData.resolver();
                    }
                }

            })

            .state('employees-form', {
                url: "employees-record/employees-form",
                templateUrl: "employees-record/employees-form.html",
                controller: "EmployeesCtrl",
                controllerAs: "Ctrl",
                resolve: {
                    init: function(employeesData) {
                        return employeesData.resolver();
                    }
                }


            })

            .state('stats-form', {
                url: "stats-record/stats-form",
                templateUrl: "stats-record/stats-form.html",
                controller: "Stats",
                controllerAs: "Stats",
                resolve: {
                    init: function(employeesData) {
                        return employeesData.resolver();
                    }
                }



            });

        $urlRouterProvider.otherwise("organization-record/organization-form");
    });