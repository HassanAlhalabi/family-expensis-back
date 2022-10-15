const mysql = require('mysql');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

const connectDB = async () => {
  try {
    connection.connect();
    console.log('Connected Successfully')
  } catch(error) {
    console.log('Failed To Connect')
  }

  connection.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      connectDB();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
      throw err;                                  // server variable configures this)
    }
  });

}   

const query = async (sql) => {
  const queryPromise = new Promise((resolve,reject) => {
    connection.query(sql, (error,data) => {
      if(error) {
        reject(error.sqlMessage)
      }
      resolve(data)
    })
  })
  return queryPromise;
}

module.exports = {
  connectDB,
  query
}
