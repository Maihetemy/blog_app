const {bootstrap} = require('./app/modules/bootstrap.js');
const express = require('express');
const app = express();

//initialize the app with routes and middleware
bootstrap(app, express);


