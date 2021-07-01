const jwt = require('jsonwebtoken');

module.exports = (req, res, next) =>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token,process.env.SECRETKEY);
        req.userData = decoded;
        console.log(req.userData);
    } catch (error){
        return res.status(401).json({
            message: 'Auth failed'
        })
    }
    next();
}
