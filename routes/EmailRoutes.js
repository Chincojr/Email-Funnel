const express = require('express')

const Email_function = require('../controller/NodeEmail')

const router = express.Router()

router.post('/send', Email_function)

module.exports = router