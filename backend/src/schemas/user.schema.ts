import { Schema } from 'mongoose';

export const userSchema = new Schema({
  id_:String,
  isCreator:Boolean,
  login:{ type : String ,  required : true },
  name:String,
  lastName:String,
  password:String,
  allAuto:Number,
  inWorkAuto:Number,
  item_id:{ type : Number , unique : true, required : true },
  carList:{ type : Array , "default" : [{item_id:String,rights:String}] },
  role:String
}, {versionKey: false})