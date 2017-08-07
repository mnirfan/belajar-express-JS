var db = require('mongoose')

var Schema = db.Schema

var actorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    age: Number,
    gender: {
        type: String,
        enum: ['Cowok', 'Cewek'],
        required: true
    }
}, {
    timestamps: true
})

module.exports = db.model('Actor', actorSchema)
