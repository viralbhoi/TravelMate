
import React, { useState, useEffect } from 'react';
import { 
  Menu, X, MapPin, Clock, Car, User, Bell, 
  Navigation, Star, CreditCard, Settings, LogOut,
  ChevronDown, Zap, Route, Wallet, Shield, 
  MessageSquare, Gift, Sparkles, Battery,
  Target
} from 'lucide-react';

const Navbar = ({ 
  title = "RideFlow", 
  navElements = [],
  user = null,
  currentLocation = "Detecting location...",
  rideStatus = null,
  onLocationClick = () => {},
  onProfileClick = () => {},
  onNotificationClick = () => {},
  theme = "gradient", // gradient, dark, light, neon
  showWeather = true,
  className = ""
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [notifications, setNotifications] = useState(2);
  const [weather, setWeather] = useState("22°C ☀️");
  const [batteryLevel, setBatteryLevel] = useState(85);

  const getThemeClasses = () => {
    switch(theme) {
      case 'gradient':
        return 'bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 text-white';
      case 'dark':
        return 'bg-gray-900 text-white border-gray-700';
      case 'neon':
        return 'bg-black text-green-400 border-green-500 shadow-lg shadow-green-500/20';
      default:
        return 'bg-white text-gray-800 border-gray-200';
    }
  };

  const getRideStatusConfig = (status) => {
    const configs = {
      searching: { 
        color: 'from-yellow-400 to-orange-500', 
        icon: Target, 
        pulse: true,
        bgColor: 'bg-gradient-to-r from-yellow-100 to-orange-100'
      },
      driver_assigned: { 
        color: 'from-blue-400 to-blue-600', 
        icon: User, 
        pulse: false,
        bgColor: 'bg-gradient-to-r from-blue-100 to-blue-200'
      },
      driver_arriving: { 
        color: 'from-blue-500 to-purple-600', 
        icon: Navigation, 
        pulse: true,
        bgColor: 'bg-gradient-to-r from-blue-100 to-purple-100'
      },
      in_ride: { 
        color: 'from-green-400 to-emerald-500', 
        icon: Route, 
        pulse: false,
        bgColor: 'bg-gradient-to-r from-green-100 to-emerald-100'
      },
      completed: { 
        color: 'from-gray-400 to-gray-500', 
        icon: Star, 
        pulse: false,
        bgColor: 'bg-gradient-to-r from-gray-100 to-gray-200'
      }
    };
    return configs[status?.type] || configs.searching;
  };

  useEffect(() => {
    // Simulate battery level updates
    const interval = setInterval(() => {
      setBatteryLevel(prev => Math.max(20, prev - Math.random() * 2));
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const isLightTheme = theme === 'light';
  const isDarkTheme = theme === 'dark' || theme === 'neon';
  const textColor = isLightTheme ? 'text-gray-700' : 'text-white';
  const hoverColor = isLightTheme ? 'hover:text-gray-900' : 'hover:text-gray-200';

  return (
    <nav className={`${getThemeClasses()} shadow-2xl border-b backdrop-blur-sm relative z-50 ${className}`}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between items-center h-18">
          
          {/* Left Section - Enhanced Logo & Location */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
                <Sparkles size={20} className="text-white" />
              </div>
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-200">
                {title}
              </span>
            </div>
            
            {/* Enhanced Location Display */}
            <div className="hidden lg:flex items-center space-x-3">
              <div 
                className="flex items-center space-x-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full cursor-pointer hover:bg-white/20 transition-all duration-300 group"
                onClick={onLocationClick}
              >
                <MapPin size={16} className="text-white/80 group-hover:text-white" />
                <span className="text-sm text-white/90 max-w-48 truncate font-medium">
                  {currentLocation}
                </span>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              
              {showWeather && (
                <div className="bg-white/10 backdrop-blur px-3 py-2 rounded-full">
                  <span className="text-sm text-white/90">{weather}</span>
                </div>
              )}
            </div>
          </div>

          {/* Center Section - Enhanced Ride Status */}
          {rideStatus && (
            <div className="hidden md:flex items-center">
              <div className={`${getRideStatusConfig(rideStatus).bgColor} backdrop-blur px-6 py-3 rounded-2xl shadow-lg border border-white/20`}>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${getRideStatusConfig(rideStatus).color} ${getRideStatusConfig(rideStatus).pulse ? 'animate-pulse' : ''}`}></div>
                    {getRideStatusConfig(rideStatus).pulse && (
                      <div className={`absolute inset-0 w-4 h-4 rounded-full bg-gradient-to-r ${getRideStatusConfig(rideStatus).color} animate-ping opacity-30`}></div>
                    )}
                  </div>
                  <div className="flex items-center space-x-3">
                    {React.createElement(getRideStatusConfig(rideStatus).icon, { 
                      size: 18, 
                      className: "text-gray-700" 
                    })}
                    <div>
                      <span className="text-sm font-semibold text-gray-800">
                        {rideStatus.message}
                      </span>
                      {rideStatus.eta && (
                        <div className="text-xs text-gray-600 mt-1">
                          ETA: {rideStatus.eta}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Right Section - Enhanced Navigation & User */}
          <div className="flex items-center space-x-4">
            
            {/* Desktop Navigation with hover effects */}
            <div className="hidden md:flex items-center space-x-8">
              {navElements.map((element, index) => {
                const IconComponent = element.reactIcon;
                return (
                  <a
                    key={index}
                    href={element.path}
                    className={`flex items-center space-x-2 ${textColor} ${hoverColor} transition-all duration-300 font-medium hover:scale-105 group`}
                  >
                    {IconComponent && (
                      <IconComponent 
                        size={18} 
                        className="group-hover:rotate-12 transition-transform duration-300" 
                      />
                    )}
                    <span>{element.name}</span>
                  </a>
                );
              })}
            </div>

            {/* Enhanced Notifications */}
            <button 
              onClick={onNotificationClick}
              className="relative p-3 bg-white/10 backdrop-blur rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110 group"
            >
              <Bell size={20} className="text-white/80 group-hover:text-white group-hover:animate-swing" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold animate-bounce">
                  {notifications}
                </span>
              )}
            </button>

            {/* Battery Level (Mobile-style) */}
            <div className="hidden lg:flex items-center bg-white/10 backdrop-blur px-3 py-2 rounded-full">
              <Battery size={16} className="text-white/80 mr-2" />
              <span className="text-sm text-white/90 font-medium">{batteryLevel}%</span>
            </div>

            {/* Enhanced User Profile */}
            {user && (
              <div className="relative">
                <button
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  className="flex items-center space-x-3 bg-white/10 backdrop-blur hover:bg-white/20 px-4 py-2 rounded-full transition-all duration-300 hover:scale-105 group"
                >
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                      {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                  </div>
                  <div className="hidden md:block">
                    <span className="text-sm font-medium text-white/90 block">{user.name}</span>
                    <div className="flex items-center">
                      <Star size={12} className="text-yellow-300 fill-current mr-1" />
                      <span className="text-xs text-white/70">{user.rating || '4.9'}</span>
                    </div>
                  </div>
                  <ChevronDown size={16} className="text-white/70 group-hover:rotate-180 transition-transform duration-300" />
                </button>

                {/* Enhanced Profile Dropdown */}
                {showProfileDropdown && (
                  <div className="absolute right-0 top-full mt-3 w-90 bg-indigo-100 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 py-2 animate-in slide-in-from-top-2 duration-200">
                    {/* Profile Header */}
                    <div className="px-6 py-4 border-b border-gray-100">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-full flex items-center justify-center text-lg font-bold">
                          {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                          <div className="flex items-center mt-1">
                            <Star size={14} className="text-yellow-400 fill-current mr-1" />
                            <span className="text-sm text-gray-700 font-medium">{user.rating || '4.9'}</span>
                            <span className="text-xs text-gray-500 ml-2">({user.trips || 127} trips)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Quick Stats */}
                    <div className="px-6 py-3 bg-gray-50 border-b border-gray-100">
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

                    {/* Menu Items */}
                    <div className="py-2">
                      <a href="/profile" className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50 transition-colors group">
                        <User size={18} className="mr-4 text-gray-400 group-hover:text-blue-500" />
                        <span className="font-medium">My Profile</span>
                      </a>
                      <a href="/wallet" className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50 transition-colors group">
                        <Wallet size={18} className="mr-4 text-gray-400 group-hover:text-green-500" />
                        <span className="font-medium">Wallet & Payments</span>
                      </a>
                      <a href="/trips" className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50 transition-colors group">
                        <Clock size={18} className="mr-4 text-gray-400 group-hover:text-purple-500" />
                        <span className="font-medium">Trip History</span>
                      </a>
                      <a href="/rewards" className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50 transition-colors group">
                        <Gift size={18} className="mr-4 text-gray-400 group-hover:text-pink-500" />
                        <span className="font-medium">Rewards & Offers</span>
                      </a>
                      <a href="/support" className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50 transition-colors group">
                        <MessageSquare size={18} className="mr-4 text-gray-400 group-hover:text-cyan-500" />
                        <span className="font-medium">Help & Support</span>
                      </a>
                      <a href="/settings" className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50 transition-colors group">
                        <Settings size={18} className="mr-4 text-gray-400 group-hover:text-orange-500" />
                        <span className="font-medium">Settings</span>
                      </a>
                    </div>
                    
                    <hr className="my-2" />
                    <button className="flex items-center w-full px-6 py-3 text-gray-700 hover:bg-red-50 transition-colors group">
                      <LogOut size={18} className="mr-4 text-gray-400 group-hover:text-red-500" />
                      <span className="font-medium group-hover:text-red-600">Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                // onClick={toggleMobileMenu}
                className="p-2 bg-white/10 backdrop-blur rounded-full hover:bg-white/20 transition-all duration-300"
              >
                {isMobileMenuOpen ? 
                  <X size={24} className="text-white" /> : 
                  <Menu size={24} className="text-white" />
                }
              </button>
            </div>
          </div>
        </div>

        {/* Mobile sections */}
        <div className="lg:hidden px-4 pb-4">
          {/* Mobile Location & Weather */}
          <div className="flex items-center justify-between mb-3">
            <div 
              className="flex items-center space-x-2 bg-white/10 backdrop-blur px-3 py-2 rounded-full cursor-pointer hover:bg-white/20 transition-all flex-1 mr-3"
              onClick={onLocationClick}
            >
              <MapPin size={16} className="text-white/80" />
              <span className="text-sm text-white/90 truncate">{currentLocation}</span>
            </div>
            {showWeather && (
              <div className="bg-white/10 backdrop-blur px-3 py-2 rounded-full">
                <span className="text-sm text-white/90">{weather}</span>
              </div>
            )}
          </div>

          {/* Mobile Ride Status */}
          {rideStatus && (
            <div className={`${getRideStatusConfig(rideStatus).bgColor} backdrop-blur px-4 py-3 rounded-xl mb-3`}>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${getRideStatusConfig(rideStatus).color} ${getRideStatusConfig(rideStatus).pulse ? 'animate-pulse' : ''}`}></div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    {React.createElement(getRideStatusConfig(rideStatus).icon, { 
                      size: 16, 
                      className: "text-gray-700" 
                    })}
                    <span className="text-sm font-semibold text-gray-800">{rideStatus.message}</span>
                  </div>
                  {rideStatus.eta && (
                    <span className="text-xs text-gray-600 mt-1">ETA: {rideStatus.eta}</span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-white/20 backdrop-blur">
            <div className="px-4 py-4 space-y-2">
              {navElements.map((element, index) => {
                const IconComponent = element.reactIcon;
                return (
                  <a
                    key={index}
                    href={element.path}
                    className="flex items-center space-x-4 text-white/90 hover:text-white py-3 px-2 rounded-lg hover:bg-white/10 transition-all duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {IconComponent && <IconComponent size={22} />}
                    <span className="font-medium text-lg">{element.name}</span>
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Backdrop */}
      {showProfileDropdown && (
        <div 
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm" 
          onClick={() => setShowProfileDropdown(false)}
        ></div>
      )}
    </nav>
  );
};

// Example usage component
const App = () => {
  const [currentLocation, setCurrentLocation] = useState("Detecting your location...");
  const [rideStatus, setRideStatus] = useState(null);
  const [currentTheme, setCurrentTheme] = useState("gradient");

  useEffect(() => {
    setTimeout(() => {
      setCurrentLocation("Times Square, Manhattan, NY");
    }, 1500);
  }, []);

  const navigationElements = [
    { name: "Ride", path: "/", reactIcon: Car },
    { name: "Drive", path: "/drive", reactIcon: Zap },
    { name: "Trips", path: "/trips", reactIcon: Clock },
    { name: "Rewards", path: "/rewards", reactIcon: Gift },
  ];

  const mockUser = {
    name: "Alex Rivera",
    email: "alex.rivera@email.com",
    rating: "4.92",
    trips: 147
  };

  const simulateRideStatus = () => {
    const statuses = [
      null,
      { type: 'searching', message: 'Finding nearby drivers...', eta: null },
      { type: 'driver_assigned', message: 'Maria is your driver', eta: '4 mins away' },
      { type: 'driver_arriving', message: 'Maria is arriving now', eta: '30 seconds' },
      { type: 'in_ride', message: 'Heading to destination', eta: '15 mins remaining' },
      { type: 'completed', message: 'Trip completed', eta: null },
    ];
    
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    setRideStatus(randomStatus);
  };

  const themes = ['gradient', 'dark', 'light', 'neon'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar 
        title="RideFlow"
        navElements={navigationElements}
        user={mockUser}
        currentLocation={currentLocation}
        rideStatus={rideStatus}
        theme={currentTheme}
        showWeather={true}
        onLocationClick={() => console.log("Open location picker")}
        onNotificationClick={() => console.log("Show notifications")}
      />
      
      <div className="p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Creative Ride-Share Navbar ✨
          </h1>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl shadow-xl">
              <h2 className="text-xl font-semibold mb-4">🎮 Interactive Demo</h2>
              <div className="space-y-3">
                <button 
                  onClick={simulateRideStatus}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-3 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 font-medium"
                >
                  🚗 Simulate Ride Status
                </button>
                <div className="grid grid-cols-2 gap-2">
                  {themes.map(theme => (
                    <button
                      key={theme}
                      onClick={() => setCurrentTheme(theme)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        currentTheme === theme 
                          ? 'bg-gray-900 text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {theme.charAt(0).toUpperCase() + theme.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-xl">
              <h2 className="text-xl font-semibold mb-4">🌟 Creative Features</h2>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Animated gradient backgrounds</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Glass morphism effects</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Weather integration</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span>Battery level indicator</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                  <span>Enhanced ride tracking</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                  <span>Rich profile dropdown</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-xl">
            <h2 className="text-2xl font-semibold mb-6">🎨 Design Philosophy</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold text-purple-600 mb-3">Modern Aesthetics</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Gradient backgrounds</li>
                  <li>• Glass morphism effects</li>
                  <li>• Smooth animations</li>
                  <li>• Interactive hover states</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-blue-600 mb-3">Enhanced UX</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Real-time status updates</li>
                  <li>• Context-aware information</li>
                  <li>• Quick action access</li>
                  <li>• Mobile-first design</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-green-600 mb-3">Smart Features</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Weather integration</li>
                  <li>• Battery monitoring</li>
                  <li>• Location awareness</li>
                  <li>• Performance tracking</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;