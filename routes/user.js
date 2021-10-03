const express = require('express');
const router = express.Router();
const User = require('../model/user.js')

router.post('/user', async(req, res) => {
    try{
        const user = new User(req.body);
        await user.save();
        return res.status(201).json({ success: true , user : user }); 
    }catch(e){
        return res.status(400).json({success: false, message: e.message});
    }

});

router.get('/user', async(req, res) => {
    const users = await User.find();
    return res.json({success:true, users : users});
});

router.get('/user/:id', async(req, res) => {
    const user = await User.findById(req.params.id);
    if(!user){
        return res.status(404).json({
            success:false,
            message:'User Not Found',
        });
    }
    return res.json({success:true, user});
});


router.patch('/user/:id', async(req, res) => {
    try{
        const user = await User.findByIdAndUpdate(req.params.id, req.body,{
            new:true,
            runValidators: true,
        });
    
        if(!user){
            return res.status(404).json({
                success:false,
                message:'User Not Found',
            });
        }
        return res.json({success:true, user});

    }catch(e){ 
        return res.status(404).json({
            success:false,
            message: e.message,
        });
    };        
});

router.delete('/user/:id', async(req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if(!user){
        return res.status(404).json({
            success:false,
            message:'User Not Found',
        });
    }
    return res.json({success:true, user});
});

module.exports = router;