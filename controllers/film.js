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
            }
}
