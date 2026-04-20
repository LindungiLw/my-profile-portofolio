// components/Contact.tsx
"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { useLanguage } from "@/context/LanguageContext";
import { supabase } from "@/utils/supabase";

const Icons = {
  // ... (KODE ICON TETAP SAMA SEPERTI SEBELUMNYA) ...
  Star: ({ filled }: { filled: boolean }) => (
    <svg
      viewBox="0 0 24 24"
      fill={filled ? "#64FFDA" : "none"}
      stroke={filled ? "#64FFDA" : "#495670"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-6 h-6 transition-all duration-300"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>
  ),
  Message: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
  ),
  Instagram: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-6 h-6"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  ),
  GitHub: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-6 h-6"
    >
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
    </svg>
  ),
  LinkedIn: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-6 h-6"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
      <rect x="2" y="9" width="4" height="12"></rect>
      <circle cx="4" cy="4" r="2"></circle>
    </svg>
  ),
  Email: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-6 h-6"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
      <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
  ),
};

export const Contact = () => {
  const [user, setUser] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [activeComment, setActiveComment] = useState(0);
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);
  const [isSending, setIsSending] = useState(false);
  const { t } = useLanguage();

  // ... (useEffect dan fungsi Auth/Fetch/Submit Tetap Sama) ...
  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => setUser(session?.user ?? null));
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) =>
      setUser(session?.user ?? null),
    );
    fetchComments();
    const interval = setInterval(
      () =>
        setComments((prev) => {
          if (prev.length > 0)
            setActiveComment((curr) => (curr + 1) % Math.min(prev.length, 5));
          return prev;
        }),
      5000,
    );
    return () => {
      clearInterval(interval);
      subscription.unsubscribe();
    };
  }, []);

  const fetchComments = async () => {
    const { data } = await supabase
      .from("comments")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5);
    if (data) setComments(data);
  };
  const handleGoogleLogin = async () =>
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/#contact` },
    });
  const handleLogout = async () => await supabase.auth.signOut();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return alert(t("contact.alertLogin"));
    setIsSending(true);
    const googleName = user.user_metadata.full_name || "Anonymous User";
    const { error } = await supabase
      .from("comments")
      .insert([{ name: googleName, message, rating, likes: 0 }]);
    if (!error) {
      alert(t("contact.alertSuccess1") + rating + t("contact.alertSuccess2"));
      setMessage("");
      setRating(5);
      fetchComments();
    } else alert(t("contact.alertFail"));
    setIsSending(false);
  };

  return (
    <section
      id="contact"
      className="py-12 md:py-20 scroll-mt-20 w-full px-4 md:px-6 relative z-40 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center mb-10 md:mb-16 flex-wrap md:flex-nowrap gap-2 md:gap-0">
          <h2 className="text-3xl md:text-5xl font-bold text-[#E6F1FF] flex items-center tracking-tight">
            <span className="text-[#FF5722] font-mono text-2xl md:text-4xl mr-3">
              {t("contact.sectionNum")}
            </span>{" "}
            {t("contact.title")}
          </h2>
          <div className="h-[1px] bg-[#233554] grow md:ml-8 mt-2 opacity-50 w-full md:w-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* SISI KIRI: SOSIAL MEDIA */}
          <div className="flex flex-col justify-start space-y-6 md:space-y-8">
            <p className="text-[#8892B0] text-base md:text-lg leading-relaxed">
              {t("contact.description")}
            </p>
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {[
                {
                  label: "Instagram",
                  icon: <Icons.Instagram />,
                  url: "https://www.instagram.com/lindungi05?igsh=ZWdzYXNmbzBjM2Zq",
                },
                {
                  label: "GitHub",
                  icon: <Icons.GitHub />,
                  url: "https://github.com/LindungiLw",
                },
                {
                  label: "LinkedIn",
                  icon: <Icons.LinkedIn />,
                  url: "https://www.linkedin.com/in/rahma-lindungi-laowo-4aa49a349/",
                },
                {
                  label: "Email",
                  icon: <Icons.Email />,
                  url: "mailto:rahmalindungilaowo380@gmail.com",
                },
              ].map((soc) => (
                <a
                  key={soc.label}
                  href={soc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#0A192F] border border-[#233554] p-4 md:p-6 rounded-xl md:rounded-2xl flex flex-col items-center justify-center text-[#8892B0] transition-all duration-300 active:scale-95 hover:-translate-y-1 hover:border-[#64FFDA] hover:text-[#64FFDA] shadow-lg group"
                >
                  <div className="mb-3 md:mb-4 transition-transform duration-300 group-hover:scale-110">
                    {soc.icon}
                  </div>
                  <span className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-mono font-bold text-center">
                    {soc.label}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* SISI KANAN: REVIEW BOX */}
          <div className="flex flex-col space-y-6">
            <div className="bg-[#0A192F] border border-[#233554] p-6 md:p-8 rounded-2xl shadow-2xl flex flex-col justify-center min-h-[300px]">
              {!user ? (
                <div className="text-center flex flex-col items-center justify-center h-full animate-fade-in">
                  <h3 className="text-[#E6F1FF] text-xl md:text-2xl font-bold mb-3">
                    {t("contact.leaveReview")}
                  </h3>
                  <p className="text-[#8892B0] text-xs md:text-sm mb-6 md:mb-8">
                    {t("contact.loginPrompt")}
                  </p>
                  <button
                    onClick={handleGoogleLogin}
                    className="w-full md:w-auto flex items-center justify-center gap-3 py-3 px-6 md:px-8 bg-transparent border border-[#64FFDA] text-[#64FFDA] font-mono text-xs font-bold uppercase tracking-[0.1em] md:tracking-[0.15em] rounded hover:bg-[#64FFDA]/10 transition-all duration-300 active:scale-95"
                  >
                    <Icons.Message /> {t("contact.btnComment")}
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col h-full animate-fade-in"
                >
                  <div className="flex items-center justify-between mb-5 md:mb-6 pb-4 border-b border-[#233554]/50">
                    <div className="flex items-center gap-3 md:gap-4">
                      <img
                        src={user.user_metadata.avatar_url}
                        alt="Profile"
                        className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#64FFDA]/30 object-cover"
                      />
                      <div className="flex flex-col">
                        <span className="text-[#E6F1FF] text-sm md:text-base font-semibold truncate w-32 md:w-auto">
                          {user.user_metadata.full_name}
                        </span>
                        <span className="text-[#64FFDA] text-[9px] md:text-[10px] font-mono uppercase tracking-widest mt-0.5">
                          {t("contact.verified")}
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="text-[#8892B0] text-[10px] md:text-xs font-mono hover:text-[#FF5722] transition-colors p-2 -mr-2"
                    >
                      {t("contact.logout")}
                    </button>
                  </div>

                  {/* THUMB ZONE: Padding tombol bintang diperbesar agar gampang dipencet HP */}
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-6">
                    <p className="text-[#8892B0] font-mono text-[10px] uppercase tracking-[0.2em]">
                      {t("contact.rating")}
                    </p>
                    <div className="flex gap-1 md:gap-2">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setRating(num)}
                          className="p-2 -m-2 transform active:scale-90 hover:scale-110 transition-transform outline-none"
                        >
                          <Icons.Star filled={num <= rating} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <textarea
                    rows={3}
                    placeholder={t("contact.placeholder")}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-[#112240] border border-[#233554] rounded-xl p-4 text-xs md:text-sm text-[#E6F1FF] placeholder-[#8892B0]/50 focus:border-[#64FFDA]/50 outline-none resize-none transition-colors mb-5 md:mb-6"
                  ></textarea>

                  <button
                    type="submit"
                    disabled={isSending}
                    className="w-full py-3 md:py-3.5 bg-transparent border border-[#64FFDA] text-[#64FFDA] font-mono text-xs font-bold uppercase tracking-[0.15em] rounded active:scale-95 hover:bg-[#64FFDA]/10 transition-all duration-300"
                  >
                    {isSending
                      ? t("contact.btnSending")
                      : t("contact.btnSubmit")}
                  </button>
                </form>
              )}
            </div>

            <div className="bg-[#0A192F] border border-[#233554] p-5 md:p-6 rounded-2xl relative overflow-hidden h-28 md:h-32 flex flex-col justify-center">
              {comments.length > 0 ? (
                <div className="relative w-full h-full">
                  {comments.map((comment, index) => (
                    <div
                      key={comment.id}
                      className={`absolute inset-0 transition-all duration-700 flex flex-col justify-center ${index === activeComment ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8 pointer-events-none"}`}
                    >
                      <p className="text-[#E6F1FF] text-xs md:text-sm italic mb-2 md:mb-3 line-clamp-2">
                        "{comment.message}"
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-[#64FFDA] font-mono text-[9px] md:text-[10px] font-bold tracking-wider truncate w-24 md:w-auto">
                          — {comment.name}
                        </span>
                        <div className="flex gap-0.5 ml-1 md:ml-2">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <svg
                              key={i}
                              viewBox="0 0 24 24"
                              fill={
                                i < (comment.rating || 5) ? "#FFD700" : "none"
                              }
                              stroke={
                                i < (comment.rating || 5)
                                  ? "#FFD700"
                                  : "#495670"
                              }
                              strokeWidth="2"
                              className="w-2.5 h-2.5 md:w-3 md:h-3"
                            >
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                            </svg>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[#8892B0] italic text-[10px] md:text-xs text-center font-mono tracking-widest">
                  {t("contact.waiting")}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
