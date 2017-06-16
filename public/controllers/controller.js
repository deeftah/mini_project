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

	$scope.addDocument = function(){
         
        if($scope.document.name == null || $scope.document.description == null ||  $scope.document.quantity == null ||  $scope.document.type == null ||  $scope.document.status == null )
    	{
    		$scope.isShowError = true;     
    	}    
        else
        {
        	$scope.isShowSuccess = true;
        	$scope.document.total = $scope.document.price * $scope.document.quantity;
	        addService.addDocument($http, $scope.document);
	        refresh();
	    }	  
    };
	
	$scope.deleteDocument = function($id){
        deleteService.deleteDocument($http,$id).then(function(response) {
        	console.log(response);
        	refresh();  
        });
    };
	
    $scope.refresh = function(){
        refresh();  
    };
});


app.controller('documentController', function($scope, $stateParams, $http, searchService, comptuationService, updateService)
{
	$scope.document = {};

    var refresh = function(){
    	searchService.searchDocumentById($http, $stateParams.documentId).then(function(documentI) {
	    $scope.document = documentI;
	    $scope.date = comptuationService.getCurrentDate();
	    });
	    $scope.tax = 0;
	    $scope.totalToPay = 0;
	};
	
	refresh();
	
	$scope.updateStatus = function($id,$type,$signature){
    	var signature = comptuationService.signatureNormalize($signature,"*");
    };
});	