const ImageKit = require("@imagekit/nodejs");

const client = new ImageKit({
  privateKey: process.env["IMAGEKIT_PRIVATE_KEY"], // This is the default and can be omitted
});

async function uploadMusic(file) {
    const response = await client.files.upload({
    file,
    fileName: "music"+Date.now(),
    folder:"spotify/music"



  });
      return response;

}

module.exports=uploadMusic
