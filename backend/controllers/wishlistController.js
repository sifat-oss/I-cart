import Wishlist from '../models/Wishlist.js';

// @desc    Get user wishlist
// @route   GET /api/wishlist
// @access  Private
export const getWishlist = async(req, res, next) => {
    try {
        const wishlist = await Wishlist.findOne({ user: req.user._id }).populate('products');

        if (!wishlist) {
            return res.status(200).json({
                success: true,
                data: { products: [] },
            });
        }

        res.status(200).json({
            success: true,
            data: wishlist,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Add product to wishlist
// @route   POST /api/wishlist/:productId
// @access  Private
export const addToWishlist = async(req, res, next) => {
    try {
        const { productId } = req.params;

        let wishlist = await Wishlist.findOne({ user: req.user._id });

        if (!wishlist) {
            wishlist = await Wishlist.create({
                user: req.user._id,
                products: [productId],
            });
        } else {
            if (wishlist.products.includes(productId)) {
                return res.status(400).json({
                    success: false,
                    message: 'Product already in wishlist',
                });
            }
            wishlist.products.push(productId);
            await wishlist.save();
        }

        await wishlist.populate('products');

        res.status(200).json({
            success: true,
            message: 'Product added to wishlist',
            data: wishlist,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Remove product from wishlist
// @route   DELETE /api/wishlist/:productId
// @access  Private
export const removeFromWishlist = async(req, res, next) => {
    try {
        const { productId } = req.params;

        const wishlist = await Wishlist.findOne({ user: req.user._id });

        if (!wishlist) {
            return res.status(404).json({
                success: false,
                message: 'Wishlist not found',
            });
        }

        wishlist.products = wishlist.products.filter(
            (product) => product.toString() !== productId
        );

        await wishlist.save();
        await wishlist.populate('products');

        res.status(200).json({
            success: true,
            message: 'Product removed from wishlist',
            data: wishlist,
        });
    } catch (error) {
        next(error);
    }
};