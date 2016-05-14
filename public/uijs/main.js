var app = angular.module('dotmatrix', []);
app.controller('dataCtrl', function ($scope, $http) {

    var mockDataForThisTest = [{
        api: "http://localhost:8080/hello",
        type: "GET",
        response: 400,
        time: 2.34,
        mail:"vinaysahuhbti@gmail.com"
    },
        {
            api: "http://localhost:8080/sampleapi ",
            type: "GET",
            response: 504,
            time: 2.34,
            mail:"vinaysahuhbti@gmail.com"
        }];
    $scope.type = ["GET", "POST", "PUT"];
    $scope.refreshrate = 60;
    $scope.data = mockDataForThisTest;
    $scope.getData = function () {
        console.log("getdata called");
        $scope.count = " Fetching data ...";
        $http.post("http://localhost:8080/getResponse/", $scope.data).success(function (data, status) {
            $scope.data = data;
        });
        setTimeout($scope.getData, $scope.refreshrate * 1000);
    };
    $scope.openModal = function () {
        console.log("came here");
        $('#modifyApi').modal('show');
    };
    $scope.removeApi = function (index) {
        $scope.data.splice(index, 1);
    };
    $scope.addApi = function () {
        var obj = {api: "http://", type: "GET", status: "", time: "",mail:"vinaysahuhbti@gmail.com"};
        $scope.data[$scope.data.length] = obj;
    };
    $scope.getData();
    $scope.getIcon = function (code) {
        var opat = /2[0-9]*/;
        var spat = /5[0-9]*/;
        if (opat.test(code)) {
            return "glyphicon glyphicon-thumbs-up";
        } else if (spat.test(code)) {
            return "glyphicon glyphicon-bullhorn";
        } else {
            return "glyphicon glyphicon-thumbs-down";
        }

        console.log("get icon executed");
    }
});

