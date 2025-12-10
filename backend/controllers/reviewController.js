import Review from '../models/Review.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';

// @desc    Get product reviews
// @route   GET /api/reviews/product/:productId
// @access  Public
export const getProductReviews = async(req, res, next) => {
    try {
        const reviews = await Review.find({ product: req.params.productId })
            .populate('user', 'name avatar')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: reviews.length,
            data: reviews,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Create product review
// @route   POST /api/reviews
// @access  Private
export const createReview = async(req, res, next) => {
    try {
        const { product, rating, comment } = req.body;

        // Check if product exists
        const productExists = await Product.findById(product);
        if (!productExists) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
            });
        }

        // Check if user has purchased the product
        const order = await Order.findOne({
            user: req.user._id,
            'orderItems.product': product,
            isDelivered: true,
        });

        const isVerifiedPurchase = !!order;

        // Create review
        const review = await Review.create({
            user: req.user._id,
            product,
            rating,
            comment,
            isVerifiedPurchase,
        });

        // Update product ratings
        const reviews = await Review.find({ product });
        const numReviews = reviews.length;
        const ratings =
            reviews.reduce((acc, item) => item.rating + acc, 0) / numReviews;

        await Product.findByIdAndUpdate(product, {
            ratings,
            numReviews,
        });

        await review.populate('user', 'name avatar');

        res.status(201).json({
            success: true,
            message: 'Review created successfully',
            data: review,
        });
    } catch (error) {
        // Handle duplicate review error
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'You have already reviewed this product',
            });
        }
        next(error);
    }
};

// @desc    Update review
// @route   PUT /api/reviews/:id
// @access  Private
export const updateReview = async(req, res, next) => {
    try {
        let review = await Review.findById(req.params.id);

        if (!review) {
            return res.status(404).json({
                success: false,
                message: 'Review not found',
            });
        }

        // Make sure user is review owner
        if (review.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized',
            });
        }

        review = await Review.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        // Update product ratings
        const reviews = await Review.find({ product: review.product });
        const numReviews = reviews.length;
        const ratings =
            reviews.reduce((acc, item) => item.rating + acc, 0) / numReviews;

        await Product.findByIdAndUpdate(review.product, {
            ratings,
            numReviews,
        });

        res.status(200).json({
            success: true,
            message: 'Review updated successfully',
            data: review,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete review
// @route   DELETE /api/reviews/:id
// @access  Private
export const deleteReview = async(req, res, next) => {
    try {
        const review = await Review.findById(req.params.id);

        if (!review) {
            return res.status(404).json({
                success: false,
                message: 'Review not found',
            });
        }

        // Make sure user is review owner or admin
        if (
            review.user.toString() !== req.user._id.toString() &&
            req.user.role !== 'admin'
        ) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized',
            });
        }

        const productId = review.product;
        await review.deleteOne();

        // Update product ratings
        const reviews = await Review.find({ product: productId });
        const numReviews = reviews.length;
        const ratings =
            numReviews > 0 ?
            reviews.reduce((acc, item) => item.rating + acc, 0) / numReviews :
            0;

        await Product.findByIdAndUpdate(productId, {
            ratings,
            numReviews,
        });

        res.status(200).json({
            success: true,
            message: 'Review deleted successfully',
        });
    } catch (error) {
        next(error);
    }
};