const mongoose = require("mongoose");
const TshirtDesignSchema=new mongoose.Schema({
    color:{
        type:String,
        required:true
    },
    image:{

        type:String,
        required:true
    },
    timeStamp: {
        type: Date,
        default: Date.now
    }
});
    const TshirtDesign=mongoose.model("TshirtDesign",TshirtDesignSchema);
    module.exports={TshirtDesign};
