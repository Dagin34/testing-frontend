import React, { useState, useEffect } from 'react';
import { Settings } from 'lucide-react';
import { CircleUserRound as Profile } from 'lucide-react';
import { LogOut } from 'lucide-react';
import { X } from 'lucide-react';
import { Menu } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore.js';
import { useThemeStore } from '../store/useThemeStore';
import { Navigate } from 'react-router-dom';

export default function Navbar() {
  const { logout, authUser } = useAuthStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useThemeStore();

  const handleLogout = () => {
    logout();
    Navigate('/login');
    setIsMobileMenuOpen(false);
  };

  // Function to handle theme switching
  const handleThemeChange = () => {
    setTheme(theme === 'dark' ? 'garden' : 'dark');
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const html = document.querySelector('html');
      html?.setAttribute('data-theme', theme);
    }
  }, [theme]);


  return (
    <div className="navbar top-0 left-0 w-full h-16 sticky flex items-center justify-between px-4 transition-all duration-300 z-50 shadow-lg bg-base-300">
      <a href="/" className="navbar__logo flex justify-center items-center gap-3 hover:text-primary">
        Testing Auth
      </a>
      <div className="navbar__links gap-x-8 flex items-center max-md:hidden">
        {authUser && (
          <>
            <a href="/profile" className="flex justify-center items-center gap-2 hover:text-primary">
              <Profile className="size-5" />
              Profile
            </a>
            <a onClick={() => handleLogout()} className="cursor-pointer flex justify-center items-center gap-2 hover:text-primary">
              <LogOut className="size-5" />
              Logout
            </a>
          </>
        )}
        <label className="toggle text-base-content hover:text-primary">
          <input
            type="checkbox"
            checked={theme === 'dark'} // Correctly set checked state
            onChange={handleThemeChange}
            className="theme-controller"
          />
          <svg aria-label="sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="4"></circle>
              <path d="M12 2v2"></path>
              <path d="M12 20v2"></path>
              <path d="m4.93 4.93 1.41 1.41"></path>
              <path d="m17.66 17.66 1.41 1.41"></path>
              <path d="M2 12h2"></path>
              <path d="M20 12h2"></path>
              <path d="m6.34 17.66-1.41 1.41"></path>
              <path d="m19.07 4.93-1.41 1.41"></path>
            </g>
          </svg>
          <svg aria-label="moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
            </g>
          </svg>
        </label>
      </div>
      <button
        className="navbar__hamburger max-lg:block hidden cursor-pointer"
        onClick={() => setIsMobileMenuOpen(true)}
      >
        <Menu />
      </button>

      {isMobileMenuOpen && (
        <div
          className={`navbar__mobile-menu absolute top-0 right-0 w-1/2 max-md:w-2/3 h-screen flex flex-col gap-6 p-4 px-8 shadow-lg bg-primary text-primary-content transition-transform duration-300 transform ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
            }`}
        >
          <button className="absolute top-2 left-8 mt-2 cursor-pointer" onClick={() => setIsMobileMenuOpen(false)}>
            <X />
          </button>
          <a href="/settings" className="flex justify-left items-center gap-4 mt-14">
            <Settings className="size-5" />
            Settings
          </a>
          {authUser && (
            <>
              <a href="/profile" className="flex justify-left items-center gap-4">
                <Profile className="size-5" />
                Profile
              </a>
              <a onClick={() => handleLogout()} className="flex justify-left gap-4 absolute bottom-6 cursor-pointer">
                <LogOut className="size-5" />
                Logout
              </a>
            </>
          )}
        </div>
      )}
    </div>
  );
}
