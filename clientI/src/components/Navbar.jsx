import { useState } from "react";
import { Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  const navLinkClass = ({ isActive }) =>
    isActive ? "text-yellow-400 font-semibold" : "hover:text-gray-300";

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="text-xl font-bold">MyLogo</div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            <NavLink to="/" className={navLinkClass}>Home</NavLink>
            
            {!isAuthenticated ? (
              <>
                <NavLink to="/register" className={navLinkClass}>Register</NavLink>
                <NavLink to="/login" className={navLinkClass}>Login</NavLink>
              </>
            ) : (
              <>
                <NavLink to="/dashboard" className={navLinkClass}>Dashboard</NavLink>
                <NavLink to="/profile" className={navLinkClass}>Profile</NavLink>
                <span className="text-gray-300">Hi, {user?.name}</span>
                <button 
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-700 rounded-b-xl shadow-lg px-4 pb-4 pt-2 space-y-2 transition-all duration-300 ease-in-out">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `block px-3 py-2 rounded-lg transition ${isActive
                ? "bg-gray-900 text-yellow-400 font-semibold"
                : "text-white hover:bg-gray-600 hover:text-yellow-300"
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            Home
          </NavLink>
     
          {!isAuthenticated ? (
            <>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-lg transition ${isActive
                    ? "bg-gray-900 text-yellow-400 font-semibold"
                    : "text-white hover:bg-gray-600 hover:text-yellow-300"
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                Register
              </NavLink>

              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-lg transition ${isActive
                    ? "bg-gray-900 text-yellow-400 font-semibold"
                    : "text-white hover:bg-gray-600 hover:text-yellow-300"
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                Login
              </NavLink>
            </>
          ) : (
            <>
              <div className="block px-3 py-2 text-gray-300">
                Hi, {user?.name}
              </div>
              
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-lg transition ${isActive
                    ? "bg-gray-900 text-yellow-400 font-semibold"
                    : "text-white hover:bg-gray-600 hover:text-yellow-300"
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </NavLink>

              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-lg transition ${isActive
                    ? "bg-gray-900 text-yellow-400 font-semibold"
                    : "text-white hover:bg-gray-600 hover:text-yellow-300"
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                Profile
              </NavLink>

              <button 
                onClick={handleLogout}
                className="block w-full text-left px-3 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
