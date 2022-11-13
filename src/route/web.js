import express from "express"
import homeController from '../controller/homeController';


let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/crud', homeController.getCRUD);
    router.post('/post-crud', homeController.postCRUD);
    router.get('/get-crud', homeController.displayGetCRUD);
    // req=require|res: response
    return app.use("/", router);
}

module.exports = initWebRoutes;