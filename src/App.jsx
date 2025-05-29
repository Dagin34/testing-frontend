import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useAuthStore } from './store/useAuthStore';
import { useThemeStore } from './store/useThemeStore';
import { Toaster } from 'react-hot-toast';
import { Loader } from 'lucide-react';

import Navbar from './components/Navbar';

import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import NotesPage from './pages/NotesPage';

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const { theme } = useThemeStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin text-orange-400 size-10" />
      </div>
    );
  }

  return (
    <div data-theme={theme} className={`bg-base-100 relative ${window.location.pathname.includes("/login") || window.location.pathname.includes("/signup") ? "overflow-hidden h-screen" : ""}`}>
      <Navbar />
      <Routes>
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to={"/"} />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to={"/login"} />} />
        <Route path="/" element={authUser ? <NotesPage /> : <Navigate to={"/login"} />} />
      </Routes>
      <Toaster position="bottom-right" reverseOrder={false} />
    </div>
  );
}

export default App;
