import React, { useState, useEffect } from "react";
import api from "../api/axios.js";

export default function BrandsDashboard({ onSelectBrand, onOpenUniversalPost }) {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = [
    "All",
    "Ice Cream Chain",
    "Fast Food / Pizza",
    "Café & Tea Bar",
    "Sweets & Quick Casual",
    "Coffeehouse",
    "Desserts & Waffles",
    "Eyewear & Optical",
    "Healthcare & Pharmacy"
  ];

  useEffect(() => {
    fetchBrands();
  }, [category]);

  const fetchBrands = async () => {
    setLoading(true);
    try {
      const res = await api.get("/brands", {
        params: {
          category: category !== "All" ? category : undefined,
          search: search || undefined
        }
      });
      setBrands(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchBrands();
  };

  const filteredBrands = brands.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner & KPI Summary Cards */}
      <div className="bg-gradient-to-r from-[#0A1931] via-[#152e5a] to-[#1A64F0] rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
        {/* Decorative background shapes */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-blue-200 backdrop-blur-md mb-3">
              <span>🇮🇳</span> Pan-India Franchise Ad Assist & Multi-Outlet CRM
            </span>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              Multi-Outlet Brand Hub
            </h1>
            <p className="text-blue-100/90 text-sm sm:text-base mt-2 leading-relaxed">
              Monitor, audit, and broadcast marketing posts across 15 to 30 franchise brands and hundreds of Google Business Profiles.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenUniversalPost}
              className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-extrabold px-6 py-3.5 rounded-2xl text-sm shadow-lg transition transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              <span>📢</span>
              <span>Universal GMB Post</span>
            </button>
          </div>
        </div>

        {/* 4 KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-white/15">
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
            <span className="text-xs text-blue-200 font-semibold uppercase tracking-wider">
              Managed Brands
            </span>
            <div className="text-2xl sm:text-3xl font-black mt-1">{brands.length || 21}</div>
            <span className="text-[11px] text-blue-300">Active Franchise Accounts</span>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
            <span className="text-xs text-blue-200 font-semibold uppercase tracking-wider">
              Total Outlets
            </span>
            <div className="text-2xl sm:text-3xl font-black mt-1">12,800+</div>
            <span className="text-[11px] text-blue-300">Across 380+ Indian Towns</span>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
            <span className="text-xs text-blue-200 font-semibold uppercase tracking-wider">
              National Avg Rating
            </span>
            <div className="text-2xl sm:text-3xl font-black mt-1 text-emerald-300 flex items-center gap-1">
              ★ 4.22
            </div>
            <span className="text-[11px] text-blue-300">Weighted Review Score</span>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
            <span className="text-xs text-amber-200 font-semibold uppercase tracking-wider">
              Reputation Gaps
            </span>
            <div className="text-2xl sm:text-3xl font-black mt-1 text-amber-300">15 Outlets</div>
            <span className="text-[11px] text-amber-200/90">&lt; 4.0 ★ (Ready for Outreach)</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-4">
        {/* Search */}
        <form onSubmit={handleSearchSubmit} className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">🔍</span>
          <input
            type="text"
            placeholder="Search brand by name (e.g. Domino's, Chai Sutta Bar, Baskin Robbins, Starbucks)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-3 pl-12 pr-4 text-sm outline-none focus:ring-2 focus:ring-blue-500 font-medium"
          />
        </form>

        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto pb-1 text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-xl font-bold whitespace-nowrap transition ${
                category === cat
                  ? "bg-[#1A64F0] text-white shadow-sm"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Clickable 15-30 Brands Grid */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-extrabold text-gray-900">
            Clickable Brands Directory ({filteredBrands.length} Brands)
          </h2>
          <span className="text-xs text-gray-500 font-medium">
            Click any brand card to drill down into city outlets & audit reports
          </span>
        </div>

        {loading ? (
          <div className="p-16 text-center text-gray-500">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mb-3"></div>
            <p className="text-sm font-semibold">Loading Brands Directory...</p>
          </div>
        ) : filteredBrands.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-3xl border border-gray-100 text-gray-400">
            <p className="text-base font-semibold">No brands match your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBrands.map((brand) => (
              <div
                key={brand._id}
                onClick={() => onSelectBrand(brand)}
                className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:border-blue-300 transition-all duration-200 cursor-pointer flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Highlight banner for Baskin Robbins (matching report) */}
                {brand.slug === "baskin-robbins" && (
                  <div className="absolute top-0 right-0 bg-gradient-to-l from-pink-500 to-rose-600 text-white text-[10px] font-extrabold px-3 py-1 rounded-bl-xl shadow-xs uppercase tracking-wider">
                    ★ Sample Report Attached
                  </div>
                )}

                <div>
                  {/* Top card info */}
                  <div className="flex items-center gap-3.5 mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-2xl group-hover:scale-105 transition shadow-xs">
                      {brand.logo || "🏢"}
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-gray-900 group-hover:text-blue-600 transition">
                        {brand.name}
                      </h3>
                      <span className="inline-block text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md mt-0.5">
                        {brand.category}
                      </span>
                    </div>
                  </div>

                  {/* Rating & Outlets metrics */}
                  <div className="grid grid-cols-2 gap-3 py-3 px-3.5 bg-gray-50 rounded-2xl mb-4 border border-gray-100">
                    <div>
                      <span className="text-[11px] text-gray-500 font-semibold">Outlets Across India</span>
                      <div className="text-base font-black text-gray-900 mt-0.5">
                        {brand.totalOutlets} Listings
                      </div>
                    </div>
                    <div>
                      <span className="text-[11px] text-gray-500 font-semibold">Avg Google Rating</span>
                      <div className="text-base font-black text-emerald-700 mt-0.5 flex items-center gap-1">
                        ★ {brand.avgRating || 4.2}
                        <span className="text-[11px] text-gray-400 font-normal">
                          ({brand.totalReviews ? brand.totalReviews.toLocaleString() : "10k+"})
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Audit Gaps Alert */}
                  {brand.lowRatingOutletsCount > 0 && (
                    <div className="mb-4 flex items-center gap-2 text-xs text-amber-800 bg-amber-50 px-3 py-2 rounded-xl border border-amber-200">
                      <span>⚠️</span>
                      <span className="font-semibold">
                        {brand.lowRatingOutletsCount} Outlets below 4.0 ★ need reputation audit
                      </span>
                    </div>
                  )}
                </div>

                {/* Footer action button */}
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                  <span className="font-bold text-gray-500 uppercase tracking-wider text-[10px]">
                    Status: <span className="text-blue-600 font-extrabold">{brand.pipelineStage || "ACTIVE"}</span>
                  </span>
                  <span className="font-extrabold text-[#1A64F0] group-hover:translate-x-1 transition flex items-center gap-1">
                    View Outlets & Audit →
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
