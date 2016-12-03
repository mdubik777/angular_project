angular.module('employeesRecord').controller('EmployeesCtrl',  ['$scope', '$http', '$timeout', '$interval', '$filter', 'employeesData', EmployeesCtrl ]);

function EmployeesCtrl ($scope, $http, $timeout, $interval, $filter, employeesData) {

    var self = this;
    this.employees = employeesData.get();

    this.filteredEmployees = this.employees;


    this.uploadFile = function(){

        self.filename = event.target.files[0].name;
        self.activeEmployee.empPhoto = 'images/' + self.filename;

    };

    this.deletePhoto = function() {
        self.activeEmployee.empPhoto = null;
    };


    /*----------------------------
                Datepicker
     --------------------------- */

    this.pickerOptions = {
        format: 'DD-MM-YYYY',
        locale: 'ru',
        debug: true
    };

    this.onConvertDate = function(_date) {
        return moment(_date);
    };


    /*--------------------------------
            radioButtons
    ------------------------------- */

    this.options = [
        {gender: 'man', name:'мужской'},
        {gender: 'woman', name: 'женский'}];

    this.checked =  this.options[0].name;

    /*----------------------
            Select
     -------------------- */

    this.divisionsArray = [
        {id: 1, name: 'Отдел кадров'},
        {id: 2, name: 'Бухгалтерия'},
        {id: 3, name: 'Маркетинговый отдел'},
        {id: 4, name: 'Экономический отдел'},
        {id: 5, name: 'Коммерческий отдел'},
        {id: 6, name: 'Аппарат управления'},
        {id: 7, name: 'Торговый зал'}

    ];

    this.stateArray = [
            {id: 1, name: 'замужем'},
            {id: 2, name: 'не замужем'},
            {id: 3, name: 'женат'},
            {id: 4, name: 'не женат'},
            {id: 5, name: 'разведен'},
            {id: 6, name: 'разведена'},
            {id: 7, name: 'вдовец'},
            {id: 8, name: 'вдова'}
        ];

    this.characterArray = [
            {id: 1, name: 'основная'},
            {id: 2, name: 'по совместительству'}

        ];

    this.typeArray = [
            {id: 1, name: 'постоянная'},
            {id: 2, name: 'временная'},
            {id: 3, name: 'сезонная'}

        ];

    /*--------------------------------------
     *         EMPLOYEES FILTERING
     * -----------------------------------*/

    this.filterParams = {
        nameSearch: '',
        order: '',
        invalid: false,
        pensioner: false
    };

    var _this = this;
    this.updateFilter = function(){
        var filtered;
        filtered = $filter('filter')(this.employees, {surname: this.filterParams.nameSearch} );
        filtered = $filter('orderBy')(filtered, this.filterParams.order);
        // показываем только инвалидов, если выбран чекбокс, иначе показываем всех: инвалидов и неинвалидов
        if(this.filterParams.invalid) {
            filtered = $filter('filter')(filtered, {inv: this.filterParams.invalid});
        }
        // показываем только пенсионеров, если выбран чекбокс, иначе показываем всех: пенсионеров и непенсионеров
        if(this.filterParams.pensioner) {
            filtered = $filter('filter')(filtered, {pens: this.filterParams.pensioner});
        }
        _this.filteredEmployees = filtered;
    };

    $scope.$watchCollection('Ctrl.filterParams', function(newNames, oldNames) {
        _this.updateFilter();
    });
    this.updateFilter();

    this.onResetFilterParams = function() {
        this.filterParams = {
            nameSearch: '',
            order: '',
            invalid: false,
            pensioner: false
        };
    };

    this.onToggleFilter = function() {
        if(this.switched == false) {
            this.onResetFilterParams();

        }
    };

    this.onResetFilterSettingsParams = function() {
        this.ifIdNum = false;
        this.ifNumInshum = false;
        this.ifInv = false;
        this.ifSurname = true;
        this.ifEmpName = true;
        this.ifFName = true;
        this.ifTabNum = true;
        this.ifNumInsh = false;
        this.ifEmpCharacter = false;
        this.ifEmpType = false;
        this.ifPosition = true;
        this.ifStatus = false;
        this.ifSalary = false;
        this.ifDepartment = true;
        this.ifPens = false;
    };

    this.ifSurname = true;
    this.ifEmpName = true;
    this.ifFName = true;
    this.ifTabNum = true;
    this.ifPosition = true;
    this.ifDepartment = true;

    this.onToggleFilterSettings = function() {
        if(this.switchedSettings == false) {
            this.onResetFilterSettingsParams();
        }
    };

    this.resetForm = function() {
        this.addUserForm.$setPristine();
    };

}


    EmployeesCtrl.prototype = {
        add: function(){
            this.selectedDivision = null;
            this.selectedCase = null;
            this.checked =  this.options[0].name;
            this.selectedCharacter = null;
            this.selectedType = null;
            this.employeeToShow = null;

            this.activeEmployee =  {$index: this.employees.length};
            if(this.checkedCheckbox) {
                this.checkedCheckbox = !this.checkedCheckbox;
            }
            if(this.checkedOk) {
                this.checkedOk= !this.checkedOk;
            }
            this.switched = false;
            this.onResetFilterParams();
            this.switchedSettings = false;
            this.onResetFilterSettingsParams();
            this.resetForm();
            this.condition = true;

    },

    remove: function(person) {

        var index = this.employees.indexOf(person);
        this.employees.splice(index, 1);

        this.filteredEmployees = this.employees;
        localStorage.clear();
        localStorage.setItem('employees', JSON.stringify(this.employees));

    },

    createEmployee: function() {

        var index = this.activeEmployee.$index;
        this.newPerson = {
            $index: index,
            empPhoto: null,
            id: null,
            empName: null,
            fName: null,
            tabNum: null,
            idNum: null,
            numInsh: null,
            character: null,
            type: null,
            strDiv: null,
            gender: null,
            birthPlace: null,
            birthday: null,
            educ: null,
            pos: null,
            prof: null,
            salary: null,
            experience: null,
            address: null,
            tel: null,
            email: null,
            numCont: null,
            contDate: null,
            state: null,
            inv: null,
            invDoc: null,
            pens: null,
            pensDoc: null
        };
        this.newPerson.id =  this.activeEmployee.id ? this.activeEmployee.id :  str_rand();

        function str_rand() {
            var result       = '';
            var words        = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
            var max_position = words.length - 1;
            for(var i = 0; i < 5; ++i ) {
                var position = Math.floor ( Math.random() * max_position );
                result = result + words.substring(position, position + 1);
            }
            return result;
        }
        this.newPerson.empName =  (this.activeEmployee.empName) ? this.activeEmployee.empName  : null;
        this.newPerson.empPhoto =  (this.filename) ?  'images/' +  this.filename  : null;
        this.newPerson.surname =  (this.activeEmployee.surname) ?  this.activeEmployee.surname  : null;
        this.newPerson.fName =  (this.activeEmployee.fName) ?  this.activeEmployee.fName  : null;
        this.newPerson.tabNum =  (this.activeEmployee.tabNum) ? this.activeEmployee.tabNum  : null;
        this.newPerson.idNum =  (this.activeEmployee.idNum) ? this.activeEmployee.idNum  : null;
        this.newPerson.birthPlace =  (this.activeEmployee.birthPlace) ?  this.activeEmployee.birthPlace  : null;
        this.newPerson.birthday =  (this.activeEmployee.displayBirthday) ? moment(this.activeEmployee.displayBirthday).valueOf()  : null;
        this.newPerson.contDate =  (this.activeEmployee.displayDateContract) ? moment(this.activeEmployee.displayDateContract).valueOf()  : null;
        this.newPerson.numInsh =  (this.activeEmployee.numInsh) ?  this.activeEmployee.numInsh  : null;
        this.newPerson.numCont =  (this.activeEmployee.numCont) ? this.activeEmployee.numCont  : null;
        this.newPerson.educ =  (this.activeEmployee.educ) ? this.activeEmployee.educ  : null;
        this.newPerson.pos =  (this.activeEmployee.pos) ?  this.activeEmployee.pos  : null;
        this.newPerson.prof =  (this.activeEmployee.prof) ?  this.activeEmployee.prof  : null;
        this.newPerson.salary =  (this.activeEmployee.salary) ?  this.activeEmployee.salary  : null;
        this.newPerson.experience =  (this.activeEmployee.experience) ? this.activeEmployee.experience  : null;
        this.newPerson.address =  (this.activeEmployee.address) ?  this.activeEmployee.address  : null;
        this.newPerson.tel =  (this.activeEmployee.tel) ?  this.activeEmployee.tel  : null;
        this.newPerson.email =  (this.activeEmployee.email) ?  this.activeEmployee.email  : null;
        this.newPerson.invDoc =  (this.activeEmployee.invDoc) ?  this.activeEmployee.invDoc  : null;
        this.newPerson.pensDoc =  (this.activeEmployee.pensDoc) ?  this.activeEmployee.pensDoc  : null;

        if(this.selectedDivision && this.selectedDivision.value && this.selectedDivision.value.name) {
            this.newPerson.strDiv = this.selectedDivision.value.name;
        }

        if(this.checked) {
            this.newPerson.gender = this.checked;
        }

        if(this.selectedCharacter && this.selectedCharacter.value && this.selectedCharacter.value.name) {
            this.newPerson.character = this.selectedCharacter.value.name;
        }

        if(this.selectedType && this.selectedType.value && this.selectedType.value.name) {
            this.newPerson.type = this.selectedType.value.name;
        }

        if(this.selectedCase && this.selectedCase.value && this.selectedCase.value.name) {
            this.newPerson.state = this.selectedCase.value.name;
        }


// checkbox Инвалид

        if(this.checkedCheckbox) {
            this.newPerson.inv = this.checkedCheckbox;
        }

        if(!this.checkedCheckbox) {
            this.newPerson.inv = this.checkedCheckbox;
        }

        if(this.checkedCheckbox == undefined || !this.checkedCheckbox == undefined ) {
            this.newPerson.inv = false;
        }

// checkbox Пенсионер

        if(this.checkedOk) {
            this.newPerson.pens = this.checkedOk;
        }

        if(!this.checkedOk) {
            this.newPerson.pens = this.checkedOk;

        }

        if(this.checkedOk == undefined || !this.checkedOk == undefined ) {
            this.newPerson.pens = false;
        }

        this.switched = false;
        this.onResetFilterParams();

        this.switchedSettings = false;
        this.onResetFilterSettingsParams();

        if (index >= this.employees.length) {     // addition employee
            this.employees.push(this.newPerson);
        } else {
            angular.extend(this.employees[index], this.newPerson);   // edition employee
        }

        this.filteredEmployees = this.employees;
        localStorage.clear();
        localStorage.setItem('employees', JSON.stringify(this.employees));

        // clean photo name after editing or adding employee
        this.filename = null;
    },

    editEmployee:  function(person) {
        this.condition = false;

        var index = this.employees.indexOf(person);
        this.activeEmployee = $.extend({}, this.employees[index], {$index : index});

        var _chosenDivision = this.divisionsArray.find(function(item) {
            return item.name == person.strDiv
        });
        this.selectedDivision = _chosenDivision ? { value: _chosenDivision } : null;

        var _chosenGender = this.options.find(function(option) {
            return option.name == person.gender
        });
        this.checked = _chosenGender.name;

        var _chosenCharacter = this.characterArray.find(function(item){
            return item.name == person.character
        });
        this.selectedCharacter = _chosenCharacter ? {value : _chosenCharacter} : null;

        var _chosenType = this.typeArray.find(function(item){
            return item.name == person.type
        });
        this.selectedType = _chosenType ? {value : _chosenType} : null;

        var _chosenState = this.stateArray.find(function(item){
            return item.name == person.state
        });
        this.selectedCase = _chosenState ? {value : _chosenState} : null;

        if(this.activeEmployee.birthday) {
            this.activeEmployee.displayBirthday = moment(this.activeEmployee.birthday);
        }

        if(this.activeEmployee.contDate) {
            this.activeEmployee.displayDateContract = moment(this.activeEmployee.contDate);
        }

        if (this.activeEmployee.inv == true) {
            this.checkedCheckbox = this.activeEmployee.inv;
        } else if (!person.inv == true) {
            this.checkedCheckbox = this.activeEmployee.inv;
        }

        if (this.activeEmployee.pens == true) {
            this.checkedOk = this.activeEmployee.pens;
        } else {
            this.checkedOk = this.activeEmployee.pens;
        }

        this.employeeToShow = null;
        this.switched = false;
        this.onResetFilterParams();
        this.switchedSettings = false;
        this.onResetFilterSettingsParams();

    },

    showCart: function(person) {
        var index = this.employees.indexOf(person);
        this.employeeToShow =  this.employees[index];
        this.checkedCheckbox =  this.employeeToShow.inv;
        this.checkedOk = this.employeeToShow.pens;
        this.employeeToShow.displayBirthday = moment(this.employeeToShow.birthday).format('DD-MM-YYYY');
        this.employeeToShow.displayDateContract = moment(this.employeeToShow.contDate).format('DD-MM-YYYY');

        this.activeEmployee = null;

       this.switched = false;

       this.onResetFilterParams();
       this.switchedSettings = false;
       this.onResetFilterSettingsParams();
       this.condition = null;
    }
};











