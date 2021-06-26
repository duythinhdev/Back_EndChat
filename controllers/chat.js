const Converstation = require("../models/Converstation");

exports.ConvertStation  = async (req, res, next) =>{

    const convertStation = new Converstation({
        members: [req.body.senderId,req.body.receiverId]
    })
       let convertSaved =  await convertStation.save();
       convertSaved.then(result =>{
            res.status(200).json({
                result: result
            })
        }).catch(e =>{
            res.status(500).json({
                error: e
            });
        })
}

exports.ConvertStationGetUserId = async (req,res,next) =>{
    console.log("req.query.userId",req.query.userId)
    const convertStation = await Converstation.find({members: { $in:[req.query.userId] }});
    convertStation.then(result=>{
        res.status(200).json({
            result: result
        })
    }).catch(e=>{
        res.status(500).json({
            error: e
        });
    })
    next();
}
