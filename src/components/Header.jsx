import React, { use, useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { UseUserState } from '../../Context';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
const Header = () => {
  const navigate = useNavigate();
  const [user, setuser] = useState(null);
  const { user: currentuser } = UseUserState();

  useEffect(() => {
    setuser(currentuser);
  }, [currentuser]);
  // console.log(user);
  return (
    <header className="fixed top-0 left-0 w-full bg-gray-950/95 backdrop-blur border-b border-gray-800 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center space-x-3">
            <img src="/three.png" alt="Logo" className="h-14 w-auto drop-shadow-lg" />
            <span className="text-2xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Tandem
            </span>
          </Link>
        </div>

        {/* Navigation */}
        {user ? (
          <nav>
            <div className="max-w-6xl mx-auto flex items-center justify-center gap-6 py-2">
              <Link
                to="/dashboard"
                className="px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/60 
                 border border-transparent hover:border-gray-700 transition-all"
              >
                Admin Panel
              </Link>

              <Link
                to="/myprojects"
                className="px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/60 
                 border border-transparent hover:border-gray-700 transition-all"
              >
                My Projects
              </Link>

              <Link
                to="/mytasks"
                className="px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/60 
                 border border-transparent hover:border-gray-700 transition-all"
              >
                My Tasks
              </Link>
            </div>
          </nav>
        ) : (
          <nav className="hidden md:flex space-x-10 text-gray-300 font-medium">
            <a href="#features" className="hover:text-blue-400 transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="hover:text-blue-400 transition-colors">
              How It Works
            </a>
            <a href="#pricing" className="hover:text-blue-400 transition-colors">
              Pricing
            </a>
            <a href="#contact" className="hover:text-blue-400 transition-colors">
              Contact
            </a>
          </nav>
        )}

        {/* CTA Button */}
        {user ? (
          <Link to="/profile">
            <Avatar>
              <AvatarImage src={user.avatar} />
              <AvatarFallback>K</AvatarFallback>
            </Avatar>
          </Link>
        ) : (
          <Button
            size="lg"
            className="px-6 py-5 text-base rounded-xl bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg transition"
            onClick={() => navigate('/auth')}
          >
            Get Started Free
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
