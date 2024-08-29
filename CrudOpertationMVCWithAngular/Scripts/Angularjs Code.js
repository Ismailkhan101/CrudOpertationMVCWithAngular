var app = angular.module("myApp", []);
app.controller("myCtrl", function ($scope, $http) {
    debugger;
    $scope.InsertData = function () {
        var Action = document.getElementById("btnSave").getAttribute("value");
        if (Action == "Submit") {
            $scope.Employe = {};
            $scope.Employe.Name = $scope.Name ;
            $scope.Employe.Position = $scope.Position;
            $scope.Employe.Salary = $scope.Salary;
            debugger;
            $http({
                method: "post",
                url: "/Em/Insert_Employee",
                datatype: "json",
                data: JSON.stringify($scope.Employe)
            }).then(function (response) {
                alert(response.data);
                $scope.GetAllData();
                $scope.Name = "";
                $scope.Position = "";
                $scope.Salary = "";
                debugger;
            })
        } else {
            $scope.Employe = {};
            $scope.Employe.Name = $scope.Name;
            $scope.Employe.Position = $scope.Position;
            $scope.Employe.Salary = $scope.Salary;
            $scope.Employe.EmployeeID = document.getElementById("employee").value;
            debugger;
            $http({

                
                method: "post",
                url: "/Em/Update_Employee",
                datatype: "json",
                data: JSON.stringify($scope.Employe)
            }).then(function (response) {
                alert(response.data);
                debugger;
                $scope.GetAllData();
                $scope.Name = "";
                $scope.Position = "";
                $scope.Salary= "";
                document.getElementById("btnSave").setAttribute("value", "Submit");
                document.getElementById("btnSave").style.backgroundColor = "cornflowerblue";
                document.getElementById("spn").innerHTML = "Add New Employee";
            })
        }
    }
    $scope.GetAllData = function () {
        $http({

            method: "get",
            url: "/Em/Get_AllEmployee"
        }).then(function (response) {
            $scope.employees = response.data;
            console.log(response.data);
            debugger;
        }, function () {
            alert("Error Occur");
        })
    };
    $scope.DeleteEmp = function (Emp) {
        $http({
            method: "post",
            url: "/Em/Delete_Employee",
            datatype: "json",
            data: JSON.stringify(Emp)
        }).then(function (response) {
            alert(response.data);
            $scope.GetAllData();
        })
    };
    $scope.UpdateEmp = function (Emp) {
        debugger;
        document.getElementById("employee").value = Emp.EmployeeID;
        $scope.Name = Emp.Name;
        $scope.Position = Emp.Position;
        $scope.Salary = Emp.Salary;
        document.getElementById("btnSave").setAttribute("value", "Update");
        document.getElementById("btnSave").style.backgroundColor = "Yellow";
        document.getElementById("spn").innerHTML = "Update Employee Information";
    }
})