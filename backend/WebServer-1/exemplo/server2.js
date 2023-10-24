var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var url = require('url');


const bd = require('./dados');


app.use(express.static('public'));
// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));


let vendas = [];


app.get('/venda', function (req, res) {
   res.writeHead(200, {'Content-Type': 'application/json'});

   if (vendas.length === 0) {
      vendas = bd.carregarDados();
   }

   const resp = JSON.stringify(vendas);
   res.end(resp);
});

app.post('/venda', function (req, res) {
   console.log(req.body);
   vendas.push(req.body);
   bd.salvarDados(vendas, function () {
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end('{ "msg": "Sucesso" }');
   });
});

var server = app.listen(3000, function () {

   var host = server.address().address;
   var port = server.address().port;

   console.log("Example app listening at http://%s:%s", host, port);

});

