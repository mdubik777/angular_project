angular.module('personnelRecord').factory('organizationData',
    function($http){
        var organization = [];
        return {
            resolver: function(){
                var organizationLS = localStorage.getItem('organization');
                if(organizationLS) {
                    organization = JSON.parse(organizationLS);
                    return organization;

                } else {

                    return $http({
                        method: 'GET',
                        url: '/json/organization.json'
                    })
                        .success(function(data){
                            organization = data;
                            localStorage.setItem('organization', JSON.stringify(organization));
                        })
                        .error(function() {
                            organization = [];
                        });
                }
            },
            get() {
                return organization;
            }
        }
});