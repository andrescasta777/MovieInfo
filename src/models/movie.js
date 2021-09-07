const mongoose = require('mongoose');

var localUrl = "mongodb://localhost:27017/Info_Pelis_Series";
var remoteUrl = "mongodb://movieinfodb:wb8oTIaV4sZLMhlT39mppvbKeutGQjVTDS8X8dDQSVNhZ8CWegi0xknObdAwxfwwJR1yQNgNpteb3JDkVD0pyg==@movieinfodb.mongo.cosmos.azure.com:10255/InfoPelis?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@movieinfodb@";

mongoose.connect(remoteUrl)
.then(db=>console.log('Movie DB is connected'))
.catch(err=> console.error(err));

const {Schema} = mongoose;

const Movie = new Schema({
    adult: Boolean,
    backdrop_path: String,
    genre_ids: Array,
    id: Number,
    original_language: String,
    original_title: String,
    overview: String,
    poster_path: String,
    release_date: String,
    title: String,
    video: Boolean,
    vote_average: Number,
    vote_count: Number
});

module.exports = mongoose.model('Movie',Movie,'infomoviedb');
//module.exports = mongoose.model('Movie',Movie);