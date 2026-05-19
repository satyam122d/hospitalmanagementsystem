import { useState ,useEffect} from "react";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import BookAppointment from "./pages/BookAppointment";
import AppointmentStatus from "./pages/AppointmentStatus";
import Contact from "./pages/Contact";
import LoginModal from "./components/LoginModal";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
function App() {
    const [page, setPage] = useState("home");
 const [showLoginModal, setShowLoginModal] = useState(false);
 const [user, setUser] = useState(null);
 const [isLoggedIn, setIsLoggedIn] = useState(false);
const [authLoading, setAuthLoading] = useState(true);
const [selectedDoctor, setSelectedDoctor] =  useState(null);
const [selectedReason, setSelectedReason] = useState("");
   const handleLogin = (token, userData) => {
     localStorage.setItem("token", token);
     localStorage.setItem("user", JSON.stringify(userData));
     setUser(userData);
     setIsLoggedIn(true);
   };

const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  setIsLoggedIn(false);
  setPage("home");
};
const handleNavigate = (page) => {
  setPage(page);
};

const openLoginModal = () => {
  setShowLoginModal(true);
};

const closeModal = () => {
  setShowLoginModal(false);
};

useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    setIsLoggedIn(false);
    setUser(null);
    setAuthLoading(false);
    return;
  }

  fetch("http://localhost:8080/users/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (!res.ok) throw new Error("Invalid token");
      return res.json();
    })
    .then((data) => {
      setUser(data);
      setIsLoggedIn(true);
      localStorage.setItem("user", JSON.stringify(data));
    })
    .catch(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setIsLoggedIn(false);
      setUser(null);
    })
    .finally(() => {
      setAuthLoading(false);
    });
}, []);
 if (authLoading) return null;
  const renderPage = () => {
    switch (page) {
      case "doctors":
        return  <Doctors
                   setPage={setPage}
                   setSelectedDoctor={setSelectedDoctor}
                   setSelectedReason={setSelectedReason}
                 />;
                 case "book-appointment":
                   return <BookAppointment
                   selectedDoctor={selectedDoctor}
                   selectedReason={selectedReason}/>;
      case "status":
        return <AppointmentStatus />;
      case "contact":
        return <Contact />;
        case "profile":
          return <Profile onLogout={handleLogout} />;
          case "reset-password":
            return (
              <ResetPassword
                setPage={setPage}
                openLoginModal={openLoginModal}
              />
            );
        case "forgot-password":
           return <ForgotPassword setPage={setPage} />;


      default:
        return <Home />;
    }

  };

  return (
    <>
     {page !== "forgot-password" &&
      page !== "reset-password" && (

       <Navbar
         onNavigate={handleNavigate}
         onLoginClick={openLoginModal}
         isLoggedIn={isLoggedIn}
         user={user}
       />

     )}
      {renderPage()}

      {showLoginModal && (
       <LoginModal
         onClose={closeModal}
         onLogin={handleLogin}
         onNavigate={handleNavigate}
       />
      )}
    </>
  );

}

export default App;
