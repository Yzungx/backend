import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from './config/connectDB';
// import homeController from "../src/controller/homeController"
require('dotenv').config();
// goi den config dotenv

let app = express();

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