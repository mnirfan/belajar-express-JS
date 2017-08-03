var express = require('express')

var Film = require('../models/film')

var router = express.Router()

router.get('/', function(req, res, next){
    Film.find({}, function(err, films){
        if(err){
            res.json(err)
        }else {
            res.json(films)
        }
    })
})

router.post('/', function(req, res, next){
    var film = new Film({
        title: req.body.title,
        year: req.body.year
    })

    film.save(function(err){
        var result = {}
        if(err){
            result.msg = err
        }
        else {
            result.msg = "Sukses"
        }
        res.json(result)
    })
})

router.delete('/:filmId', function(req, res){
    Film.findByIdAndRemove(req.params.filmId, function(err){
        if(err){
            res.json({
                msg: "Error"
            })
        }else {
            res.json({
                msg: "Deleted"
            })
        }

    })
})

module.exports = router
