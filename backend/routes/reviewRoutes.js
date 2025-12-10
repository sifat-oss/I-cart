import express from 'express';
import {
    getProductReviews,
    createReview,
    updateReview,
    deleteReview,
} from '../controllers/reviewController.js';
import { protect } from '../middleware/auth.js';
import { reviewValidation, validate } from '../middleware/validation.js';

const router = express.Router();

router.post('/', protect, reviewValidation, validate, createReview);

router.get('/product/:productId', getProductReviews);

router.route('/:id').put(protect, updateReview).delete(protect, deleteReview);

export default router;