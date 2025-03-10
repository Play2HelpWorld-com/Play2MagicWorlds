"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FeaturesTab = () => {
  const [currentTab, setCurrentTab] = useState("tabOne");
  const [isHovering, setIsHovering] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Play sound effect on tab change
  useEffect(() => {
    if (typeof window !== "undefined") {
      const playSound = () => {
        if (audioRef.current) {
          audioRef.current.currentTime = 0;
          audioRef.current
            .play()
            .catch((e) => console.log("Audio play prevented"));
        }
      };
      playSound();
    }
  }, [currentTab]);

  // Gaming-themed feature data with more dynamic content
  const gamingFeaturesData = [
    {
      id: "tabOne",
      title: "Immersive Gaming Experience",
      description:
        "Jump into a world of excitement with our curated collection of games. From action-packed adventures to mind-bending puzzles, discover new experiences and challenge your skills.",
      benefits: [
        "Access to magic worlds games across all genres",
        "Exclusive in-game rewards and power-ups",
        "Real-time multiplayer with friends and global leaderboards",
        "Cross-platform synchronization for seamless gaming",
      ],
      image: "/images/features/gaming-experience.jpg",
      altText: "Gaming Experience Illustration",
    },
    {
      id: "tabTwo",
      title: "Level Up & Earn Rewards",
      description:
        "Every minute of gameplay earns you valuable points. Complete challenges, unlock achievements, and watch your score multiply with consecutive daily play streaks.",
      benefits: [
        "Daily challenges with escalating point rewards",
        "Achievement system with rare collectible badges",
        "Weekly tournaments with premium prize pools",
        "Special events with limited-time point multipliers",
      ],
      image: "/images/features/rewards-system.jpg",
      altText: "Rewards System Illustration",
    },
    {
      id: "tabThree",
      title: "Gaming For Good",
      description:
        "Turn your passion for gaming into real-world impact. Convert your earned points into charitable donations, with 100% of the value going to causes you care about.",
      benefits: [
        "Support over 150 verified global charities",
        "Track your donation impact with real-time metrics",
        "Join community-wide donation challenges",
        "Earn exclusive recognition badges for charitable milestones",
      ],
      image: "/images/features/charity-gaming.jpg",
      altText: "Charity Gaming Illustration",
    },
  ];

  // Tab variants for animations
  const tabVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
  };

  // Glowing effect for active tab
  const glowVariants = {
    idle: {
      boxShadow: "0 0 0px rgba(124, 58, 237, 0)",
      transition: {
        duration: 0.5,
        repeat: Infinity,
        repeatType: "reverse" as const,
      },
    },
    active: {
      boxShadow: "0 0 20px rgba(124, 58, 237, 0.8)",
      transition: {
        duration: 0.5,
        repeat: Infinity,
        repeatType: "reverse" as const,
      },
    },
  };

  // Feature content animation variants
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.1 + 0.2, duration: 0.4 },
    }),
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-900 to-black py-24">
      {/* Background game-themed elements */}
      <div className="absolute left-0 top-0 h-full w-full overflow-hidden">
        <div className="absolute left-10 top-10 h-20 w-20 animate-pulse rounded-full bg-purple-600 opacity-20 blur-3xl"></div>
        <div
          className="absolute bottom-20 right-20 h-32 w-32 animate-pulse rounded-full bg-blue-500 opacity-20 blur-3xl"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute left-1/4 top-1/2 h-40 w-40 animate-pulse rounded-full bg-red-500 opacity-10 blur-3xl"
          style={{ animationDelay: "2s" }}
        ></div>

        {/* Particle grid effect */}
        <div className="absolute inset-0 z-0">
          <div className="grid h-full w-full grid-cols-12 grid-rows-12">
            {Array(144)
              .fill(null)
              .map((_, i) => (
                <div key={i} className="relative">
                  <div
                    className="absolute left-1/2 top-1/2 h-1 w-1 rounded-full bg-purple-500 opacity-20"
                    style={{
                      transform: "translate(-50%, -50%)",
                      animation: `pulse ${2 + Math.random() * 4}s infinite ${Math.random() * 5}s`,
                    }}
                  ></div>
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section heading with gaming flair */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">
            <span className="inline-block bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              Choose Your Adventure
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-gray-300">
            Enter a new dimension of gaming with our revolutionary features
            designed to enhance your experience, reward your dedication, and
            make a positive impact.
          </p>
        </motion.div>

        {/* Audio element for sound effects */}
        <audio ref={audioRef} className="hidden">
          <source src="/sounds/click-sound.mp3" type="audio/mpeg" />
        </audio>

        {/* Gaming-themed tab navigation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16 flex flex-col justify-center gap-4 md:flex-row"
        >
          {gamingFeaturesData.map((feature, index) => (
            <motion.button
              key={feature.id}
              onClick={() => setCurrentTab(feature.id)}
              onMouseEnter={() => setIsHovering(feature.id)}
              onMouseLeave={() => setIsHovering(null)}
              initial="idle"
              animate={currentTab === feature.id ? "active" : "idle"}
              variants={glowVariants}
              className={`relative flex items-center gap-4 rounded-xl px-6 py-4 backdrop-blur-lg transition-all duration-300 md:px-8
                ${
                  currentTab === feature.id
                    ? "border border-purple-500 bg-gradient-to-r from-purple-900/80 to-purple-600/80"
                    : "border border-gray-700 bg-gray-900/40 hover:border-gray-500"
                }`}
            >
              {/* Game-controller themed numbering */}
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-lg
                ${
                  currentTab === feature.id
                    ? "bg-purple-600 text-white"
                    : "bg-gray-800 text-gray-300"
                }`}
              >
                <motion.div
                  animate={{
                    scale:
                      isHovering === feature.id || currentTab === feature.id
                        ? [1, 1.1, 1]
                        : 1,
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: currentTab === feature.id ? Infinity : 0,
                    repeatType: "reverse",
                  }}
                  className="relative"
                >
                  <span className="text-lg font-bold">{index + 1}</span>

                  {/* Controller button dots */}
                  <div className="absolute -right-1 -top-1 h-1.5 w-1.5 rounded-full bg-white/80"></div>
                  <div className="absolute -bottom-1 -left-1 h-1.5 w-1.5 rounded-full bg-white/80"></div>
                </motion.div>
              </div>

              <span
                className={`text-base font-medium ${currentTab === feature.id ? "text-white" : "text-gray-300"}`}
              >
                {feature.title.split(" ")[0]}
              </span>

              {/* Animated selection indicator */}
              {currentTab === feature.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Tab content with advanced animations */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {gamingFeaturesData.map(
              (feature) =>
                feature.id === currentTab && (
                  <motion.div
                    key={feature.id}
                    variants={tabVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-center gap-8 lg:flex-row lg:gap-16"
                  >
                    {/* Feature imagery with parallax effect */}
                    <motion.div
                      className="w-full lg:w-1/2"
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      <div className="relative h-64 w-full overflow-hidden rounded-2xl border-2 border-purple-800/50 shadow-lg shadow-purple-900/20 sm:h-80 md:h-96">
                        {/* For demo purposes, using a colored div instead of actual image */}
                        <div
                          className={`absolute inset-0 bg-gradient-to-br
                        ${
                          feature.id === "tabOne"
                            ? "from-blue-900 to-violet-800"
                            : feature.id === "tabTwo"
                              ? "from-amber-700 to-red-800"
                              : "from-emerald-800 to-teal-900"
                        }`}
                        >
                          {/* Game-themed overlay elements */}
                          <div className="absolute inset-0 opacity-20">
                            <div className="absolute left-0 top-0 grid h-full w-full grid-cols-6 grid-rows-6">
                              {Array(36)
                                .fill(null)
                                .map((_, i) => (
                                  <div
                                    key={i}
                                    className="border border-white/5"
                                  ></div>
                                ))}
                            </div>
                          </div>

                          {/* Feature specific game elements */}
                          {feature.id === "tabOne" && (
                            <>
                              <div
                                className="absolute left-1/4 top-1/4 h-16 w-16 animate-bounce rounded-lg bg-white/20"
                                style={{ animationDuration: "3s" }}
                              ></div>
                              <div className="absolute bottom-1/3 right-1/3 h-20 w-20 animate-pulse rounded-full bg-purple-500/30"></div>
                            </>
                          )}

                          {feature.id === "tabTwo" && (
                            <>
                              <div
                                className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 transform animate-ping rounded-full border-4 border-yellow-400/50"
                                style={{ animationDuration: "3s" }}
                              ></div>
                              <div className="absolute right-1/4 top-1/3 h-12 w-12 rotate-45 animate-pulse bg-orange-500/40"></div>
                            </>
                          )}

                          {feature.id === "tabThree" && (
                            <>
                              <div className="absolute bottom-1/4 left-1/4 h-20 w-20 animate-pulse rounded-lg border-4 border-green-400/40"></div>
                              <div
                                className="absolute right-1/4 top-1/4 h-16 w-16 animate-bounce rounded-full bg-teal-500/30"
                                style={{ animationDuration: "4s" }}
                              ></div>
                            </>
                          )}
                        </div>

                        {/* Central icon representation */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div
                            className={`flex h-24 w-24 items-center justify-center rounded-full bg-black/30 backdrop-blur-sm
                          ${
                            feature.id === "tabOne"
                              ? "text-blue-400"
                              : feature.id === "tabTwo"
                                ? "text-amber-400"
                                : "text-emerald-400"
                          }`}
                          >
                            <span className="text-5xl">
                              {feature.id === "tabOne"
                                ? "🎮"
                                : feature.id === "tabTwo"
                                  ? "🏆"
                                  : "🌍"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Feature content with staggered animations */}
                    <div className="w-full lg:w-1/2">
                      <motion.h3
                        custom={1}
                        variants={contentVariants}
                        initial="hidden"
                        animate="visible"
                        className="mb-4 text-3xl font-bold text-white"
                      >
                        {feature.title}
                      </motion.h3>

                      <motion.p
                        custom={2}
                        variants={contentVariants}
                        initial="hidden"
                        animate="visible"
                        className="mb-6 text-gray-300"
                      >
                        {feature.description}
                      </motion.p>

                      <motion.div
                        custom={3}
                        variants={contentVariants}
                        initial="hidden"
                        animate="visible"
                        className="space-y-4"
                      >
                        <h4 className="mb-3 text-lg font-semibold text-purple-400">
                          Key Features:
                        </h4>
                        <ul className="space-y-3">
                          {feature.benefits.map((benefit, i) => (
                            <motion.li
                              key={i}
                              custom={i + 4}
                              variants={contentVariants}
                              initial="hidden"
                              animate="visible"
                              className="flex items-start gap-3"
                            >
                              <div className="mt-1 flex-shrink-0">
                                <div
                                  className={`flex h-5 w-5 items-center justify-center rounded
                                ${
                                  feature.id === "tabOne"
                                    ? "bg-blue-500"
                                    : feature.id === "tabTwo"
                                      ? "bg-amber-500"
                                      : "bg-emerald-500"
                                }`}
                                >
                                  <svg
                                    width="12"
                                    height="12"
                                    viewBox="0 0 12 12"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M10 3L4.5 8.5L2 6"
                                      stroke="white"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                </div>
                              </div>
                              <span className="text-gray-200">{benefit}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>

                      {/* CTA button with hover effects */}
                      <motion.div
                        custom={8}
                        variants={contentVariants}
                        initial="hidden"
                        animate="visible"
                        className="mt-8"
                      >
                        <button
                          className={`group relative overflow-hidden rounded-lg px-8 py-3 font-medium text-white transition-all duration-300
                          ${
                            feature.id === "tabOne"
                              ? "bg-blue-600 hover:bg-blue-700"
                              : feature.id === "tabTwo"
                                ? "bg-amber-600 hover:bg-amber-700"
                                : "bg-emerald-600 hover:bg-emerald-700"
                          }`}
                        >
                          {/* Button particle effects */}
                          <span className="pointer-events-none absolute -left-10 -top-10 h-20 w-20 rounded-full bg-white/30 opacity-0 duration-700 group-hover:scale-[6] group-hover:opacity-20"></span>
                          <span className="pointer-events-none absolute -bottom-10 -right-10 h-20 w-20 rounded-full bg-white/20 opacity-0 delay-100 duration-700 group-hover:scale-[6] group-hover:opacity-20"></span>

                          {/* Button text */}
                          <span className="relative z-10">
                            {feature.id === "tabOne"
                              ? "Start Playing"
                              : feature.id === "tabTwo"
                                ? "View Rewards"
                                : "Make Impact"}
                          </span>
                        </button>
                      </motion.div>
                    </div>
                  </motion.div>
                ),
            )}
          </AnimatePresence>
        </div>

        {/* Progress dots */}
        <div className="mt-12 flex justify-center gap-2">
          {gamingFeaturesData.map((feature) => (
            <button
              key={feature.id}
              onClick={() => setCurrentTab(feature.id)}
              className="focus:outline-none"
            >
              <motion.div
                animate={{
                  scale: currentTab === feature.id ? [1, 1.2, 1] : 1,
                  opacity: currentTab === feature.id ? 1 : 0.5,
                }}
                transition={{
                  duration: 0.5,
                  repeat: currentTab === feature.id ? Infinity : 0,
                  repeatType: "reverse",
                }}
                className={`h-3 w-3 rounded-full
                  ${
                    currentTab === feature.id
                      ? "bg-gradient-to-r from-purple-500 to-pink-500"
                      : "bg-gray-600"
                  }`}
              />
            </button>
          ))}
        </div>

        {/* Floating game elements */}
        <div className="absolute right-10 top-10 z-[1] h-20 w-20 opacity-20">
          <svg
            viewBox="0 0 24 24"
            className="animate-spin-slow h-full w-full text-purple-500"
          >
            <path
              fill="currentColor"
              d="M12,1A11,11 0 0,1 23,12A11,11 0 0,1 12,23A11,11 0 0,1 1,12A11,11 0 0,1 12,1M8.88,5.24L6,8.12L7.41,9.5L10.29,6.62L8.88,5.24M15.12,5.24L13.71,6.62L16.59,9.5L18,8.12L15.12,5.24M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7M7.41,14.5L6,15.88L8.88,18.76L10.29,17.38L7.41,14.5M13.71,17.38L16.59,14.5L18,15.88L15.12,18.76L13.71,17.38Z"
            />
          </svg>
        </div>
        <div className="absolute bottom-20 left-10 z-[1] h-16 w-16 opacity-20">
          <svg
            viewBox="0 0 24 24"
            className="animate-float h-full w-full text-blue-500"
          >
            <path
              fill="currentColor"
              d="M7,6H17A6,6 0 0,1 23,12A6,6 0 0,1 17,18C15.22,18 13.63,17.23 12.53,16H11.47C10.37,17.23 8.78,18 7,18A6,6 0 0,1 1,12A6,6 0 0,1 7,6M6,9V11H4V13H6V15H8V13H10V11H8V9H6M15.5,12A1.5,1.5 0 0,0 14,13.5A1.5,1.5 0 0,0 15.5,15A1.5,1.5 0 0,0 17,13.5A1.5,1.5 0 0,0 15.5,12M18.5,9A1.5,1.5 0 0,0 17,10.5A1.5,1.5 0 0,0 18.5,12A1.5,1.5 0 0,0 20,10.5A1.5,1.5 0 0,0 18.5,9Z"
            />
          </svg>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(5deg);
          }
          100% {
            transform: translateY(0px) rotate(0deg);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.2;
          }
          50% {
            transform: translate(-50%, -50%) scale(2);
            opacity: 0;
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin 12s linear infinite;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </section>
  );
};

export default FeaturesTab;
