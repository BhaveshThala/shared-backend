var express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const {databaseConfig} = require('./config.js')
const userRoutes = require('./routes/usersroutes.js')
const sharedOrm = require('shared-orm-library')

var app = express();
const winston = require("winston");

// Set up logger
const logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    transports: [new winston.transports.Console()],
});

app.use(cors())
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true | true, parameterLimit: 1000 }));

//For adding logging capabilities
app.use((req, res, next) => {
    logger.info({
        method: req.method,
        url: req.url,
        statusCode: res.statusCode,
        timestamp : new Date().toUTCString()
    });
    next();
});

//Intiliaze Db and Migrations
(async () => {
    await sharedOrm.initializeDb(databaseConfig);
})();

//for Users routes
app.use('/users', userRoutes);

app.get('/', async function (req, res) {
    res.status(200).json({ "message": "Server is up and running" })
});

let port = process.env.PORT || 3001

app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`);
});