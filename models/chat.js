const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    converstationId: {
        type:String
    },
    sender:{
        type:String
    },
    text:{
        type:String
    }
})
module.exports = mongoose.model("Message",messageSchema)
