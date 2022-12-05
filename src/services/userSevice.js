import db from '../models/index'
import bycrypt from 'bcryptjs'
var bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync(10);

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

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);
            if (isExist) {
                //user already exist

                let user = await db.User.findOne(
                    {
                        where: { email: email },
                        attributes: ['email', 'roleId', 'password'],
                        raw: true,
                    }
                );

                if (user) { //check lan 2 de sau khi kiem tra neu co xoa ban ghi thi tranh loi
                    //compare 
                    let check = await bycrypt.compareSync(password, user.password);
                    if (check) {
                        userData.errCode = '0';
                        userData.errMessage = 'Ok';
                        delete user.password; //xoa khi hien thi
                        userData.user = user;
                    }
                    else {
                        userData.errCode = '3';
                        userData.errMessage = 'Wrong password';
                    }
                }
                else {
                    userData.errCode = '2';
                    userData.errMessage = 'User not found';
                }
            }
            else {
                //return error
                userData.errCode = '1';
                userData.errMessage = `Your email is wrong pls try again`;
            }
            resolve(userData);
        } catch (e) {
            reject(e);
        }
    })

}

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne(
                {
                    where: { email: userEmail },
                    //tim xem co user emil trung vs email tren db
                }
            )
            if (user) {
                resolve(true)
            }
            else {
                resolve(false)
            }

        } catch (e) {
            reject(e);

        }
    })
}

let getAlluser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if (userId === 'All') {
                users = await db.User.findAll(
                    {
                        attributes: {
                            exclude: ['passwords']
                        },
                    }
                )
            }
            if (userId && userId !== 'All') {
                users = await db.User.findOne(
                    {
                        where: { id: userId },
                        attributes: {
                            exclude: ['passwords']
                        },
                    }
                )
            }

            resolve(users);
        } catch (e) {
            reject(e);
        }
    })
}

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            //check email is exist
            let check = await checkUserEmail(data.email);
            if (check === true) {
                resolve(
                    {
                        errCode: '1',
                        errMessage: 'Email already in use'
                    }
                )
            }
            else {
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
                resolve(
                    {
                        errCode: "0",
                        errMessage: "OK",
                    }
                ); //resole ~ return
            }
        } catch (e) {
            reject(e);
        }
    })
}

let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        let foundUser = await db.User.findOne(
            {
                where: { id: userId }
            }
        )
        if (!foundUser) {
            resolve({
                errCode: '2',
                errMessage: "The user isnt exist"
            })
        }

        // if (foundUser) {
        //     await foundUser.destroy(); 
        // }

        await db.User.destroy(
            {
                where: { id: userId }
            }
        )
        resolve(
            {
                errCode: '0',
                errMessage: 'the user is deleted'
            }
        )
    })
}

let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: '2',
                    errMessage: 'missing params'
                })
            }

            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false,
            })
            if (user) {

                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;

                await user.save();

                resolve(
                    {
                        errCode: '0',
                        errMessage: 'Upadate Completed'
                    }
                );
            }
            else {
                resolve(
                    {
                        errCode: '1',
                        errMessage: 'user not found'
                    }
                )
            }
        } catch (e) {
            reject(e);
        }
    })
}
module.exports = {
    handleUserLogin,
    checkUserEmail,
    getAlluser,
    createNewUser,
    deleteUser,
    updateUserData,
}