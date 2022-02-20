import { Schema } from 'mongoose';

export const carSchema = new Schema({
    id_:String,
    photo: String,
    purchaseDate: String,
    auction: String,
    model: String,
    vin:{ type : String ,  required : true },
    price: Number,
    port: String,
    title: Boolean,
    container: Number,
    customer: String,
    status: String,
    item_id:{ type : Number , unique : true, required : true },
    creator: {_id: String, login: String, item_id: Number, time_create: Number},
    photoList:{auction: Array, docs: Array, invoices: Array, port: Array,warehouse:Array},
    mainPhoto: {typeFolder: String, id_photo: String }
  }, {versionKey: false})