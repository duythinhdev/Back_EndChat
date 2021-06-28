const Converstation = require("../models/Converstation");

exports.ConvertStation  = async (req, res) =>{
    const convertStation = new Converstation({
        members: [req.body.senderId,req.body.receiverId]
    })
    let convertSaved =  await convertStation.save();
    try{
        res.status(200).json({
            result: convertSaved
        })
    }
    catch (e)
    {
        res.status(500).json({
            error: e
        });
    }
}

exports.ConvertStationGetUserId = async (req,res) =>{
    try{
        const convertStation = await Converstation.find({members: { $in:[req.query.userId] }});
        res.status(200).json({
            data: convertStation
        })
    }
    catch (e)
    {
        res.status(500).json({
            error: e
        });
    }
}
