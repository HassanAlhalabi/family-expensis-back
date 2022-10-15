const {query} = require('../db');

const getAllMaterials = async (req,res) => {

    // Query
    try {
        const data = await query(`SELECT * From materials WHERE isDeleted = 0`);
        return res.status(200).json({
            success: true,
            message: null,
            materials: data,
        });
    } catch(error) {
        return res.status(500).send(error)
    }

}

const getAllServices = async (req,res) => {

    // Query
    try {
        const data = await query(`SELECT * From materials WHERE isDeleted = 0 AND isService = 1`);
        return res.status(200).json({
            success: true,
            message: null,
            materials: data,
        });
    } catch(error) {
        return res.status(500).send(error)
    }

}

const addMaterial = async (req,res) => {

    const { name, isService, description } = req.body;

    // Validate
    if(!name || !description) {
        return res.status(400).json({
            success: false,
            message: 'Material Name and Description are Required'
        })
    }

    // Query
    try {
        await query(`INSERT INTO materials(name,isService,description) VALUES('${name}',${isService === undefined ? 1 : 0},'${description}')`);
        return res.status(201).json({
            success: true,
            message: 'Material Created Successfully',
        });
    } catch(error) {
        return res.status(500).json({
            success: false,
            message: error.sqlMessage,
        });
    }

}

const updateMaterial = async (req,res) => {

    const { name, isService, description } = req.body;

    // Validate
    if(!name || !description) {
        return res.status(400).json({
            success: false,
            message: 'Material Name and Description are Required'
        })
    }

    // Check if material exist
    const material = await query(`SELECT id FROM materials WHERE id = ${req.params.id}`);
    if(material.length === 0) {
        return res.status(404).json({
            success: false,
            message: 'Material Not Found'
        })
    }

    // Query
    try {
        await query(`UPDATE materials SET name='${name}'${isService !== undefined ? `,isService=${isService}` : ``},description='${description}' WHERE id = ${req.params.id}`);
        return res.status(200).json({
            success: true,
            message: 'Material Updated Successfully',
        });
    } catch(error) {
        return res.status(500).json({
            success: false,
            message: error.sqlMessage,
        });
    }

}

const deleteMaterial = async (req,res) => {
    
    // Check if Material Exist
    const material = await query(`SELECT id FROM materials WHERE id = ${req.params.id}`);
    if(material.length === 0) {
        return res.status(404).json({
            success: false,
            message: 'Material Not Found'
        })
    }

    // Query
    try {
        await query(`UPDATE materials SET isDeleted = 1 WHERE id = ${req.params.id}`);
        return res.status(200).json({
            success: true,
            message: 'Material Deleted Successfully',
        });
    } catch(error) {
        return res.status(500).json({
            success: false,
            message: error.sqlMessage,
        });
    }
}

module.exports = {
    getAllMaterials,
    addMaterial,
    updateMaterial,
    deleteMaterial,
    getAllServices 
}