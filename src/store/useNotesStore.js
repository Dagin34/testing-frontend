import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

export const useNotesStore = create((set, get) => ({
  notes: [],
  isFetchingNotes: false,

  fetchNotes: async () => {
    set({ isFetchingNotes: true });
    try {
      const res = await axiosInstance.get('/notes');
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
      const res = await axiosInstance.post('/notes/create', noteData);
      set({ notes: [...get().notes, res.data.note] });
      toast.success('Note created successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error creating note');
      console.error('Create Note Error:', error);
    }
  },

  updateNote: async (noteId, noteData) => {
    try {
      const res = await axiosInstance.post('/notes/update', { note_id: noteId, ...noteData });
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
      await axiosInstance.post('/notes/delete', { note_id: noteId });
      set({ notes: get().notes.filter(note => note._id !== noteId) });
      toast.success('Note deleted successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error deleting note');
      console.error('Delete Note Error:', error);
    }
  }
}));