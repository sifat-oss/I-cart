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
        const products = [
            // Electronics
            {
                name: 'iPhone 15 Pro Max',
                description: 'Latest flagship smartphone with titanium design, A17 Pro chip, and advanced camera system',
                price: 119999,
                originalPrice: 134999,
                category: createdCategories[0]._id,
                images: [{url: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500'}],
                stock: 15,
                brand: 'Apple',
                isFeatured: true,
                ratings: 4.9,
                numReviews: 156,
                tags: ['smartphone', 'premium', '5G'],
            },
            {
                name: 'Sony WH-1000XM5 Headphones',
                description: 'Industry-leading noise cancellation, exceptional sound quality, 30-hour battery life',
                price: 29999,
                originalPrice: 34999,
                category: createdCategories[0]._id,
                images: [{url: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500'}],
                stock: 25,
                brand: 'Sony',
                isFeatured: true,
                ratings: 4.8,
                numReviews: 234,
                tags: ['audio', 'wireless', 'noise-cancelling'],
            },
            {
                name: 'MacBook Pro 14" M3',
                description: 'Powerful laptop with M3 chip, Liquid Retina XDR display, perfect for professionals',
                price: 189999,
                originalPrice: 199999,
                category: createdCategories[0]._id,
                images: [{url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500'}],
                stock: 8,
                brand: 'Apple',
                isFeatured: true,
                ratings: 4.9,
                numReviews: 89,
                tags: ['laptop', 'professional', 'premium'],
            },
            {
                name: 'Samsung 65" QLED 4K TV',
                description: 'Quantum dot technology, stunning 4K resolution, smart TV features',
                price: 89999,
                originalPrice: 109999,
                category: createdCategories[0]._id,
                images: [{url: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500'}],
                stock: 12,
                brand: 'Samsung',
                ratings: 4.7,
                numReviews: 67,
                tags: ['tv', '4k', 'smart'],
            },
            // Clothing
            {
                name: 'Nike Air Jordan 1 Retro',
                description: 'Iconic basketball sneakers, premium leather, classic colorway',
                price: 12999,
                originalPrice: 15999,
                category: createdCategories[1]._id,
                images: [{url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500'}],
                stock: 30,
                brand: 'Nike',
                isFeatured: true,
                ratings: 4.8,
                numReviews: 342,
                tags: ['sneakers', 'basketball', 'streetwear'],
            },
            {
                name: 'Levis 501 Original Jeans',
                description: 'Classic straight fit jeans, 100% cotton denim, timeless style',
                price: 4999,
                originalPrice: 6499,
                category: createdCategories[1]._id,
                images: [{url: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500'}],
                stock: 45,
                brand: 'Levis',
                isFeatured: true,
                ratings: 4.6,
                numReviews: 456,
                tags: ['jeans', 'denim', 'casual'],
            },
            {
                name: 'Premium Leather Jacket',
                description: 'Genuine leather, classic biker style, comfortable fit',
                price: 14999,
                originalPrice: 19999,
                category: createdCategories[1]._id,
                images: [{url: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500'}],
                stock: 18,
                brand: 'Zara',
                ratings: 4.7,
                numReviews: 128,
                tags: ['jacket', 'leather', 'premium'],
            },
            // Books
            {
                name: 'Atomic Habits by James Clear',
                description: 'Transform your life with tiny changes, bestselling self-help book',
                price: 599,
                originalPrice: 799,
                category: createdCategories[2]._id,
                images: [{url: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500'}],
                stock: 50,
                brand: 'Penguin',
                isFeatured: true,
                ratings: 4.9,
                numReviews: 2341,
                tags: ['self-help', 'habits', 'bestseller'],
            },
            {
                name: 'The Psychology of Money',
                description: 'Timeless lessons on wealth, greed, and happiness',
                price: 499,
                originalPrice: 699,
                category: createdCategories[2]._id,
                images: [{url: 'https://images.unsplash.com/photo-1554200876-56c2f25224fa?w=500'}],
                stock: 40,
                brand: 'Harriman House',
                ratings: 4.8,
                numReviews: 1567,
                tags: ['finance', 'money', 'psychology'],
            },
            // Home
            {
                name: 'Dyson V15 Vacuum Cleaner',
                description: 'Powerful cordless vacuum with laser detection, 60-minute runtime',
                price: 54999,
                originalPrice: 64999,
                category: createdCategories[3]._id,
                images: [{url: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=500'}],
                stock: 10,
                brand: 'Dyson',
                isFeatured: true,
                ratings: 4.9,
                numReviews: 456,
                tags: ['vacuum', 'cleaning', 'cordless'],
            },
            {
                name: 'Nespresso Coffee Machine',
                description: 'Premium espresso maker, 19 bar pressure, perfect coffee every time',
                price: 19999,
                originalPrice: 24999,
                category: createdCategories[3]._id,
                images: [{url: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500'}],
                stock: 22,
                brand: 'Nespresso',
                ratings: 4.7,
                numReviews: 234,
                tags: ['coffee', 'espresso', 'kitchen'],
            },
            // Sports
            {
                name: 'Yoga Mat Premium',
                description: 'Non-slip, eco-friendly, extra thick for comfort, perfect for all yoga styles',
                price: 2499,
                originalPrice: 3499,
                category: createdCategories[4]._id,
                images: [{url: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500'}],
                stock: 35,
                brand: 'Lululemon',
                isFeatured: true,
                ratings: 4.8,
                numReviews: 567,
                tags: ['yoga', 'fitness', 'eco-friendly'],
            },
            {
                name: 'Dumbbell Set 20KG',
                description: 'Adjustable dumbbells, compact design, perfect for home workouts',
                price: 4999,
                originalPrice: 6999,
                category: createdCategories[4]._id,
                images: [{url: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500'}],
                stock: 20,
                brand: 'Reebok',
                ratings: 4.6,
                numReviews: 189,
                tags: ['weights', 'fitness', 'home-gym'],
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