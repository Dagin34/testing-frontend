import axios from 'axios';
import toast from 'react-hot-toast';
import { create } from 'zustand';

const BASE_URL = 'http://localhost:5200/api'; // Consistent base URL

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, //  Allow sending cookies with requests
  headers: {
    'Content-Type': 'application/json',
  },
});

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    set({ isCheckingAuth: true }); // set before the try-catch
    try {
      const res = await axiosInstance.get('/auth/check');
      set({ authUser: res.data });
    } catch (error) {
      console.log('Error in checkAuth:', error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post('/auth/signup', data);
      set({ authUser: res.data });
      toast.success('Account created successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Signup failed');
      console.error("Signup Error:", error);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post('/auth/login', data);
      set({ authUser: res.data });
      toast.success('Logged in successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
      console.error("Login Error:", error);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post('/auth/logout');
      set({ authUser: null });
      toast.success('Logged out successfully!');
    } catch (error) {
      toast.error('Failed to log out.' + (error.response?.data?.message || ''));
      console.error("Logout Error:", error);
    }
  },
}));
