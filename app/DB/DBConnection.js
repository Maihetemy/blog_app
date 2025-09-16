const mysql2 = require('mysql2');

const connection = mysql2.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'mai',
    password: '',
    database: 'blog_app'
});
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('Database connection established.');
    }
});

module.exports= {connection};