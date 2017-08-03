var express = require('express')

var router = express.Router()

router.get('/login', function(req, res, next){
    res.render('login', {judul: "Halaman Login"})
})

module.exports = router
