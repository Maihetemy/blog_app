const express = require('express');
const router = express.Router(); // like app in index.js
const { connection } = require('../../DB/DBConnection.js');
const { createBlog, updateBlog, deleteBlog, getBlogs } = require('./blog.service.js');

//create a blog
router.post('/create_blog/:user_id', createBlog);

//update a blog
router.patch('/update_blog/:blog_id', updateBlog);

//get all blogs or a specific blog by id
router.get('/{:id}', getBlogs);

//delete a blog
router.delete('/delete_blog/:blog_id', deleteBlog);

module.exports = { blogRouter: router };
// export this router to use in index.js