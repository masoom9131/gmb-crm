import React, { useState } from "react";

export default function OutletDrawer({ outlet, brand, onClose }) {
  const [activeTab, setActiveTab] = useState("reviews"); // 'reviews' | 'posts' | 'qna' | 'audit'
  const [replyText, setReplyText] = useState("");
  const [repliedReviews, setRepliedReviews] = useState({});
  const [newQuestionAnswer, setNewQuestionAnswer] = useState({});

  if (!outlet) return null;

  // Mock Reviews based on outlet's rating
  const mockReviews = [
    {
      id: "r1",
      author: "Pooja Sharma",
      rating: outlet.rating >= 4 ? 5 : 3,
      date: "2 days ago",
      comment: outlet.rating >= 4 
        ? "Excellent place! Loved the flavors and very quick service. The staff was polite." 
        : "Taste is good but service was quite slow during evening peak hours. Needs improvement in staff speed.",
      status: "unreplied"
    },
    {
      id: "r2",
      author: "Rahul Verma",
      rating: outlet.rating < 3.0 ? 1 : 4,
      date: "1 week ago",
      comment: outlet.rating < 3.0 
        ? "Very disappointed. AC was not working and store was out of multiple popular items." 
        : "Always reliable, great ambience and hygienic preparation.",
      status: "unreplied"
    },
    {
      id: "r3",
      author: "Neha Gupta",
      rating: 5,
      date: "2 weeks ago",
      comment: "My family's favourite weekend spot. Highly recommended!",
      status: "replied",
      reply: "Thank you Neha! Looking forward to welcoming you and your family again soon."
    }
  ];

  // Mock Q&A
  const mockQna = [
    {
      id: "q1",
      question: "Is home delivery available directly from this store?",
      askedBy: "Sandeep M.",
      date: "3 days ago",
      answer: "Yes, you can order directly through our store locator or partner delivery apps."
    },
    {
      id: "q2",
      question: "Are sugar-free options available?",
      askedBy: "Dr. Ananya Roy",
      date: "1 week ago",
      answer: "Yes! We have specially curated sugar-free options available in stock."
    }
  ];

  const handleSendReply = (reviewId) => {
    if (!replyText.trim()) return;
    setRepliedReviews(prev => ({
      ...prev,
      [reviewId]: replyText
    }));
    setReplyText("");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-xl bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-5 border-b border-gray-200 bg-gray-50 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">📍</span>
              <h2 className="text-lg font-bold text-gray-900">{outlet.listingName}</h2>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              {outlet.city}, {outlet.state} • Google Maps Verified Listing
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 bg-white p-1.5 rounded-lg border border-gray-200"
          >
            ✕
          </button>
        </div>

        {/* Rating Summary Bar */}
        <div className="px-5 py-3 bg-blue-50/60 border-b border-blue-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`px-2.5 py-1 rounded-lg font-extrabold text-sm ${
              outlet.rating >= 4.0
                ? "bg-green-100 text-green-800"
                : outlet.rating >= 3.0
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
            }`}>
              ★ {outlet.rating.toFixed(1)}
            </div>
            <span className="text-xs font-semibold text-gray-700">
              {outlet.reviews} Google Reviews
            </span>
          </div>

          <div className="text-right">
            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
              outlet.status === "Healthy"
                ? "bg-green-100 text-green-700"
                : outlet.status === "Needs Attention"
                ? "bg-amber-100 text-amber-700"
                : "bg-red-100 text-red-700"
            }`}>
              {outlet.status}
            </span>
          </div>
        </div>

        {/* Blueprint Tabs: REVIEWS, POSTS, Q&A, AUDIT GAPS */}
        <div className="flex border-b border-gray-200 px-5 bg-white">
          {[
            { id: "reviews", label: "💬 Reviews" },
            { id: "posts", label: "📢 Posts" },
            { id: "qna", label: "❓ Q&A" },
            { id: "audit", label: "🔍 Audit Gaps" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 px-3 text-xs font-bold border-b-2 transition ${
                activeTab === tab.id
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Body */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4">
          {/* TAB 1: REVIEWS */}
          {activeTab === "reviews" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Recent Google Reviews
                </h3>
                <span className="text-xs text-blue-600 font-semibold cursor-pointer">
                  Sync Live Reviews ↻
                </span>
              </div>

              {mockReviews.map((rev) => (
                <div key={rev.id} className="border border-gray-200 rounded-2xl p-4 space-y-2 bg-white shadow-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-bold text-sm text-gray-900">{rev.author}</span>
                      <div className="flex items-center gap-1 text-xs text-amber-500 mt-0.5">
                        {"★".repeat(rev.rating)}
                        <span className="text-gray-400 text-[11px] ml-1">{rev.date}</span>
                      </div>
                    </div>
                    {rev.rating < 4 && (
                      <span className="bg-red-50 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded">
                        Negative Review Alert
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-700 leading-relaxed">{rev.comment}</p>

                  {/* Existing or New Reply */}
                  {repliedReviews[rev.id] || rev.reply ? (
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-2.5 rounded-r-xl text-xs text-blue-900 mt-2">
                      <span className="font-bold">Official Store Response: </span>
                      {repliedReviews[rev.id] || rev.reply}
                    </div>
                  ) : (
                    <div className="pt-2 border-t border-gray-100 flex gap-2">
                      <input
                        type="text"
                        placeholder="Write official Google response..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        className="flex-1 text-xs border border-gray-200 rounded-lg px-3 py-1.5 outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      <button
                        onClick={() => handleSendReply(rev.id)}
                        className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition"
                      >
                        Reply
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: POSTS */}
          {activeTab === "posts" && (
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border border-blue-100 p-4 rounded-2xl">
                <span className="text-xs font-bold text-blue-800 uppercase tracking-wide">
                  Active Outlet Google Post
                </span>
                <h4 className="font-bold text-sm text-gray-900 mt-1">
                  Festive Special: 15% Off on Family Tubs
                </h4>
                <p className="text-xs text-gray-600 mt-1">
                  Valid across this branch for dine-in & takeaway. Show this post at the counter.
                </p>
                <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                  <span>Expires in 4 days</span>
                  <span className="text-green-600 font-bold">● Active on Google Maps</span>
                </div>
              </div>

              <div className="border border-dashed border-gray-300 rounded-2xl p-6 text-center text-gray-500">
                <p className="text-xs">Want to publish a post across all outlets at once?</p>
                <button
                  onClick={() => alert("Use the Universal Post button at the top header to publish to all outlets!")}
                  className="mt-2 bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded-xl shadow"
                >
                  Use Universal GMB Post
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: Q&A */}
          {activeTab === "qna" && (
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Google Maps Customer Questions
              </h3>
              {mockQna.map((q) => (
                <div key={q.id} className="border border-gray-200 rounded-2xl p-4 space-y-2 bg-white">
                  <div className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold text-sm">Q:</span>
                    <div>
                      <p className="text-xs font-bold text-gray-900">{q.question}</p>
                      <span className="text-[10px] text-gray-400">Asked by {q.askedBy} • {q.date}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 bg-gray-50 p-2.5 rounded-xl mt-1">
                    <span className="text-green-600 font-bold text-xs">Ans:</span>
                    <p className="text-xs text-gray-700">{q.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: AUDIT GAPS */}
          {activeTab === "audit" && (
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Audit Flags From Research Report
              </h3>
              <div className="space-y-2">
                {outlet.gaps && outlet.gaps.length > 0 ? (
                  outlet.gaps.map((gap, i) => (
                    <div
                      key={i}
                      className={`p-3 rounded-xl border flex items-center gap-2.5 text-xs font-semibold ${
                        gap.toLowerCase().includes("critical")
                          ? "bg-red-50 border-red-200 text-red-700"
                          : gap.toLowerCase().includes("below") || gap.toLowerCase().includes("under")
                          ? "bg-amber-50 border-amber-200 text-amber-800"
                          : "bg-blue-50 border-blue-200 text-blue-800"
                      }`}
                    >
                      <span>⚠️</span>
                      <span>{gap}</span>
                    </div>
                  ))
                ) : (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-xl text-green-800 text-xs font-medium">
                    ✓ No critical gaps found on this listing!
                  </div>
                )}
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-2 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Phone Number Verified:</span>
                  <span className="font-bold text-gray-800">{outlet.phone || "099874 43095"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Store Hours Listed:</span>
                  <span className="font-bold text-amber-600">Missing in Report (Need to update)</span>
                </div>
                <div className="flex justify-between">
                  <span>Website URL:</span>
                  <span className="font-bold text-blue-600 truncate max-w-[200px]">
                    {outlet.website || "baskinrobbinsindia.com"}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
          <span className="text-xs text-gray-500">
            ID: <code className="bg-gray-200 px-1 py-0.5 rounded text-[10px]">{outlet._id}</code>
          </span>
          <button
            onClick={onClose}
            className="bg-gray-800 hover:bg-black text-white text-xs font-bold px-4 py-2 rounded-xl transition"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
}
