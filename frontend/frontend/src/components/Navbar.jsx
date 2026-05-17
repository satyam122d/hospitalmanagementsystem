import { Activity, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar({ onNavigate, onLoginClick, isLoggedIn, user }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");

  const handleNav = (page) => {
    setActive(page);
    onNavigate(page);
    setMenuOpen(false);
  };

  const navItemClass = (key) =>
    `cursor-pointer px-4 py-2 rounded-md ${
      active === key
        ? "bg-teal-50 text-teal-600"
        : "hover:text-teal-600"
    }`;

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-teal-500 to-blue-600 p-2 rounded-lg">
              <Activity className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-teal-600">SmartCare</h1>
              <p className="text-xs text-gray-500">Your Health Partner</p>
            </div>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-2 text-gray-700 font-medium">
            <span className={navItemClass("home")} onClick={() => handleNav("home")}>Home</span>
            <span className={navItemClass("doctors")} onClick={() => handleNav("doctors")}>Doctors</span>
            <span className={navItemClass("book")} onClick={() => handleNav("book")}>Book Appointment</span>
            <span className={navItemClass("status")} onClick={() => handleNav("status")}>Appointment Status</span>
            <span className={navItemClass("contact")} onClick={() => handleNav("contact")}>Contact</span>
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {isLoggedIn && user ? (
              <div
                onClick={() => onNavigate("profile")}
                className="flex items-center gap-2 cursor-pointer"
              >
                <img
                  src={
                    user.avatar ||
                    `https://ui-avatars.com/api/?name=${user.name}`
                  }
                  alt="profile"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="font-medium hidden md:block">
                  {user.name}
                </span>
              </div>
            ) : (
              <button
                onClick={onLoginClick}
                className="bg-teal-500 text-white px-5 py-2 rounded-lg font-semibold"
              >
                Login / Signup
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t shadow-sm">
          <nav className="flex flex-col px-4 py-3 text-gray-700 font-medium">
            <span className={navItemClass("home")} onClick={() => handleNav("home")}>Home</span>
            <span className={navItemClass("doctors")} onClick={() => handleNav("doctors")}>Doctors</span>
            <span className={navItemClass("book")} onClick={() => handleNav("book")}>Book Appointment</span>
            <span className={navItemClass("status")} onClick={() => handleNav("status")}>Appointment Status</span>
            <span className={navItemClass("contact")} onClick={() => handleNav("contact")}>Contact</span>

            {!isLoggedIn && (
              <button
                onClick={onLoginClick}
                className="mt-3 bg-teal-500 text-white py-2 rounded-lg font-semibold"
              >
                Login / Signup
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
