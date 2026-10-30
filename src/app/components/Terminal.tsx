"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CommandLog {
  command: string;
  output: React.ReactNode;
}

export default function Terminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<CommandLog[]>([
    {
      command: "System.init()",
      output: (
        <div className="text-gray-400">
          <span className="text-accent block mb-2">Terminal initialized. Available commands:</span>
          <span className="text-accent">whoami</span> - Display system administrator identity <br />
          <span className="text-accent">projects</span> - List active engineering directives <br />
          <span className="text-accent">skills</span> - Display neural network weights <br />
          <span className="text-accent">clear</span> - Wipe terminal history <br />
        </div>
      ),
    },
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Toggle terminal on `~` or `\`` key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "`" || e.key === "~") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Auto-focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    setInput("");

    if (!cmd) return;

    if (cmd === "clear") {
      setHistory([]);
      return;
    }

    let output: React.ReactNode = "";

    switch (cmd) {
      case "help":
        output = (
          <div className="text-gray-400">
            Available commands: <br />
            <span className="text-accent">whoami</span> - Display system administrator identity <br />
            <span className="text-accent">projects</span> - List active engineering directives <br />
            <span className="text-accent">skills</span> - Display neural network weights <br />
            <span className="text-accent">clear</span> - Wipe terminal history <br />
            <span className="text-accent">sudo</span> - Attempt override <br />
          </div>
        );
        break;
      case "whoami":
        output = (
          <div className="text-violet">
            USER: Rahul Chandra Padamuttam <br />
            ROLE: AI & Robotics Engineer <br />
            STATUS: Building 12 DOF bipedal systems, deploying ML pipelines, and optimizing autonomous observability (OmniSRE). <br />
            LOCATION: Node 01 (India)
          </div>
        );
        break;
      case "projects":
        output = (
          <div className="text-gray-300">
            [1] 12 DOF Humanoid Robot (Active) - Locomotion via FSM & CPG <br />
            [2] OmniSRE (Active) - Autonomous self-healing observability <br />
            [3] Facial Emotion Recognition (Deployed) - CNN & CvT models <br />
            [4] Energy Forecasting (Deployed) - Temporal Deep Learning ANN
          </div>
        );
        break;
      case "skills":
        output = (
          <div className="text-accent">
            &gt; Core: Python, C++, Java <br />
            &gt; AI/ML: TensorFlow, Scikit-Learn, Deep Learning, Computer Vision <br />
            &gt; Hardware: Embedded Systems, Arduino, Sensors <br />
            &gt; Web: React, Next.js, Framer Motion
          </div>
        );
        break;
      case "sudo":
        output = <span className="text-red-500">Access denied. This incident will be reported.</span>;
        break;
      default:
        output = <span className="text-red-400">Command not found: {cmd}</span>;
    }

    setHistory((prev) => [...prev, { command: cmd, output }]);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: "-100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed top-0 left-0 w-full z-[150] shadow-2xl"
          style={{ height: "45vh" }}
        >
          <div className="w-full h-full bg-black/90 backdrop-blur-md border-b border-accent/30 flex flex-col font-mono text-sm">
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500 cursor-pointer" onClick={() => setIsOpen(false)} />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="text-gray-400 text-xs tracking-widest">GUEST@RAHUL-OS:~</div>
              <div className="w-10"></div> {/* Spacer for centering */}
            </div>

            {/* Terminal Output */}
            <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-3 scrollbar-hide">
              {history.map((log, i) => (
                <div key={i}>
                  <div className="flex gap-2 text-gray-300">
                    <span className="text-[#c85635] font-mono">&gt;</span>
                    <span className="text-gray-400">~</span>
                    <span>{log.command}</span>
                  </div>
                  <div className="mt-1 pl-4">{log.output}</div>
                </div>
              ))}

              {/* Input Line */}
              <form onSubmit={handleCommand} className="flex gap-2 text-gray-300 mt-2">
                <span className="text-[#c85635] font-mono">&gt;</span>
                <span className="text-gray-400">~</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type 'whoami' or 'projects'..."
                  className="flex-1 bg-transparent border-none outline-none text-white focus:ring-0 p-0 placeholder-gray-600"
                  spellCheck="false"
                  autoComplete="off"
                  autoFocus
                />
              </form>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
