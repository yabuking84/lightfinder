var http = require('http');
var url = require('url');
var fs = require('fs');

var server = http.createServer(function(request, response){
  	// response.writeHead(200, {'Content-Type': 'text/html'});
  	// response.write('<h1>The server is working!</h1>');
  	// response.end();

  	var path = url.parse(request.url).pathname;
  	console.log(__dirname);
  	console.log(path);
	
	// switch(path){
 	//    case '/':
 	//        response.writeHead(200, {'Content-Type': 'text/html'});
 	//        response.write('<h1>Hey, have you heard about our <a href="/signup.html">signup page</a></h1>');
 	//        response.end();
 	//        break;
 	//    case '/signup.html':
 	//        fs.readFile(__dirname + path, function(error, data){
 	//            if (error){
 	//                response.writeHead(404);
 	//                response.write("opps this doesn't exist - 404");
 	//                response.end();
 	//            }
 	//            else{
 	//                response.writeHead(200, {"Content-Type": "text/html"});
 	//                response.write(data, "utf8");
 	//                response.end();
 	//            }
 	//        });
 	//        break;
 	//    default:
 	//        response.writeHead(404);
 	//        response.write("opps this doesn't exist - 404");
 	//        response.end();
 	//        break;
 	// }  
});



server.listen(4113);


// use socket.io
var io = require('socket.io').listen(server);

//turn off debug
// io.set('log level', 1);

// // define interactions with client
io.sockets.on('connection', function(socket){

    

    socket.on('sendMessageSuperChat', function(data){
    	// io.emit('messageChannel',{message:data});
    	socket.broadcast.emit('sendMessageSuperChat',{message:data.message, name:data.name});
    });



	// Suppliers
	// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    socket.on('supplierNewQuoteCreated', function(data){
    	socket.broadcast.emit('supplierNewQuoteCreated',data);
    });

    socket.on('buyerNewInquiryCreated', function(data){
        socket.broadcast.emit('buyerNewInquiryCreated',data);
    });
	// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
	// Suppliers



	// Buyers
	// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

	// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
	// Buyers



	// Administrators
	// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    socket.on('adminInquiryApprove', function(data){
        socket.broadcast.emit('adminInquiryApprove',data);
    });
	// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    // Administrators




});