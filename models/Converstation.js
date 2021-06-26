const mongoose = require('mongoose');

const ConvertStationSchema = mongoose.Schema({
    members: {
        type: Array
    },

})
module.exports = mongoose.model("ConvertStation",ConvertStationSchema)
