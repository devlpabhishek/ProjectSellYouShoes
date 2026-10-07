const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id: Number,
    brand: String,
    title: String,
    image: String,
    price: String,
    originalPrice: String,
    discount: String,
    rating: String,
    reviews: String,
    assured: Boolean
});

const products = mongoose.model('products', productSchema);

module.exports = products;