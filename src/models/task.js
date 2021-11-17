
const mongoose = require('mongoose')

const Task = mongoose.model('Tasks', {
    description: {
        type: String,
        required: true,
        trim: true
    },
    compleated: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'User'
    }
})

module.exports = Task;