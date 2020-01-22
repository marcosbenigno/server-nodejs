const express = require('express');
const bodyParser = require('body-parser');
const sql = require('mssql');
const app = express();
const port = 3000;
const connection = {
    user: '',
    password: '',
    server: '',
    database: 'Heroes',
    port: 1433
};


//classe Hero   
class Hero {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}


//usar badyParser app
app.use(bodyParser.urlencoded({
    extended: true
}));


//conexão
sql.connect(connection)
    .then(conn => global.conn = conn)
    .catch(err => console.log(err));


//rotas (post):
const router = express.Router();

//getHeroes
router.post('/servicesdb/GetHeroes/', (req, res) => {
    querySql('SELECT * FROM Heroes', res);
});


//getHero
router.post('/servicesdb/GetHero/', (req, res) => {
    let filter = '';
    if (req.body.id) {

        filter = ' WHERE id=' + parseInt(req.body.id);
    }
    querySql('SELECT * FROM Heroes' + filter, res);
});
app.use('/', router);

//inicia o servidor
app.listen(port);
console.log('Rodando');


//função que realiza a query
function querySql(query, res) {
    global.conn.request()
        .query(query)
        .then((result) => {
            let resultJSON = result.recordset;
            let array = [];
            for (var i = 0; i < resultJSON.length; i++) {
                var obj = resultJSON[i];
                var id, name;
                for (var key in obj) {
                    if (key == "name") {
                        name = obj[key];
                    } else {
                        id = obj[key];
                    }
                }
                array.push(new Hero(id, name));
                console.log("ok");
            }
            return res.send(array);
        });
}