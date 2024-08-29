var app = angular.module("myApp", []);

app.controller("myCtrl", function ($scope, $http, $window) {
    // Function to initialize the model with data from the server
    $scope.initialize = function (data) {
        $scope.Name = data.Name;
        $scope.Position = data.Position;
        $scope.Salary = data.Salary;
        $scope.EmployeeID = data.EmployeeID;
    };

    // Function to handle form submission (Insert/Update)
    $scope.InsertData = function () {
        var Action = document.getElementById("btnSave").getAttribute("value");

        if (Action == "Submit") {
            // Insert new employee
            $scope.Employe = {
                Name: $scope.Name,
                Position: $scope.Position,
                Salary: $scope.Salary
            };
            $http.post("/Curdseparatepages/Insert_Employee", JSON.stringify($scope.Employe))
                .then(function (response) {
                    alert(response.data);
                    $scope.GetAllData();
                    // Clear form fields
                    $scope.Name = $scope.Position = $scope.Salary = "";
                }, function (error) {
                    alert("Error: " + error.data);
                });
        } else if (Action == "Update") {
            // Update existing employee
            $scope.Employe = {
                EmployeeID: $scope.EmployeeID,
                Name: $scope.Name,
                Position: $scope.Position,
                Salary: $scope.Salary
            };
            $http.post("/Curdseparatepages/Update_Employee", JSON.stringify($scope.Employe))
                .then(function (response) {
                    alert(response.data);
                    $scope.GetAllData();
                    // Reset form fields and button state
                    $scope.Name = $scope.Position = $scope.Salary = "";
                    document.getElementById("btnSave").setAttribute("value", "Submit");
                    document.getElementById("btnSave").style.backgroundColor = "cornflowerblue";
                    document.getElementById("spn").innerHTML = "Add New Employee";
                }, function (error) {
                    alert("Error: " + error.data);
                });
        }
    };

    // Function to fetch all employee data
    $scope.GetAllData = function () {
        $http.get("/Curdseparatepages/Get_AllEmployee")
            .then(function (response) {
                $scope.employees = response.data;
            }, function () {
                alert("Error Occur");
            });
    };

    // Function to delete an employee
    $scope.DeleteEmp = function (Emp) {
        $http.post("/Curdseparatepages/Delete_Employee", JSON.stringify(Emp))
            .then(function (response) {
                alert(response.data);
                $scope.GetAllData();
            }, function (error) {
                alert("Error: " + error.data);
            });
    };

    // Function to redirect to the update page with EmployeeID
    $scope.UpdateEmp = function (Emp) {
        $window.location.href = "/Curdseparatepages/Update/" + Emp.EmployeeID;
    };

    // Initialize data when the page loads (for list view or update page)
    $scope.GetAllData();
});
