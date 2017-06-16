app.controller('mainController', function($scope, $http, searchService)
{

});

app.controller('adminController', function($scope, $http, addService, searchService, deleteService)
{
    $scope.document = {};
	$scope.isShowError = false;
	$scope.isShowSuccess = false;
    $scope.document.price = Math.floor(Math.random() * 1000);
    $scope.document.quantity = 1;

    var refresh = function(){
    	var response = searchService.searchAllDocument($http);
    	$scope.listdata = response;
	};

	refresh();

    $scope.refresh = function(){
        refresh();  
    };
});


app.controller('documentController', function($scope, $stateParams, $http, searchService, comptuationService, updateService)
{

});	