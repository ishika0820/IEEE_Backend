var http = require('http');
var url = require('url');
var fs = require('fs');
var nodemailer = require('nodemailer');

/**/
http.createServer(function (req, res) {
  var q = url.parse(req.url, true);
  if(q.pathname=="/")
    q.pathname="/home.html";
  var filename = "." + q.pathname;
  if(q.pathname=="/aftercontact.html")
  {
    var name = q.query.name;
    var email = q.query.email;
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'youremail@gmail.com',
        pass: 'yourpassword'
      }
    });
    
    var mailOptions = {
      from: 'youremail.com',
      to: email,
      subject: 'NodeJs Email',
      text: 'Sample NodeJs email'
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log('Error', error);
      } else {
        console.log('Email sent: ');
      }
    });

  }
  fs.readFile(filename, function(err, data) {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end("404 Not Found");
    } 
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
}).listen(8080);