const Message = require("../models/chat");

exports.messagechat  = async (req, res) =>{
    const newMessage = new Message(req.body)
    let savedNewMessage = await newMessage.save();
    try{
        res.status(200).json({
            data: savedNewMessage
        })
    }
    catch (e)
    {
        res.status(500).json({
            error:e
        })
    }
}
exports.getAllMessage = async (req,res) =>{
    var newMessage = await Message.find({
        converstationId: req.query.converstationId
    })
    try{
        res.status(200).json({
            data:newMessage
        })
    }
    catch (e)
    {
        res.status(500).json({
            error:e
        })
    }
}
