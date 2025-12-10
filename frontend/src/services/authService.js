import api from './api';
import toast from 'react-hot-toast';

export const authService = {
    // Register new user
    register: async(userData) => {
        try {
            const response = await api.post('/auth/register', userData);
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
            }
            toast.success('Registration successful!');
            return response.data;
        } catch (error) {
            toast.error(error.response?.data?.message || 'Registration failed');
            throw error;
        }
    },

    // Login user
    login: async(credentials) => {
        try {
            const response = await api.post('/auth/login', credentials);
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
            }
            toast.success('Login successful!');
            return response.data;
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed');
            throw error;
        }
    },

    // Logout user
    logout: () => {
        localStorage.removeItem('token');
        toast.success('Logged out successfully');
    },

    // Get current user
    getCurrentUser: async() => {
        try {
            const response = await api.get('/auth/me');
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Update user profile
    updateProfile: async(userData) => {
        try {
            const response = await api.put('/auth/profile', userData);
            toast.success('Profile updated successfully');
            return response.data;
        } catch (error) {
            toast.error(error.response?.data?.message || 'Update failed');
            throw error;
        }
    },
};

export default authService;