import mongoose from "mongoose";

const sellSchema = new mongoose.Schema({
    type:{
        type: String,
        required: [true,"Must provide a type"]  
    },
    email:{
        type: String,
        required: [true,"Must provide a type"]  
    },
    brand:{
        type: String,
        required: [true,"Must provide a brand"]  
    },
    model:{
        type: String,
        required: [true,"Must provide a model"]  
    },
    work:{
        type: String,
        required: [true,"Must provide a work"]  
    },
    year:{
        type: Number,
        required: [true,"Must provide a year"]  
    },
    price:{
        type: String,
        required: [true,"Must provide a price"]  
    },
    image:{
        type: Array,
        
    },
    registered:{
        type: Boolean,
        default: false
    },

})

const Sell = mongoose.models.Sell || mongoose.model("Sell", sellSchema);

export default Sell;