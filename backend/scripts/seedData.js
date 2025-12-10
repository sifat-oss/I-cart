import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Product from '../models/Product.js';
import Category from '../models/Category.js';
import connectDB from '../config/db.js';

dotenv.config();
connectDB();

const categories = [{
        name: 'Electronics',
        description: 'Electronic devices and gadgets',
        image: 'https://via.placeholder.com/300?text=Electronics',
    },
    {
        name: 'Clothing',
        description: 'Fashion and apparel',
        image: 'https://via.placeholder.com/300?text=Clothing',
    },
    {
        name: 'Books',
        description: 'Books and educational materials',
        image: 'https://via.placeholder.com/300?text=Books',
    },
    {
        name: 'Home',
        description: 'Home and kitchen items',
        image: 'https://via.placeholder.com/300?text=Home',
    },
    {
        name: 'Sports',
        description: 'Sports and outdoor equipment',
        image: 'https://via.placeholder.com/300?text=Sports',
    },
];

const users = [{
        name: 'Admin User',
        email: 'admin@icart.com',
        password: 'admin123',
        role: 'admin',
        isVerified: true,
    },
    {
        name: 'John Doe',
        email: 'john@example.com',
        password: '123456',
        role: 'user',
        isVerified: true,
    },
];

const importData = async() => {
    try {
        // Clear existing data
        await User.deleteMany();
        await Product.deleteMany();
        await Category.deleteMany();

        console.log('Data cleared!');

        // Import users
        const createdUsers = await User.insertMany(users);
        console.log('Users imported!');

        // Import categories
        const createdCategories = await Category.insertMany(categories);
        console.log('Categories imported!');

        // Create sample products
        const products = [{
                name: 'Wireless Headphones',
                description: 'High-quality wireless headphones with noise cancellation and premium sound',
                price: 2999,
                originalPrice: 3999,
                category: createdCategories[0]._id,
                images: [{
                    url: 'https://via.placeholder.com/300x300?text=Headphones',
                }, ],
                stock: 15,
                brand: 'Sony',
                isFeatured: true,
                ratings: 4.5,
                numReviews: 12,
                tags: ['audio', 'wireless', 'premium'],
            },
            {
                name: 'Smart Watch',
                description: 'Feature-rich smartwatch with fitness tracking and health monitoring',
                price: 4999,
                originalPrice: 6999,
                category: createdCategories[0]._id,
                images: [{
                    url: 'https://via.placeholder.com/300x300?text=Watch',
                }, ],
                stock: 8,
                brand: 'Apple',
                isFeatured: true,
                ratings: 4.7,
                numReviews: 25,
                tags: ['smartwatch', 'fitness', 'health'],
            },
            {
                name: 'Cotton T-Shirt',
                description: 'Comfortable 100% cotton t-shirt available in multiple colors',
                price: 499,
                originalPrice: 799,
                category: createdCategories[1]._id,
                images: [{
                    url: 'https://via.placeholder.com/300x300?text=T-Shirt',
                }, ],
                stock: 25,
                brand: 'Nike',
                isFeatured: true,
                ratings: 4.3,
                numReviews: 45,
                tags: ['clothing', 'casual', 'cotton'],
            },
            {
                name: 'Programming Book',
                description: 'Complete guide to modern web development with JavaScript',
                price: 899,
                category: createdCategories[2]._id,
                images: [{
                    url: 'https://via.placeholder.com/300x300?text=Book',
                }, ],
                stock: 12,
                brand: "O'Reilly",
                isFeatured: true,
                ratings: 4.8,
                numReviews: 89,
                tags: ['book', 'programming', 'javascript'],
            },
            {
                name: 'LED Table Lamp',
                description: 'Modern LED table lamp with adjustable brightness and color temperature',
                price: 1299,
                originalPrice: 1799,
                category: createdCategories[3]._id,
                images: [{
                    url: 'https://via.placeholder.com/300x300?text=Lamp',
                }, ],
                stock: 20,
                brand: 'Philips',
                ratings: 4.4,
                numReviews: 18,
                tags: ['lamp', 'led', 'home'],
            },
            {
                name: 'Yoga Mat',
                description: 'Non-slip premium yoga mat for exercise and meditation',
                price: 799,
                category: createdCategories[4]._id,
                images: [{
                    url: 'https://via.placeholder.com/300x300?text=Yoga+Mat',
                }, ],
                stock: 30,
                brand: 'Lululemon',
                ratings: 4.6,
                numReviews: 34,
                tags: ['yoga', 'fitness', 'exercise'],
            },
            {
                name: 'Laptop Backpack',
                description: 'Durable laptop backpack with multiple compartments and USB charging port',
                price: 1599,
                originalPrice: 2199,
                category: createdCategories[0]._id,
                images: [{
                    url: 'https://via.placeholder.com/300x300?text=Backpack',
                }, ],
                stock: 18,
                brand: 'Samsonite',
                ratings: 4.5,
                numReviews: 27,
                tags: ['bag', 'laptop', 'travel'],
            },
            {
                name: 'Running Shoes',
                description: 'Professional running shoes with superior comfort and cushioning',
                price: 3499,
                originalPrice: 4999,
                category: createdCategories[4]._id,
                images: [{
                    url: 'https://via.placeholder.com/300x300?text=Shoes',
                }, ],
                stock: 22,
                brand: 'Adidas',
                isFeatured: true,
                ratings: 4.7,
                numReviews: 56,
                tags: ['shoes', 'running', 'sports'],
            },
        ];

        await Product.insertMany(products);
        console.log('Products imported!');

        console.log('All data imported successfully!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const destroyData = async() => {
    try {
        await User.deleteMany();
        await Product.deleteMany();
        await Category.deleteMany();

        console.log('All data destroyed!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}