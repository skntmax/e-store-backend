import mongoose from "mongoose";
 
export function init() {
    
        mongoose.connect('mongodb+srv://skntmax:sknt987@cluster0.ajehkca.mongodb.net/store?retryWrites=true&w=majority' ,   {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(res=>{
            console.log("db connected ");
        }).catch(err=>{
             console.log("connection error ");
            })
        
    } 
