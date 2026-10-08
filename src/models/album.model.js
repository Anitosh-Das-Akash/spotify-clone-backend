const mongoose=require("mongoose")

const albumSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true

    },
    musics:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"music",
        required:true
    }],
    artists:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    }
})

const albumModel=mongoose.model("albums",albumSchema)

module.exports=albumModel