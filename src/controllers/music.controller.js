const musicmodel=require('../models/music.model')
const jwt=require("jsonwebtoken");
const uploadMusic = require('../services/storage.service');
const albumModel=require('../models/album.model')

async function createMusic(req,res) {

    
        const {title}=req.body;
        const file=req.file;

        const result=await uploadMusic(file.buffer.toString('base64'))

        const music= await musicmodel.create({
            url:result.url,
            title,
            artist: req.user.id


        })

        res.status(201).json({
            id: music._id,
            url: music.url,
            title: music.title,
            artist :music.artist
        })



    }

    

async function createAlbum(req,res) {

        const {title,musics}=req.body;

        const album= await albumModel.create({

            title,
            musics,
            artist: req.user.id


        })

        res.status(201).json({
            title: album.title,
            musics: album.musics,
            artist: album.artist
        })
    
    
}

async function getAllMusic(req,res) {

    const music=await musicmodel.find().populate("artist","username")
    res.status(200).json({
        message:"All data fetched successfully",
        music:music

    })
    
}

async function getAllAlbum(req,res){

    const album=await albumModel.find().populate("artists","username").populate("musics");
    res.status(200).json({
        message:"Album fetched successfully",
        albums: album
    })

}

module.exports={createMusic,createAlbum,getAllMusic,getAllAlbum}