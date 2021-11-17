const express = require('express');
require('./db/mongoose.js')

const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
const port = process.env.PORT || 3000;

// app.use((req, res, next) => {
//     if(req.method === 'GET') {
//         res.send('GET requests are disabled')
//     } else {
//         next()
//     }
// })

// app.use((req, res, next) => {
//     res.status(503).send('We are working for new things, come bak later')
// })


app.use(express.json());
app.use(userRouter);
app.use(taskRouter);


app.listen(port, () => {
    console.log('Server is up on port' + port)
})


const Task = require('./models/task');
const User = require('./models/user');

const  main= async() => {
    // const task = await Task.findById('612a7f4285e47fc2d5747382');
    // await task.populate('owner').execPopulate()
    // console.log(task.owner)

    const user = await User.findById('612a7e4996927cc29d8c90b3');
    await user.populate('tasks').execPopulate()
    console.log(user.tasks) 
}

main();