const jwt = require('jsonwebtoken')
const { UsersService } = require('../services')
class JWTAuth {
    verify(req,res, next) {
        const bearerHeader = req.headers['authorization'];
        if(!bearerHeader) return res.status(401).json({errors: "Unauthorized user"})
        const token = bearerHeader.split(' ')[1]
        if (token) {
            jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
                if (err) {
                    console.log(err.message)
                    return res.status(401).json({errors: err.message})
                } else {
                    console.log(decodedToken)
                    let user = await UsersService.getUserById(decodedToken.id)
                    if(user.length==0){
                        return res.status(401).json({errors:"No user found"})
                    }
                    next();
                }
            })
        } else {
            next();
        }
    }
    nonJWT(req, res, next)
    {
        const bearerHeader = req.headers['authorization'];
        if(bearerHeader) return res.status(401).json({message: "Unauthorized user"})
        next()
    }
}

module.exports = JWTAuth