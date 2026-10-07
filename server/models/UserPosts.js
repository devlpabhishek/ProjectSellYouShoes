const mongoose = require('mongoose');

const userPostSchema = new mongoose.Schema(
    {
        // User who created this listing
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true
        },

        // Basic item information
        category: {
            type: String,
            required: true
        },

        subCategory: {
            type: String,
            required: true
        },

        title: {
            type: String,
            required: true,
            trim: true
        },

        brand: {
            type: String,
            trim: true
        },

        condition: {
            type: String,
            required: true
        },

        // How old the item is
        age: {
            type: String
        },

        purchaseYear: {
            type: Number
        },

        // Description
        description: {
            type: String,
            required: true,
            trim: true
        },

        // Price
        price: {
            type: Number,
            required: true
        },

        negotiable: {
            type: Boolean,
            default: false
        },

        // Location
        city: {
            type: String,
            required: true,
            trim: true
        },

        locality: {
            type: String,
            trim: true
        },

        // Images
        images: [
            {
                type: String
            }
        ]
    },
    {
        timestamps: true
    }
);

const UserPost = mongoose.model('UserPost', userPostSchema);

module.exports = UserPost;