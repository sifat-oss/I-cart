import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide product name'],
        trim: true,
        maxlength: [100, 'Product name cannot exceed 100 characters'],
    },
    description: {
        type: String,
        required: [true, 'Please provide product description'],
        maxlength: [2000, 'Description cannot exceed 2000 characters'],
    },
    price: {
        type: Number,
        required: [true, 'Please provide product price'],
        min: [0, 'Price cannot be negative'],
    },
    originalPrice: {
        type: Number,
        min: [0, 'Original price cannot be negative'],
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Please provide product category'],
    },
    images: [{
        url: {
            type: String,
            required: true,
        },
        public_id: {
            type: String,
        },
    }, ],
    stock: {
        type: Number,
        required: [true, 'Please provide product stock'],
        min: [0, 'Stock cannot be negative'],
        default: 0,
    },
    brand: {
        type: String,
        trim: true,
    },
    ratings: {
        type: Number,
        default: 0,
        min: [0, 'Rating cannot be less than 0'],
        max: [5, 'Rating cannot be more than 5'],
    },
    numReviews: {
        type: Number,
        default: 0,
    },
    isFeatured: {
        type: Boolean,
        default: false,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    specifications: {
        type: Map,
        of: String,
    },
    tags: [String],
    soldCount: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
});

// Create indexes
productSchema.index({ name: 'text', description: 'text', tags: 'text' });
productSchema.index({ category: 1, price: 1 });
productSchema.index({ ratings: -1 });

const Product = mongoose.model('Product', productSchema);

export default Product;