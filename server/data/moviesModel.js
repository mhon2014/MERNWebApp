const mongoose = require('mongoose');

const {Schema} = mongoose;

const movieSchema = new Schema({

    // [ 'year', 'title', 'info' ]

    year:{type:Number,default:0},
    title:{type:String, default:'N/A'},
    info:{
        directors:{type:Array, default:[]},
        release_date:{type:String, default:'N/A'},
        rating:{type:Number, default:0.0},
        genres:{type:Array, default:[]},
        image_url:{type:String, default:''},
        plot:{type:String, default:'N/A'},
        rank:{type:Number, default:0},
        running_time_secs:{type:Number, default:0},
        actors:{type:Array, default:[]}
        }
})

const moviesModel = mongoose.model('movies', movieSchema)

module.exports = moviesModel;