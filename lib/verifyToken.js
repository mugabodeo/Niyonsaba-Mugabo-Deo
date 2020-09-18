import jwt from 'jsonwebtoken'


const VerifyToken=(req,res,next)=>{
    const getToken=req.header('auth-token')
    if(!getToken) return res.status(401).send('access denied')
    
    try{
        const verifyToken=jwt.verify(getToken,process.env.TOKEN_KEY)
        req.currentUser =verifyToken
        next()
    }catch(err){
        res.status(400).send('Invalid Token')
    }
}
export default VerifyToken