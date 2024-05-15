const express = require('express')

const router = express.Router()

//Get All Users Information
router.get("/", async function (req, res) {
    try {
        res.status(200).json({ "data": "users data" })
    }
    catch (error) {
        return res.status(400).json({ "message": error });
    }
});

//Get Specified User Information
router.get("/:userId", async function (req, res) {
    try {
        var userId = parseInt(req.params.userId)
        if (isNaN(userId)){
            return res.status(400).json({ "message": "Invalid Input" });
        }
        res.status(200).json({ "data": `Passed UserId is ${userId}` })
    }
    catch (error) {
        return res.status(400).json({ "message": error });
    }
});

module.exports = router