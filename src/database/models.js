import { Schema } from "mongoose";
let user_scheam =   {
     username:{
        type:String ,
        required:true 
     } ,

     email:{
        type:String ,
        required:true 
     } ,
     password:{
        type:String ,
        required:true 
     } ,
}

let user_Model_Schema = new Schema( user_scheam  )


export {user_Model_Schema} 