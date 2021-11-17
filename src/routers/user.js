
const express = require('express');
const auth = require('../middleware/auth');
const router = new express.Router();
const User = require('../models/user');

router.post('/users', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        const token = await user.genetareAuthToken();
        res.status(201).send({user, token});
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post('/users/login', async(req, res) => {
    const{ email, password } = req.body;
    try {
        const user = await User.findByCredentials(email, password);
        const token = await user.genetareAuthToken();
        res.send({user, token});
    } catch (error) {
       res.status(400).send(error) 
    }
});

router.post('/users/logout', auth, async(req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) =>{
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send();
    }
});

router.post('/users/logoutAll', auth, async(req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send();
    } catch (error) {
        res.status(500).send();
    }
})

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
});

router.get('/users/:id', auth, async (req, res) => {
    const _id = req.params.id;
    try {
        const user = await User.findById(_id);
        if(!user){
            res.status(404).send();
        }
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.patch('/users/:id', auth, async(req, res) => {
    const _id = req.params.id;
    const updates = Object.keys(req.body);
    const allowUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowUpdates.includes(update));
    
    if(!isValidOperation){
        return res.status(400).send({error: 'Invalid updates!'})
    }
    try {
        const user = await User.findById(_id);
       
        updates.forEach((update) => user[update] = req.body[update]);
        await user.save();
        
        if(!user ){
            res.status(404).send();
        }
        res.send(user);
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
});

router.delete('/users/:id', auth, async (req, res) => {
    _id = req.params.id;
    const user = await User.findByIdAndDelete(_id);
    if(!user) {
        return res.status(404).send()
    }
    res.send(user);
});

router.delete('/users/me', auth, async(req, res) => {
    try {
        await req.user.remove();
        res.send(req.user)
    } catch (error) {
        res.status(500).send()
    }
})

module.exports = router;