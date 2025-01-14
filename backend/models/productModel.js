const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
    },
    productPrice: {
        type: Number,
        required: true,
    },
    productDescription: {
        type: String,
        required: true,
        maxlength: 300,
    },
    productCategory: {
        type: String,
        required: true,
    },
    productImage: {
        type: String,
        required: true,
    },
    productType: {
        type: String,
        required: true,
    },
    productRating: {
        type: Number,
        required: true,
    },
    productMph: {
        type: Number,
        required: true,
    },
    productTransmission: {
        type: String,
        required: true, // Make sure to include this field
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

// Ensure the model name is capitalized to follow conventions
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
