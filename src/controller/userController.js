import userService from '../services/userSevice'

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    // check email exist
    //  check password
    // return userInfor
    //acces token: jwt json web tokens

    if (!email || !password) {
        return res.status(500).json(
            {
                errCode: 1,
                message: 'Missing input params'
            }
        )
    }

    let userData = await userService.handleUserLogin(email, password)
    return res.status(200).json(
        {
            errCode: userData.errCode,
            message: userData.errMessage,
            userData: userData.user ? userData.user : {},
        }
    )
}

let handleGetAllUser = async (req, res) => {
    let id = req.query.id; //ALL~find all, id~findone: 2 api trg 1
    let users = await userService.getAlluser(id);

    if (!id) {
        return res.status(200).json(
            {
                errCode: 1,
                errMessage: 'Missing Parameter',
                users: [],
            }
        )
    }
    return res.status(200).json(
        {
            errCode: '0',
            errMessage: 'OK',
            users
        }
    )
}

let handleCreateNewUser = async (req, res) => {
    let message = await userService.createNewUser(req.body);
    return res.status(200).json(message);
}

let handleEditUser = async (req, res) => {
    let data = req.body;
    let message = await userService.updateUserData(data);
    return res.status(200).json(
        message
    )
}

let handleDeleteUser = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json(
            {
                errCode: '1',
                errMessage: 'Missing required params'
            }
        )
    }
    let message = await userService.deleteUser(req.body.id);
    return res.status(200).json(message);
}

module.exports = {
    handleLogin,
    handleGetAllUser,
    handleCreateNewUser,
    handleEditUser,
    handleDeleteUser,
}