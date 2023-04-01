import {user_Model_Schema , productSchema , orderSchema } from './models.js'
import mongoose  from 'mongoose'


export let users =  mongoose.model( 'user' ,user_Model_Schema )
export let products =  mongoose.model( 'product' ,productSchema )
export let orders =  mongoose.model( 'order' ,orderSchema )
   

