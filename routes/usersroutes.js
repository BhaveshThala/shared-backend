const express = require('express')
const router = express.Router()
const { databaseConfig } = require('../config.js')
const { getUserModel } = require('shared-orm-library/src/entities/Users.js')

const usersModel = getUserModel(databaseConfig)

//Get All Users Information
router.get("/", async function (req, res) {
    try {
        var record = await usersModel.findAll({
            attributes: ['Id', 'FirstName', 'LastName', 'Email'],
        })
        if (record.length <= 0) {
            return res.status(400).json({ "message": "No Data Found", "statusCode": 400 });
        }
        res.status(200).json({ "data": record, "statusCode": 200 })
    }
    catch (error) {
        return res.status(400).json({ "message": error, "statusCode": 400 });
    }
});

//Insert new Users
router.post("/", async (req, res) => {
    try {
        var userInput = req.body;
        await usersModel.create(
            {
                Email: userInput.email,
                Password: userInput.password,
                FirstName: userInput.firstName,
                LastName: userInput.lastName
            }
        );
        res.status(200).json({ "message": "User Created Successfully", "statusCode": 200 })
    }
    catch (error) {
        console.log("Error while creating new User :", error)
        return res.status(400).json({ "message": "Something went wrong", "statusCode": 400 });
    }
})

//Get Specific User Information by userId
router.get("/:userId", async function (req, res) {
    try {
        var userId = parseInt(req.params.userId)
        if (isNaN(userId)) {
            return res.status(400).json({ "message": "Invalid Input" });
        }
        var record = await usersModel.findAll({
            where: {
                Id: userId,
            },
            attributes: ['Id', 'FirstName', 'LastName', 'Email']
        })
        if (record.length <= 0) {
            return res.status(400).json({ "message": "No Data Found", "statusCode": 400 });
        }
        res.status(200).json({ "data": record, "statusCode": 200 })
    }
    catch (error) {
        return res.status(400).json({ "message": error, "statusCode": 400 });
    }
});

module.exports = router