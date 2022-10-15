const {query} = require('../db');
const jwt = require('jsonwebtoken');
const {verifyMD5} = require('../util');

const login = async (req,res) => {

    const {userName, password} = req.body;
    
    if(!userName || !password) {
        return res.status(400).json({
            success: false,
            message: 'User Name and Password are Required'
        })
    }

    // Query
    try {

        const user = await query(`SELECT id,userName,isAdmin,password FROM users WHERE userName = '${userName}'`);

        // If User Not Found
        if(user.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'User Not Found',
            });
        }

        // Verify Password
        if(!verifyMD5(user[0].password,password)) {
            return res.status(400).json({
                success: false,
                message: 'Incorrect Password',
            });
        };
        
        // Create User Token
        const token = jwt.sign({
            isAdmin: user[0].isAdmin,
            userId: user[0].id
        },process.env.PRIVATE_KEY,{expiresIn: '30d'});

        return res.status(200).json({
            success: true,
            message: null,
            user: {
                id: user[0].id,
                userName: user[0].userName,
            },
            token
        });
    
    } catch(error) {
        return res.status(500).send(error)
    }
   
}

module.exports = login