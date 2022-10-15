const {query} = require('../db');

const getMonthTotal = async (req,res) => {

    const {year, month} = req.query;

    if(!year,!month) {
        return res.status(400).json({
            success: false,
            message: 'Year and Month are Required'
        })
    }

    const outlaysQueryString = `SELECT 
                            outlays.id AS id,
                            users.userName AS userName,
                            materials.name AS material,
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
                            outlaytypes ON outlaytypes.id = outlays.outlayTypeId
                        WHERE 
                            month(Date) = ${month} AND year(Date) = ${year}`;

    const queryString = `SELECT SUM(price) as total FROM outlays WHERE year(Date) = ${year} AND month(Date) = ${month}`;


    // Query
    try {
        const outlaysQuery = await query(outlaysQueryString);
        const totalQuery = await query(queryString);
        return res.status(200).json({
            outlays: outlaysQuery,
            total: totalQuery[0].total
        })
    } catch(error) {
        return res.status(400).json(error)
    }
    
}

const getYearTotal = async (req,res) => {
    const {year} = req.query;

    if(!year) {
        return res.status(400).json({
            success: false,
            message: 'Year are Required'
        })
    }

    const outlaysQueryString = `SELECT 
                                    outlays.id AS id,
                                    users.userName AS userName,
                                    materials.name AS material,
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
                                    outlaytypes ON outlaytypes.id = outlays.outlayTypeId
                                WHERE 
                                    year(Date) = ${year}`;

    const queryString = `SELECT SUM(price) as total FROM outlays WHERE year(Date) = ${year}`;


    // Query
    try {
        const outlaysQuery = await query(outlaysQueryString);
        const totalQuery = await query(queryString);
        return res.status(200).json({
            outlays: outlaysQuery,
            total: totalQuery[0].total
        })
    } catch(error) {
        return res.status(400).json(error)
    }
}

const getUserTotal = async (req,res) => {

    const {userId} = req.query;

    if(!userId) {
        return res.status(400).json({
            success: false,
            message: 'User Id are Required'
        })
    }

    const outlaysQueryString = `SELECT 
                                    outlays.id AS id,
                                    users.userName AS userName,
                                    materials.name AS material,
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
                                    outlaytypes ON outlaytypes.id = outlays.outlayTypeId
                                WHERE 
                                    users.id = ${userId}`;

    const queryString = `SELECT SUM(price) as total FROM outlays WHERE userId = ${userId}`;


    // Query
    try {
        const outlaysQuery = await query(outlaysQueryString);
        const totalQuery = await query(queryString);
        return res.status(200).json({
            outlays: outlaysQuery,
            total: totalQuery[0].total
        })
    } catch(error) {
        return res.status(400).json(error)
    }
}

const getMaterialTotal = async (req,res) => {

    const {materialId} = req.query;

    if(!materialId) {
        return res.status(400).json({
            success: false,
            message: 'Material Id are Required'
        })
    }

    const outlaysQueryString = `SELECT 
                                    outlays.id AS id,
                                    users.userName AS userName,
                                    materials.name AS material,
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
                                    outlaytypes ON outlaytypes.id = outlays.outlayTypeId
                                WHERE 
                                    materials.id = ${materialId}`;

    const queryString = `SELECT SUM(price) as total FROM outlays WHERE materialId = ${materialId}`;


    // Query
    try {
        const outlaysQuery = await query(outlaysQueryString);
        const totalQuery = await query(queryString);
        return res.status(200).json({
            outlays: outlaysQuery,
            total: totalQuery[0].total
        })
    } catch(error) {
        return res.status(400).json(error)
    }
}

const getServicesTotal = async (req,res) => {

    const {materialId} = req.query;

    let serviceTotalQuery = '';

    const servicesTotalQuery = `SELECT 
                                    SUM(price) as serviceTotal
                                FROM 
                                    outlays
                                INNER JOIN 
                                    materials ON materials.id = outlays.materialId
                                WHERE 
                                    materials.isService = 1`;
                // Query
    try {
        serviceTotalQuery = await query(servicesTotalQuery);
    } catch(error) {
        return res.status(400).json(error)
    }

    if(!materialId) {
        return res.status(400).json({
            success: false,
            message: 'Material Id are Required'
        })
    }

    const outlaysQueryString = `SELECT 
                                    outlays.id AS id,
                                    users.userName AS userName,
                                    materials.name AS material,
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
                                    outlaytypes ON outlaytypes.id = outlays.outlayTypeId
                                WHERE 
                                    materials.id = ${materialId} AND materials.isService = 1`;

    const queryString = `SELECT SUM(price) as total FROM outlays WHERE materialId = ${materialId}`;


    // Query
    try {
        const outlaysQuery = await query(outlaysQueryString);
        const totalQuery = await query(queryString);
        return res.status(200).json({
            outlays: outlaysQuery,
            total: totalQuery[0].total,
            servicesTotal: serviceTotalQuery[0].serviceTotal
        })
    } catch(error) {
        return res.status(400).json(error)
    }
}


module.exports = {
    getMonthTotal,
    getYearTotal,
    getUserTotal,
    getMaterialTotal,
    getServicesTotal
}