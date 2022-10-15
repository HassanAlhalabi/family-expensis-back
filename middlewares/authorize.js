const jwt = require('jsonwebtoken');

const authorize = (req,res,next) => {
    // check for token
    if(!req.headers.authorization) {
        return res.status(401).send('unauthorized');
    }   
    const token = req.headers.authorization.split(' ')[1];
    try {
        const decoded = jwt.verify(token,process.env.PRIVATE_KEY);
        if(decoded.isAdmin) {
            return next();
        }
        return res.status(401).send('unauthorize')
    } catch(error) {
        return res.status(401).send('unauthorize')
    }
}

module.exports = authorize;