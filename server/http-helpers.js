var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.,
  "Content-Type": "application/json"
};

exports.sendResponse = sendResponse = function(response, data, status){
  status = status || 200;
  response.writeHead(status, headers);
  response.end(JSON.stringify(data));
};

exports.collectData = collectData = function(request, callback){
    var tempStorage = '';
    request.on('data', function(chunk){
      tempStorage+=chunk;
    });
    request.on('end', function(){
      callback(tempStorage);
    });
  };

