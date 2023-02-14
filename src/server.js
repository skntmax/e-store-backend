import express  from "express";
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import {init} from './connection.js'
import { creatAllModels } from "./database/all_models.js";
import { all_models } from "./database/all_models.js";
import jsonwebtoken from 'jsonwebtoken'
dotenv.config()
init()
creatAllModels()
let port = process.env.PORT 
const app = express()
app.use(express.json())
// app.use("user" , auth_route)


app.get('/' , async(req, res)=>{
     console.log("home page "); 
      res.send({
         message:"  api are running   "
      })
}) 
 

app.post('/signup' , async(req, res)=>{
     try{
        let {email , password , username }  = req.body
        let user_data =await all_models.usermodel.find({email:email})
         if(user_data.length!=0) {
             return res.status(200).send({
                msg:' User is already registered '
             })
         }else{
            let has_pass = await bcrypt.hash(password, 4)
                 let userData  = await all_models.usermodel.insertMany([
                { username:username ,email:email , password:has_pass }
            ])
             
            res.status(200).send({
                 username:userData[0].username ,
                 skntjee:userData[0].email ,
                 _id:userData[0]._id
               }) 
                            
          }  
           
          
     }catch(err) {
        return res.status(500).send({
            msg:err ,
            error:err
        })
     }  
})


 

app.post('/login' , async(req, res)=>{
    try{
       let {email , password  }  = req.body

       let user_data =await all_models.usermodel.find({email:email})
       if(user_data.length==0) {
            return res.status(200).send({
               msg:'please signup first '
            })
             
        }else{
            console.log(user_data);
            let isPass = await  bcrypt.compare(password, user_data[0].password )
   
             if(isPass) {
               let token = jsonwebtoken.sign({ _id:user_data[0]._id }, process.env.SECRET_KEY );
               res.status(200).send({
                    token:token ,
                   username:user_data[0].username ,
                   email:user_data[0].email 
               })

             }else{
                 res.status(500).send({
                     message :" invalid credential "
                 })
              }
          }

    }catch(err) {

       return res.status(500).send({
           msg:err ,
           error:err
       })
    }
 
})








app.listen( port ,   ()=>{
     console.log(" server started at  "+port);
} )