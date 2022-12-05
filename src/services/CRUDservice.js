import db from '../models/index'
import user from '../models/user';
var bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordFromBcrypt = await hashPassword(data.password);
            await db.User.create(
                {
                    email: data.email,
                    password: hashPasswordFromBcrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phoneNumber: data.phoneNumber,
                    gender: data.gender === '1' ? true : false,
                    roleId: data.roleId,
                }
            )
            resolve(); //resole ~ return
        } catch (error) {
            reject(e);
        }
    })
}

let hashPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    }
    )
}

let getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = db.User.findAll(
                {
                    raw: true,
                }
            );
            resolve(user);
        } catch (error) { //neu co loi -> in ra loi

        }
    })
}

let getUserInforById = async (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne(
                {
                    where: { id: userId },
                    raw: true
                }
            )
            if (user) //user cos gia tri -> true
            {
                resolve(user);
            }
            else {
                resolve([]);
            }
        } catch (error) {
            reject(error);
        }
    })
}

let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id }
            })
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;

                await user.save();

                let allUsers = db.User.findAll();
                resolve(allUsers);
            }
            else {
                resolve([]);
            }
        } catch (error) {
            reject(e);
        }
    })
}

let deleteCRUD = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne(
                {
                    where: { id: userId },
                }
            )
            if (user) {
                await user.destroy();
            }
            resolve();
        } catch (error) {
            reject(error);
        }
    })
}
module.exports = {
    createNewUser,
    hashPassword,
    getAllUser,
    getUserInforById,
    updateUserData,
    deleteCRUD,
}