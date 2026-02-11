import { useState } from 'react';
import { X, Eye, EyeOff } from 'lucide-react';

export default function LoginModal({ onClose, onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);

 const handleSubmit = async (e) => {
   e.preventDefault();
   setLoading(true);
   setError("");

   try {
     const url = isLogin
       ? "http://localhost:8080/auth/login"
       : "http://localhost:8080/auth/register";

     const payload = isLogin
       ? {
           email: formData.email,
           password: formData.password,
         }
       : {
           email: formData.email,
           password: formData.password,
           name: formData.name,
           phone: formData.phone,
         };

     const response = await fetch(url, {
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify(payload),
     });

  const data = await response.json();

     if (!response.ok) {
       setError(data.message);
       setLoading(false);
       return;
     }
     localStorage.setItem("token", data.token);

     const profileRes = await fetch("http://localhost:8080/users/me", {
       headers: {
         Authorization: `Bearer ${data.token}`,
       },
     });

     const userProfile = await profileRes.json();
     localStorage.setItem("user", JSON.stringify(userProfile));

     window.dispatchEvent(new Event("storage"));

     onLogin(data.token,userProfile);
     onClose();

   } catch (err) {
     setError("Server error. Please try again.");
   }
 };


  const handleChange = (e) => {
      setError("");
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({ email: '', password: '', name: '', phone: '' });
    setShowPassword(false);
    setError("");
  };
const fetchUserProfile = async (token) => {
  const response = await fetch("http://localhost:8080/users/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user profile");
  }

  return response.json();
};

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">
            {isLogin ? 'Login' : 'Sign Up'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Name (Signup only) */}
          {!isLogin && (
            <div>
              <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter your full name"
              />
            </div>
          )}

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="your.email@example.com"
            />
          </div>

          {/* Phone (Signup only) */}
          {!isLogin && (
            <div>
                <label
                  htmlFor="phone"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    if (value.length <= 10) {
                      setFormData({ ...formData, phone: value });
                    }
                  }}
                  maxLength={10}
                  required
                  inputMode="numeric"
                  pattern="[0-9]{10}"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Enter 10-digit number"
                />
              </div>
          )}

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
              Password *
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
{error && (
            <div className="bg-red-50 text-red-600 px-4 py-2 rounded text-sm">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-600 text-white px-6 py-3 rounded-md hover:bg-teal-700 transition-colors font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>

          {/* Toggle Mode */}
          <div className="text-center">
            <button
              type="button"
              onClick={toggleMode}
              className="text-teal-600 hover:text-teal-700 font-medium"
            >
              {isLogin
                ? "Don't have an account? Sign Up"
                : 'Already have an account? Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
