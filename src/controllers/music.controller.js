const musicmodel=require('../models/music.model')
const jwt=require("jsonwebtoken");
const uploadMusic = require('../services/storage.service');
const albumModel=require('../models/album.model')

async function createMusic(req,res) {

    const token= req.cookies.token;
    console.log(token);
    

    if(!token){
        return res.status(403).json({
            message:"Unauthorized Access"
        })
    }

    try{
        const decoded = await jwt.verify(token,process.env.JWT_SECRET)

        if(decoded.role!=="singer"){
            return res.status(403).json({
                message:"You have no access"
            })
        }
        const {title}=req.body;
        const file=req.file;

        const result=await uploadMusic(file.buffer.toString('base64'))

        const music= await musicmodel.create({
            url:result.url,
            title,
            artist:decoded.id


        })

        res.status(201).json({
            id: music._id,
            url: music.url,
            title: music.title,
            artist :music.artist
        })



    }
    catch(err){
        return res.status(401).json({
            message:"Unauthorized Access"

        })
        
    }

    
}

async function createAlbum(req,res) {
    const token=req.cookies.token;

    if(!token){
        res.status(403).json({
            message:"Unauthorized Access"
        })
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        console.log(decoded);
        

        if(decoded.role!=='singer'){
            return res.status(403).json({
                message:"You have no access"
            })
        }

        const {title,musics}=req.body;

        const album= await albumModel.create({

            title,
            musics,
            artist: decoded.id


        })

        res.status(201).json({
            title: album.title,
            musics: album.musics,
            artist: album.artist
        })
    }
    catch(err){
        res.status(403).json({
            message:"Token ERROR"
        })
    }
    
}

module.exports={createMusic,createAlbum}