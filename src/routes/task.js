const express = require('express');
const router = express.Router();

const Movie = require('../models/movie');

router.get('/', async(req,res)=>{
    const movies = await Movie.find();
    res.json(movies);
});

router.get('/:id', async(req,res)=>{
    const movies = await Movie.find({id:req.params.id});
    res.json(movies);
});

router.post('/',async(req,res)=>{
    var mov = new Movie(req.body);
    await mov.save();
    mov.save
    res.json(mov);
});

router.put('/:id',async(req,res)=>{
    console.log(req.params.id);
    console.log(req.body);
    await Movie.findByIdAndUpdate(req.params.id,req.body);
    res.json('RECEIVED');
});

router.delete('/:id',async(req,res)=>{
    await Movie.findByIdAndRemove(req.params.id);
    res.json('DELETED');
});

module.exports = router;