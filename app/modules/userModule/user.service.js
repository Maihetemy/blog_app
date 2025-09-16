const { connection } = require('../../DB/DBConnection.js');

//get all users
module.exports.getAllUsers = (req, res) => {
    connection.query('SELECT * FROM users', (err, results, fields) => {
        if (err) {
            console.error('Error executing query:', err);
            res.json({ error: 'Database query error' });
        } else {
            console.log({ results, fields });

            res.json({ results, fields });
        }
    })
}
//sign up route
module.exports.signUp = (req, res, next) => {
    const { first_name, last_name, email, password } = req.body;
    const query = `
    INSERT INTO 
        users(first_name, last_name, email, password)
    values(?, ?, ?, ?)`;
    connection.execute(query, [first_name, last_name, email, password], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.json({ error: err.sqlMessage });
        } else {
            console.log({ results });
            res.json({ message: 'User registered successfully', results });
        }
    });
}

// login route
module.exports.login = (req, res, next) => {
    const { email, password, first_name, last_name } = req.body;
    const query = `
    SELECT
        email, password, CONCAT(first_name, ' ', last_name) AS name
    FROM 
        users
    WHERE
        email = ? AND password = ?
    `;
    connection.execute(query, [email, password], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.json({ error: err.sqlMessage });
        } else {
            if (results.length === 0) {
                return res.json({ message: 'Invalid email or password' });
            }
            console.log({ message: 'Login successful', results });
            res.json({ message: 'Login successful', results });
        }
    });
}

module.exports.updateUser = (req, res, next) => {
    const { id } = req.params;
    const { first_name, last_name, email, password } = req.body;
    if (!first_name || !last_name || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }
    const query = `
    UPDATE
        users 
    SET
        first_name = ?, last_name = ?, email = ?, password = ?
    WHERE
        id = ?`;
    connection.execute(query, [first_name, last_name, email, password, id], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.json({ error: err.sqlMessage });
        } else {
            console.log({ results });
            if (results.affectedRows === 0) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json({ message: 'User updated successfully', results });
        }
    });
}

//get profile
module.exports.getProfile = (req, res, next) => {
    const { id } = req.params;
    const query = `
    SELECT
        id,
        CONCAT(first_name, ' ', last_name) As name,
        email,
        DoB,
        FLOOR(DATEDIFF(NOW(), DoB)/365.25) AS age
    FROM
        users
    WHERE
        id = ?`;
    connection.execute(query, [id], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.json({ error: err.sqlMessage });
        } else {
            console.log({ results });
            if (results.length === 0) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json({ results });
        }
    });
}

//search users
module.exports.searchUsers = (req, res, next) => {
    let { searchKey } = req.query;
    searchKey = `%${searchKey}%`;
    const query = `
    SELECT
        id,
        CONCAT(first_name, ' ', last_name) AS name,
        email,
        DATEDIFF(NOW(), DoB)/365.25 AS age,
        DoB as date_of_birth
    FROM
        users
    WHERE
        first_name LIKE ? OR
        last_name LIKE ? OR
        email LIKE ?
    `;
    connection.execute(query, [searchKey, searchKey, searchKey], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: err.sqlMessage });
        } else {
            console.log({ results });
            if (results.length === 0) {
                return res.status(404).json({ message: 'No users found' });
            } else {
                console.log({ results });

                res.status(200).json({ results });
            }
        }
    });
}

//delete user
module.exports.deleteUser = (req, res, next) => {
    const { id } = req.params;
    const query = `
    DELETE FROM
        users
    WHERE
        id = ?`;
    connection.execute(query, [id], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.json({ error: err.sqlMessage });
        } else {
            console.log({ results });
            if (results.affectedRows === 0) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json({ message: 'User deleted successfully', results });
        }
    });
}
