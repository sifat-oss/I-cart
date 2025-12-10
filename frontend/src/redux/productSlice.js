import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    products: [],
    filteredProducts: [],
    isLoading: false,
    error: null,
    selectedProduct: null,
    categories: [],
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        fetchProductsStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        fetchProductsSuccess: (state, action) => {
            state.isLoading = false;
            state.products = action.payload;
            state.filteredProducts = action.payload;
        },
        fetchProductsFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        setSelectedProduct: (state, action) => {
            state.selectedProduct = action.payload;
        },
        filterByCategory: (state, action) => {
            if (action.payload === 'all') {
                state.filteredProducts = state.products;
            } else {
                state.filteredProducts = state.products.filter(
                    product => product.category === action.payload
                );
            }
        },
        searchProducts: (state, action) => {
            const searchTerm = action.payload.toLowerCase();
            state.filteredProducts = state.products.filter(product =>
                product.name.toLowerCase().includes(searchTerm) ||
                product.description.toLowerCase().includes(searchTerm)
            );
        },
        setCategories: (state, action) => {
            state.categories = action.payload;
        },
    },
});

export const {
    fetchProductsStart,
    fetchProductsSuccess,
    fetchProductsFailure,
    setSelectedProduct,
    filterByCategory,
    searchProducts,
    setCategories,
} = productSlice.actions;

export default productSlice.reducer;