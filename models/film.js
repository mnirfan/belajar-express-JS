var db = require('mongoose')

var Schema = db.Schema

var filmSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    year: Number,
    released: Boolean,
},{
    timestamps: true
})

var Film = db.model('Film', filmSchema)
module.exports = Film
