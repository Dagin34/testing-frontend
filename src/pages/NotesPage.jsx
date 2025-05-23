import React, { useState, useEffect } from 'react';
import { useNotesStore } from '../store/useNotesStore';
import { Plus, X } from 'lucide-react';
import { formatMessageTime } from "../lib/utils"

const NotesPage = () => {
  const { notes, fetchNotes, createNote, updateNote, deleteNote } = useNotesStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ title: '', description: '' });
  const [editingNote, setEditingNote] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const openModalForCreate = () => {
    setEditingNote(null);
    setForm({ title: '', description: '' });
    setModalOpen(true);
  };

  const openModalForEdit = (note) => {
    setEditingNote(note);
    setForm({ title: note.title, description: note.description });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingNote) {
      await updateNote(editingNote._id, form);
    } else {
      await createNote(form);
    }
    setModalOpen(false);
    setForm({ title: '', description: '' });
    setEditingNote(null);
  };

  const handleDelete = async (noteId) => {
    await deleteNote(noteId);
  };

  return (
    <div className="p-6 flex justify-center items-center relative min-full">
      <div className='xl:w-2/3 md:w-5/6 w-[98%]'>
        <h1 name="heading" className="text-2xl font-bold mb-4 pl-6">Notes</h1>
        <div>
          {notes.length === 0 ? (
            <p>No notes available.</p>
          ) : (
            notes.map((note) => (
              <div key={note._id} className="bg-base-200 p-8 rounded-lg shadow-md mb-4">
                <h2 className="text-xl font-semibold">{note.title}</h2>
                <p className='text-sm text-gray-500 mb-4'>{note.updatedAt ? formatMessageTime(note.updatedAt) : formatMessageTime(note.createdAt)}</p>
                <p className="mt-2">{note.description}</p>
                <div className="mt-4 flex gap-4">
                  <button
                    onClick={() => openModalForEdit(note)}
                    className="bg-success text-success-content py-1 px-3 rounded hover:bg-success/70 transition duration-500">
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(note._id)}
                    className="bg-error text-error-content py-1 px-3 rounded hover:bg-error/70 transition duration-500">
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Floating plus icon */}
        <button
          onClick={openModalForCreate}
          className="fixed bottom-6 right-6 bg-primary text-primary-content p-4 rounded-xl shadow-lg hover:bg-primary/90 hover:scale-120 duration-300 transition">
          <Plus />
        </button>

        {/* Modal */}
        {modalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/75 bg-opacity-10 z-50">
            <div className="bg-base-300 p-6 rounded shadow-lg w-11/12 max-w-md relative">
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-0 right-0 bg-base-100 hover:bg-error p-1">
                <X className='text-4xl'/>
              </button>
              <h2 className="text-2xl font-bold mb-4">
                {editingNote ? 'Update Note' : 'Add Note'}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="title" className="block text-sm mb-1">Title</label>
                  <input
                    id="title"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-info"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="description" className="block text-sm mb-1">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-info"
                    required
                  />
                </div>
                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="bg-error text-error-content py-2 px-4 rounded hover:bg-error/75 transition">
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-success text-success-content py-2 px-4 rounded hover:bg-success/75 transition">
                    {editingNote ? 'Update Note' : 'Add Note'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotesPage;