const mongoose = require('mongoose');

var localUrl = "mongodb://localhost:27017/Info_Pelis_Series";
var remoteUrl = "mongodb://movieinfodb:wb8oTIaV4sZLMhlT39mppvbKeutGQjVTDS8X8dDQSVNhZ8CWegi0xknObdAwxfwwJR1yQNgNpteb3JDkVD0pyg==@movieinfodb.mongo.cosmos.azure.com:10255/InfoPelis?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@movieinfodb@";

mongoose.connect(remoteUrl)
.then(db=>console.log('User DB is connected'))
.catch(err=> console.error(err));

const {Schema} = mongoose;

const User = new Schema({
    name: String,
    lastname: String,
    user: String,
    password: String
});

module.exports = mongoose.model('User',User,'infouserdb');