const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');

const UserModel = require('./models/users');
const Products = require('./models/Products');
const UserPosts = require('./models/UserPosts');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose
    .connect('mongodb://127.0.0.1:27017/users')
    .then(() => {
        console.log('Connected to MongoDB successfully');
    })
    .catch((err) => {
        console.error('Failed to connect to MongoDB:', err);
    });

// Register user
app.post('/users', async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword
        } = req.body;

        // Check required fields
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({
                message: 'All fields are required'
            });
        }

        // Check if user already exists
        const existingUser = await UserModel.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: 'Email already registered'
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = await UserModel.create({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });

        // Don't send password back to frontend
        const userResponse = {
            id: newUser._id,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email
        };

        res.status(201).json({
            message: 'User registered successfully',
            user: userResponse
        });

    } catch (err) {
        console.error(err);

        res.status(500).json({
            message: 'Server error',
            error: err.message
        });
    }
});


// Login user
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check required fields
        if (!email || !password) {
            return res.status(400).json({
                message: 'Email and password are required'
            });
        }

        // Find user by email
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: 'Invalid email or password'
            });
        }

        // Compare entered password with hashed password
        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: 'Invalid email or password'
            });
        }

        // Login successful
        res.status(200).json({
            message: 'Login successful',
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            }
        });

    } catch (err) {
        console.error('Login error:', err);

        res.status(500).json({
            message: 'Server error',
            error: err.message
        });
    }
});


app.post('/userposts', async (req, res) => {
    try {
        const {
            userId,
            category,
            subCategory,
            title,
            brand,
            condition,
            age,
            purchaseYear,
            description,
            price,
            negotiable,
            city,
            locality,
            images
        } = req.body;

        // Required fields
        if (
            !userId ||
            !category ||
            !subCategory ||
            !title ||
            !condition ||
            !description ||
            !price ||
            !city
        ) {
            return res.status(400).json({
                message: 'Please fill all required fields'
            });
        }

        const newPost = await UserPosts.create({
            userId,
            category,
            subCategory,
            title,
            brand,
            condition,
            age,
            purchaseYear,
            description,
            price,
            negotiable,
            city,
            locality,
            images: images || []
        });

        res.status(201).json({
            message: 'Item posted successfully',
            post: newPost
        });

    } catch (error) {
        console.error('Error creating user post:', error);

        res.status(500).json({
            message: 'Failed to create item',
            error: error.message
        });
    }
});

app.get('/userposts/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        const posts = await UserPosts.find({
            userId: userId
        }).sort({
            createdAt: -1
        });

        res.status(200).json(posts);

    } catch (error) {
        console.error('Error fetching user posts:', error);

        res.status(500).json({
            message: 'Failed to fetch user posts',
            error: error.message
        });
    }
});


app.get('/products', async (req, res) => {
    try {
        const products = await Products.find();

        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);

        res.status(500).json({
            message: 'Failed to fetch products'
        });
    }
});

//User specific posts

// const mongoose = require('mongoose');

// const userPostSchema = new mongoose.Schema(
//     {
//         userId: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'user',
//             required: true
//         },

//         text: {
//             type: String,
//             required: true,
//             trim: true
//         }
//     },
//     {
//         timestamps: true
//     }
// );

// const UserPosts = mongoose.model('UserPosts', userPostSchema);

// module.exports = UserPost;


// Start server
const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});