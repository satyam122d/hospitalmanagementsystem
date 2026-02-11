import { useState } from "react";
import { Search } from "lucide-react";
const doctors = [
  {
    id: 1,
    name: "Dr. Anita Sharma",
    specialization: "Cardiologist",
    experience: "10+ years experience",
     availability: "Mon–Fri, 2:00 PM – 8:00 PM",
    image:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e",
  },
  {
    id: 2,
    name: "Dr. Ananya Verma",
    specialization: "Pediatrician",
    experience: "8+ years experience",
     availability: "Mon–wed, 2:00 PM – 8:00 PM",
    image:
      "https://images.unsplash.com/photo-1550831107-1553da8c8464",
  },
  {
    id: 3,
    name: "Dr. Amit Patel",
    specialization: "General Physician",
    experience: "12+ years experience",
     availability: "Mon–Fri, 11:00 AM – 8:00 PM",
    image:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d",
  },
  {
    id: 4,
    name: "Dr. Neha Singh",
    specialization: "Neurologist",
    experience: "9+ years experience",
     availability: "Wed–Fri, 12:00 AM – 8:00 PM",
    image:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f",
  },
  {
    id: 5,
    name: "Dr. Rohan Mehta",
    specialization: "Orthopedic Surgeon",
    experience: "11+ years experience",
     availability: "Tue–Thu, 10:00 AM – 8:00 PM",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d",
  },
  {
    id: 6,
    name: "Dr. Pooja Nair",
    specialization: "Gynecologist",
    experience: "7+ years experience",
     availability: "Mon–Fri, 2:00 PM – 8:00 PM",
    image:
      "https://plus.unsplash.com/premium_photo-1661580574627-9211124e5c3f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZG9jdG9yfGVufDB8fDB8fHww",
  },
];

export default function Doctors() {
    const [searchTerm, setSearchTerm] = useState("");
    const filteredDoctors = doctors.filter((doctor) =>
      `${doctor.name} ${doctor.specialization}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );


  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
         <div className="text-center mb-12">
                          <h1 className="text-4xl font-bold text-gray-900 mb-3">
                            Our Doctors
                          </h1>
                          <p className="text-gray-600 text-lg">
                            Find experienced healthcare professionals across various specializations
                          </p>
                        </div>
        <div className="max-w-3xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by doctor name, specialization, or problem (e.g., fever, gastric, headache)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-gray-700"
            />
          </div>
        </div>
     {/* Doctors Grid */}
     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
       {filteredDoctors.map((doctor)  => (
         <div
           key={doctor.id}
           className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition"
         >
           <img
             src={doctor.image}
             alt={doctor.name}
             className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
           />

           <h3 className="text-xl font-semibold text-gray-900">
             {doctor.name}
           </h3>

           <p className="text-teal-600 font-medium">
             {doctor.specialization}
           </p>

           <p className="text-gray-500 text-sm mt-2">
             {doctor.experience}
           </p>
           <p className="text-sm text-gray-600 mt-3">
             <span className="font-semibold text-gray-800">Availability:</span><br />
             {doctor.availability}
           </p>
         </div>
       ))}
     </div>

    </div>

  );
}
