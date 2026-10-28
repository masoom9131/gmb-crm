import React from "react";

export default function Navbar({ onLogout, onOpenUniversalPost, selectedBrand, onBackToBrands }) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Navigation */}
          <div className="flex items-center gap-4">
            <button
              onClick={onBackToBrands}
              className="flex items-center gap-2 text-left group focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl bg-[#1A64F0] flex items-center justify-center text-white font-extrabold text-xl shadow-md">
                MBG
              </div>
              <div>
                <span className="font-extrabold text-gray-900 text-lg tracking-tight group-hover:text-blue-600 transition">
                  GMB CRM
                </span>
                <span className="block text-[11px] font-semibold text-blue-600 tracking-wider uppercase">
                  Multi-Outlet Hub
                </span>
              </div>
            </button>

            {selectedBrand && (
              <div className="hidden sm:flex items-center gap-2 pl-4 border-l border-gray-200 text-sm">
                <button
                  onClick={onBackToBrands}
                  className="text-gray-500 hover:text-gray-800 transition font-medium"
                >
                  Brands Directory
                </button>
                <span className="text-gray-400">/</span>
                <span className="font-bold text-gray-900 bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-md">
                  {selectedBrand.name}
                </span>
              </div>
            )}
          </div>

          {/* Right Action buttons */}
          <div className="flex items-center gap-3">
            {/* MBG Blueprint Support Hotline */}
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200 rounded-full text-xs font-semibold text-amber-800">
              <span>📞</span>
              <span>1-800-GMB-HELP</span>
            </div>

            {/* Universal GMB Posting Button from Blueprint */}
            <button
              onClick={onOpenUniversalPost}
              className="flex items-center gap-1.5 bg-[#1A64F0] hover:bg-[#1452c9] text-white px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold shadow-sm transition transform active:scale-95"
            >
              <span>📢</span>
              <span>Universal Post</span>
            </button>

            {/* Logout */}
            <button
              onClick={onLogout}
              className="text-gray-600 hover:text-red-600 hover:bg-red-50 p-2 rounded-xl transition text-sm font-medium border border-gray-200"
              title="Logout"
            >
              🚪 Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
