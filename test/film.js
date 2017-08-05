var chai = require('chai')
var chaiHttp = require('chai-http')
var should = chai.Should()

chai.use(chaiHttp)

var app = require('../app')

describe('Film API', function(){
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
