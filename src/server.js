import express  from "express";
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import {init} from './connection.js'
// import { creatAllModels } from "./database/all_models.js";
import fs from 'fs'
import prd from './z.js'
import multer  from 'multer'
import { products, users } from "./database/all_models.js";
import jsonwebtoken from 'jsonwebtoken'
import prdRouter from './products/prd.js'
import cors from 'cors'
import { succesServiceResponse , failedServiceResponse } from "./helper.js";
import { autMiddleWare } from "./middleware.js";
export const upload = multer({ dest: 'uploads/' })

dotenv.config()
init()

let port = process.env.PORT 
const app = express()
app.use(express.json())
app.use(cors())
app.use('/products', prdRouter)
// app.use("user" , auth_route)


app.get('/' , async(req, res)=>{
     console.log("home page "); 
      res.send({
         message:"  api are running   "
      })
}) 
 

app.post('/signup' , async(req, res)=>{
     
     try{
        let { email , password , username , admin_password  }  = req.body
        let user_data =await users.find({email:email})
         if(user_data.length!=0) {
             return res.status(200).send({ 
                status:false,
                msg:' User is already registered '
             })
         }else{
            
             let has_pass = await bcrypt.hash(password, 4)
                 let userData  = await users.insertMany([
                { username:username ,email:email , password:has_pass , admin:admin_password=="admin"?true:false   }
            ])

            res.status(200).send({
                 status:true,
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
       let user_data =await users.find({email:email})
       if(user_data.length==0) {
            return res.status(200).send(failedServiceResponse('err ' ,' please signup first' ) 
               )
             
        }else{
            console.log(user_data);
            let isPass = await  bcrypt.compare(password, user_data[0].password )
   
             if(isPass) {
               let token = jsonwebtoken.sign({ _id:user_data[0]._id }, process.env.SECRET_KEY );
               res.status(200).send(
                  succesServiceResponse(  {
                    token:token ,
                   username:user_data[0].username ,
                   email:user_data[0].email 
               } , " logged in ")
               )

             }else{
                 res.send(
                    failedServiceResponse( " invalid credential " ,"invalid credential" ) 
                   )
              }
          }

    }catch(err) {

       return res.send(failedServiceResponse(err, "some error occured "))
    }
 
})



// app.get('/insert' , async (req,res)=>{
//  let pr= prd.data.map((ele,ind)=>  { return {...ele, qty:1} } )
//    products.insertMany(pr , (err,data)=>{
//      if(err) throw new Error(err)
//      console.log(data);      
//    })
// }) // api to inset product data in to our product collection    



app.get('/get-products'  , async (req,res)=>{

    try{
        let prd   = await products.find({})
         return res.send(succesServiceResponse(prd ,"20 product fetched "))
    }catch(err){
       return res.send(failedServiceResponse(err, "some error occured "))   
    }
       
   })    
   




app.listen( port ,   ()=>{
     console.log(" server started at  "+port);
} )