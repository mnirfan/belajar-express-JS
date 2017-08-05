var express = require('express')

var filmController = require('../controllers/film')

var router = express.Router()

router.get('/', filmController.index)

router.post('/', filmController.create)

router.delete('/:filmId', filmController.destroy)

module.exports = router
