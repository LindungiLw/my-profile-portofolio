// components/Contact.tsx
"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

// Inisialisasi Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ==========================================
// KOMPONEN IKON (Bintang & Sosmed)
// ==========================================
const Icons = {
  Star: ({ filled }: { filled: boolean }) => (
    <svg
      viewBox="0 0 24 24"
      fill={filled ? "#FFD700" : "none"}
      stroke={filled ? "#FFD700" : "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4 h-4 transition-all duration-300"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>
  ),
  User: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4 h-4"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  ),
  // ... tambahkan ikon sosmed kamu di sini seperti sebelumnya
};

export const Contact = () => {
  const [comments, setComments] = useState<any[]>([]);
  const [activeComment, setActiveComment] = useState(0);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5); // Default rating 5 bintang
  const [isSending, setIsSending] = useState(false);

  // 1. Ambil Data dari Supabase
  const fetchComments = async () => {
    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .order("likes", { ascending: false })
      .limit(5);

    if (data) setComments(data);
  };

  useEffect(() => {
    fetchComments();
    const interval = setInterval(() => {
      setComments((prev) => {
        if (prev.length > 0)
          setActiveComment((curr) => (curr + 1) % Math.min(prev.length, 5));
        return prev;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // 2. Kirim Data ke Supabase (Termasuk kolom RATING)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    const { error } = await supabase
      .from("comments")
      .insert([{ name, message, rating, likes: 0 }]); // <-- Rating sekarang ikut dikirim!

    if (!error) {
      alert(
        "Terima kasih! Rating bintang " + rating + " kamu sudah tersimpan. ⭐",
      );
      setName("");
      setMessage("");
      setRating(5);
      fetchComments(); // Refresh list agar komentar baru (jika masuk top 5) muncul
    } else {
      console.error(error);
      alert("Gagal kirim komentar. Cek koneksi atau setting Supabase-mu.");
    }
    setIsSending(false);
  };

  return (
    <section
      id="contact"
      className="py-12 md:py-16 scroll-mt-20 w-full px-6 relative z-40"
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <h2 className="text-3xl md:text-5xl font-bold text-[#E6F1FF] flex items-center">
            <span className="text-[#FF5722] font-mono text-2xl md:text-4xl mr-3">
              04.
            </span>{" "}
            Contact
          </h2>
          <div className="h-[1px] bg-[#233554] flex-grow ml-6 mt-2 opacity-30"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* SISI KIRI: INPUT FORM */}
          <div className="space-y-4">
            <form
              onSubmit={handleSubmit}
              className="bg-[#112240]/30 backdrop-blur-md border border-[#233554]/40 p-6 rounded-2xl space-y-4 shadow-xl"
            >
              {/* STAR PICKER (Pilih Bintang) */}
              <div className="flex items-center justify-between bg-[#0A192F] p-3 rounded-xl border border-[#233554]">
                <p className="text-[#64FFDA] font-mono text-[10px] uppercase tracking-widest">
                  Rate my Portfolio:
                </p>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setRating(num)}
                      className="transform hover:scale-125 transition-transform"
                    >
                      <Icons.Star filled={num <= rating} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#475569]">
                  <Icons.User />
                </div>
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#0A192F] border border-[#233554] rounded-xl py-2.5 pl-9 pr-4 text-sm text-[#E6F1FF] focus:border-[#64FFDA]/40 outline-none"
                />
              </div>

              <textarea
                rows={2}
                placeholder="Share your suggestions..."
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-[#0A192F] border border-[#233554] rounded-xl p-3 text-sm text-[#E6F1FF] focus:border-[#64FFDA]/40 outline-none resize-none"
              ></textarea>

              <button
                type="submit"
                disabled={isSending}
                className="w-full py-3 bg-[#64FFDA]/5 border border-[#64FFDA]/30 text-[#64FFDA] font-mono text-[10px] font-bold uppercase tracking-[0.2em] rounded-xl hover:bg-[#64FFDA]/15 transition-all"
              >
                {isSending ? "Sending..." : `Submit Review (${rating} Stars) →`}
              </button>
            </form>
          </div>

          {/* SISI KANAN: TESTIMONI DISPLAY */}
          <div className="bg-[#112240]/50 backdrop-blur-md border border-[#233554]/60 p-6 rounded-2xl min-h-[280px] flex flex-col justify-center relative overflow-hidden shadow-2xl">
            <span className="absolute top-4 left-6 text-6xl text-[#64FFDA]/5 font-serif italic">
              “
            </span>

            <div className="relative z-10">
              <p className="text-[#64FFDA] font-mono text-[9px] uppercase tracking-[0.4em] mb-8 border-l-2 border-[#64FFDA] pl-3">
                Community Top 5
              </p>

              {comments.length > 0 ? (
                <div className="relative h-32">
                  {comments.map((comment, index) => (
                    <div
                      key={comment.id}
                      className={`absolute inset-0 transition-all duration-1000 ${
                        index === activeComment
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-6 pointer-events-none"
                      }`}
                    >
                      {/* TAMPILAN BINTANG DARI DATABASE */}
                      <div className="flex gap-0.5 mb-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Icons.Star
                            key={i}
                            filled={i < (comment.rating || 5)}
                          />
                        ))}
                      </div>

                      <p className="text-[#E6F1FF] text-base font-medium italic mb-6">
                        "{comment.message}"
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-[#233554] border border-[#64FFDA]/20 flex items-center justify-center text-[#64FFDA] font-bold text-xs">
                            {comment.name.charAt(0)}
                          </div>
                          <p className="text-[#E6F1FF] font-bold text-xs">
                            {comment.name}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 bg-[#FF5722]/10 px-2 py-1 rounded-md">
                          <span className="text-[#FF5722] text-[10px]">❤</span>
                          <span className="text-[#FF5722] font-mono text-[9px] font-bold">
                            {comment.likes}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[#475569] italic text-xs animate-pulse">
                  Waiting for reviews...
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
