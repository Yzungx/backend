import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from './config/connectDB';
// import cors from 'cors' //de chan chia se api
const cors = require('cors')


// import homeController from "../src/controller/homeController"
require('dotenv').config();
// goi den config dotenv

let app = express();
app.use(cors({
    origin: true,
    methods: ['POST', 'GET', 'PUT', 'DELETE'],
    credentials: true
}))
//cors : PHAN QUYEN TRUY CAP API
// app.all('/', function (req, res, next) {
//     res.setHeader('Acess-Control-Allow-Origin', process.env.REACT_URL);

//     res.setHeader('Acess-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     res.setHeader('Acess-Control-Allow-Headers', 'X-requested-width, content-type');

//     res.setHeader('Acess-Control-Allow-Credentials', true);

//     next();
// })
// config app

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
initWebRoutes(app);

connectDB();

let port = process.env.PORT || 6969;
// dung line 6 chay line 18
// if port equal === undifined => port = 6969
app.listen(port, () => {
    console.log("running on the port " + port);
});