const express = require('express');
const router = express.Router();

const User = require('../models/user');

router.get('/:user/:pwd', async(req,res)=>{
    const user = await User.find({user:req.params.user,password:req.params.pwd});
    res.json(user);
});

module.exports = router;