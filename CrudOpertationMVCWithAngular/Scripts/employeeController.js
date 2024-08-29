app.controller('employeeController', function ($scope, $http) {
    $http.get('/Employees/GetEmployees')
        .then(function (response) {
            $scope.employees = response.data;
            console.log(response.data);
        }, function (error) {
            console.log('Error:', error);
        });
});
