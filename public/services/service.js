app.factory('searchService', function($q){
	var searchService =
	{
        searchAllDocument : function($http)
		{
			$http.get('/index').then(successCallback, errorCallback);
			
			var listDocumentI = [];
			function successCallback(response){
				response.data.forEach(function(obj) {
					var object = new documentI(); 
					object.setId(obj._id);
					object.setName(obj.name);
					object.setDescription(obj.description);
					object.setQuantity(obj.quantity);
					object.setPrice(obj.price);
					object.setTotal(obj.total);
					object.setType(obj.type);
					object.setStatus(obj.status);
					object.setSignature(obj.signature);
					listDocumentI.push(object);
				});
			}
			function errorCallback(error){
				console.log("error");
			}
			return listDocumentI;
		}  	
	};
	return searchService;
});

app.factory('addService', function(){
	var addService =
	{
          	
	};
	return addService;
});

app.factory('deleteService', function($q){
	var deleteService =
	{
          
	};
	return deleteService;
});


app.factory('updateService', function($q){
	var updateService =
	{
          	
	};
	return updateService;
});

app.factory('comptuationService', function(){
	var comptuationService =
	{
          	
	};
	return comptuationService;
});
