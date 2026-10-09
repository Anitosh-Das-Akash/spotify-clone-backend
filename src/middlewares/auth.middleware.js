const jwt=require('jsonwebtoken')

async function authArtist(req,res,next) {

    const token=req.cookies.token;

    if(!token){
        return res.status(403).json({message:"Unauthorized Login"})
    }

    try{

        const decoded=await jwt.verify(token,process.env.JWT_SECRET)

        if(decoded.role!=='singer'){
            return res.status(403).json({message:"You have no access to create music or album"})
        }


        req.user=decoded;
        
        next()




    }catch(err){
        return res.status(403).json({
            message:"Unauthorized login"
        })

    }
    
    
}

async function authUser(req,res,next) {

    const token=req.cookies.token;

    if(!token){
      return  res.status(403).json({
            message:"unauthorized access"
        })

        
    }

    try{
    const decoded=await jwt.verify(token,process.env.JWT_SECRET)

    if(decoded.role!=='user' && decoded.role!=='singer'){

        return res.status(403).json({
            message:"Access Denied"
        })

        
        }

        req.user=decoded;
        next()
    }
    catch(err){
        return res.status(403).json({
            message:"Unauthorized user"
        })
    }

    
}

module.exports={authArtist,authUser}