app.service('Myservices', function ($http) {
    this.GetEmployees = function () {
        var response = $http.get('getEmployees');
        return response;
    }

})