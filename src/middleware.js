import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken' 
import { failedServiceResponse } from './helper.js'

export const autMiddleWare=async(req, res , next)=>{
   
   try{
    let header = req.headers
   const token  =header.authorization.split(" ")[1] 
     jsonwebtoken.verify(token ,process.env.SECRET_KEY ,(err,user_data)=>{
       if(err) {
        res.send(failedServiceResponse( "" , " unauthorised user "))
       }else{  
        req.body.id = user_data._id
        next()
       }
    } )
   }catch(err){
    throw new Error(err)
   }
   

}