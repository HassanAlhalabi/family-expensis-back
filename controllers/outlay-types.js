const {query} = require('../db');

const getAllOutlayTypes = async (req,res) => {
    // Query
    try {
        const data = await query(`SELECT id,name,description From outlayTypes WHERE isDeleted = 0`);
        return res.status(200).json({
            success: true,
            message: null,
            outlayTypes: data,
        });
    } catch(error) {
        return res.status(500).json({
            success: false,
            message: error.sqlMessage,
        });
    }
}

const addOutlayType = async (req,res) => {

    const { name, description } = req.body;

    if(!name) {
        return res.status(400).json({
            success: false,
            message: 'Outlay Type Name is Required'
        })
    }

    let queryString = `INSERT INTO outlayTypes(name) VALUES('${name}')`
    if(description) {
        queryString = `INSERT INTO outlayTypes(name,description) VALUES('${name}','${description}')`
    }

    // Query
    try {
        await query(queryString);
        return res.status(201).json({
            success: true,
            message: 'Outlay Type Created Successfully',
        });
    } catch(error) {
        return res.status(500).json({
            success: false,
            message: error.sqlMessage,
        });
    }

}

const updateOutlayType = async (req,res) => {

    const { name, description } = req.body;

    if(!name) {
        return res.status(400).json({
            success: false,
            message: 'Outlay Type Name is Required'
        })
    }

    // Check if outlay exist
    const outlayType = query(`SELECT id FROM outlayTypes WHERE id = ${req.params.id}`);

    if(outlayType.length === 0) {
        return res.status(404).json({
            success: false,
            message: 'Outlay Type Not Found'
        })
    }
    
    let queryString = `UPDATE outlayTypes SET name='${name}' WHERE id = ${req.params.id}`

    if(description) {
        queryString = `UPDATE outlayTypes SET name='${name}', description='${description}'  WHERE id = ${req.params.id}`
    }

    // Query
    try {
        await query(queryString);
        return res.status(200).json({
            success: true,
            message: 'Outlay Type Updated Successfully',
        });
    } catch(error) {
        return res.status(500).json({
            success: false,
            message: error.sqlMessage,
        });
    }

}

const deleteOutlayType = async (req,res) => {
    
    // Check if outlay exist
    const outlayType = query(`SELECT id FROM outlayTypes WHERE id = ${req.params.id}`);

    if(outlayType.length === 0) {
        return res.status(404).json({
            success: false,
            message: 'Outlay Type Not Found'
        })
    }

    // Query
    try {
        await query(`UPDATE outlayTypes SET isDeleted = 1 WHERE id = ${req.params.id}`);
        return res.status(500).json({
            success: false,
            message: error.sqlMessage,
        });
    } catch(error) {
        return res.status(200).json({
            success: true,
            message: 'Outlay Type Deleted Successfully',
        });
    }
            
}

module.exports = {
    getAllOutlayTypes,
    addOutlayType,
    updateOutlayType,
    deleteOutlayType
}