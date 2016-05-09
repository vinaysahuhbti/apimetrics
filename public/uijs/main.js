var app = angular.module('dotmatrix', []);
app.controller('dataCtrl', function($scope, $http) {

    var mockDataForThisTest = [{
        api:"http://localhost:8080/hello",
        type:"GET",
        response:200,
        time:2.34
    },
        {
            api:"http://localhost:8080/sampleapi ",
            type:"GET",
            response:204,
            time:2.34
        }    ];
    $scope.type = ["GET", "POST", "PUT"];
    $scope.refreshrate = 60;
    $scope.data = mockDataForThisTest;
    $scope.getData = function(){
        console.log("getdata called");
        $scope.count = " Fetching data ...";
       $http.post("http://localhost:8080/getResponse/",$scope.data).success(function(data, status){
           $scope.data = data;
       });
        setTimeout($scope.getData, $scope.refreshrate*1000);
    };
    $scope.openModal = function(){
        console.log("came here");
        $('#modifyApi').modal('show');
    };
    $scope.removeApi = function(index){
        $scope.data.splice(index, 1);
    };
    $scope.addApi = function(){
      var obj = {api:"",type:"GET",status:"",time:""};
        $scope.data[$scope.data.length]=obj;
    };
    $scope.getData();
   $scope.getIcon = function(){
       console.log("get icon executed");
   }
});

