require("dotenv").config();
const host = process.env.HOST;
const port = process.env.PORT || 5000;

const express = require("express");
const app = express();
const cors = require("cors");
const fileUpload = require('express-fileupload');
const path = require('path');
const cookie = require('cookie-parser')
const sequelize = require('./db/db');
const models = require("./models/models");

const router = require('./routes/index');
const errorHandler = require('./middleware/ErrorHandlingMiddleware');

const https = require( "https" );
const fs = require('fs')
const {webSocket} = require('./webSocket')
const stripe = require('./routes/stripe')



//middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload({}));
app.use('/api', router);
app.use('/api/stripe', stripe);
app.use(cookie())
//Handler error, last middleware
app.use(errorHandler);

let server;

const start = async () => {
   try {
        await sequelize.authenticate();
        await sequelize.sync();
        server = app.listen(port, host, 
           () => console.log(`Server started on port ${port}(http://${host}:${port})`))
       webSocket(server);
   } catch (e) {
       console.error(e);
   }
}
start();


