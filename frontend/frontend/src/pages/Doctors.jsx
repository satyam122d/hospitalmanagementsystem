import { useEffect, useState } from "react";
import { Search } from "lucide-react";
export default function Doctors() {
      const [doctors, setDoctors] = useState([]);
      const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    fetch("http://localhost:8080/api/doctors")
      .then((res) => res.json())
      .then((data) => {
        setDoctors(data);
      })
      .catch((err) => console.error("Error fetching doctors:", err));
  }, []);

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
         src="https://via.placeholder.com/150"
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
             Experienced Doctor
           </p>
         </div>
       ))}
     </div>

    </div>

  );
}
