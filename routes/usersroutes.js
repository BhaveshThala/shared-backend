const express = require('express')
const router = express.Router()
const { databaseConfig } = require('../config.js')
const { getUserModel } = require('shared-orm-library/src/entities/Users.js')

//Get All Users Information
router.get("/", async function (req, res) {
    try {
        const users = getUserModel(databaseConfig)
        await users.sync({alter : true})
        var record = await users.findAll({
            attributes: ['Id', 'FirstName', 'LastName', 'Email'],
        })
        if (record.length <= 0){
            return res.status(400).json({ "message": "No Data Found", "statusCode": 400 });
        }
        res.status(200).json({ "data": record, "statusCode": 200 })
    }
    catch (error) {
        return res.status(400).json({ "message": error, "statusCode": 400 });
    }
});

//Get Specified User Information
router.get("/:userId", async function (req, res) {
    try {
        var userId = parseInt(req.params.userId)
        if (isNaN(userId)) {
            return res.status(400).json({ "message": "Invalid Input" });
        }
        const users = getUserModel(databaseConfig)
        await users.sync({alter : true})
        var record = await users.findAll({
            where: {
                Id: userId,
            },
            attributes: ['Id', 'FirstName', 'LastName', 'Email']
        })
        if (record.length <= 0){
            return res.status(400).json({ "message": "No Data Found", "statusCode": 400 });
        }
        res.status(200).json({ "data": record, "statusCode": 200 })
    }
    catch (error) {
        return res.status(400).json({ "message": error, "statusCode": 400 });
    }
});

module.exports = router