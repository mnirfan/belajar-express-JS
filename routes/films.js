var express = require('express')

var filmController = require('../controllers/film')

var router = express.Router()

router.get('/', filmController.index)

router.post('/', filmController.create)

router.delete('/:filmId', filmController.destroy)

router.put('/:filmId', filmController.update)

router.put('/:filmId/refference', filmController.actorRefference)

module.exports = router
