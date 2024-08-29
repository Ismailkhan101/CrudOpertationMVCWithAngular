app.controller('Mycontroller', function ($scope, Myservices) {
    GetAll();
    function GetAll() {
        Myservices.GetEmployees().then(function (result) {
            $scope.GetEmployees = result.data;
        })
    }

    // Add a new employee
    $scope.AddEmployee = function () {
        var newEmployee = {
            EmployeeID: $scope.EmployeeID,
            Name: $scope.Name,
            Position: $scope.Position,
            Salary: $scope.Salary
        };

        Myservices.AddEmployee(newEmployee).then(function (result) {
            // Refresh the employee list after adding
            GetAll();
            // Clear input fields
            $scope.EmployeeID = '';
            $scope.Name = '';
            $scope.Position = '';
            $scope.Salary = '';
        });
    };
})