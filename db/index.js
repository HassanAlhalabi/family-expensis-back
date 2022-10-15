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
