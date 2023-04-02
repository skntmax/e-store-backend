import express  from "express" ;
import { users , products, orders  } from "./../database/all_models.js";
import { succesServiceResponse , failedServiceResponse } from "../helper.js";
import multer from "multer";
import { autMiddleWare } from "../middleware.js";
import mongoose, { Schema } from "mongoose";
let ObjectId = mongoose.Types.ObjectId 

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'my-uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix )
    }
  })

const test_upload = multer({ storage: storage })
// image validation 

const amdin_router = express.Router()

amdin_router.get('/get-all-users' , async(req,res)=>{
       try{    
        let all_users_list =await users.aggregate([{$project:{ username:1 , email:1 , admin:1 }}])
        if(all_users_list)
        res.send(succesServiceResponse(all_users_list , "saved "))
          else
         res.send(failedServiceResponse("", "No any found"))

     }catch(err) {
         res.send(failedServiceResponse(err, " some error occured "))
     }
      })



      amdin_router.post('/remove-user',async(req,res)=>{
       try{
         let {email}  = req.body    
        let removed_user =await users.deleteOne({email:email})
        if(removed_user)
          res.send(succesServiceResponse(removed_user , "removed "))
          else
         res.send(failedServiceResponse("", "no user found "))

     }catch(err) {
         res.send(failedServiceResponse(err, " some error occured "))
     }
      })


       
export default amdin_router 