const mongoose=require('mongoose');
const {TshirtDesign}=require('../models/Category');
const postTshirtDesignController=async (req,res)=>{
    const session=await mongoose.startSession();
    session.startTransaction();
    try {
        const formData=req.body;
        const requiredFields=['color','image'];
        const missingFields=requiredFields.filter(field=>!formData[field]);
        if(missingFields.length>0){
            return res.status(400).json({
                success: false,
                error : `Missing required fields: ${missingFields.join(', ')}`,
        });
    }
    const newDesign={
        color:formData.color,
        image:formData.image,
        timestamp: new Date(),
    };
    const savedDesign =await TshirtDesign.create([newDesign],{session});
    await session.commitTransaction();
    res.status(201).json({
        success: true,
        message: "Design created successfully",
        data: savedDesign,
    });
    } catch (error) {
        await session.abortTransaction();
        console.error('Error in postTshirtDesignController:', error);
        res.status(500).json({
            success: false,
            error: 'Error creating design',
            message: error.message,
        });
    } finally {
        session.endSession();
    }
};
module.exports=postTshirtDesignController;
