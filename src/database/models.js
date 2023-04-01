import { Schema } from "mongoose";
import schema from './All_schema/schemas.js' 


let user_Model_Schema = new Schema( schema.users_schema  )
let productSchema = new Schema( schema.product_schema )
let orderSchema = new Schema( schema.order_schema )


export {user_Model_Schema , productSchema , orderSchema} 