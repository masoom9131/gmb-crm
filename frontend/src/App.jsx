import { useState, useEffect } from "react";
import api from "./api/axios.js";
import Navbar from "./components/Navbar.jsx";
import UniversalPostModal from "./components/UniversalPostModal.jsx";
import BrandsDashboard from "./pages/BrandsDashboard.jsx";
import BrandDetail from "./pages/BrandDetail.jsx";

export default function App() {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [name, setName] = useState("");
  const [email, setEmail] = useState("admin@gmb.com");
  const [password, setPassword] = useState("123456");
  const [showPass, setShowPass] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loadingTime, setLoadingTime] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [serverStatus, setServerStatus] = useState("checking"); // 'online' | 'waking' | 'checking'

  // Dashboard navigation states
  const [currentView, setCurrentView] = useState("brands"); // 'brands' | 'brand-detail'
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [isUniversalPostOpen, setIsUniversalPostOpen] = useState(false);
  const [brandsList, setBrandsList] = useState([]);

  // Pre-warm backend on page load to eliminate/reduce cold start delay
  useEffect(() => {
    let timer;
    let isMounted = true;

    const wakeBackend = async () => {
      try {
        await api.get("/health", { timeout: 15000 });
        if (isMounted) setServerStatus("online");
      } catch (err) {
        if (!isMounted) return;
        setServerStatus("waking");

        // Poll every 6 seconds until backend is awake
        timer = setInterval(async () => {
          try {
            await api.get("/health", { timeout: 10000 });
            if (isMounted) {
              setServerStatus("online");
              clearInterval(timer);
            }
          } catch (e) {
            // Still waking up
          }
        }, 6000);
      }
    };

    wakeBackend();

    return () => {
      isMounted = false;
      if (timer) clearInterval(timer);
    };
  }, []);

  // Timer to give live feedback during cold start wait
  useEffect(() => {
    let interval;
    if (loading) {
      interval = setInterval(() => {
        setLoadingTime((prev) => prev + 1);
      }, 1000);
    } else {
      setLoadingTime(0);
    }
    return () => clearInterval(interval);
  }, [loading]);

  // Fetch brands list for universal posting modal
  useEffect(() => {
    if (token) {
      api.get("/brands")
        .then((res) => {
          if (res.data) setBrandsList(res.data);
        })
        .catch(() => {});
    }
  }, [token]);

  const extractError = (err) => {
    if (err.response?.data?.message) return err.response.data.message;
    if (err.response?.data?.msg) return err.response.data.msg;
    if (err.code === "ECONNABORTED" || err.message?.includes("timeout")) {
      return "Backend connection timed out. Render may still be spinning up from sleep. Please try again.";
    }
    if (err.response?.status === 502 || err.response?.status === 504) {
      return "Render container is waking up (Gateway 502/504). Please wait a few seconds and retry.";
    }
    return err.message || "Connection failed. Please check backend status.";
  };

  const handleRegister = async () => {
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");
    try {
      await api.post("/auth/register", { name: name || undefined, email, password });
      setSuccessMessage("Account created successfully! Please login now.");
      setIsLogin(true);
    } catch (e) {
      setErrorMessage(extractError(e));
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");
    try {
      const res = await api.post("/auth/login", { email, password });
      const receivedToken = res.data.token;
      if (receivedToken) {
        localStorage.setItem("token", receivedToken);
        setToken(receivedToken);
      }
    } catch (e) {
      setErrorMessage(extractError(e));
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setCurrentView("brands");
    setSelectedBrand(null);
    setSuccessMessage("");
    setErrorMessage("");
  };

  // If user is authenticated, render the Multi-Brand GMB CRM Hub
  if (token) {
    return (
      <div className="min-h-screen bg-[#F8FAFF] flex flex-col font-sans">
        <Navbar
          onLogout={handleLogout}
          onOpenUniversalPost={() => setIsUniversalPostOpen(true)}
          selectedBrand={selectedBrand}
          onBackToBrands={() => {
            setCurrentView("brands");
            setSelectedBrand(null);
          }}
        />

        <main className="flex-1 pb-16">
          {currentView === "brands" ? (
            <BrandsDashboard
              onSelectBrand={(brand) => {
                setSelectedBrand(brand);
                setCurrentView("brand-detail");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              onOpenUniversalPost={() => setIsUniversalPostOpen(true)}
            />
          ) : (
            <BrandDetail
              brand={selectedBrand}
              onBack={() => {
                setCurrentView("brands");
                setSelectedBrand(null);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              onOpenUniversalPost={() => setIsUniversalPostOpen(true)}
            />
          )}
        </main>

        {/* Blueprint Universal GMB Posting Modal */}
        <UniversalPostModal
          isOpen={isUniversalPostOpen}
          onClose={() => setIsUniversalPostOpen(false)}
          brands={brandsList}
          activeBrandId={selectedBrand?._id}
          onPostSuccess={() => {
            // refresh data if needed
          }}
        />
      </div>
    );
  }

  // Otherwise, render Login / Register Screen
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFF] p-4">
      <div className="w-full max-w-[420px] bg-white rounded-[32px] shadow-2xl p-8 border border-gray-100 relative overflow-hidden">
        {/* Background decorative circles */}
        <div className="absolute -top-16 -left-16 w-36 h-36 bg-[#FFF6A6] rounded-full pointer-events-none"></div>
        <div className="absolute -bottom-12 -right-8 w-44 h-24 bg-[#FFD600] rounded-tl-[80px] pointer-events-none"></div>

        <div className="relative z-10">
          {/* Render Backend Status Pill */}
          <div className="flex justify-center mb-3">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition ${
                serverStatus === "online"
                  ? "bg-green-100 text-green-800"
                  : serverStatus === "waking"
                  ? "bg-yellow-100 text-yellow-800 animate-pulse"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  serverStatus === "online"
                    ? "bg-green-500"
                    : serverStatus === "waking"
                    ? "bg-yellow-500"
                    : "bg-gray-400"
                }`}
              ></span>
              {serverStatus === "online"
                ? "Backend Online"
                : serverStatus === "waking"
                ? "Waking up Render backend (~40s)..."
                : "Checking backend..."}
            </span>
          </div>

          <div className="flex justify-center mb-4">
            <img src="/mbg-logo.jpg" alt="MBG CART" className="w-[180px] object-contain" />
          </div>

          <h1 className="text-center text-3xl font-extrabold text-[#0A1931]">
            {isLogin ? "Welcome Back!" : "Create Account"}
          </h1>
          <p className="text-center text-gray-500 text-sm mt-1 mb-6">
            {isLogin ? "Sign in to continue to MBG CART" : "Sign up to get started"}
          </p>

          {/* Alert messages */}
          {errorMessage && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs leading-relaxed">
              <strong>Error: </strong> {errorMessage}
            </div>
          )}

          {successMessage && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-xl text-green-700 text-xs">
              {successMessage}
            </div>
          )}

          <div className="space-y-4">
            {!isLogin && (
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2">👤</span>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#FFF9C2] border border-[#FFE066] rounded-xl py-3.5 pl-11 pr-4 outline-none text-sm"
                />
              </div>
            )}

            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2">📧</span>
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#FFF9C2] border border-[#FFE066] rounded-xl py-3.5 pl-11 pr-4 outline-none text-sm"
              />
            </div>

            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2">🔒</span>
              <input
                type={showPass ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#FFF9C2] border border-[#FFE066] rounded-xl py-3.5 pl-11 pr-10 outline-none text-sm"
              />
              <span
                onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer select-none"
              >
                {showPass ? "🙈" : "👁️"}
              </span>
            </div>

            <button
              onClick={isLogin ? handleLogin : handleRegister}
              disabled={loading}
              className="w-full bg-[#1A64F0] hover:bg-[#1452c9] text-white font-bold py-3.5 rounded-xl text-lg transition disabled:opacity-60 flex flex-col items-center justify-center cursor-pointer disabled:cursor-not-allowed shadow-md"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>
                    {loadingTime > 5
                      ? `Waking up backend (${loadingTime}s)...`
                      : "Connecting..."}
                  </span>
                </div>
              ) : isLogin ? (
                "Login"
              ) : (
                "Sign Up"
              )}
            </button>

            {loading && loadingTime > 5 && (
              <p className="text-xs text-amber-700 bg-amber-50 p-2 rounded-lg text-center animate-pulse">
                Render free tier wakes up after 15m inactivity (takes 40-50s). Please hold on...
              </p>
            )}
          </div>

          <p className="text-center text-sm mt-6">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <span
              onClick={() => {
                setIsLogin(!isLogin);
                setErrorMessage("");
                setSuccessMessage("");
              }}
              className="text-[#1A64F0] font-bold cursor-pointer underline"
            >
              {isLogin ? "Sign Up" : "Login"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
