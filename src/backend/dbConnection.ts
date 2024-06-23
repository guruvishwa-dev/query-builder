import mysql from 'mysql2';

// Define the connection configuration
const connectionConfig: mysql.ConnectionOptions = {
  host: 'localhost',
  user: 'myuser',
  password: 'mypassword',
  database: 'mydatabase'
};

// Create connection to MySQL
const connection = mysql.createConnection(connectionConfig);

// Connect to MySQL
connection.connect((err: mysql.QueryError | null) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  alert("dbConneted");
  console.log('Connected to MySQL as id ' + connection.threadId);
});

export default connection;