var { WebSocket, WebSocketServer } = require('ws');
var http = require('http');
var path = require('path');
var fs = require('fs');
const { log } = require('console');

var port = 9090;

var logBegin = false;
const logFilePrefix = 'log_'

let logFile = null;

const server = http.createServer(function (req, res) {
  console.log('request starting...', req.url);
  console.log(req.method);

  if (req.method == 'POST'){
    if (req.url == '/log/begin'){
      if(logBegin) {
        res.writeHead(400, { 'Content-Type': 'text/html' });
        res.end();
      }
      logBegin = true;
      logFile = `${logFilePrefix}${Date.now()}.json`;
      fs.writeFile(logFile, '', function (err) {
        if (err) throw err;
        console.log('Created log file');
      });
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end();
    }
    else if (req.url == '/log/end'){
      if(!logBegin) {
        res.writeHead(400, { 'Content-Type': 'text/html' });
        res.end();
      }
      logBegin = false;
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end();
    }
    else if (req.url == '/log'){
      if(!logBegin) {
        res.writeHead(400, { 'Content-Type': 'text/html' });
        res.end();
        return;
      }
      console.log(`Writing to log file ${logFile}`);
      let body = '';
      req.on('data', (chunk) => {
        body += chunk;
      });
      req.on('end', async () => {
        body += '\n'
        fs.appendFile(logFile, body, function (err) {
          if (err) throw err;
          console.log('Saved!');
        });
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(); 
      });
    }
  }
})
server.listen(port)


const wss = new WebSocketServer({ server: server});

let admin = null;
let client = null;

wss.on('connection', function connection(connection, req) {
  if( req.url === '/admin') {
    console.log('Connected to admin');
    admin = connection;
    admin.on('message', function incoming(message) {
      console.log('forwarding message: %s', message);
      if(client) {
        client.send(JSON.stringify(message.toString()));
      }
    });
  } else {
    console.log('Connected to client');
    client = connection;
    client.on('message', function incoming(message) {
      console.log('forwarding message: %s', message);
      if(admin) {
        admin.send(message.toString());
      }
    });
  }
  
});

console.log(`Server running at http://localhost:${port}/`);