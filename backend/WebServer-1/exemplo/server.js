var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var url = require('url');

app.use(express.static('public'));
// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// http://localhost:3003/calc?op1=2&op2=3&op=*
app.get('/calc', function (req, res) {
   var q = url.parse(req.url, true);
   var resourceReq = q.query;
   
   // var operacao = req.params;
   var operacao = resourceReq;

   var op1 = parseFloat(operacao.op1);
   var op2 = parseFloat(operacao.op2);
   var resultado;
   if (operacao.op === '+') {
      resultado = op1 + op2;
      res.writeHead(200, {'Content-Type': 'text/html'});
   } else if (operacao.op === '-') {
      resultado = op1 - op2;
      res.writeHead(200, {'Content-Type': 'text/html'});
   } else if (operacao.op === '*') {
      resultado = op1 * op2;
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end('{ \"op1\": \"'+ op1 +'\", \"op2\": \"'+ op2+'\", \"op\": \"' + operacao.op + '\", \"result\": \"'+ resultado + '\"}');
      return;
   } else if (operacao.op === '/') {
      resultado = op1 / op2;
      res.writeHead(200, {'Content-Type': 'text/html'});
   } else {
      res.writeHead(500, {'Content-Type': 'text/html'});
      res.end('Operacao invalida');
      return;
   }
   res.end('Resultado da operacao eh ' + resultado)
   console.log('resposta', resultado);
});

app.get('/teste', function (req, res) {
   res.writeHead(200, {'Content-Type': 'text/html'});
   res.end('<html><body><h1>Requisição deu certo!!!</h1><a href="calc?op1=4&op=*&op2=5">Calcular 4 * 5</a></body></html>');
});

app.get('/teste2/:p?', function (req, res) {
   res.writeHead(200, {'Content-Type': 'text/html'});
   res.end('<html><head><meta charset="UTF-8"></head><body><h1>Agora com parâmetro: ' + 
         req.params.p
         + '!!!</h1></body></html>');
});


app.post('/calc', function (req, res) {
   res.writeHead(200, {'Content-Type': 'text/html'});
   res.end();
});



var server = app.listen(3003, function () {

   var host = server.address().address;
   var port = server.address().port;

   console.log("Example app listening at http://%s:%s", host, port);

});

