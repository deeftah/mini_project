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
		},
		searchDocumentById : function($http, $documentId)
		{
			$http.get("/visualisation/"+$documentId).then(successCallback, errorCallback);

			var object = new documentI();
			function successCallback(response){
				object.setId(response.data._id);
				object.setName(response.data.name);
				object.setDescription(response.data.description);
				object.setQuantity(response.data.quantity);
				object.setPrice(response.data.price);
				object.setTotal(response.data.total);
				object.setType(response.data.type);
				object.setStatus(response.data.status);
				object.setSignature(response.data.signature);
			}
			function errorCallback(error){
				console.log("error");
			}
			var deferred = $q.defer();
			deferred.resolve(object);
			return deferred.promise;
		}  	
	};
	return searchService;
});

app.factory('addService', function(){
	var addService =
	{
		addDocument : function($http, $document)
		{
			var bool = 0; 
			$http.post('/admin', $document).then(successCallback, errorCallback);
			function successCallback(response){
				bool = 1;
			}
			function errorCallback(error){
				console.log("error");
				bool = 0; 
			}
			return bool;
		}
	};
	return addService;
});

app.factory('deleteService', function($q){
	var deleteService =
	{
		deleteDocument : function($http, $documentId)
		{
			$http.get("/admin/"+$documentId).then(successCallback, errorCallback);
			
			var bool = 0;
			function successCallback(response){
				bool = 1;
			}
			function errorCallback(error){
				console.log("error");
			}
			var deferred = $q.defer();
			deferred.resolve(bool);
			return deferred.promise;
		}
	};
	return deleteService;
});


app.factory('updateService', function($q){
	var updateService =
	{
		udateDocumentStatus : function($http, $documentId, $type, $signature)
		{
			
			$http.get("/visualisation/"+$documentId+"/"+$type+"/"+$signature).then(successCallback, errorCallback);
			
			var bool = 0;
			function successCallback(response){
				bool = 1;
			}
			function errorCallback(error){
				bool = 0;
				console.log("error");
			}
			var deferred = $q.defer();
			deferred.resolve(bool);
			return deferred.promise;
		}
	};
	return updateService;
});

app.factory('comptuationService', function(){
	var comptuationService =
	{
        getCurrentDate : function()
		{
			var m_names = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", 
								"October", "November", "December");
			var today = new Date();
			var dd = today.getDate();
			var mm = today.getMonth();
			var yyyy = today.getFullYear();
			if(dd<10) { dd='0'+dd } 
				var date= m_names[mm]+' '+dd+', '+yyyy;

			return date;
		},
		signatureNormalize : function($signature,$character)
		{                         
			var signature = $signature.replace(/\//g, $character);
			return signature;
		}
  	
	};
	return comptuationService;
});
