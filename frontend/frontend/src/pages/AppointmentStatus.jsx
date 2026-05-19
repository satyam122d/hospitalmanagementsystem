import { useState } from 'react';
import { Search, Calendar, Clock, User, FileText } from 'lucide-react';

export default function AppointmentStatus() {
 const [tokenNumber, setTokenNumber] = useState('');
 const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    if (!tokenNumber.trim()) {
      alert('Please enter a Token Number');
      return;
    }

    setLoading(true);
    setSearched(false);

    try {
      const res = await fetch(
        `http://localhost:8080/appointments/status/${tokenNumber}`
      );

      if (!res.ok) {
        setAppointments([]);
        setSearched(true);
        setLoading(false);
        return;
      }

      const data = await res.json();

      // backend returns ONE appointment → convert to list for your UI
      setAppointments([data]);
      setSearched(true);
      setLoading(false);

    } catch (error) {
      console.error('Error fetching appointment:', error);
      alert('Failed to fetch appointment. Please try again.');
      setLoading(false);
      setSearched(true);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'SCHEDULED':
        return 'bg-blue-100 text-blue-800';
      case 'COMPLETED':
        return 'bg-green-100 text-green-800';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'SCHEDULED':
        return '🕐';
      case 'COMPLETED':
        return '✓';
      case 'CANCELLED':
        return '✗';
      default:
        return '•';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Appointment Status</h1>
          <p className="text-lg text-gray-600">
            Track your appointments by entering your Token Number
          </p>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <label className="block text-gray-700 font-semibold mb-4">
            Enter Appointment Token Number
          </label>
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="e.g.APT12"
                value={tokenNumber}
                onChange={(e) => setTokenNumber(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={loading}
              className="bg-teal-600 text-white px-6 py-3 rounded-md hover:bg-teal-700 transition-colors font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </div>

        {/* Results Section */}
        {searched && (
          <div>
            {appointments.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <p className="text-xl text-gray-600">
                  No appointments found for this Patient ID.
                </p>
                <p className="text-gray-500 mt-2">
                  Please check your ID or book a new appointment.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Your Appointments ({appointments.length})
                </h2>
                {appointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                            <User className="w-6 h-6 text-teal-600" />
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900">
                              {appointment.doctorName}
                            </h3>
                            <p className="text-sm text-gray-500">Token: {appointment.tokenNumber}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                          <div className="flex items-start gap-2">
                            <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                            <div>
                              <p className="text-xs text-gray-500">Date</p>
                              <p className="text-gray-900 font-medium">
                                {new Date(appointment.appointmentDate).toLocaleDateString('en-US', {
                                  weekday: 'short',
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric'
                                })}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-2">
                            <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
                            <div>
                              <p className="text-xs text-gray-500">Time</p>
                              <p className="text-gray-900 font-medium">{appointment.appointmentTime}</p>
                            </div>
                          </div>

                          <div className="flex items-start gap-2">
                            <FileText className="w-5 h-5 text-gray-400 mt-0.5" />
                            <div>
                              <p className="text-xs text-gray-500">Reason</p>
                              <p className="text-gray-900 font-medium">{appointment.reason}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="md:text-right">
                        <span
                          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold ${getStatusColor(
                            appointment.status
                          )}`}
                        >
                          <span>{getStatusIcon(appointment.status)}</span>
                          {appointment.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Info Box */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-2">Need Help?</h3>
          <p className="text-blue-800 text-sm">
            If you don't have your Patient ID, please contact our reception desk at{' '}
            <span className="font-semibold">+91 9876543210</span> or visit the Contact section.
          </p>
        </div>
      </div>
    </div>
  );
}
