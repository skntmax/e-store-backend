import mongoose from "mongoose";

export default {
     
    users_schema :{
        username:{
            type:String ,
            required:true 
         } ,
          userType:Boolean ,
         email:{
            type:String ,
            required:true 
         } ,
         admin:String , 
         password:{
            type:String ,
            required:true 
         } ,
         address:{
            type:String 
         } ,
         createdOn:{
            type:Date ,
            default:()=>Date.now()
         }
    },

   product_schema:{
     title:{
         type:String ,
          required:true    
     } ,
     discription:{
        type:String ,   
        required:true    

     } ,
      
     image:{
        type:String
     },
     category:String ,
      price:{
           type:Number
      } , 
       
     createdOn:{
        type:Date ,
        default:()=>Date.now()
     }   

   }
   , 


   order_schema:{
       productId:{
            type:mongoose.Types.ObjectId ,
            ref:'products'
       } ,
      products:{
       type: Array
      } , 
        user:{
         type:mongoose.Types.ObjectId ,
         ref:'user'
        },
        total:Number, 
       createdOn:{
         type:Date ,
         default:()=>Date.now()
      }  
      ,
   }


     
}