import {user_Model_Schema} from './models.js'
import mongoose  from 'mongoose'

let all_models = {}

export function creatAllModels() {

    all_models.usermodel =    mongoose.model( 'user' ,user_Model_Schema )
   

}


export {all_models}