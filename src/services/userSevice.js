import db from '../models/index'
import bycrypt from 'bcryptjs'

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
module.exports = {
    handleUserLogin,
    checkUserEmail,
    getAlluser,
}