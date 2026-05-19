import { useEffect, useState } from "react";
import { Search } from "lucide-react";
export default function Doctors({setPage,setSelectedDoctor,setSelectedReason}){
      const [doctors, setDoctors] = useState([]);
      const [searchTerm, setSearchTerm] = useState("");
      const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/doctors")
      .then((res) => res.json())
      .then((data) => {
        setDoctors(data);
      })
      .catch((err) => console.error("Error fetching doctors:", err));
  }, []);

const handleSearch = async (value) => {

  setSearchTerm(value);

  try {

    if (!value.trim()) {

      fetch("http://localhost:8080/api/doctors")
        .then((res) => res.json())
        .then((data) => setDoctors(data));

      return;

    }

    const res = await fetch(
      `http://localhost:8080/api/doctors/search?problem=${value}`
    );

    const data = await res.json();

    setDoctors(data);

  } catch (error) {

    console.error("Search error:", error);

  }

};
const fetchSuggestions = async (value) => {

  if (!value.trim()) {

    setSuggestions([]);

    return;

  }

  try {

    const res = await fetch(
      `http://localhost:8080/api/doctors/suggestions?keyword=${value}`
    );

    const data = await res.json();

    setSuggestions(data);

  } catch (error) {

    console.error(error);

  }

};

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
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) =>{
                  handleSearch(e.target.value)
                   fetchSuggestions(e.target.value);}}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-gray-700"
            />
            {suggestions.length > 0 && (

              <div className="absolute left-0 top-full w-full bg-white border rounded-lg shadow-md mt-1 z-50">

                {suggestions.map((item, index) => (

                  <div
                    key={index}
                    onClick={() => {

                      setSearchTerm(item);

                      handleSearch(item);

                      setSuggestions([]);

                    }}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >

                    {item}

                  </div>

                ))}

              </div>

            )}
          </div>

        </div>
     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
       {doctors.map((doctor)  => (
         <div
           key={doctor.id}
           className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition"
         >
       <img
         src={doctor.imageurl}
         alt={doctor.name}
         className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
       />
           <h3 className="text-xl font-semibold text-gray-900">
             {doctor.name}
           </h3>

           <p className="text-teal-600 font-medium">
             {doctor.specialization}
           </p>
           <p className="text-yellow-500 font-medium">
             ⭐ {doctor.rating}
           </p>

           <p className="text-gray-500 text-sm">
             {doctor.experience} Years Experience
           </p>
           <p className="text-teal-600 font-semibold">
             ₹{doctor.fee} Consultation
           </p>
<button
  onClick={() =>{
    setPage("book-appointment");
     setSelectedDoctor(doctor);
     setSelectedReason(searchTerm);
  }}
  className="mt-4 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition"
>
  Book Appointment
</button>
         </div>
       ))}
     </div>

    </div>

  );
}
