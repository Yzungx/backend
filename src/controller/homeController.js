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
    return res.render('crud.ejs')

}

let displayGetCRUD = async (req, res) => {
    let data = await CRUDservice.getAllUser();
    return res.render('displayCRUD.ejs', {
        dataTable: data, //truyen data qua view
    })
}

let getEditCRUD = async (req, res) => {
    let userId = req.query.id;

    if (userId) {
        let userData = await CRUDservice.getUserInforById(userId);
        //check user data not found
        return res.render('getEditCRUD.ejs',
            {
                user: userData
            })
    }
    else {
        return res.send('user not found')
    }
}

let putCRUD = async (req, res) => {
    let data = req.body;
    let allUsers = await CRUDservice.updateUserData(data);
    return res.render('displayCRUD.ejs', {
        dataTable: allUsers, //truyen data qua view
    })
}

let deleteUserById = async (req, res) => {
    let id = req.query.id;

    if (id) {
        await CRUDservice.deleteCRUD(id);
        return res.send('Delete success')
    }
    else {
        return res.send('Delete fail')
    }
}
module.exports = {
    getHomePage,
    getCRUD,
    postCRUD,
    displayGetCRUD,
    getEditCRUD,
    putCRUD,
    deleteUserById,
}