import { json } from 'sequelize';
import db from '../models/index';
import CRUDservice from '../services/CRUDservice'

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll(); //ORM find data
        return res.render('homepage.ejs',
            {
                data: JSON.stringify(data)
            });
    } catch (e) {
        console.log(e);
    }
}

let getCRUD = async (req, res) => {
    return res.render('crud.ejs')
}

let postCRUD = async (req, res) => {
    await CRUDservice.createNewUser(req.body);
}

let displayGetCRUD = async (req, res) => {
    let data = await CRUDservice.getAllUser();
    return res.render('displayCRUD.ejs', {
        dataTable: data, //truyen data qua view
    })
}
module.exports = {
    getHomePage,
    getCRUD,
    postCRUD,
    displayGetCRUD,
}