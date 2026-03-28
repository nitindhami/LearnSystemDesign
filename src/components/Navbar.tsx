import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layers, Sun, Moon, LogIn, LogOut, User as UserIcon } from 'lucide-react';
import { User } from 'firebase/auth';
import { UserProgress } from '../types';
import { Zap } from 'lucide-react';

interface NavbarProps {
  user: User | null;
  userProgress: UserProgress | null;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  onLogin: () => void;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, userProgress, theme, toggleTheme, onLogin, onLogout }) => {
  const location = useLocation();

  const navLinks = [
    { name: 'Dashboard', path: '/' },
    { name: 'Roadmap', path: '/roadmap' },
    { name: 'Glossary', path: '/glossary' },
    { name: 'Checklist', path: '/checklist' },
    { name: 'Interview Guide', path: '/interview-guide' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg shadow-lg shadow-blue-500/20">
              <Layers className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-extrabold tracking-tight">SysDesign<span className="text-blue-600">Master</span></span>
          </Link>
          
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                  location.pathname === link.path ? 'text-blue-600' : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle Theme"
            >
              {theme === 'light' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            
            <div className="flex items-center gap-2">
              {!user ? (
                <button
                  onClick={onLogin}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl text-sm font-bold transition-all shadow-lg shadow-blue-500/20 active:scale-95 flex items-center gap-2"
                >
                  <LogIn className="w-4 h-4" />
                  Login
                </button>
              ) : (
                <div className="flex items-center gap-3">
                  <div className="hidden sm:flex flex-col items-end mr-2">
                    <div className="flex items-center gap-1.5 mb-1">
                      <div className="px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 text-[10px] font-black tracking-widest border border-amber-200 dark:border-amber-800">
                        LVL {Math.floor((userProgress?.totalXp || 0) / 5000) + 1}
                      </div>
                      <div className="px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-[10px] font-black tracking-widest border border-blue-200 dark:border-blue-800 flex items-center gap-1">
                        <Zap className="w-2.5 h-2.5 fill-current" />
                        {userProgress?.totalXp || 0} XP
                      </div>
                    </div>
                    <p className="text-xs font-bold leading-none">{user.displayName}</p>
                  </div>
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="User" className="w-8 h-8 rounded-full border-2 border-blue-600 p-0.5" />
                  ) : (
                    <div className="w-8 h-8 rounded-full border-2 border-blue-600 p-0.5 flex items-center justify-center bg-slate-100 dark:bg-slate-800">
                      <UserIcon className="w-4 h-4 text-slate-400" />
                    </div>
                  )}
                  <button
                    onClick={onLogout}
                    className="p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 transition-colors"
                    title="Logout"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
