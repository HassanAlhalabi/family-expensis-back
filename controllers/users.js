const {query} = require('../db');
const {generateMD5} = require('../util');

const getAllUsers = async (req,res) => {

    // Query
    try {
        const data = await query(`SELECT id,userName,isAdmin From users WHERE isDeleted = 0`);
        return res.status(200).json({
            success: true,
            message: null,
            users: data,
        });
    } catch(error) {
        return res.status(500).json({
            success: false,
            message: error.sqlMessage,
            user: null,
        });
    }

}

const addUser = async (req,res) => {

    const { userName, password, isAdmin } = req.body;

    if(!userName || !password) {
        return res.status(400).json({
            success: false,
            message: 'User Name and Password are Required'
        })
    }

        // check if user name alredy exist
        user = await query(`SELECT id FROM users WHERE userName = '${userName}'`);
        if(user.length !== 0) {
            return res.status(400).json({
                success: false,
                message: 'User Name Already Exists'
            })
        }

    const hashedPassword = generateMD5(password);

    // Query
    try {
        await query(`INSERT INTO users(userName,password,isAdmin) VALUES('${userName}','${hashedPassword}',${isAdmin === undefined ? 0 : isAdmin})`);
        return res.status(201).json({
            success: true,
            message: 'User Created Successfully',
        });
    } catch(error) {
        return res.status(500).json({
            success: false,
            message: error.sqlMessage,
        });
    }
}

const updateUser = async (req,res) => {

    const { userName, password, isAdmin } = req.body;

    if(!userName) {
        return res.status(400).json({
            success: false,
            message: 'User Name is Required'
        })
    }

    // Check if user exist
    let user = await query(`SELECT id FROM users WHERE id = ${req.params.id}`);
    if(user.length === 0) {
        return res.status(404).json({
            success: false,
            message: 'User Not Found'
        })
    }

    // check if user name alredy exist
    user = await query(`SELECT id FROM users WHERE userName = '${userName}' AND id != ${req.params.id}`);
    if(user.length !== 0) {
        return res.status(400).json({
            success: false,
            message: 'User Name Already Exists'
        })
    }

    // Hash the password
    const hashedPassword = password ? generateMD5(password) : null;
    
    // Query
    try {
        await query(`UPDATE users SET userName='${userName}'${password === undefined ? '' : `,password='${hashedPassword}'`}${isAdmin === undefined ? `,isAdmin=0` : `,isAdmin=${isAdmin}`} WHERE id = ${req.params.id}`);
        
        return res.status(200).json({
            success: true,
            message: 'User Updated Successfully',
        });

    } catch(error) {
        return res.status(500).json({
            success: false,
            message: error.sqlMessage,
        });
    }

}

const deleteUser = async (req,res) => {
    
    // check if user exits
    const user = await query(`SELECT id FROM users WHERE id = ${req.params.id}`);
        
    if(user.length === 0) {
        return res.status(404).json({
            success: false,
            message: 'User Not Found'
        })
    }

    // Query
    try{
        await query(`UPDATE users SET isDeleted = 1 WHERE id = ${req.params.id}`);  
        return res.status(200).json({
            success: true,
            message: 'User Deleted Successfully',
        });
    } catch(error) {
        return res.status(500).json({
            success: false,
            message: error.sqlMessage,
        });
    }

}

module.exports = {
    getAllUsers,
    addUser,
    updateUser,
    deleteUser
}