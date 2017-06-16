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

app.factory('paymentService', function(){
	
	var stripe = Stripe.setPublishableKey('pk_test_6pRNASCoBOKtIshFeQd4XMUh');
	
	var paymentService =
	{
        Pay : function($data, $http, $id, $totalToPay)
		{
			console.log($id);
			Stripe.card.createToken
			({
				number: $data.number,
				cvc: $data.cvc,
				exp_month: $data.exp_month,
				exp_year: $data.exp_year
			}, function(status, response){
				console.log(status);
				console.log(response);
				var payment = {
					amount: $totalToPay,
					token: response.id,
					id: $id
				};
				$http.post('/charge', payment).then(successCallback, errorCallback);
				function successCallback(response){
					console.log("payed");
				}
				function errorCallback(error){
					console.log("error");
				}
			});
		}	
	};
	return paymentService;
});

app.factory('pdfMakeService', function(){
	var pdfMakeService =
	{
      	pdfView : function($documentI)
      	{
            var m_names = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", 
									"October", "November", "December");
      		var today = new Date();
			var dd = today.getDate();
			var mm = today.getMonth();
			var yyyy = today.getFullYear();
			if(dd<10) { dd='0'+dd } 
				var date= m_names[mm]+' '+dd+', '+ yyyy;
            var tax = $documentI.total * 0.21;
            var totalToPay = $documentI.total*1 + tax*1;
            var type =  $documentI.type.toUpperCase();
			if($documentI.signature == "")
			    $documentI.signature = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALUAAAAxCAIAAAATEH8wAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACCSURBVHhe7dIBAQAwDMOg+zfdK1gUgAbe4OYHxQ+KHxQ/KH5Q/KD4QfGD4gfFD4ofFD8oflD8oPhB8YPiB8UPih8UPyh+UPyg+EHxg+IHxQ+KHxQ/KH5Q/KD4QfGD4gfFD4ofFD8oflD8oPhB8YPiB8UPih8UPyh+UPyg+EHxg9v2ATBMjRvrdM7WAAAAAElFTkSuQmCC";
            var signature = $documentI.signature.replace(/\*/g, "/");
 
      		var pdf = {
					content: [
				{
      				columns: [
          			{
               			image: 'data:image/jpeg;base64,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',
                		width: 150
          			},
              
          			[
              			{
	                        text: type, 
	                        style: 'documentTitle',
	                        width: '*'
                        },
                        {
                			stack: [
                     		{
                         		columns: [
                              	{
                                    text:$documentI.type+' #', 
                                    style:'documentSubTitle',
                                    width: '*'
                              	}, 
                              	{
                                  	text:'00001',
                                  	style:'documentSubValue',
                                  	width: 100
                              	}
                              	]
                     	    },
                     	    {
                         		columns: [
                              	{
                                    text:'Status', 
                                    style:'documentSubTitle',
                                    width: '*'
                              	}, 
                              	{
                                  	text: $documentI.status,
                                  	style:'documentSubValue',
                                  	width: 100
                              	}
                              	]
                     	    },
                            {
                                columns: [
                               	{
                                 	text:'Date Issued',
                                 	style:'documentSubTitle',
                                 	width: '*'
                         		}, 
                             	{
                                 	text: date,
                                 	style:'documentSubValue',
                                 	width: 100
                             	}
                             	]
                     		},
                     		{
                         		columns: [
                             	{
                                 	text:'Due Date',
                                 	style:'documentSubTitle',
                                 	width: '*'
                             	}, 
                             	{
                                 	text: date,
                                 	style:'documentSubValue',
                                 	width: 100
                             	}
                             	]
                     		},
		                     		]
		                  		}
		              		],
		          		],
		      		},
		      		{
		         		columns: [
		              	{
		                  	text: 'Billing From',
		                  	style:'documentBillingTitle',
		              	},
		              	{
		                  	text: 'Billing To',
		                  	style:'documentBillingTitle',
		              	},
		         		]
		      		},
		      		{
		          		columns: [
		              	{
		                  	text: 'Mathieu Gobert \n INTIA.',
		                  	style: 'documentBillingDetails'
		              	},
		              	{
		                  	text: $documentI.name+'\n LCL Bank',
		                  	style: 'documentBillingDetails'
		              	},
		          		]
		      		},
		      		{
		          		columns: [
		             	{
		                  	text: 'Address',
		                  	style: 'documentBillingAddressTitle'
		              	},
		              	{
		                  	text: 'Address',
		                  	style: 'documentBillingAddressTitle'
		              	},
		          	]
			      	},
			      	{
			          	columns: [
			              	{
			                  	text: '149 Rue Pierre Semard\n 29200 Brest\n  France',
			                  	style: 'documentBillingAddress'
			              	},
			              	{
			            	  	text: '4 Ter Avenue Victor Le Gorgeu \n 29200 Brest\n  France',
			                  	style: 'documentBillingAddress'
			              	},
			          		]
			      	},
			      	'\n\n',
			    	{
			          	table: {
			            	headerRows: 1,
			            	widths: [ '*', 40, 'auto', 40, 'auto', 80 ],
			    
			            	body: [
			              	[ 
			                  	{
			                      	text: 'Product',
			                      	style: 'itemsHeader'
			                  	}, 
			                  	{
			                      	text: 'Qty',
			                      	style: [ 'itemsHeader', 'center']
			                 	}, 
			                  	{
			                      	text: 'Price',
			                      	style: [ 'itemsHeader', 'center']
			                 	}, 
			                  	{
			                      	text: 'Tax',
			                      	style: [ 'itemsHeader', 'center']
			                  	}, 
			                  	{
			                      	text: 'Discount',
			                      	style: [ 'itemsHeader', 'center']
			                  	}, 
			                  	{
			                      	text: 'Total',
			                      	style: [ 'itemsHeader', 'center']
			                  	} 
			              	],
			
			              	[ 
			                  	[
			                      	{
			                          	text: ''+$documentI.description,
			                          	style:'itemTitle'
			                      	},
			                      	{
			                          	text: 'Good quality',
			                          	style:'itemSubTitle'
			                        }
			                  	], 
			                  	{
			                      	text:''+$documentI.quantity,
			                      	style:'itemNumber'
			                  	}, 
			                  	{
			                      	text: $documentI.price+'€',
			                      	style:'itemNumber'
			                  	}, 
			                  	{
			                      	text:'0%',
			                      	style:'itemNumber'
			                  	}, 
			                  	{
			                      	text: '0%',
			                      	style:'itemNumber'
			                  	},
			                  	{
			                      	text: $documentI.total+'€',
			                      	style:'itemTotal'
			                  	} 
			              	]           
			            	]
			          	}, 
			    	},
			        {
			          	table: {
			            	headerRows: 0,
			            	widths: [ '*', 80 ],
			            body: [
			              	[ 
			                  	{
			                      	text:'Subtotal',
			                      	style:'itemsFooterSubTitle'
			                  	}, 
			                  	{ 
			                      	text: $documentI.total+'€',
			                      	style:'itemsFooterSubValue'
			                  	}
			              	],
			              	[ 
			                  	{
			                      	text:'Tax 21%',
			                      	style:'itemsFooterSubTitle'
			                  	},
			                  	{
			                      	text: tax+'€',
			                      	style:'itemsFooterSubValue'
			                  	}
			              	],
			              	[ 
			                  	{
			                      	text:'TOTAL',
			                      	style:'itemsFooterTotalTitle'
			                  	}, 
			                  	{
			                      	text: totalToPay+'€',
			                      	style:'itemsFooterTotalValue'
			                  	}
			              	],
			            ]
			          	}, 
			          	layout: 'lightHorizontalLines'
			        },
			      	{
			          	columns: [
			              	{
			                  	text:'',
			              	},
			              	{
			                 	stack: [
			                 	    { 
			                          	image: signature,
			                          	width: 200,
			                          	height: 100,
                                        style:'signatureImage'
			                      	},
			                      	{ 
			                          	text: '_________________________________',
			                          	style:'signaturePlaceholder'
			                      	},
			                      	{ 
			                          	text: $documentI.name,
			                          	style:'signatureName'
			                      	},
			                      	{ 
			                          	text: 'Costumer of INTIA',
			                          	style:'signatureJobTitle'
			                      	}
			                  	], 
			                 	width: 180
			              	}
			          	]
			 		},
				  	],
				  	styles: {
				    	documentTitle: {
				      		fontSize: 22,
				      		bold: true,
				      		alignment:'right',
				      		margin:[0,0,0,15]
				    	},
						documentSubTitle: {
				      		fontSize: 12,
				      		alignment:'right'
				    	},
				    	documentSubValue: {
				      		fontSize: 12,
				      		alignment:'right'
				    	},
				    	documentBillingTitle: {
				      		fontSize: 14,
				      		bold: true,
				      		alignment:'left',
				      		margin:[0,20,0,5],
						},
				    	documentBillingDetails: {
				      		alignment:'left'
						},
				    	documentBillingAddressTitle: {
				        	margin: [0,7,0,3],
				        	bold: true
				    	},
				    	documentBillingAddress: {
				           fontSize: 12
				    	},
				    	itemsHeader: {
				        	margin: [0,5,0,5],
				        	bold: true
				    	},
				    	itemTitle: {
				        	bold: true,
				    	},
				    	itemSubTitle: {
				            italics: true,
				            fontSize: 11
				    	},
					    itemNumber: {
					        margin: [0,5,0,5],
					        alignment: 'center',
					    },
					    itemTotal: {
					        margin: [0,5,0,5],
					        bold: true,
					        alignment: 'center',
					    },

					    itemsFooterSubTitle: {
					        margin: [0,5,0,5],
					        bold: true,
					        alignment:'right',
					    },
					    itemsFooterSubValue: {
					        margin: [0,5,0,5],
					        bold: true,
					        alignment:'center',
					    },
					    itemsFooterTotalTitle: {
					        margin: [0,5,0,5],
					        bold: true,
					        alignment:'right',
					    },
					    itemsFooterTotalValue: {
					        margin: [0,5,0,5],
					        bold: true,
					        alignment:'center',
					    },
					    signaturePlaceholder: {
					        margin: [0,0,0,0],  
					    },
					    signatureImage:{
                            margin: [0,0,100,0],
					    },
					    signatureName: {
					        bold: true,
					        alignment:'center',
					    },
					    signatureJobTitle: {
					        italics: true,
					        fontSize: 10,
					        alignment:'center',
					    },
					    center: {
					        alignment:'center',
					    },
				  	},
				  	defaultStyle: {
					    columnGap: 20,
				  	}
				}

				//pdfMake.createPdf(dd).open();

				//pdfMake.createPdf(dd).print();

				pdfMake.createPdf(pdf).download(type+'.pdf');
        }
	};
	return pdfMakeService;
});
