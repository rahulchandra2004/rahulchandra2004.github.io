"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolioData } from "@/data/portfolioData";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ContactFooterSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const sec = sectionRef.current;
    if (!sec) return;

    const ctx = gsap.context(() => {
      const card = sec.querySelector("[data-contact-card]");
      if (card) {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              once: true,
            },
          })
          .from(card, {
            y: 48,
            opacity: 0,
            duration: 1.1,
            ease: "power3.out",
          });
      }
    }, sec);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: portfolioData.web3FormsAccessKey || "00c42e9b-d41f-49a8-af4b-5d00cad1b40b",
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `Portfolio Inquiry from ${formData.name}`,
          from_name: formData.name,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus("sent");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 6000);
      } else {
        console.error("Web3Forms error:", data);
        setStatus("error");
        setErrorMessage(data.message || "Failed to send message. Please try again.");
        setTimeout(() => setStatus("idle"), 6000);
      }
    } catch (error) {
      console.error("Submission failed:", error);
      setStatus("error");
      setErrorMessage("Network error. Please try again or email directly.");
      setTimeout(() => setStatus("idle"), 6000);
    }
  };

  return (
    <div
      ref={sectionRef}
      id="contact"
      className="relative min-h-screen text-white font-sans flex flex-col justify-between overflow-hidden [clip-path:inset(0)]"
    >
      {/* Background Ambience Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
        className="fixed top-0 left-0 w-full h-[100vh] object-cover z-0"
      >
        <source src="/assets/contact_bg-BZTj-iD6.mp4" type="video/mp4" />
      </video>

      {/* Scrim Overlays */}
      <div className="absolute inset-0 z-0 bg-black/75 pointer-events-none" />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/85 via-transparent to-black pointer-events-none" />

      {/* Main Two-Column Contact Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-16 pt-28 pb-16 md:pt-36 flex-1 flex items-center">
        <div className="w-full flex flex-col lg:flex-row gap-12 lg:gap-16 items-start justify-between">
          {/* Left Column (Preserved as requested) */}
          <div className="w-full lg:w-5/12 flex flex-col">
            {/* Available for work badge */}
            <div className="mb-7">
              <span className="inline-flex items-center gap-2.5 rounded-xl border border-[#c85635]/30 bg-[#c85635]/10 backdrop-blur-md px-3.5 py-1.5 text-[10px] md:text-[11px] uppercase tracking-[0.26em] text-[#c85635]">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-[#c85635] animate-halo" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#c85635]" />
                </span>
                Available for work
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter drop-shadow-2xl mb-7 leading-[0.95]">
              <span className="block overflow-hidden pb-[0.08em]">
                <span className="line block text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#c85635]">
                  Get in touch
                </span>
              </span>
            </h2>

            <p className="text-gray-300 text-base md:text-lg font-light leading-relaxed max-w-md">
              Open for engineering roles, systems security, AI/ML initiatives, and research collaborations.
              Send an email or connect directly on LinkedIn.
            </p>

            {/* Quick Action CTA Buttons */}
            <div className="flex flex-wrap gap-3 mt-10">
              <a
                href={`mailto:${portfolioData.email}`}
                className="group px-7 py-3.5 rounded-xl bg-[#c85635] text-white text-sm font-semibold inline-flex items-center gap-2.5 shadow-[0_4px_20px_rgba(200,86,53,0.25)] transition-all duration-300 ease-out hover:bg-[#b34a2c] hover:scale-[1.02]"
              >
                <span>Send an email</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.2}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l9 6 9-6M4 5h16a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1z"
                  />
                </svg>
              </a>

              <a
                href={portfolioData.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group px-6 py-3.5 rounded-xl border border-[#cfc9bc]/40 text-white text-sm font-medium inline-flex items-center gap-2.5 backdrop-blur-md transition-all duration-300 ease-out hover:border-[#cfc9bc] hover:bg-[#cfc9bc]/10 hover:text-[#cfc9bc]"
              >
                <span>Connect on LinkedIn</span>
                <svg
                  className="w-4 h-4 text-gray-300 group-hover:text-white transition-colors"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right Column: Replaces old right card with the form from Image 2 */}
          <div className="w-full lg:w-7/12 flex flex-col items-center">
            <div
              data-contact-card
              className="w-full rounded-xl border border-white/10 bg-[#0c0d12]/80 backdrop-blur-2xl p-7 sm:p-10 md:p-12 shadow-[0_24px_70px_-15px_rgba(0,0,0,0.85)]"
            >
              <form onSubmit={handleSubmit} className="flex flex-col">
                {/* Two Columns: NAME & EMAIL */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-8">
                  {/* Name */}
                  <div className="flex flex-col">
                    <label
                      htmlFor="contact-name"
                      className="text-[11px] font-mono uppercase tracking-[0.22em] text-gray-400 font-semibold mb-2.5"
                    >
                      NAME
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                      className="w-full bg-transparent border-b border-white/15 pb-3 text-white placeholder-gray-500 font-sans text-base focus:outline-none focus:border-white transition-colors duration-200"
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col">
                    <label
                      htmlFor="contact-email"
                      className="text-[11px] font-mono uppercase tracking-[0.22em] text-gray-400 font-semibold mb-2.5"
                    >
                      EMAIL
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@example.com"
                      className="w-full bg-transparent border-b border-white/15 pb-3 text-white placeholder-gray-500 font-sans text-base focus:outline-none focus:border-white transition-colors duration-200"
                    />
                  </div>
                </div>

                {/* MESSAGE */}
                <div className="flex flex-col mb-10">
                  <label
                    htmlFor="contact-message"
                    className="text-[11px] font-mono uppercase tracking-[0.22em] text-gray-400 font-semibold mb-2.5"
                  >
                    MESSAGE
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your project..."
                    className="w-full bg-transparent border-b border-white/15 pb-3 text-white placeholder-gray-500 font-sans text-base focus:outline-none focus:border-white transition-colors duration-200 resize-none"
                  />
                </div>

                {/* Send Message Button matching Image 2 */}
                <div className="flex items-center justify-between flex-wrap gap-4 pt-1">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="group relative px-8 py-3.5 rounded-xl bg-[#c85635] text-white font-semibold text-sm md:text-base tracking-wide flex items-center gap-2.5 transition-all duration-300 hover:bg-[#b34a2c] hover:scale-[1.02] active:scale-[0.98] shadow-[0_4px_20px_rgba(200,86,53,0.25)] disabled:opacity-60 cursor-pointer"
                  >
                    <span>
                      {status === "sending"
                        ? "Sending..."
                        : status === "sent"
                        ? "Message Sent"
                        : "Send Message"}
                    </span>
                    <svg
                      className="w-4 h-4 text-white transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>

                  {status === "sent" && (
                    <span className="text-[#c85635] text-sm font-medium animate-fade-in-up">
                      Message sent successfully!
                    </span>
                  )}

                  {status === "error" && (
                    <span className="text-red-400 text-sm font-medium animate-fade-in-up">
                      {errorMessage || "Failed to send message. Please try again."}
                    </span>
                  )}
                </div>
              </form>
            </div>

            {/* Status Beacon matching Image 2 */}
            <div className="flex justify-center mt-7">
              <div className="relative flex items-center justify-center w-7 h-7 rounded-xl border border-[#c85635]/40 bg-[#c85635]/10">
                <span className="absolute w-full h-full rounded-xl border border-[#c85635]/30 animate-ping opacity-60" />
                <span className="w-2 h-2 rounded-full bg-[#c85635] shadow-[0_0_8px_#c85635]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-16 pb-9">
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row md:items-center justify-between gap-5 text-xs text-gray-400">
          <p>© {new Date().getFullYear()} {portfolioData.fullName}. All rights reserved.</p>
          
          <div className="flex flex-wrap items-center gap-6">
            <nav aria-label="Footer" className="hidden sm:flex flex-wrap items-center gap-x-6 gap-y-3">
              <a href="#home" className="hover:text-white transition-colors duration-300">
                Home
              </a>
              <a href="#about" className="hover:text-white transition-colors duration-300">
                About
              </a>
              <a href="#service" className="hover:text-white transition-colors duration-300">
                Services
              </a>
              <a href="#project" className="hover:text-white transition-colors duration-300">
                Projects
              </a>
              <span className="hidden md:inline h-3 w-px bg-white/15" aria-hidden="true" />
              <a href="#contact" className="hover:text-white transition-colors duration-300">
                Contact
              </a>
            </nav>

            {/* Resume Button in the right down corner */}
            <a
              href={portfolioData.socials.resume}
              download="Rahul_Chandra_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download Resume"
              className="px-5 py-2.5 rounded-xl border border-[#c85635]/40 bg-[#c85635]/10 hover:border-[#c85635] hover:bg-[#c85635]/20 text-[#c85635] text-xs md:text-sm font-semibold tracking-wide transition-all duration-300 inline-flex items-center gap-2 group shadow-[0_4px_20px_rgba(200,86,53,0.15)] hover:shadow-[0_4px_25px_rgba(200,86,53,0.3)] cursor-pointer"
            >
              <span>Resume</span>
              <svg
                className="w-4 h-4 text-[#c85635] transition-transform duration-300 group-hover:translate-y-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v12m0 0l-3-3m3 3l3-3m-8 6h10" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
