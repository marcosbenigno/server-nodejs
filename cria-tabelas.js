//script cria e popula tabela no sql server
const sql = require("mssql");

var connStr = {
        user: 'sa',
        password: 'senhasa',
        server: 'localhost', 
        database: 'Heroes',
        port: 1433
    };

sql.connect(connStr)
   .then(conn => createTable(conn))
   .catch(err => console.log("erro! " + err));
   
   function createTable(conn){
      const table = new sql.Table('Heroes');
      table.create = true;
      table.columns.add('id', sql.Int, {nullable: false, primary: true});
      table.columns.add('name', sql.NVarChar(150), {nullable: false});
      table.rows.add(11, 'Dr Nice');
	  table.rows.add(12, 'Narco');
	  table.rows.add(13, 'Bombasto');
	  table.rows.add(14, 'Celeritas');
	  table.rows.add(15, 'Magneta');
	  table.rows.add(16, 'RubberMan');
	  table.rows.add(17, 'Dynama');
	  table.rows.add(18, 'Dr IQ');
	  table.rows.add(19, 'Magma');
	  table.rows.add(20, 'Tornado');
 
      const request = new sql.Request()
      request.bulk(table)
             .then(result => console.log('ok'))
             .catch(err => console.log('erro: ' + err));
}