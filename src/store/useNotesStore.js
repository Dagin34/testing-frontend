import { create } from "zustand";
import toast from "react-hot-toast";
// import { axiosInstance } from "../lib/axios";
import axios from 'axios';
import { useAuthStore } from "./useAuthStore";

// const BASE_URL = 'http://localhost:5200/api'; // Consistent base URL
const BASE_URL = 'https://testing-backend-xq50.onrender.com/api'; // Consistent base URL

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, //  Allow sending cookies with requests
  headers: {
    'Content-Type': 'application/json',
  },
});

export const useNotesStore = create((set, get) => ({
  notes: [],
  isFetchingNotes: false,

  fetchNotes: async () => {
    set({ isFetchingNotes: true });
    try {
      const { authUser } = useAuthStore.getState();
      const res = await axiosInstance.get('/notes', {
        params: { userId: authUser._id },
      });
      set({ notes: res.data.notes });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error fetching notes');
      console.error('Fetch Notes Error:', error);
    } finally {
      set({ isFetchingNotes: false });
    }
  },

  createNote: async (noteData) => {
    try {
      const { authUser } = useAuthStore.getState();
      const res = await axiosInstance.post('/notes/create', { ...noteData, userId: authUser._id });
      set({ notes: [...get().notes, res.data.note] });
      toast.success('Note created successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error creating note');
      console.error('Create Note Error:', error);
    }
  },

  updateNote: async (noteId, noteData) => {
    try {
      const { authUser } = useAuthStore.getState();
      const res = await axiosInstance.post('/notes/update', { _id: noteId, ...noteData, userId: authUser._id });
      const updatedNote = res.data.note;
      set({
        notes: get().notes.map(note => note._id === noteId ? updatedNote : note)
      });
      toast.success('Note updated successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error updating note');
      console.error('Update Note Error:', error);
    }
  },

  deleteNote: async (noteId) => {
    try {
      const { authUser } = useAuthStore.getState();
      await axiosInstance.post('/notes/delete', { note_id: noteId, userId: authUser._id });
      set({ notes: get().notes.filter(note => note._id !== noteId) });
      toast.success('Note deleted successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error deleting note');
      console.error('Delete Note Error:', error);
    }
  }
}));