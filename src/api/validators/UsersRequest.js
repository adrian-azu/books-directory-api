const express = require('express')
const mongoose = require('mongoose')
const validator = require('validator')
const { UsersService } = require('../services')
class UsersRequest {
    static verify(data)
    {
        let message = {}
        let emptyField = []
        Object.entries(data).forEach(([key, value]) => {
            if (value === undefined || value === null) {
                message[key] = `${key} is required`
                emptyField.push(key)
            }
        })
        if (emptyField.length > 0) {
            return res.status(422).json({ errors: message })
        }
    }
    async register(req, res, next) {
        const { first_name, last_name, email, password } = req.body
        const data = {
            "first_name": first_name,
            "last_name": last_name,
            "email": email,
            "password": password
        }   
        UsersRequest.verify(data)
        if (data.password.length < 6) {
            message.password = "Password should at least 6 characters"
            emptyField.push(password)
        }
        if (!validator.isEmail(data.email)) {
            message.email = "Invalid email format"
            emptyField.push(email)
        }
        if (emptyField.length > 0) {
            return res.status(422).json({ errors: message })
        }
        let isExist = await UsersService.getUserByEmail(email)

        if (isExist.length > 0) return res.status(422).json({ errors: "email is already taken" })
        req.data = data

        next()
    }
    async login(req, res, next)
    {
        const {  email, password } = req.body
        const data = {
            "email": email,
            "password": password
        }
        UsersRequest.verify(data)
        if (!validator.isEmail(data.email)) {
            return res.status(422).json({errors: {email: "Invalid email format"}})
        }
        let user = await UsersService.getUserByEmail(email)
        console.log(user)
        if (user.length == 0) return res.status(422).json({ errors: "Incorrect credentials" })
        req.data = user[0]

        next()
    }
}

module.exports = UsersRequest