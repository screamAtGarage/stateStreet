import React, { useState, useEffect } from "react";

export default function SimpleCarBookingApp() {
  const [cars, setCars] = useState([]);
  const [loadingCars, setLoadingCars] = useState(false);
  const [errorCars, setErrorCars] = useState(null);
  const [selectedCarId, setSelectedCarId] = useState(null);
  const [bookingState, setBookingState] = useState({ loading: false, result: null, error: null });

  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(false);
  const [errorBookings, setErrorBookings] = useState(null);

  const API_BASE = "";

  useEffect(() => {
    fetchCars();
    fetchBookings();
  }, []);

  async function fetchCars() {
    setLoadingCars(true);
    setErrorCars(null);

    try {
      const res = await fetch(`${API_BASE}/cars`);
      if (!res.ok) throw new Error(`HTTP ${res.status} - ${res.statusText}`);
      const data = await res.json();
      setCars(data);
    } catch (err) {
      setErrorCars(err.message || "Failed to load cars");
    } finally {
      setLoadingCars(false);
    }
  }

  async function fetchBookings() {
    setLoadingBookings(true);
    setErrorBookings(null);

    try {
      const res = await fetch(`${API_BASE}/cars/rents`);
      if (!res.ok) throw new Error(`HTTP ${res.status} - ${res.statusText}`);
      const data = await res.json();
      setBookings(data);
    } catch (err) {
      setErrorBookings(err.message || "Failed to load bookings");
    } finally {
      setLoadingBookings(false);
    }
  }

  async function handleBook(e) {
    e.preventDefault();
    if (!selectedCarId) return;
    setBookingState({ loading: true, result: null, error: null });

    const formData = new FormData(e.target);
    const payload = {
      name: formData.get("name"),
      startDate: formData.get("startDate"),
      days: Number(formData.get("days")),
    };

    try {
      const endpoint = `${API_BASE}/cars/${encodeURIComponent(selectedCarId)}`;
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`Booking failed: ${res.status} ${res.statusText}`);

      const data = await res.json().catch(() => null);
      setBookingState({ loading: false, result: data || { message: "Booked successfully" }, error: null });
      fetchBookings(); // Refresh bookings after a successful booking
    } catch (err) {
      setBookingState({ loading: false, result: null, error: err.message || "Booking failed" });
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-semibold mb-4">Cars</h1>
      {loadingCars && <div>Loading cars...</div>}
      {errorCars && <div className="text-red-600">{errorCars}</div>}

      {!loadingCars && !errorCars && cars.length > 0 && (
        <form onSubmit={handleBook} className="space-y-4">
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 p-2">Select</th>
                <th className="border border-gray-300 p-2">Name</th>
                <th className="border border-gray-300 p-2">Type</th>
              </tr>
            </thead>
            <tbody>
              {cars.map((car) => (
                <tr key={car.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 p-2 text-center">
                    <input
                      type="radio"
                      name="selectedCar"
                      value={car.id}
                      checked={selectedCarId === car.id}
                      onChange={() => setSelectedCarId(car.id)}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">{car.name}</td>
                  <td className="border border-gray-300 p-2">{car.type}</td>
                  </tr>
              ))}
            </tbody>
          </table>

          <div className="grid grid-cols-4 gap-4">
            <input name="name" type="text" placeholder="Your name" required className="px-3 py-2 border rounded col-span-1" />
            <input name="startDate" type="date" aria-label="Start Date" required className="px-3 py-2 border rounded col-span-1" />
            <input name="days" type="number" aria-label="days" min={1} defaultValue={1} required className="px-3 py-2 border rounded col-span-1" />
          </div>

          <button
            type="submit"
            disabled={bookingState.loading || !selectedCarId}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-60"
          >
            {bookingState.loading ? "Booking..." : "Book Selected Car"}
          </button>

          {bookingState.error && <div className="text-red-600">{bookingState.error}</div>}
          {bookingState.result && (
            <div className="border-l-4 border-green-500 bg-green-50 p-3 rounded">
              <p className="font-medium">Booking successful!</p>
              <pre className="mt-2 text-xs overflow-auto">{JSON.stringify(bookingState.result, null, 2)}</pre>
            </div>
          )}
        </form>
      )}

      <h2 className="text-xl font-semibold mt-10 mb-4">Existing Bookings</h2>
      {loadingBookings && <div>Loading bookings...</div>}
      {errorBookings && <div className="text-red-600">{errorBookings}</div>}
      {!loadingBookings && !errorBookings && bookings.length === 0 && <div>No bookings found.</div>}

      {!loadingBookings && !errorBookings && bookings.length > 0 && (
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 p-2">Car ID</th>
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Start Date</th>
              <th className="border border-gray-300 p-2">Days</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="border border-gray-300 p-2">{b.carId}</td>
                <td className="border border-gray-300 p-2">{b.name}</td>
                <td className="border border-gray-300 p-2">{new Date(b.startDate).toLocaleDateString() }</td>
                <td className="border border-gray-300 p-2">{b.days}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
