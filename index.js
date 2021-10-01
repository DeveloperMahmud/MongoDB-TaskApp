const mongoose = require('mongoose');
const colors = require('colors');
const express = require('express');

const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/taskAppDB', {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(()=> console.log('Database is Connected'))
.catch((err)=> console.error(err));

const User = require('./model/user.js');
const Task = require('./model/task.js');

app.post('/task', async(req, res) => {
    try{
        const task = new Task(req.body);
        await task.save();
        return res.status(201).json({ success: true , task : task }); 
    }catch(e){
        return res.status(400).json({success: false, message: e.message});
    }

});

app.post('/user', async(req, res) => {
    try{
        const user = new User(req.body);
        await user.save();
        return res.status(201).json({ success: true , user : user }); 
    }catch(e){
        return res.status(400).json({success: false, message: e.message});
    }

});

app.get('/task', async(req, res) => {
    const tasks = await Task.find();
    return res.json({success:true, tasks : tasks});
});

app.get('/user', async(req, res) => {
    const users = await User.find();
    return res.json({success:true, users : users});
});

app.get('/user/:id', async(req, res) => {
    const user = await User.findById(req.params.id);
    if(!user){
        return res.status(404).json({
            success:false,
            message:'User Not Found',
        });
    }
    return res.json({success:true, user});
});

app.get('/task/:id', async(req, res) => {
    const task = await Task.findById(req.params.id);
    if(!task){
        return res.status(404).json({
            success:false,
            message:'Task Not Found',
        });
    }
    return res.json({success:true, task});
});

app.patch('/user/:id', async(req, res) => {
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

app.patch('/task/:id', async(req, res) => {
    try{
        const task = await Task.findByIdAndUpdate(req.params.id, req.body,{
            new:true,
            runValidators: true,
        });
    
        if(!task){
            return res.status(404).json({
                success:false,
                message:'Task Not Found',
            });
        }
        return res.json({success:true, task});

    }catch(e){ 
        return res.status(404).json({
            success:false,
            message: e.message,
        });
    };        
});

app.delete('/user/:id', async(req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if(!user){
        return res.status(404).json({
            success:false,
            message:'User Not Found',
        });
    }
    return res.json({success:true, user});
});

app.delete('/task/:id', async(req, res) => {
    const task = await Task.findByIdAndDelete(req.params.id);
    if(!task){
        return res.status(404).json({
            success:false,
            message:'Task Not Found',
        });
    }
    return res.json({success:true, task});
});

const port = process.env.PORT || 4040;
app.listen(port, () => console.log(`Server is Running at port : ${port}`));

// async function db(){
//     try{
//         // const user = new User({
//         //     name: ' asddas LSD ',
//         //     age: 191,
//         //     email: 'lsd1@gmail.com',
//         //     password:'abc12D'

//         // });
//         // await user.save()
//         // console.log(user);

//         const task = new Task({
//             description: '  test task              ', 
//             isCompleted: true
//         });
//         await task.save()
//         console.log(task);

//     }catch(e){
//         console.log(colors.red.underline.bold (e.message));
//     }
// }

// db();

/*
    REST API DESIGN FOR:-
    ====================

    /task POST 
    /task GET 
    /task/:id GET 
    /task/:id PATCH 
    /task/:id DELETE 

    =================

    /user POST 
    /user GET 
    /user/:id GET 
    /user/:id PATCH 
    /user/:id DELETE 
*/
