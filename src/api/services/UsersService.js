const mongoose = require('mongoose')
const  User  = require('../models/User')

class UsersSevice {
    async getUserByEmail(email)
    {
        try {
            const user = await User.find({ 'email': email })
            return user
        } catch (error) {
            console.log(error)
        }
    }
    async createUser(data)
    {
        try {
            const user = await User.create(data)
            return user
        } catch (error) {
            console.log(error)
        }
    }
    async getUserById(id)
    {
        try{
            const user = await User.findById(id)
            return user
        }catch(error){
            console.log(error)
        }
    }
    async userLogin(user)
    {
        try {
            const login = await User.login(user)
            return login
        } catch (error) {
            console.log(error)
        }
       
       
    }
}

module.exports = UsersSevice