import { useState, useEffect } from "react";
import { Calendar, Clock, CheckCircle } from "lucide-react";
import Select from "react-select";

export default function BookAppointment({ selectedDoctor,selectedReason}) {
const [appointment, setAppointment] = useState(null);
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");

  const [showConfirmation, setShowConfirmation] = useState(false);

  const [loading, setLoading] = useState(false);

  const [availableSlots, setAvailableSlots] = useState([]);
  const [availableDates, setAvailableDates] = useState([]);
  const [reason, setReason] =
    useState(selectedReason || "");


  useEffect(() => {

    if (selectedDoctor) {

      fetchAvailableDates(selectedDoctor.id);

    }

  }, [selectedDoctor]);

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

  const formatTime = (time) => {

    const [hour, minute] = time.split(":");

    const date = new Date();

    date.setHours(hour);
    date.setMinutes(minute);

    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    });


  };

  const handleBookAppointment = async () => {

    const token = localStorage.getItem("token");

    if (!token) {

      alert("Please login to book an appointment");

      return;

    }

    if (
      !selectedDoctor ||
      !appointmentDate ||
      !appointmentTime||
       !reason.trim()
    ) {

      alert("Please fill in all fields");

      return;

    }

    setLoading(true);

    const appointmentData = {

      doctorId: selectedDoctor.id,

      appointmentDate,

      appointmentTime,

      reason: reason

    };

    console.log(appointmentData);

    try {

      const res = await fetch(
        "http://localhost:8080/appointments",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
          },
          body: JSON.stringify(appointmentData)
        }
      );

      if (!res.ok) {

        const msg = await res.text();

        alert(msg || "Booking failed");

        setLoading(false);

        return;

      }

      const savedAppointment =
            await res.json();

      setAppointment(savedAppointment);

      setShowConfirmation(true);

    } catch (error) {

      console.error(
        "Error booking appointment:",
        error
      );

      alert("Failed to book appointment");

    } finally {

      setLoading(false);

    }

  };
const [reasons,setReasons]=useState([]);

useEffect(()=>{

if(selectedDoctor){

fetch(
`http://localhost:8080/api/doctors/${selectedDoctor.id}/reasons`
)

.then(res=>res.json())
.then(data=>setReasons(data));

}

},[selectedDoctor]);
  const resetForm = () => {

    setAppointmentDate("");

    setAppointmentTime("");

    setAvailableSlots([]);

    setAvailableDates([]);

    setShowConfirmation(false);

    if (selectedDoctor) {

      fetchAvailableDates(selectedDoctor.id);

    }

  };

  if (showConfirmation) {

    return (

<div className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl p-8 space-y-3 border mt-6">
    <h1 className="text-4xl font-bold text-center text-teal-700">
      SmartCare Hospital
    </h1>

    <p className="text-center text-gray-500">
      Appointment Receipt
    </p>

  <div className="flex justify-between items-center border-b pb-3">
    <span className="font-semibold">
      Appointment ID
    </span>

    <span>
      {appointment.id}
    </span>
  </div>

  <div className="flex justify-between items-center border-b pb-3">
    <span className="font-semibold">
      Token Number
    </span>

    <span>
      {appointment.tokenNumber}
    </span>
  </div>
  <div className="flex justify-between items-center border-b pb-3">
      <span className="font-semibold">
        Date
      </span>

       <span>
                 {new Date().toLocaleDateString()}
             </span>
    </div>

  <div className="flex justify-between items-center border-b pb-3">
    <span className="font-semibold">
      Patient Name
    </span>

    <span>
{appointment?.patientName}
    </span>
  </div>

  <div className="flex justify-between items-center border-b pb-3">
    <span className="font-semibold">
      Doctor
    </span>

    <span>
      {selectedDoctor?.name}
    </span>
  </div>

  <div className="flex justify-between items-center border-b pb-3">
    <span className="font-semibold">
      Specialization
    </span>

    <span>
      {selectedDoctor.specialization}
    </span>
  </div>

  <div className="flex justify-between items-center border-b pb-3">
    <span className="font-semibold">
      Reason
    </span>

    <span>
      {appointment.reason}
    </span>
  </div>

  <div className="flex justify-between items-center border-b pb-3">
    <span className="font-semibold">
      Date
    </span>

    <span>
     {
     new Date(
         appointment?.appointmentDate
     ).toLocaleDateString(
         "en-IN",
         {
             day:"numeric",
             month:"long",
         }
     )
     }
    </span>
  </div>

  <div className="flex justify-between items-center border-b pb-3">
    <span className="font-semibold">
      Time
    </span>

    <span>
      {
      new Date(
          `1970-01-01T${appointment?.appointmentTime}`
      ).toLocaleTimeString(
          "en-IN",
          {
              hour:"numeric",
              minute:"2-digit",
              hour12:true
          }
      )
      }
    </span>
  </div>

  <div className="flex justify-between items-center border-b pb-3">
    <span className="font-semibold">
      Consultation Fee
    </span>

    <span>
      ₹{selectedDoctor.fee}
    </span>
  </div>

 <div className="flex justify-between items-center border-b pb-3">

   <span className="font-semibold">
     Status
   </span>

   <span className="text-green-600 font-semibold">
     CONFIRMED
   </span>

 </div>

 <div className="mt-6 text-xs text-gray-500 text-center pt-4">

   <p>
     Please arrive 15 minutes early
   </p>

   <p>
     Carry previous medical records if available
   </p>

 </div>
 <button
   onClick={resetForm}
   className="w-full bg-teal-600 text-white py-3 rounded-xl hover:bg-teal-700 transition"
 >
   Done
 </button>
</div>


    );

  }

  return (

    <div className="min-h-screen bg-gray-50 py-12">

      <div className="max-w-4xl mx-auto px-4">

        <h1 className="text-4xl font-bold text-center mb-8">
          Book an Appointment
        </h1>

        <div className="bg-white rounded-2xl shadow-md p-8">

          {selectedDoctor && (

            <div className="mb-8 flex items-center gap-4 border rounded-xl p-4 bg-teal-50">

              <img
                src={selectedDoctor.imageurl}
                alt={selectedDoctor.name}
                className="w-20 h-20 rounded-full object-cover"
              />

              <div>

                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedDoctor.name}
                </h2>

                <p className="text-teal-600 font-medium">
                  {selectedDoctor.specialization}
                </p>

                <p className="text-gray-500 text-sm">
                  {selectedDoctor.experience} Years Experience
                </p>

              </div>

            </div>

          )}

          {selectedDoctor && (

            <div className="grid md:grid-cols-2 gap-6 mb-8">

              <div>

                <label className="flex items-center gap-2 font-medium mb-3">

                  <Calendar size={18} />

                  Date

                </label>

               <Select
                   options={availableDates.map(date => ({
                       value: date,
                       label: new Date(date)
                           .toLocaleDateString(
                               "en-IN",
                               {
                                   day:"numeric",
                                   month:"short",
                                   year:"numeric"
                               }
                           )
                   }))}

                   placeholder="Select Available Date"

                   value={
                       availableDates
                           .map(date => ({
                               value: date,
                               label: new Date(date)
                                   .toLocaleDateString(
                                       "en-IN",
                                       {
                                           day:"numeric",
                                           month:"short",
                                           year:"numeric"
                                       }
                                   )
                           }))
                           .find(
                               item =>
                                   item.value === appointmentDate
                           )
                   }

                   onChange={(selected)=>{

                       setAppointmentDate(
                           selected.value
                       );

                       fetchAvailableSlots(
                           selectedDoctor.id,
                           selected.value
                       );

                   }}
               />
              </div>

              {appointmentDate && (

                <div>

                  <label className="flex items-center gap-2 font-medium mb-3">

                    <Clock size={18} />

                    Time

                  </label>

                  <div className="flex flex-wrap gap-3">

                    {availableSlots.map((slot) => (

                      <button
                        key={slot}
                        onClick={() => setAppointmentTime(slot)}
                        className={`px-4 py-2 rounded-xl border transition ${
                          appointmentTime === slot
                            ? "bg-teal-600 text-white"
                            : "bg-white hover:border-teal-500"
                        }`}
                      >

                        {formatTime(slot)}

                      </button>

                    ))}

                  </div>
                </div>
              )}

            </div>

          )}

      <div className="mt-6 py-4">

        <label className="block font-medium mb-2">

          Reason for Visit

        </label>
       <Select
         options={reasons.map(item => ({
             value:item,
             label:item
         }))}

         placeholder="Select Reason"

         onChange={(selected)=>
             setReason(selected.value)
         }
       />

      </div>

          {selectedDoctor &&
            appointmentDate &&
            appointmentTime && (

            <div className="text-center">

              <button
                onClick={handleBookAppointment}
                disabled={loading}
                className="bg-teal-600 text-white px-8 py-3 rounded-xl text-lg hover:bg-teal-700 transition disabled:bg-gray-400"
              >

                {loading
                  ? "Booking..."
                  : "Confirm Appointment"}

              </button>

            </div>

          )}

        </div>

      </div>

    </div>

  );

}