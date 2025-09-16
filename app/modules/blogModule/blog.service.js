const { connection } = require('../../DB/DBConnection.js');


//create a blog
module.exports.createBlog = (req, res, next) => {
    const { body, title } = req.body;
    const { user_id } = req.params;
    const query = `
    INSERT INTO
        blogs(body, title, user_id)
    VALUES
        (?, ?, ?)
    `;
    connection.execute(query, [body, title, user_id], (err, results) => {
        if (err) {
            if (err.errno === 1452) {
                return res.status(400).json({ error: 'Invalid user_id, user does not exist' });
            } else {
                console.error('Error executing query:', err);
                res.status(400).json({ error: err.sqlMessage });
            }
        } else {
            console.log({ results });
            res.status(201).json({ message: 'Blog created successfully', results });
        }
    });
}

//update a blog
module.exports.updateBlog = (req, res, next) => {
    const { blog_id } = req.params;
    const { body, title } = req.body;
    if (!body || !title) {
        return res.status(400).json({ error: 'Both title and body are required' });
    }
    const query = `
    UPDATE
        blogs
    SET
        body = ?, title = ?
    WHERE
        id = ?
    `;
    connection.execute(query, [body, title, blog_id], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(400).json({ error: err.sqlMessage });
        } else {
            console.log({ results });
            if (results.affectedRows === 0) {
                return res.status(404).json({ message: 'Blog not found' });
            }
            res.status(200).json({ message: 'Blog updated successfully', results });
        }
    });
}

//get all blogs or a specific blog by id
module.exports.getBlogs = (req, res, next) => {
    const { id } = req.params;
    let query = `
    SELECT
        b.id As blog_id,
        b.title As blog_title,
        b.body As blog_body,
        u.id AS user_id,
        CONCAT(u.first_name, ' ', u.last_name) AS user_name,
        DATEDIFF(NOW(), u.DoB)/365.25 AS age,
        u.DoB AS date_of_birth
    FROM
        blogs AS b 
    LEFT JOIN
        users AS u
    ON
        b.user_id = u.id
    `;
    if (id) {
        query += `HAVING b.id = ?`;
    }
    const params = id ? [id] : [];
    connection.execute(query, params, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: err.sqlMessage });
        } else {
            if (results.length === 0) {
                return res.status(404).json({ message: 'Blog not found' });
            } else {
                console.log({ results });
                res.status(200).json({ results });
            }
        }
    });

}

//delete a blog
module.exports.deleteBlog = (req, res, next) => {
    const { blog_id } = req.params;
    const query = `
    DELETE FROM
        blogs
    WHERE
        id = ?`;
    connection.execute(query, [blog_id], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: err.sqlMessage });
        } else {
            console.log({ results });
            if (results.affectedRows === 0) {
                return res.status(404).json({ message: 'Blog not found' });
            }
            res.status(200).json({ message: 'Blog deleted successfully', results });
        }
    });
}
