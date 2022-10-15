const {query} = require('../db');
const jwt = require('jsonwebtoken');

const getAllOutlays = async (req,res) => {

    const queryString = `SELECT 
                            outlays.id AS id,
                            users.id AS userId,
                            users.userName AS userName,
                            materials.id AS materialId,
                            materials.name AS material,
                            outlaytypes.id As outlayTypeId,
                            outlaytypes.name As outlayType,
                            price,
                            date,
                            outlays.description
                        FROM 
                            outlays
                        INNER JOIN
                            users ON users.id = outlays.userId
                        INNER JOIN
                            materials ON materials.id = outlays.materialId
                        INNER JOIN 
                            outlaytypes ON outlaytypes.id = outlays.outlayTypeId`

    // Query
    try {
        const outlays = await query(queryString);
        return res.status(200).json({
            success: true,
            message: null,
            outlays,
        });
    } catch(error) {
        return res.status(500).json({
            success: false,
            message: error.sqlMessage,
            user: null,
        });
    }

}

const getAllUsersOutlays = async (req,res) => {

    const decodedToken = jwt.verify(req.headers.authorization.split(' ')[1],process.env.PRIVATE_KEY);

    const userId = decodedToken.userId;

    const queryString = `SELECT 
                            outlays.id AS id,
                            materials.id AS materialId,
                            materials.name AS material,
                            outlaytypes.id As outlayTypeId,
                            outlaytypes.name As outlayType,
                            price,
                            date,
                            outlays.description
                        FROM 
                            outlays
                        INNER JOIN 
                            materials ON materials.id = outlays.materialId
                        INNER JOIN 
                            outlaytypes ON outlaytypes.id = outlays.outlayTypeId
                        WHERE 
                            userId = ${userId}`

    // Query
    try {
        const userOutlays = await query(queryString);
        return res.status(200).json({
            success: true,
            message: null,
            outlays: userOutlays ,
        });
    } catch(error) {
        return res.status(500).json({
            success: false,
            message: error.sqlMessage,
            user: null,
        });
    }

}

const addUserOutlay = async (req,res) => {

    const decodedToken = jwt.verify(req.headers.authorization.split(' ')[1],process.env.PRIVATE_KEY);

    const userId = decodedToken.userId;

    const { materialId, outlayTypeId, price,date, description } = req.body;

    if(!materialId || !outlayTypeId || !price || !description) {
        return res.status(400).json({
            success: false,
            message: 'Required Fields Are Missing!'
        })
    }

    let queryString = `INSERT INTO outlays(userId,materialId,outlayTypeId,price,description) 
                        VALUES('${userId}','${materialId}', '${outlayTypeId}','${price}','${description}')`

    if(date) {
        queryString = `INSERT INTO outlays(userId,materialId,outlayTypeId,price,date,description) 
        VALUES('${userId}','${materialId}', '${outlayTypeId}','${price}','${date}','${description}')`
    }

    // Query
    try {
        await query(queryString);   
        return res.status(201).json({
            success: true,
            message: 'Outlay Added Successfully',
        });
    } catch(error) {
        return res.status(500).json({
            success: false,
            message: error.sqlMessage,
        });
    }

}

const updateUserOutlay = async (req,res) => {

    const decodedToken = jwt.verify(req.headers.authorization.split(' ')[1],process.env.PRIVATE_KEY);

    const { materialId, outlayTypeId, price,date, description, userId } = req.body;

    if(!materialId || !outlayTypeId || !price || !description || !userId) {
        return res.status(400).json({
            success: false,
            message: 'Required Fields Are Missing!'
        })
    }

    // Check if outlay exist
    const outlay = await query(`SELECT id FROM outlays WHERE id = ${req.params.id} AND userId = ${userId}`);
    if(outlay.length === 0) {
        return res.status(404).json({
            success: false,
            message: 'Outlay Not Found'
        })
    }

    let queryString =   `UPDATE 
                            outlays 
                        SET 
                            materialId=${materialId},
                            outlayTypeId=${outlayTypeId},
                            price=${price},
                            description='${description}'
                        WHERE id = ${req.params.id}
                        AND userId = ${userId}`

    if(date) {
        queryString = `UPDATE 
                            outlays 
                        SET 
                            materialId=${materialId},
                            outlayTypeId=${outlayTypeId},
                            price=${price},
                            date='${date}',
                            description='${description}'
                        WHERE id = ${req.params.id}
                        AND userId = ${userId}`
    }

    try {
        // Query
        await query(queryString);
        return res.status(200).json({
            success: true,
            message: 'Outlay Updated Successfully',
        });
    } catch(error) {
        return res.status(500).json({
            success: false,
            message: error.sqlMessage,
        });
    }

}

const deleteUserOutlay = async (req,res) => {

    const decodedToken = jwt.verify(req.headers.authorization.split(' ')[1],process.env.PRIVATE_KEY);

    const userId = decodedToken.userId;
    
    // Check if outlay exist
    const outlay = await query(`SELECT id FROM outlays WHERE id = ${req.params.id}`);
    if(outlay.length === 0) {
        return res.status(404).json({
            success: false,
            message: 'Outlay Not Found'
        })
    }

    // Query
    try {
        await query(`DELETE FROM outlays WHERE id = ${req.params.id} AND userId = ${userId}`);
        return res.status(200).json({
            success: true,
            message: 'Outlay Deleted Successfully',
        });
    } catch(error) {
        return res.status(500).json({
            success: false,
            message: error.sqlMessage,
        });
    }

}

module.exports = {
    getAllOutlays,
    getAllUsersOutlays,
    addUserOutlay,
    updateUserOutlay,
    deleteUserOutlay
}