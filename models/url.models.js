const mongoose = require("mongoose")

const urlSchema  = new mongoose.Schema({
    shortId: { // Will be generate for user
        type: String,
        required: true,
        unique: true
    },
    redirectURL: { //Give user url
        type: String,
        required: true,
    },
   visitHistory: [ { timestamp: {type : Number} }],
   createdBy: {
       type: mongoose.Schema.ObjectId,
       ref: "User"
   },
},
{timestamps: true}
);


const URL = mongoose.model("url",urlSchema);

module.exports = URL;