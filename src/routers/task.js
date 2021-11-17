const express = require('express');
const router = new express.Router();
const auth =  require('../middleware/auth');
const Task = require('../models/task');


router.post('/tasks', auth, async (req, res) => {
    // const task = new Task(req.body);
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
    try {
        await task.save();
        res.status(201).send(task);
    } catch (error) {
        res.status(400).send(error);
    }
})

router.get('/tasks', auth, async (req, res) => {
    try {
        const tasks = await Task.find({}); 
        res.send(tasks)
    } catch (error) {
        res.status(500).send(error)
    }
});
 
// get all task by the user who created the tasks
router.get('/tasks/user', auth, async(req, res) => {
    try {
        await req.user.populate('tasks').execPopulate();
        res.send(req.user.tasks)

    } catch (error) {
        res.status(500).send(error)
    }
})



router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id;
    try {
        const task = await Task.findById(_id);
        if(!task){
            return res.status(404).send();
        }
        res.send(task);
    } catch (error) {
        res.status(500).send(error)
    }
});

// get task only created by the user
router.get('/tasks/user/:id', auth, async(req, res) => {
    const _id = req.params.id;
    try {
        const task = await Task.findById({_id, owner: req.user._id});
        if(!task) {
            return res.status(404).send()
        }
        res.send(task);
    } catch (error) {
        res.status(500).send()
    }
})


//edit the task that you created
router.patch('/tasks/:id', auth, async(req, res) => {
    const _id = req.params.id;
    const updates = Object.keys(req.body);
    const validUpdates = ['description', 'compleated'];
    const isValidUpdate = updates.every((update )=> validUpdates.includes(update));

    if(!isValidUpdate) {
        return res.status(400).send({error: 'Invalid update'})
    }

    try {
        // edit no matter if you acreated const task = await Task.findById(_id);
        const task = await Task.findOne({_id, owner: req.user._id});
        if(!task) {
            res.status(404).send();
        }

        updates.forEach(update => task[update] = req.body[update]);
        await task.save();
        res.send(task)
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});


router.delete('/tasks/:id', async(req, res) => {
    const _id = req.params.id;
    const task = await Task.findByIdAndDelete(_id);
    if(!task){
        return res.status(404).send();
    }
    res.send(task);
});

//delete only tasks that you create
router.delete('/tasks/user/:id', auth, async(req, res) =>{
    const _id = req.params.id;
    const task =  await Task.findOneAndDelete({_id, owner:req.user._id});
    if(!task){
        res.status(404).send();
    }
    res.send(task);
})


module.exports = router;