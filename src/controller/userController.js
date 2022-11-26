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

module.exports = {
    handleLogin,
}