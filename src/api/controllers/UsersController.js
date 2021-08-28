const { ControllerHelper } = require('../helpers')
const { UsersService } = require('../services')
const jwt = require('jsonwebtoken')
class UsersController extends ControllerHelper
{
    async register (req, res)
    {
        const data = req.data
        const user = await UsersService.createUser(data)
        user.token = user.generateVerificationToken('15m')
        return res.status(201).json({data: user})
    }
    async login(req, res)
    {
        let data = req.data
        const {password} =req.body
        data.inputPassword = password
        const user = await UsersService.userLogin(data)
        const token = user.generateVerificationToken("24h")
        return res.status(200).json({data: token})
    }
}

module.exports = new UsersController