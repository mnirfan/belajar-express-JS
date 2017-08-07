var chai = require('chai')
var chaiHttp = require('chai-http')
var should = chai.Should()
var db = require('mongoose')
var Film = require('../models/film')
var Actor = require('../models/actor')
var chaiThings = require('chai-things')

chai.use(chaiHttp)
chai.use(chaiThings)

var app = require('../app')

describe('Data Creation', function(){
    it('Create - seharusnya status true ketika data yg dikirim benar', function(done){
        // tambah data
        chai.request(app).post('/films').send({
            title: "Game of Throne II",
            year: 2015
        }).end(function(err, res){
            res.should.be.json
            res.should.have.status(200)
            res.body.should.have.property('success')
            res.body.success.should.be.equal(true)
            done()
        })
    })
})

describe('Update', function(){
    var film1 = new Film({
        title: "Kambing Jantan",
        year: 2007
    })

    var actor1 = new Actor({
        name: "Raditya Dika",
        age: 30,
        gender: "Cowok"
    })

    before(function(done){
        db.connection.collections.films.drop(function(){
            film1.save(function(err, film){
                db.connection.collections.actors.drop(function(){
                    actor1.save(function(err, actor){
                        done()
                    })
                })
            })
        })
    })

    it('should return success == true when update success', function(done){
        chai.request(app).put('/films/' + film1._id).send({
            title: 'Kambing Betina'
        }).end(function(err, res){
            res.should.be.json
            res.should.have.status(200)
            res.body.should.have.property('success')
            res.body.success.should.be.equal(true)
            res.body.film.title.should.be.equal('Kambing Betina')
            done()
        })
    })

    it('The return should contains the actor details after trying to refference actor to film model', function(done){
        chai.request(app).put('/films/' + film1._id + '/refference/').send({
            actorId: actor1._id
        }).end(function(err, res){
            res.should.be.json
            res.should.have.status(200)
            res.body.should.have.property('success')
            res.body.success.should.be.equal(true)
            res.body.film.actors.should.contain.a.thing.with.property('name', 'Raditya Dika')
            done()
        })
    })
})

// describe('Refferences', function(){
//     var film1 = new Film({
//         title: "Kambing Jantan",
//         year: 2007
//     })
//
//     var actor1 = new Actor({
//         name: "Raditya Dika",
//         age: 30,
//         gender: "Cowok"
//     })
//
//     beforeEach(function(done){
//         db.connection.collections.films.drop(function(){
//             film1.save(function(err, film){
//                 db.connection.collections.actors.drop(function(){
//                     actor1.save(function(err, actor){
//                         done()
//                     })
//                 })
//             })
//         })
//     })
//
//     it('The return should contains the actor details after trying to refference actor to film model', function(done){
//         chai.request(app).put('/films/' + film1._id + '/refference/').send({
//             actorId: actor1._id
//         }).end(function(err, res){
//             res.should.be.json
//             res.should.have.status(200)
//             res.body.should.have.property('success')
//             res.body.success.should.be.equal(true)
//             res.body.film.actors.should.contain.a.thing.with.property('name', 'Raditya Dika')
//             done()
//         })
//     })
// })
