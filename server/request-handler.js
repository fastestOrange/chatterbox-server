
var helpers = require("./http-helpers.js");

var data = {results:[]};

var options = function(request, response){
  helpers.sendResponse(response);
};


var getMessages = function(request, response){
  helpers.sendResponse(response, data);
};


var postMessages = function(request, response){
  helpers.collectData(request, function(tempData){
    data.results.unshift(JSON.parse(tempData));
    helpers.sendResponse(response, null, 201);
  });
};


var actions = {
  'GET': getMessages,
  'POST': postMessages,
  'OPTIONS': options
};

exports.handleRequest = function(request,response){
  var method = actions[request.method];
  if(method){
    method(request, response);
  }else{
    helpers.sendResponse(response, null, 404);
  }
};



