import { useState, useEffect } from "react";
import { Search, Calendar, Clock, CheckCircle } from "lucide-react";

export default function BookAppointment() {
    const [availableDates, setAvailableDates] = useState([]);
  const [problem, setProblem] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [tokenNumber, setTokenNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [availableSlots, setAvailableSlots] = useState([]);
  const searchDoctorsByProblem = async (problemText) => {
    if (!problemText.trim()) {
      setFilteredDoctors(doctors);
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:8080/api/doctors/search?problem=${problemText}`
      );
      const data = await res.json();
      setFilteredDoctors(data);
    } catch (error) {
      console.error("Error searching doctors:", error);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

const fetchAvailableSlots = async (doctorId, date) => {
  try {
    const res = await fetch(
      `http://localhost:8080/api/doctors/${doctorId}/available-slots?date=${date}`
    );
    const data = await res.json();
    setAvailableSlots(data);
  } catch (error) {
    console.error("Error fetching slots:", error);
  }
};

  const fetchDoctors = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/doctors");
      const data = await res.json();
      setDoctors(data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

const fetchAvailableDates = async (doctorId) => {
  try {
    const res = await fetch(
      `http://localhost:8080/api/doctors/${doctorId}/available-dates`
    );
    const data = await res.json();
    setAvailableDates(data);
  } catch (error) {
    console.error("Error fetching dates:", error);
  }
};

  const handleBookAppointment = async () => {
    if (!selectedDoctor || !appointmentDate || !appointmentTime || !problem) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);

    const appointmentData = {
      doctorId: selectedDoctor.id,
      appointmentDate: appointmentDate,
      appointmentTime: appointmentTime,
      reason: problem
    };

    try {
      const res = await fetch("http://localhost:8080/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify(appointmentData)
      });

      if (!res.ok) {
        const msg = await res.text();
        alert(msg);
        setLoading(false);
        return;
      }

      const savedAppointment = await res.json();

      setTokenNumber(savedAppointment.tokenNumber);
      setShowConfirmation(true);
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("Failed to book appointment");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setProblem("");
      setDoctors([]);
      setFilteredDoctors([]);
      setSelectedDoctor(null);
      setAvailableDates([]);
      setAvailableSlots([]);
      setAppointmentDate("");
      setAppointmentTime("");
      setShowConfirmation(false);
      setTokenNumber("");
  };
const bookAppointment = async () => {
  const appointmentData = {
    patientId: loggedInUserId,   // for now hardcode or take from auth
    doctorId: selectedDoctorId,
    appointmentDate: selectedDate,   // "2026-02-11"
    appointmentTime: selectedTime,   // "10:00"
    reason: reason
  };

  try {
    const res = await fetch("http://localhost:8080/appointments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`   // same token as login
      },
      body: JSON.stringify(appointmentData)
    });

    if (!res.ok) {
      const msg = await res.text();
      alert(msg);
      return;
    }

    alert("Appointment booked successfully");
  } catch (err) {
    console.error(err);
    alert("Something went wrong");
  }
};

  if (showConfirmation) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />

            <h2 className="text-3xl font-bold mb-4">
              Appointment Confirmed!
            </h2>

            <div className="bg-teal-50 rounded-lg p-6 mb-6">
              <p className="text-sm text-gray-600 mb-2">Your Token Number</p>
              <p className="text-4xl font-bold text-teal-600 mb-4">
                {tokenNumber}
              </p>

              <div className="text-left space-y-2">
                <p><b>Doctor:</b> {selectedDoctor?.name}</p>
                <p><b>Date:</b> {appointmentDate}</p>
                <p><b>Time:</b> {appointmentTime}</p>
                <p><b>Reason:</b> {problem}</p>
              </div>
            </div>

            <button
              onClick={resetForm}
              className="bg-teal-600 text-white px-6 py-3 rounded-md w-full hover:bg-teal-700"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Booking Form
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">
          Book an Appointment
        </h1>

        <div className="bg-white rounded-lg shadow-md p-8">
          {/* Problem */}
          <div className="mb-6">
            <label className="font-semibold mb-2 block">
              What’s bothering you?
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={problem}
               onChange={(e) => {
                 const value = e.target.value;
                 setProblem(value);
                 searchDoctorsByProblem(value);
               }}
                className="w-full pl-10 pr-4 py-3 border rounded-lg"
                placeholder="Enter your problem"
              />
            </div>
          </div>

          {/* Doctor Selection */}
          <div className="mb-6">
            <div className="grid md:grid-cols-2 gap-4">
              {filteredDoctors.map((doctor) => (
                <div
                  key={doctor.id}
                  onClick={() => {
                    setSelectedDoctor(doctor);
                    setAppointmentDate("");
                    setAppointmentTime("");
                    setAvailableSlots([]);
                    fetchAvailableDates(doctor.id);
                  }}
                  className={`border rounded-lg p-4 cursor-pointer ${
                    selectedDoctor?.id === doctor.id
                      ? "border-teal-600 bg-teal-50"
                      : "hover:border-teal-400"
                  }`}
                >
                  <h3 className="font-semibold">{doctor.name}</h3>
                  <p className="text-sm text-teal-600">
                    {doctor.specialization}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Date & Time */}
          {selectedDoctor && (
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block mb-2">
                  <Calendar className="inline w-4 h-4 mr-1" />
                  Date
                </label>
                <select
                  value={appointmentDate}
                  onChange={(e) => {
                    const date = e.target.value;
                    setAppointmentDate(date);
                    fetchAvailableSlots(selectedDoctor.id, date);
                  }}
                  className="w-full border px-4 py-2 rounded-lg"
                >
                  <option value="">Select available date</option>

                  {availableDates.map((date) => (
                    <option key={date} value={date}>
                      {date}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-2">
                  <Clock className="inline w-4 h-4 mr-1" />
                  Time
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {availableSlots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setAppointmentTime(slot)}
                      className={`border rounded-lg py-2 ${
                        appointmentTime === slot
                          ? "bg-teal-600 text-white"
                          : "hover:bg-teal-100"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Confirm */}
          {selectedDoctor && appointmentDate && appointmentTime && (
            <div className="text-center">
              <button
                onClick={handleBookAppointment}
                disabled={loading}
                className="bg-teal-600 text-white px-8 py-3 rounded-md text-lg hover:bg-teal-700 disabled:bg-gray-400"
              >
                {loading ? "Booking..." : "Confirm Appointment"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
