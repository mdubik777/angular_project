angular.module('common').filter('capitalize', function(){   //производящая функция
    return function capitalize(value) {
        if (typeof(value) != 'string') return value;
        if (!value) return value;
        return value[0].toUpperCase() + value.substr(1);
    }
});