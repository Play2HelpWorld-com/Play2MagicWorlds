"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { docsData } from "./docsData";
import {
  Gamepad2,
  ShieldAlert,
  Sparkles,
  BookOpenCheck,
  Wand2,
  Sword,
  Scroll,
  Users,
  Code,
} from "lucide-react";

// Particle component for magical effects

type Particle = {
  x: number;
  y: number;
  size: number;
  color: string;
  speedX: number;
  speedY: number;
};

const Particles = ({ active }: { active: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Particle[] = [];
    const colors = ["#8a2be2", "#ff69b4", "#00bfff", "#7fff00"];

    // Store random values in variables before use
    for (let i = 0; i < 50; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const size = Math.random() * 5 + 1;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const speedX = Math.random() * 3 - 1.5;
      const speedY = Math.random() * 3 - 1.5;

      particles.push({ x, y, size, color, speedX, speedY });
    }

    function animate() {
      if (!ctx || !canvas) return; // Extra null check for safety
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
      });

      requestAnimationFrame(animate);
    }

    const animation = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animation);
    };
  }, [active]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0 opacity-30"
    />
  );
};

// Custom Sidebar Link with animations
const SidebarLink = ({ activeSection, setActiveSection }) => {
  const sections = Object.keys(docsData);

  const icons = {
    introduction: <Sparkles className="h-5 w-5" />,
    gettingStarted: <BookOpenCheck className="h-5 w-5" />,
    features: <Wand2 className="h-5 w-5" />,
    gameplay: <Sword className="h-5 w-5" />,
    worldBuilding: <Scroll className="h-5 w-5" />,
    community: <Users className="h-5 w-5" />,
    developers: <Code className="h-5 w-5" />,
    troubleshooting: <ShieldAlert className="h-5 w-5" />,
  };

  return (
    <>
      {sections.map((section) => (
        <motion.li
          key={section}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <button
            onClick={() => setActiveSection(section)}
            className={`flex w-full items-center rounded-lg px-4 py-3 text-base transition-all ${
              activeSection === section
                ? "bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-lg"
                : "text-body-color dark:text-body-color-dark hover:bg-primary hover:bg-opacity-10"
            }`}
          >
            <motion.div
              className="mr-4"
              initial={{ rotate: 0 }}
              animate={{ rotate: activeSection === section ? 360 : 0 }}
              transition={{ duration: 0.5 }}
            >
              {icons[section] || <Gamepad2 className="h-5 w-5" />}
            </motion.div>
            <span>{docsData[section]?.title}</span>

            {activeSection === section && (
              <motion.div
                className="ml-auto h-2 w-2 rounded-full bg-white"
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.5, 1] }}
                transition={{ duration: 0.5 }}
              />
            )}
          </button>
        </motion.li>
      ))}
    </>
  );
};

// Main content component with animations
const ContentSection = ({ section, isActive }) => {
  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          key={section}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="rounded-lg border border-purple-900/30 bg-gradient-to-br from-gray-900 to-gray-800 p-8 text-white shadow-xl"
        >
          {docsData[section]?.content}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// 3D Card effect component
const Card3D = ({ children }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    setRotateX((y - centerY) / 20);
    setRotateY(-(x - centerX) / 20);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="perspective-1000 transform-gpu transition-transform duration-200 ease-out"
      style={{ transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)` }}
    >
      {children}
    </div>
  );
};

export default function Docs() {
  const [activeSection, setActiveSection] = useState("introduction");
  const [error, setError] = useState(null);
  const [showParticles, setShowParticles] = useState(false);

  // Toggle particles effect
  const toggleParticles = () => {
    setShowParticles(!showParticles);
  };

  const handleSectionChange = (section) => {
    try {
      if (!docsData[section]) {
        throw new Error("Invalid section selected.");
      }
      setError(null);
      setActiveSection(section);

      // Show particles briefly when changing sections
      setShowParticles(true);
      setTimeout(() => setShowParticles(false), 2000);
    } catch (err) {
      setError(err.message || "An error occurred while selecting the section.");
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-purple-950 pb-16 pt-24 text-white">
      {showParticles && <Particles active={showParticles} />}

      <div className="container mx-auto px-4">
        <motion.div
          className="mb-12 flex justify-center"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Card3D>
            <div className="flex items-center space-x-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-500 p-6 shadow-2xl">
              <Gamepad2 className="h-12 w-12 text-white" />
              <h1 className="bg-gradient-to-r from-white to-purple-200 bg-clip-text text-4xl font-bold tracking-tight text-transparent">
                MagicWorlds Docs
              </h1>
            </div>
          </Card3D>
        </motion.div>

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Sidebar */}
          <motion.div
            className="w-full lg:w-1/4"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="sticky top-[74px] rounded-lg border border-purple-500/30 bg-gray-900/80 p-4 shadow-lg backdrop-blur-lg">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-xl font-semibold text-white">Navigation</h3>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleParticles}
                  className="rounded-full bg-purple-600 p-2 text-white"
                  title="Toggle magical effects"
                >
                  <Wand2 className="h-4 w-4" />
                </motion.button>
              </div>
              <ul className="space-y-2">
                <SidebarLink
                  activeSection={activeSection}
                  setActiveSection={handleSectionChange}
                />
              </ul>
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            className="w-full lg:w-3/4"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {/* Display Title */}
            <motion.h1
              className="mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-3xl font-bold text-transparent"
              key={activeSection + "-title"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {docsData[activeSection]?.title}
            </motion.h1>

            {/* Display Content */}
            <div className="mb-8">
              <ContentSection section={activeSection} isActive={true} />
            </div>

            {/* Error handling */}
            {error && (
              <motion.div
                className="mt-4 rounded-lg border border-red-500 bg-red-500/20 p-4 text-red-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ShieldAlert className="mr-2 inline-block h-5 w-5" />
                {error}
              </motion.div>
            )}

            {/* Navigation buttons */}
            <div className="mt-8 flex justify-between">
              {Object.keys(docsData).indexOf(activeSection) > 0 && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() =>
                    handleSectionChange(
                      Object.keys(docsData)[
                        Object.keys(docsData).indexOf(activeSection) - 1
                      ],
                    )
                  }
                  className="flex items-center rounded-lg bg-gray-800 px-4 py-2 text-white hover:bg-gray-700"
                >
                  <svg
                    className="mr-2 h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 19l-7-7 7-7"
                    ></path>
                  </svg>
                  Previous
                </motion.button>
              )}

              {Object.keys(docsData).indexOf(activeSection) <
                Object.keys(docsData).length - 1 && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() =>
                    handleSectionChange(
                      Object.keys(docsData)[
                        Object.keys(docsData).indexOf(activeSection) + 1
                      ],
                    )
                  }
                  className="ml-auto flex items-center rounded-lg bg-purple-700 px-4 py-2 text-white hover:bg-purple-600"
                >
                  Next
                  <svg
                    className="ml-2 h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </motion.button>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
