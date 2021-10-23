const Task = require("../model/task");

exports.storeTask = async(req, res) => {
    try{
        const task = new Task(req.body);
        await task.save();
        return res.status(201).json({ success: true , task : task }); 
    }catch(e){
        return res.status(400).json({success: false, message: e.message});
    }

};

exports.fetchAllTask = async(req, res) => {
    const tasks = await Task.find();
    return res.json({success:true, tasks : tasks});
};

exports.getASingleTask =  async(req, res) => {
    const task = await Task.findById(req.params.id);
    if(!task){
        return res.status(404).json({
            success:false,
            message:'Task Not Found',
        });
    }
    return res.json({success:true, task});
};

exports.updateTask = async(req, res) => {
    //joi
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
};

exports.deleteTask = async(req, res) => {
    const task = await Task.findByIdAndDelete(req.params.id);
    if(!task){
        return res.status(404).json({
            success:false,
            message:'Task Not Found',
        });
    }
    return res.json({success:true, task});
};