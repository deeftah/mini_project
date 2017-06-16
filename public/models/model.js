var documentI = function() {
	this.id     = null;
    this.name   =  null;
    this.description =  null;
    this.quantity = null;
	this.price  =  null;
	this.total  =  null;
	this.type   =  null;
	this.status =  null;
	this.signature =  null;
};

documentI.prototype = {

    getId : function()
	{
	   	return this.id
	},
    setId: function(id)
	{
	   	this.id = id
	},
	getName : function()
	{
	   	return this.name
	},
    setName : function(name)
	{
	   	this.name = name
	},
	getDescription : function()
	{
	   	return this.description
	},
    setDescription : function(description)
	{
	   	this.description = description
	},
	getQuantity : function()
	{
	   	return this.quantity
	},
    setQuantity : function(quantity)
	{
	   	this.quantity = quantity
	},
	getType : function()
	{
	   	return this.type
	},
    setType : function(type)
	{
	   	this.type = type
	},
    getPrice : function()
	{
	   	return this.price
	},
    setPrice : function(price)
	{
	   	this.price = price
	},
    getTotal : function()
	{
	   	return this.total
	},
    setTotal : function(total)
	{
	   	this.total = total
	},
	getStatus : function()
	{
	   	return this.status
	},
    setStatus : function(status)
	{
	   	this.status = status
	},
	getSignature : function()
	{
	   	return this.signature
	},
    setSignature : function(signature)
	{
	   	this.signature = signature
	}
};