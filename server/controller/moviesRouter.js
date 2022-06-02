const express = require('express')
const movies = require('../data/moviesModel');

const moviesRouter = express.Router();

moviesRouter.get('/getmovies', (req, res) => {
    movies.find()
    .then(data => {
    res.send(data)
    }
    )
})

moviesRouter.get('/getmoviesid', (req, res) => {
    // console.log(req.query)
    // console.log(req.query.data)
    movies.find({'_id': {$in :(req.query.data)}})
    .then(data => {
        // console.log(data)
        res.send(data)
        }
    )
})

moviesRouter.get('/getgenres', (req, res) => {
    movies.find()
    .then(data => {
        // console.log(data)
        return data.map(e => e.info.genres)
        // return data.map(e => e.info.genre)
        // return new Set([...data.forEach(e => e.info.genre)])
        // res.send(data)
    })
    .then(flatten => {
        return [].concat(...flatten)
        // console.log(result)
    })
    .then(array => {
        return [...new Set(array)]
    })
    .then(final => {
        // console.log(final.length)
        res.send(final)
    })
})

moviesRouter.get('/getgenremovies', (req, res) =>{
    // console.log(req.query);
    movies.find({'info.genres' : req.query.genre  })
    .sort({'info.rating' : 'desc'})
    .limit(req.query.limit)
    .then(result => res.send(result))
})

module.exports = moviesRouter;