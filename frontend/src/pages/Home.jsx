
import { Shield, Activity, Clock, Award ,Ambulance,Heart,Microscope,Stethoscope,Calendar} from "lucide-react";

export default function Home() {
  return (
    <div>
      {/* HERO SECTION */}
      <section className="bg-gradient-to-br from-teal-500 via-cyan-500 to-blue-600 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-white">

            {/* LEFT CONTENT */}
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Welcome to <br />
                SmartCare Hospital
              </h1>

              <p className="text-xl mb-4 text-white/90">
                Your Health, Our Priority
              </p>

              <p className="text-lg text-white/80 max-w-xl mb-8">
                Experience world-class healthcare with cutting-edge technology and
                compassionate care.
              </p>

              {/* BADGES */}
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                  <Shield size={18} />
                  <span>Trusted Care</span>
                </div>

                <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                  <Clock size={18} />
                  <span>24/7 Emergency</span>
                </div>

                <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                  <Award size={18} />
                  <span>Award Winning</span>
                </div>
              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="hidden lg:block">
              <img
                src="https://images.unsplash.com/photo-1662414185445-b9a05e26dba0"
                alt="Hospital Building"
                className="w-full h-[420px] object-cover rounded-2xl shadow-2xl"
              />
            </div>

          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

            <div className="text-center p-6 rounded-xl bg-teal-50">
              <h3 className="text-4xl font-bold text-gray-900 mb-2">50+</h3>
              <p className="text-gray-600 text-lg">Expert Doctors</p>
            </div>

            <div className="text-center p-6 rounded-xl bg-blue-50">
              <h3 className="text-4xl font-bold text-gray-900 mb-2">10,000+</h3>
              <p className="text-gray-600 text-lg">Happy Patients</p>
            </div>

            <div className="text-center p-6 rounded-xl bg-purple-50">
              <h3 className="text-4xl font-bold text-gray-900 mb-2">15+</h3>
              <p className="text-gray-600 text-lg">Specializations</p>
            </div>

            <div className="text-center p-6 rounded-xl bg-orange-50">
              <h3 className="text-4xl font-bold text-gray-900 mb-2">25+</h3>
              <p className="text-gray-600 text-lg">Years of Service</p>
            </div>

          </div>
        </div>
      </section>
     {/* About Section */}
     <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
       <div className="max-w-7xl mx-auto px-4">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

           {/* Text */}
           <div>
             <h2 className="text-4xl font-bold text-gray-900 mb-6">
               About SmartCare Hospital
             </h2>

             <p className="text-lg text-gray-700 mb-6">
               SmartCare Hospital has been at the forefront of healthcare excellence
               for over 25 years. We combine advanced medical technology with
               compassionate care.
             </p>

             <p className="text-lg text-gray-700 mb-8">
               Our state-of-the-art facility ensures world-class treatment and
               patient safety at every step.
             </p>

             <div className="grid grid-cols-2 gap-6">
               <div className="flex items-start gap-3">
                 <div className="bg-teal-500 p-2 rounded-lg">
                   <Shield className="text-white w-5 h-5" />
                 </div>
                 <div>
                   <h4 className="font-semibold text-gray-900">Safe & Secure</h4>
                   <p className="text-sm text-gray-600">ISO certified facility</p>
                 </div>
               </div>

               <div className="flex items-start gap-3">
                 <div className="bg-blue-500 p-2 rounded-lg">
                   <Activity className="text-white w-5 h-5" />
                 </div>
                 <div>
                   <h4 className="font-semibold text-gray-900">Modern Equipment</h4>
                   <p className="text-sm text-gray-600">Latest technology</p>
                 </div>
               </div>
             </div>
           </div>

          <img
            src="https://images.unsplash.com/photo-1633488781325-d36e6818d0c8"
            alt="Patient Care"
            className="w-full h-80 object-cover rounded-2xl shadow-xl"
          />

         </div>
       </div>
     </section>
{/* Services Section */}
<section className="py-20 bg-white">
  <div className="max-w-7xl mx-auto px-6">
    <div className="text-center mb-12">
      <h2 className="text-4xl font-bold text-gray-900 mb-4">
        Our Medical Services
      </h2>
      <p className="text-lg text-gray-600 max-w-3xl mx-auto">
        Comprehensive healthcare services delivered by experienced professionals
        using state-of-the-art medical technology.
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

      {/* Service Card 1 */}
      <div className="bg-red-50 p-8 rounded-xl hover:shadow-xl transition-all">
        <div className="bg-red-500 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
           <Ambulance className="w-7 h-7 text-white" />
        </div>
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">
          Emergency Care
        </h3>
        <p className="text-gray-700 mb-4">
          24/7 emergency services with rapid response teams and advanced support.
        </p>
         <ul className="space-y-2 text-gray-600">
            <li>• Trauma Care Unit</li>
            <li>• Critical Care ICU</li>
            <li>• Emergency Surgery</li>
          </ul>
      </div>

      {/* Service Card 2 */}
      <div className="bg-pink-50 p-8 rounded-xl hover:shadow-xl transition-all">
        <div className="bg-pink-500 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
           <Heart className="w-7 h-7 text-white" />
        </div>
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">
          Cardiology
        </h3>
        <p className="text-gray-700 mb-4">
          Complete cardiac care from prevention to advanced procedures.
        </p>
        <ul className="space-y-2 text-gray-600">
                    <li>• Heart Health Checkups</li>
                    <li>• Cardiac SurgeryU</li>
                    <li>•  Pacemaker Implants</li>
                  </ul>
      </div>

      {/* Service Card 3 */}
      <div className="bg-indigo-50 p-8 rounded-xl hover:shadow-xl transition-all">
        <div className="bg-indigo-500 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
           <Microscope className="w-7 h-7 text-white" />
        </div>
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">
          Diagnostics
        </h3>
        <p className="text-gray-700 mb-4">
          Advanced diagnostics with accurate, timely results.
        </p>
        <ul className="space-y-2 text-gray-600">
                    <li>• Laboratory Tests</li>
                    <li>• MRI & CT Scans</li>
                    <li>• Digital X-Rayy</li>
                  </ul>
      </div>

      {/* Service Card 4 */}
      <div className="bg-cyan-50 p-8 rounded-xl hover:shadow-xl transition-all">
        <div className="bg-cyan-500 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
           <Stethoscope className="w-7 h-7 text-white" />
        </div>
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">
          General Medicine
        </h3>
        <p className="text-gray-700 mb-4">
          Primary care services for all ages.
        </p>
        <ul className="space-y-2 text-gray-600">
                    <li>• Routine Checkups</li>
                    <li>• Preventive Care</li>
                    <li>• Health Counseling</li>
                  </ul>
      </div>

      {/* Service Card 5 */}
      <div className="bg-yellow-50 p-8 rounded-xl hover:shadow-xl transition-all">
        <div className="bg-yellow-500 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
           <Activity className="w-7 h-7 text-white" />
        </div>
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">
          Pediatrics
        </h3>
        <p className="text-gray-700 mb-4">
          Specialized child care and pediatric support.
        </p>
        <ul className="space-y-2 text-gray-600">
                    <li>• Newborn Care</li>
                    <li>• Vaccination Programs</li>
                    <li>• Growth Monitoring</li>
                  </ul>
      </div>

      {/* Service Card 6 */}
      <div className="bg-sky-50 p-8 rounded-xl hover:shadow-xl transition-all">
        <div className="bg-sky-500 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
           <Shield className="w-7 h-7 text-white" />
        </div>
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">
          Surgery
        </h3>
        <p className="text-gray-700 mb-4">
          Modern surgical facilities with expert surgeons.
        </p>
        <ul className="space-y-2 text-gray-600">
                    <li>• General Surgery</li>
                    <li>• Laparoscopic Surgery</li>
                    <li>• Post-op Care</li>
                  </ul>
      </div>
    </div>
  </div>
</section>
{/* Advanced Medical Technology */}
<section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
  <div className="max-w-7xl mx-auto px-4">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

      {/* Left Image */}
      <img
        src="https://images.unsplash.com/photo-1766299892683-d50398e31823?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwdGVjaG5vbG9neSUyMGVxdWlwbWVudHxlbnwxfHx8fDE3Njg2NDg5MTd8MA&ixlib=rb-4.1.0&q=80&w=1080"
        alt="Medical Technology"
        className="rounded-2xl shadow-2xl"
      />

      {/* Right Content */}
      <div>
        <h2 className="text-4xl font-bold mb-6">
          Advanced Medical Technology
        </h2>

        <p className="text-xl mb-8 text-white/90">
          We invest in the latest medical technology to ensure accurate diagnoses
          and effective treatments.
        </p>

        <div className="space-y-4">

          {/* Feature 1 */}
          <div className="flex items-start gap-4 bg-white/10 p-4 rounded-lg">
            <div className="bg-cyan-500 p-2 rounded-lg">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-lg">
                Digital Health Records
              </h4>
              <p className="text-white/80">
                Secure electronic medical records for seamless care coordination
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex items-start gap-4 bg-white/10 p-4 rounded-lg">
            <div className="bg-purple-500 p-2 rounded-lg">
              <Microscope className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-lg">
                Advanced Imaging
              </h4>
              <p className="text-white/80">
                High-resolution MRI, CT, and ultrasound technology
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex items-start gap-4 bg-white/10 p-4 rounded-lg">
            <div className="bg-pink-500 p-2 rounded-lg">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-lg">
                Online Appointments
              </h4>
              <p className="text-white/80">
                Book and manage appointments anytime, anywhere
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

{/* Healthcare Team Section */}
<section className="py-20 bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50">
  <div className="max-w-7xl mx-auto px-4">

    {/* Heading */}
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold text-gray-900 mb-4">
        Our Healthcare Team
      </h2>
      <p className="text-lg text-gray-600 max-w-3xl mx-auto">
        Meet our dedicated team of healthcare professionals committed to your well-being
      </p>
    </div>

    {/* Cards */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">

      {/* Doctors */}
      <div className="bg-white p-6 rounded-xl shadow-lg text-center">
        <div className="w-24 h-24 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full mx-auto mb-4 flex items-center justify-center">
          <span className="text-white text-4xl font-bold">👨‍⚕️</span>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Experienced Doctors
        </h3>
        <p className="text-gray-600">
          Highly qualified doctors with years of clinical expertise
        </p>
      </div>

      {/* Nurses */}
      <div className="bg-white p-6 rounded-xl shadow-lg text-center">
        <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full mx-auto mb-4 flex items-center justify-center">
          <span className="text-white text-4xl font-bold">👩‍⚕️</span>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Caring Nurses
        </h3>
        <p className="text-gray-600">
          Compassionate nursing staff available 24/7
        </p>
      </div>

      {/* Support Staff */}
      <div className="bg-white p-6 rounded-xl shadow-lg text-center">
        <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
          <span className="text-white text-4xl font-bold">🛡️</span>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Support Staff
        </h3>
        <p className="text-gray-600">
          Trained professionals ensuring smooth hospital operations
        </p>
      </div>

    </div>

    {/* Team Image */}
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1685997177552-7948dc38d209?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwdGVhbXdvcmt8ZW58MXx8fHwxNzY4NzQwOTY3fDA&ixlib=rb-4.1.0&q=80&w=1080"
        alt="Healthcare Team"
        className="w-full h-96 object-cover"
      />
    </div>

  </div>
</section>
{/* Call To Action Section */}
<section className="py-20 bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600">
  <div className="max-w-7xl mx-auto px-4">

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

      {/* Text */}
      <div className="text-white">
        <h2 className="text-4xl font-bold mb-6">
          Your Health Journey Starts Here
        </h2>

        <p className="text-xl text-white/90 leading-relaxed">
          Take the first step towards better health. Our expert doctors and
          advanced facilities are here to support you at every stage of your
          wellness journey.
        </p>
      </div>

      {/* Illustration / Image */}
      <div className="flex justify-center">
        <img
          src="https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=900&q=80"
          alt="Healthcare Illustration"
          className="rounded-2xl shadow-2xl max-h-80 object-cover"
        />
      </div>

    </div>

  </div>
</section>
{/* Footer */}
<footer className="bg-gradient-to-br from-gray-900 to-slate-900 text-white py-16">
  <div className="max-w-7xl mx-auto px-4">

    <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

      {/* Quick Links */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-cyan-400">
          Quick Links
        </h3>
        <ul className="space-y-2 text-white/80">
          <li className="hover:text-cyan-400 cursor-pointer">About Us</li>
          <li className="hover:text-cyan-400 cursor-pointer">Our Doctors</li>
          <li className="hover:text-cyan-400 cursor-pointer">Departments</li>
          <li className="hover:text-cyan-400 cursor-pointer">News & Events</li>
        </ul>
      </div>

      {/* Services */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-cyan-400">
          Services
        </h3>
        <ul className="space-y-2 text-white/80">
          <li>Emergency Care</li>
          <li>Surgery</li>
          <li>Diagnostics</li>
          <li>Health Checkup</li>
        </ul>
      </div>

      {/* Patient Care */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-cyan-400">
          Patient Care
        </h3>
        <ul className="space-y-2 text-white/80">
          <li>Appointments</li>
          <li>Patient Rights</li>
          <li>Billing</li>
          <li>Insurance</li>
        </ul>
      </div>

      {/* Emergency */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-cyan-400">
          Emergency
        </h3>
        <p className="text-white/80 mb-2">24/7 Emergency Hotline:</p>
        <p className="text-2xl font-bold text-cyan-400 mb-4">
          +91 9876543211
        </p>
        <p className="text-white/80 leading-relaxed">
          SmartCare Hospital<br />
          123 Medical Avenue<br />
          Mumbai, Maharashtra
        </p>
      </div>

    </div>

    {/* Bottom */}
    <div className="border-t border-white/10 mt-12 pt-6 text-center text-white/60 text-sm">
      © {new Date().getFullYear()} SmartCare Hospital. All rights reserved.
    </div>

  </div>
</footer>
</div>

  );
}
