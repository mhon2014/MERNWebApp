const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const session = require('express-session');
const path = require('path');

// json file for initial load
const moviesdata = require('../movies.json');

// console.log(Object.keys(moviesdata[0].info))

// console.log(moviesdata[0].info.genres)


//Controller Layer
const moviesRouter = require('./controller/moviesRouter')
const userRouter = require('./controller/userRouter')

//Service Layer

//Data Layer
const movies = require('./data/moviesModel');

// const users = require('./data/userModel')
// const movies = require('./data/moviesModel');

const app = express();

app.use(cors( {origin: 'http://localhost:3000'   ,credentials: true}
    ));
app.use(bodyparser.json({limit: '50mb'}));
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());



app.use(
    session({
        key:'userId',
        secret: 'secretkey',
        saveUninitialized: true,
        resave: false,
        cookie: { expires: 1000 * 60 * 60 * 24 }
    }));


// app.use((req, res, next) => { 
//     console.log(req.session);
//     next();
// })



const port = process.env.PORT || 5000;

mongoose.connect('mongodb://localhost:27017/movies-MichaelHon-2207')

let conn = mongoose.connection;


conn.on('open', function () {
    console.log('Connected');
});


conn.on('disconnected',function(){
    console.log('Disconnected');
})

movies.estimatedDocumentCount().then(result => {
    if (result === 0){
        movies.insertMany(moviesdata)
    }
})

// app.get('/', (req, res) => {
    // console.log(req.session)
//     res.send("helloooooo")
//     // console.log("helloooo")
// })

// app.use('/api/movies', moviesRouter)

app.use('/api/user', userRouter);

app.use('/api/movies', moviesRouter)



app.listen(port, ()=> console.log(`Server is listening on on ${port}`))