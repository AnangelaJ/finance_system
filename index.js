const express = require('express');
const routerApi = require('./routes');
const { logErrors, errorHandler, boomErrorHandler } = require ('./middlewares/errrorHandler');
const cors = require('cors');

const app = express();
const port = 3000;

const whitelist = ['http://localhost:8080', 'http://myapp.net', 'http://localhost'];
const options = {
  origin: (origin, callback) => {
    if(whitelist.includes(origin)){
      callback(null, true);
    }else{
      callback(new Error('Acceso no permitido'));
    }
  }
}

app.use(express.json());
app.use(cors(options));

app.get('/', (req, res) =>{
  res.send('Pagina inicial');
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log("Server running in port " + port);
});
