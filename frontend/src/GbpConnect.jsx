import { useState, useEffect } from "react";
import api from "./api/axios.js";

export default function GbpConnect({ onLogout }) {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchLocations = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get("/gbp/locations");
      setLocations(res.data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || err.message || "Failed to fetch locations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow p-6 mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Google Business Profile</h1>
          <p className="text-gray-500">MBG CART locations management</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={fetchLocations}
            disabled={loading}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Refreshing..." : "Refresh Locations"}
          </button>
          {onLogout && (
            <button
              onClick={onLogout}
              className="bg-gray-100 text-gray-700 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-200 transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
          {error}
        </div>
      )}

      {loading && locations.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2"></div>
          <p>Loading locations...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {locations.map((loc) => (
            <div key={loc.id} className="bg-white p-4 rounded-xl shadow border border-gray-100 hover:shadow-md transition">
              <h3 className="font-bold text-lg text-gray-800">{loc.name}</h3>
              <p className="text-sm text-gray-500">ID: {loc.id}</p>
              <div className="mt-2 flex items-center gap-1">
                <span className="text-yellow-500">★</span>
                <span className="font-semibold text-gray-700">{loc.rating}</span>
              </div>
              <div className="mt-3 h-2 w-full bg-green-100 rounded">
                <div className="h-2 bg-green-500 rounded w-[85%]"></div>
              </div>
              <p className="text-xs text-green-600 mt-1 font-medium">Connected</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
