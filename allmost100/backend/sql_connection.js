const mysql = require('mysql2')
const util = require('util');
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'meluha123$$',
  database: 'allmost100_dev',
  insecureAuth: true,
  connectTimeout: 30000,
})


const query = util.promisify(db.query).bind(db);


// Connect to MySQL
db.connect((err) => {
    if (err) {
      throw err;
    }
    console.log('Connected to MySQL');
  });




module.exports={
    query
}
