var Film = require('../models/film')

module.exports = {
    create: function(req, res, next){
        var film = new Film({
            title: req.body.title,
            year: req.body.year
        })

        film.save(function(err){
            var result = {}
            if(err){
                result.msg = err
                result.success = false
            }
            else {
                result.msg = "Sukses"
                result.success = true
            }
            res.json(result)
        })
    },

    update: function(req, res, next){
        var result = {
            success: false,
            msg: 'fail',
            film: {}
        }
        Film.findOneAndUpdate(
            {_id: req.params.filmId},
            {$set: req.body},
            {new: true},
            function(err, film){
                if(err){
                    result.msg = err
                }else {
                    result.success = true
                    result.msg = "berhasil"
                    result.film = film

                }
                res.json(result)
            }
        )
    },

    index: function(req, res, next){
        Film.find({}, function(err, films){
            if(err){
                res.json(err)
            }else {
                res.json(films)
            }
        })
    },

    destroy: function(req, res){
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
    },

    actorRefference: function(req, res){
        var result = {
            success: false,
            msg: "Gagal Refference :",
            film: {}
        }
        Film.findOneAndUpdate(
            { _id: req.params.filmId },
            {$set: { actors: [req.body.actorId] } },
            {new: true},
            function(err, film){
                if(err){
                    result.msg += err
                }else {
                    result.success = true
                    result.msg = "Berhasil Refference"
                }

                Film.findOne(film).populate('actors').exec(function(err, film){
                    result.film = film

                    res.json(result)
                })
            }
        )
    }
}
