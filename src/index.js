const express =  require('express');
const morgan = require('morgan');

const app = express();

//Settings
app.set('port',process.env.PORT || 3000);

//Middlewares
app.use(morgan('dev'));
app.use(express.json());

//Routes
app.use('/api/tasks',require('./routes/task'));
app.use('/api/extradata',require('./routes/getextradata'));
app.use('/api/users',require('./routes/getUserInfo'));

//Static Files
app.use(express.static(__dirname + '\\public'));

//Server in listening the server
app.listen(app.get('port'),()=>{
    console.log('Server on port',app.get('port'));
})
