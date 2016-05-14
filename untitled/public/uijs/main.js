var app = angular.module('dotmatrix', []);
app.controller('dataCtrl', function($scope, $http) {

    var mockDataForThisTest = [{
        "imeiid": "1235",
        "androidid": "androidid",
        "idfaid": "idfaid",
        "advtid": "advtid",
        "mobileno": "mobile",
        "settings": {
            "resolution": {
                "oldvalue": "resold",
                "newvalue": "resnew"
            }}}];
    $scope.count = 0;
    $scope.imeid = "";
    $scope.mailid = "gk.kaushik777@gmail.com";
    $scope.select = "getStats";
    $scope.data;
    $scope.getData = function(){
        $scope.count = " Fetching data ...";
        $http.get("http://192.168.38.134:8080/getAllActivites?emailid="+$scope.mailid+"&imeiid="+$scope.imeid)
            .then(function(response) {
                updateResponse(response.data);
                $scope.data = response.data;
                $scope.count = $scope.data.length;
                setTimeout($scope.getData, 5000);
            });
    };
    var updateResponse = function(data){
        for(var i=0;i<data.length;i++){
            data[i].type = getType(data[i]);
        }
    };
    function getType(d){
        if(d.eventid)
            return "event";
        if(d.statsid)
            return "stats";
        if(d.settingsid)
            return "setting";
    }
    $scope.formatt = function(d){
        //console.log(d);
        d.date = new Date(parseInt(d.timestamp,10)) + "";
        return JSON.stringify(JSON.parse(angular.toJson(d)),null,"   ");
    };

    function compare(a,b) {
        if (a.timestamp < b.timestamp)
            return -1;
        else if (a.timestamp > b.timestamp)
            return 1;
        else
            return 0;
    }

});

