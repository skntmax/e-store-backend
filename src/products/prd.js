import express  from "express" ;
import { users , products, orders  } from "./../database/all_models.js";
import { succesServiceResponse , failedServiceResponse } from "../helper.js";
import multer from "multer";
import { autMiddleWare } from "../middleware.js";
import mongoose, { Schema } from "mongoose";
let ObjectId = mongoose.Types.ObjectId 

// image validation 
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

let prd_router = express.Router()

 
 

prd_router.post('/', async(req,res)=>{
       //  console.log(" product ");

       try{
        const { title="default title", discription="default disc "  , image="default img "  }  = req.body 

        let item = new  products({
             title:title ,
             discription:discription , 
             image:image
           }) 
             item.save().then(result=> {
                res.send(succesServiceResponse(result , "saved "))
                 console.log("saved ")
                }).catch(err=>{
          res.send(failedServiceResponse(err, " erorr in saving products "))                   
                })
     }catch(err) {
        res.send(failedServiceResponse(err, " erorr in saving products "))
     }
      })

       

      prd_router.post('/buyproduct',autMiddleWare, async(req,res)=>{
          
        try{ 
          const { prd_list , total_price }  = req.body.model 
           
          let user_orders = await orders.create({
             products:prd_list ,
             total:total_price,
             user:req.body.id
          })

             await user_orders.save() 
             res.send(succesServiceResponse(user_orders ,"order placed"))
          }
           catch(err) {
          res.send(failedServiceResponse(err , " some error occured  "))           
        }
      })


      prd_router.get('/buyproduct-history',autMiddleWare , async(req,res)=>{
         
        try{ 

          const { id }  = req.body 
          orders.find({user:id}).select().populate('user' ,"email" ).exec((err,doc)=>{
            if(err)
            res.send(failedServiceResponse(err , " some error occured  "))           
            else  
            res.send(succesServiceResponse(doc ,"order placed"))
          })

          }
           catch(err) {
          res.send(failedServiceResponse(err , " some error occured  "))           
        }
      })



      export default prd_router 