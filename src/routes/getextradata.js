const express = require('express');
const router = express.Router();

const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const request = new XMLHttpRequest();

router.get('/videos/:idMovie', async(req,res)=>{
    const url = `https://api.themoviedb.org/3/movie/${req.params.idMovie}/videos?api_key=738c48370fbecf8d928baa0eb786bb67`;
    console.log(url);
    request.open("GET", url);
    request.send();
    request.onload = (e) => {
        res.send(request.responseText);
    }
});

module.exports = router;