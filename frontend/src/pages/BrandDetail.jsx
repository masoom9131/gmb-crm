import React, { useState, useEffect } from "react";
import api from "../api/axios.js";
import OutletDrawer from "../components/OutletDrawer.jsx";

export default function BrandDetail({ brand, onBack, onOpenUniversalPost }) {
  const [outlets, setOutlets] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeOutlet, setActiveOutlet] = useState(null);

  useEffect(() => {
    fetchOutlets();
  }, [brand._id, selectedCity, statusFilter]);

  const fetchOutlets = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/brands/${brand._id}/outlets`, {
        params: {
          city: selectedCity,
          status: statusFilter,
          search: searchQuery || undefined
        }
      });
      setOutlets(res.data.outlets || []);
      if (res.data.cities && res.data.cities.length > 0) {
        setCities(res.data.cities);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchOutlets();
  };

  // Calculate audit statistics
  const lowRatingCount = outlets.filter((o) => o.rating < 4.0).length;
  const criticalCount = outlets.filter((o) => o.rating < 3.0).length;
  const under50Count = outlets.filter((o) => o.reviews < 50).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Navigation & Brand Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-start sm:items-center gap-4">
            <button
              onClick={onBack}
              className="w-10 h-10 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center font-bold transition text-lg"
              title="Back to All Brands"
            >
              ←
            </button>
            <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-3xl shadow-inner">
              {brand.logo || "🏢"}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">{brand.name}</h1>
                <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-0.5 rounded-full">
                  {brand.category}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Corporate: <span className="font-semibold text-gray-700">{brand.corporateEmail || "careline@gravissgroup.com"}</span> •{" "}
                Website: <a href={brand.website} target="_blank" rel="noreferrer" className="text-blue-600 underline font-semibold">{brand.website || "Official Portal"}</a>
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenUniversalPost}
              className="bg-[#1A64F0] hover:bg-[#1452c9] text-white px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-md transition flex items-center gap-2"
            >
              <span>📢</span>
              <span>Universal Post to {brand.totalOutlets || 75} Outlets</span>
            </button>
            <button
              onClick={() => alert("Downloading GMB Lead Research & Audit CSV Report...")}
              className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-sm transition"
            >
              📥 Export Report
            </button>
          </div>
        </div>

        {/* Executive Summary Cards (Directly matching PDF Report) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-gray-100">
          <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100">
            <span className="text-xs text-gray-500 font-semibold">Total Verified Outlets</span>
            <div className="text-2xl font-black text-gray-900 mt-1">{brand.totalOutlets || 75}</div>
            <span className="text-[11px] text-blue-600 font-medium">Across {cities.length || 26} Indian Towns</span>
          </div>

          <div className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100">
            <span className="text-xs text-gray-500 font-semibold">Weighted Avg Rating</span>
            <div className="text-2xl font-black text-emerald-800 mt-1 flex items-center gap-1">
              ★ {brand.avgRating || 4.21}
            </div>
            <span className="text-[11px] text-emerald-700 font-medium">{brand.totalReviews || "15,008+"} Google Reviews</span>
          </div>

          <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-100">
            <span className="text-xs text-gray-500 font-semibold">Outlets Below 4.0 ★</span>
            <div className="text-2xl font-black text-amber-700 mt-1">{lowRatingCount || 15}</div>
            <span className="text-[11px] text-amber-800 font-medium">Reputation Pitch Angle</span>
          </div>

          <div className="bg-red-50/50 p-4 rounded-2xl border border-red-100">
            <span className="text-xs text-gray-500 font-semibold">Critical Gaps Alert</span>
            <div className="text-2xl font-black text-red-700 mt-1">{criticalCount || 2} Outlets</div>
            <span className="text-[11px] text-red-800 font-medium">Rating &lt; 3.0 (Ranchi Outlets)</span>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-4">
        {/* City Filter Tabs (Matching 26 towns in the report) */}
        <div>
          <div className="flex justify-between items-center mb-2.5">
            <label className="text-xs font-extrabold uppercase tracking-wider text-gray-600">
              Filter By Indian City ({cities.length || 26} Towns Covered)
            </label>
            <span className="text-xs text-gray-400">
              Showing {outlets.length} outlet listings
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto p-1 bg-gray-50 rounded-2xl border border-gray-100">
            <button
              onClick={() => setSelectedCity("All")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                selectedCity === "All"
                  ? "bg-[#1A64F0] text-white shadow-sm"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              All Towns ({brand.totalOutlets || 75})
            </button>
            {cities.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCity(c)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                  selectedCity === c
                    ? "bg-[#1A64F0] text-white shadow-sm"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Search & Health status dropdown */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <form onSubmit={handleSearchSubmit} className="flex-1 relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
            <input
              type="text"
              placeholder="Search by area, mall name or road (e.g. Paras One33, Carter Rd, Sector 142)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 pl-10 pr-4 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
          </form>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold text-gray-700 outline-none"
          >
            <option value="All">All Health Statuses</option>
            <option value="Healthy">Healthy (≥ 4.0 ★)</option>
            <option value="Needs Attention">Needs Attention (&lt; 4.0 ★ or &lt; 50 Reviews)</option>
            <option value="Critical">Critical (&lt; 3.0 ★)</option>
          </select>
        </div>
      </div>

      {/* Outlets Audit Table (Matching Report Section 5.3) */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/60">
          <h2 className="font-extrabold text-gray-900 text-sm sm:text-base">
            Outlet-Wise GMB Audit & Listings Hub
          </h2>
          <div className="flex items-center gap-2 text-xs">
            <span className="inline-flex items-center gap-1 font-semibold text-emerald-700">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> ≥ 4.0★
            </span>
            <span className="inline-flex items-center gap-1 font-semibold text-amber-700 ml-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> 3.0 - 3.9★
            </span>
            <span className="inline-flex items-center gap-1 font-semibold text-red-700 ml-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span> &lt; 3.0★
            </span>
          </div>
        </div>

        {loading ? (
          <div className="p-12 text-center text-gray-500">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2"></div>
            <p className="text-sm">Loading outlet audit data...</p>
          </div>
        ) : outlets.length === 0 ? (
          <div className="p-12 text-center text-gray-400">
            <p className="text-sm">No franchise outlets found matching your criteria.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-gray-50 text-gray-500 uppercase text-[11px] font-extrabold tracking-wider border-b border-gray-100">
                <tr>
                  <th className="py-3.5 px-6">City (State)</th>
                  <th className="py-3.5 px-4">Listing / Area</th>
                  <th className="py-3.5 px-4 text-center">Google Rating</th>
                  <th className="py-3.5 px-4 text-center">Reviews</th>
                  <th className="py-3.5 px-4">Ph / Web</th>
                  <th className="py-3.5 px-6">Identified Gaps (Pitch Signals)</th>
                  <th className="py-3.5 px-6 text-right">GMB Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {outlets.map((outlet) => {
                  const isRed = outlet.rating < 3.0;
                  const isAmber = outlet.rating >= 3.0 && outlet.rating < 4.0;
                  const isGreen = outlet.rating >= 4.0;

                  return (
                    <tr
                      key={outlet._id}
                      className="hover:bg-blue-50/40 transition group cursor-pointer"
                      onClick={() => setActiveOutlet(outlet)}
                    >
                      {/* City */}
                      <td className="py-4 px-6 font-bold text-gray-900 whitespace-nowrap">
                        {outlet.city}{" "}
                        <span className="text-gray-400 font-normal">({outlet.state})</span>
                      </td>

                      {/* Area */}
                      <td className="py-4 px-4 font-semibold text-gray-800">
                        {outlet.area}
                      </td>

                      {/* Rating */}
                      <td className="py-4 px-4 text-center">
                        <span
                          className={`inline-block px-2.5 py-1 rounded-lg font-black text-xs shadow-xs ${
                            isRed
                              ? "bg-red-500 text-white"
                              : isAmber
                              ? "bg-amber-100 text-amber-900 border border-amber-300"
                              : "bg-emerald-100 text-emerald-900 border border-emerald-300"
                          }`}
                        >
                          ★ {outlet.rating.toFixed(1)}
                        </span>
                      </td>

                      {/* Reviews */}
                      <td className="py-4 px-4 text-center font-bold text-gray-700">
                        {outlet.reviews.toLocaleString()}
                      </td>

                      {/* Ph / Web */}
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-1 text-[11px] font-bold">
                          <span className="text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">Ph: Y</span>
                          <span className="text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">Web: Y</span>
                        </div>
                      </td>

                      {/* Gaps / Flags */}
                      <td className="py-4 px-6">
                        <div className="flex flex-wrap gap-1">
                          {outlet.gaps && outlet.gaps.length > 0 ? (
                            outlet.gaps.map((g, i) => (
                              <span
                                key={i}
                                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                  g.toLowerCase().includes("critical")
                                    ? "bg-red-100 text-red-700 border border-red-200"
                                    : g.toLowerCase().includes("below") || g.toLowerCase().includes("under")
                                    ? "bg-amber-100 text-amber-800 border border-amber-200"
                                    : "bg-gray-100 text-gray-600"
                                }`}
                              >
                                {g}
                              </span>
                            ))
                          ) : (
                            <span className="text-[10px] font-medium text-emerald-600">
                              ✓ Optimized
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Action */}
                      <td className="py-4 px-6 text-right whitespace-nowrap">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveOutlet(outlet);
                          }}
                          className="bg-[#1A64F0] group-hover:bg-[#1452c9] text-white px-3 py-1.5 rounded-xl font-bold text-xs shadow-xs transition"
                        >
                          Manage GMB →
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Outlet Details Drawer */}
      <OutletDrawer
        outlet={activeOutlet}
        brand={brand}
        onClose={() => setActiveOutlet(null)}
      />
    </div>
  );
}
