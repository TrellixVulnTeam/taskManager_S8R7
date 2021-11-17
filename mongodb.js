
const { MongoClient, ObjectID } = require('mongodb') 

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = "task-manager";

MongoClient.connect(connectionURL, {useNewUrlParser: true, useUnifiedTopology:true}, (error, client) => {
    if(error) {
        return console.log('Unable to connect to database!')
    }
    const db = client.db(databaseName);

    // db.collection('users').findOne({_id: new ObjectID('61130fa858e2f1a12da71756')}, (error, user) => {
    //     if(error){
    //         return console.log('Unable to fetch data')
    //     }
    //     console.log(user);
    // });

    // db.collection('users').find({age: 27}).toArray((error, users) => {
    //     console.log(users);
    // })
    // db.collection('users').find({age: 27}).count((error, count) => {
    //     console.log(count);
    // })

    // db.collection('tasks').findOne({_id: new ObjectID('611311e495f3d5a1b30c78c1')}, (error, task) => {
    //     if(error) {
    //         console.log('unable to fetch')
    //     }
    //     console.log(task)
    // })

    // db.collection('tasks').find({compleated: false}).toArray((error, task) => {
    //     if(error){
    //         console.log('unable to fetch data')
    //     }
    //     console.log(task)
    // })

    // db.collection('users').updateOne({
    //     _id: new ObjectID('61116eff586d53456dce30f0')
    // }, {
    //     $set: {
    //         name: 'Charpentier'
    //     }
    // }).then((result)=> {
    //     console.log(result);
    // }).catch((error)=>{
    //     console.log(error);
    // })

    // db.collection('tasks').updateMany({compleated:false}, {
    //     $set:{
    //         compleated: true
    //     }
    // }).then((res) => console.log(res)).catch((err) => console.log(err))

    db.collection('users').deleteMany({age:27}).then((res) => console.log(res)).catch((err) => console.log(err))

    db.collection('tasks').deleteOne({description:'limpiar la casa'}).then((res) => console.log(res)).catch((err) => console.log(err))
})
