const mongoose = require('mongoose');
const colors = require('colors');
mongoose.connect('mongodb://localhost:27017/taskAppDB', 
{
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(()=> console.log('Database is Connected'))
    .catch((err)=> console.error(err));
    ;
const User = require('./model/user.js');
const Task = require('./model/task.js');

async function db(){
    try{
        // const user = new User({
        //     name: ' asddas LSD ',
        //     age: 191,
        //     email: 'lsd1@gmail.com',
        //     password:'abc12D'

        // });
        // await user.save()
        // console.log(user);

        const task = new Task({
            description: '  test task              ',
            isCompleted: true
        });
        await task.save()
        console.log(task);

    }catch(e){
        console.log(colors.red.underline.bold (e.message));
    }
}

db();


