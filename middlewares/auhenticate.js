const jwt = require('jsonwebtoken');

const authenticate = (req,res,next) => {

    // If Token Not Exist
    if(!req.headers.authorization) {
        return res.status(401).send('Unauthorized');
    }   

    const token = req.headers.authorization.split(' ')[1];
    
    try {
        const decoded = jwt.verify(token,process.env.PRIVATE_KEY);
        return next();
    } catch(error) {
        return res.status(401).send('Unauthorized')
    }
}

module.exports = authenticate;