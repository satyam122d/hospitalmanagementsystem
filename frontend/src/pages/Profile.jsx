import { useState, useEffect } from "react";
import {User,Mail,Phone,CalendarClock,Stethoscope,LogOut,Edit,Save,XCircle,Camera,} from "lucide-react";

export default function Profile({ onLogout }) {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [pendingEmail, setPendingEmail] = useState("");
const [tempEmail, setTempEmail] = useState(user?.email || "");
const [emailVerified, setEmailVerified] = useState(true);
const [otpSent, setOtpSent] = useState(false);
const [otp, setOtp] = useState("");

 useEffect(() => {
   const fetchProfile = async () => {
     try {
       const token = localStorage.getItem("token");

       const response = await fetch("http://localhost:8080/users/me", {
         headers: {
           Authorization: `Bearer ${token}`,
         },
       });

       if (!response.ok) {
         throw new Error("Failed to fetch profile");
       }

const data = await response.json();

setUser(data);
localStorage.setItem("user", JSON.stringify(data));

      setUser({
        id: data.id,
        email: data.email,
        name: data.name,
        phone: data.phone,
      });


       setAvatarPreview(null);

     } catch (error) {
       console.error("Profile fetch error:", error);
     }
   };

   fetchProfile();
 }, []);

useEffect(() => {
  const fetchMyAppointments = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:8080/appointments/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch appointments");
      }

      const data = await res.json();
      setAppointments(data);
    } catch (err) {
      console.error("Appointment fetch error:", err);
    }
  };

  fetchMyAppointments();
}, []);

const updateEmailAfterVerification = (verifiedEmail) => {
  const updatedUser = { ...user, email: verifiedEmail };
  setUser(updatedUser);
  localStorage.setItem("user", JSON.stringify(updatedUser));
};
  if (!user) return <p className="p-6">No user data</p>;
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setUser({ ...user, phone: value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
     const updatedUser = { ...user, avatar: previewUrl };
    setAvatarPreview(previewUrl);
    setUser(updatedUser);

    localStorage.setItem("user", JSON.stringify(updatedUser));
     window.dispatchEvent(new Event("user-updated"));
  };

  const saveProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:8080/users/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: user.name,
          phone: user.phone,
        }),
      });

      if (!response.ok) {
        throw new Error("Profile update failed");
      }

      const updatedUser = await response.json();
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setEditing(false);

    } catch (error) {
      console.error(error);
      alert("Failed to update profile");
    }
  };


  const cancelAppointment = (id) => {
    setAppointments((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, status: "Cancelled" } : a
      )
    );
  };

  const nextAppointment = appointments.find(
    (a) => a.status === "Booked"
  );

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">

      <h2 className="text-2xl font-bold flex items-center gap-2">
        <User /> My Profile
      </h2>

      <div className="bg-white shadow rounded-lg p-6 space-y-6">

        <div className="flex items-center gap-6">
          <div className="relative">
            <img
              src={
                avatarPreview ||
                `https://ui-avatars.com/api/?name=${user.name}`
              }
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border"
            />
            {editing && (
              <label className="absolute bottom-0 right-0 bg-teal-600 p-2 rounded-full cursor-pointer text-white">
                <Camera size={16} />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </label>
            )}
          </div>

          <div>
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <User size={18} /> {user.name}
            </h3>
            <p className="text-gray-500 flex items-center gap-2">
              <Mail size={16} /> {user.email}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="font-medium flex items-center gap-2">
              <User size={16} /> Full Name
            </label>
            <input
              name="name"
              value={user.name}
              disabled={!editing}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded mt-1"
            />
          </div>

          <div>
            <label className="font-medium flex items-center gap-2">
              <Phone size={16} /> Phone
            </label>
            <input
              value={user.phone || ""}
              disabled={!editing}
              onChange={handlePhoneChange}
              maxLength={10}
              className="w-full border px-3 py-2 rounded mt-1"
              placeholder="Enter your number"
            />
          </div>

       <div>
         <label className="font-medium flex items-center gap-2">
           <Mail size={16} /> Email
         </label>

         <input
           value={editing ? tempEmail : user.email}
           disabled={!editing}
           onChange={(e) => {
             setTempEmail(e.target.value);
             setEmailVerified(false);
             setOtpSent(false);
           }}
           className={`w-full border px-3 py-2 rounded mt-1 ${
             editing ? "bg-white" : "bg-gray-100"
           }`}
         />

         {editing && tempEmail !== user.email && !emailVerified && (
           <div className="mt-2 space-y-2">
             {!otpSent ? (
              <button
                type="button"
                onClick={() => {
                  setOtpSent(true);
                  alert("Mock OTP sent to " + tempEmail + " (OTP: 123456)");
                }}
                className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded text-sm font-medium"
              >
                Verify new email
              </button>

             ) : (
               <div className="flex gap-2 items-center">
                 <input
                   value={otp}
                   onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                   maxLength={6}
                   placeholder="Enter OTP"
                   className="border px-3 py-1 rounded w-32"
                 />
                 <button
                   type="button"
                   onClick={() => {
                     if (otp === "123456") {
                       setUser({ ...user, email: tempEmail });
                       setEmailVerified(true);
                       setOtp("");
                     } else {
                       alert("Invalid OTP");
                     }
                   }}
                   className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
                 >
                   Verify
                 </button>
               </div>
             )}
           </div>
         )}
       </div>

       </div>
       {!editing ? (
         <button
           onClick={() => {
             setEditing(true);
             setTempEmail(user.email);
             setEmailVerified(true);
           }}
           className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded"
         >
           <Edit size={16} /> Edit Profile
         </button>
       ) : (
         <button
           onClick={saveProfile}
           className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded"
         >
           <Save size={16} /> Save Changes
         </button>
       )}

      </div>

<div className="bg-white shadow rounded-lg p-6 space-y-4">
  <h3 className="text-xl font-semibold flex items-center gap-2">
    <CalendarClock size={18} /> My Appointments
  </h3>

  {appointments.length === 0 ? (
    <p className="text-gray-500">No appointment history found</p>
  ) : (
    appointments.map((apt) => (
      <div
        key={apt.id}
        className="border rounded-lg p-4 flex justify-between items-center"
      >
        <div className="space-y-1">
          <p className="font-medium">
            Token: <span className="font-semibold">{apt.tokenNumber}</span>
          </p>
          <p className="text-sm text-gray-600">
            Date: {apt.appointmentDate} | Time: {apt.appointmentTime}
          </p>
          <p className="text-sm text-gray-600">
            Reason: {apt.reason}
          </p>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            apt.status === "BOOKED"
              ? "bg-green-100 text-green-700"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          {apt.status}
        </span>
      </div>
    ))
  )}
</div>
      <div className="flex justify-end">
        <button
          onClick={onLogout}
          className="flex items-center gap-2 bg-red-500 text-white px-5 py-2 rounded"
        >
          <LogOut size={16} /> Logout
        </button>
      </div>
      {showEmailModal && (
        <ChangeEmailModal
          onClose={() => setShowEmailModal(false)}
          onVerify={updateEmailAfterVerification}
          initialEmail={pendingEmail}
        />
      )}

    </div>
  );
}