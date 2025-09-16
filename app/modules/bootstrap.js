
const {userRouter} = require('./userModule/user.controller.js');
const {blogRouter} = require('./blogModule/blog.controller.js');
module.exports.bootstrap = (app, express) => {
    const port = 3000;
    console.log("Bootstrap module initialized");
    app.use(express.json());

    //user routes
    app.use('/users', userRouter); // use the user router for /users path

    //blog routes
    app.use('/blogs', blogRouter); // use the blog router for /blogs path

    //start the server
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
};