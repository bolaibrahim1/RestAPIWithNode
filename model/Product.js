// Create a new Schema for our Product Model
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
            min: 6,
            max: 255
        },
        description: {
            type: String,
            required: true,
            min: 6,
            max: 1024
        },
        price: {
            type: String,
            required:true,
        },
        quantity: {
            type: String,
            required:true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Product', productSchema);