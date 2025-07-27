import React from 'react'
import { 
  Clock, User, Star, Settings, LogOut, Wallet, 
  MessageSquare, Gift, XIcon
} from 'lucide-react';

export default function ProfileDropDown({ user, setProfileDD }) {
  
  const buttons = [
    {
      icon: <User size={18} className="mr-4 text-gray-400 group-hover:text-blue-500" />,
      text: "My Profile",
      link: "/profile"
    },
    {
      icon: <Wallet size={18} className="mr-4 text-gray-400 group-hover:text-green-500" />,
      text: "Wallet & Payments",
      link: "/wallet"
    },
    {
      icon: <Clock size={18} className="mr-4 text-gray-400 group-hover:text-purple-500" />,
      text: "Trip History",
      link: "/trips"
    },
    {
      icon: <Gift size={18} className="mr-4 text-gray-400 group-hover:text-pink-500" />,
      text: "Rewards & Offers",
      link: "/rewards"
    },
    {
      icon: <MessageSquare size={18} className="mr-4 text-gray-400 group-hover:text-cyan-500" />,
      text: "Help & Support",
      link: "/support"
    },
    {
      icon: <Settings size={18} className="mr-4 text-gray-400 group-hover:text-orange-500" />,
      text: "Settings",
      link: "/settings"
    },
  ];

  return (
    <div className="absolute right-2 top-15 mt-3 max-w-screen bg-indigo-100 backdrop-blur-xl w-sm rounded-2xl shadow-2xl border border-white/20 py-2 animate-in slide-in-from-top-2 duration-200">
       
      <div className="px-6 py-4 border-b border-gray-100 relative">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-full flex items-center justify-center text-lg font-bold">
            {user?.name ? user?.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <div>
            <p className="font-semibold text-gray-900">{user?.name}</p>
            <p className="text-sm text-gray-500">{user?.email}</p>
            <div className="flex items-center mt-1">
              <Star size={14} className="text-yellow-400 fill-current mr-1" />
              <span className="text-sm text-gray-700 font-medium">{user?.rating || '4.9'}</span>
              <span className="text-xs text-gray-500 ml-2">({user?.trips || 127} trips)</span>
            </div>
          </div>
        </div>
        <XIcon 
          size={20}
          className="absolute right-2 top-2 text-gray-400 hover:text-gray-600 cursor-pointer"
          onClick={() => setProfileDD(false)}
        />
      </div>

      {/* Quick Stats */}
      <div className="px-6 py-3 bg-gray-50 border-b flex flex-wrap justify-evenly border-gray-100">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-gray-900">$24.50</div>
            <div className="text-xs text-gray-500">Wallet</div>
          </div>
          <div>
            <div className="text-lg font-bold text-green-600">127</div>
            <div className="text-xs text-gray-500">Trips</div>
          </div>
          <div>
            <div className="text-lg font-bold text-blue-600">2.1k</div>
            <div className="text-xs text-gray-500">Points</div>
          </div>
        </div>
      </div>

      <div className="py-2">
        {buttons.map((btn, index) => (
          <ProfileButton key={index} {...btn} />
        ))}
      </div>

      <hr className="my-2" />

      <button className="flex items-center w-full px-6 py-3 text-gray-700 hover:bg-red-50 transition-colors group">
        <LogOut size={18} className="mr-4 text-gray-400 group-hover:text-red-500" />
        <span className="font-medium group-hover:text-red-600">Sign Out</span>
      </button>
    </div>
  );
}

// Reusable button
function ProfileButton({ icon, text, link }) {
  return (
    <a href={link} className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50 transition-colors group">
      {icon}
      <span className="font-medium">{text}</span>
    </a>
  );
}
