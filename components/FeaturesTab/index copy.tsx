"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FeaturesTab = () => {
  const [currentTab, setCurrentTab] = useState("tabOne");
  const [isHovering, setIsHovering] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentGame, setCurrentGame] = useState(null);
  const audioRef = useRef(null);

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
      buttonText: "Start Playing",
      gameType: "flappyBird",
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
      buttonText: "View Rewards",
      gameType: "memoryGame",
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
      buttonText: "Make Impact",
      gameType: "snakeGame",
    },
  ];

  // Handle opening game modal
  const openGameModal = (gameType) => {
    setCurrentGame(gameType);
    setModalOpen(true);
  };

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
      transition: { duration: 0.5, repeat: Infinity, repeatType: "reverse" },
    },
    active: {
      boxShadow: "0 0 20px rgba(124, 58, 237, 0.8)",
      transition: { duration: 0.5, repeat: Infinity, repeatType: "reverse" },
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

  // Modal animation variants
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
  };

  // Handle close modal when escape key is pressed
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        setModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

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
              .fill()
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
                                .fill()
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
                          onClick={() => openGameModal(feature.gameType)}
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
                            {feature.buttonText}
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

        {/* Game Modal */}
        <AnimatePresence>
          {modalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              {/* Modal Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={() => setModalOpen(false)}
              />

              {/* Modal Content */}
              <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="relative z-10 mx-4 w-full max-w-4xl overflow-hidden rounded-2xl bg-gray-900 shadow-2xl shadow-purple-900/20"
              >
                {/* Modal Header */}
                <div className="border-b border-gray-800 bg-gray-900 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white">
                      {currentGame === "flappyBird"
                        ? "Flappy Bird"
                        : currentGame === "memoryGame"
                          ? "Memory Match"
                          : "Snake Game"}
                    </h3>
                    <button
                      onClick={() => setModalOpen(false)}
                      className="rounded-full bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white"
                    >
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Modal Body / Game Container */}
                <div className="h-96 overflow-hidden bg-gray-800 p-4">
                  {currentGame === "flappyBird" && <FlappyBirdGame />}
                  {currentGame === "memoryGame" && <MemoryGame />}
                  {currentGame === "snakeGame" && <SnakeGame />}
                </div>

                {/* Modal Footer */}
                <div className="border-t border-gray-800 bg-gray-900 px-6 py-4">
                  <div className="flex justify-between">
                    <div className="flex items-center text-gray-300">
                      <svg
                        className="mr-2 h-5 w-5 text-yellow-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <span>Play to earn points!</span>
                    </div>
                    <button
                      onClick={() => setModalOpen(false)}
                      className="rounded-lg bg-gray-700 px-4 py-2 text-white hover:bg-gray-600"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

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

// Game Components
const FlappyBirdGame = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const canvasRef = useRef(null);
  const birdRef = useRef({
    x: 50,
    y: 150,
    velocity: 0,
    gravity: 0.5,
    jump: -8,
    radius: 15,
  });
  const pipesRef = useRef([]);
  const requestRef = useRef();
  const lastTimeRef = useRef(0);
  const frameCountRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const handleKeyDown = (e) => {
      if ((e.code === "Space" || e.key === " ") && !gameOver) {
        if (!gameStarted) {
          setGameStarted(true);
        }
        birdRef.current.velocity = birdRef.current.jump;
      }
      if (e.code === "Space" && gameOver) {
        resetGame();
      }
    };

    const handleClick = () => {
      if (!gameOver) {
        if (!gameStarted) {
          setGameStarted(true);
        }
        birdRef.current.velocity = birdRef.current.jump;
      } else {
        resetGame();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    canvas.addEventListener("click", handleClick);

    // Game loop
    const gameLoop = (timestamp) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const deltaTime = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      if (gameStarted && !gameOver) {
        updateGame(deltaTime);
      }

      renderGame();
      animationFrameId = requestAnimationFrame(gameLoop);
    };

    const updateGame = (deltaTime) => {
      // Update bird position
      const bird = birdRef.current;
      bird.velocity += bird.gravity;
      bird.y += bird.velocity;

      // Generate pipes
      frameCountRef.current++;
      if (frameCountRef.current % 100 === 0) {
        const height = Math.floor(Math.random() * 150) + 50;
        pipesRef.current.push({
          x: canvas.width,
          topHeight: height,
          bottomHeight: canvas.height - height - 150,
          width: 50,
          counted: false,
        });
      }

      // Update pipes position
      pipesRef.current.forEach((pipe) => {
        pipe.x -= 2;

        // Check for score
        if (!pipe.counted && pipe.x + pipe.width < bird.x) {
          setScore((prevScore) => prevScore + 1);
          pipe.counted = true;
        }

        // Check for collision
        if (
          bird.x + bird.radius > pipe.x &&
          bird.x - bird.radius < pipe.x + pipe.width &&
          (bird.y - bird.radius < pipe.topHeight ||
            bird.y + bird.radius > canvas.height - pipe.bottomHeight)
        ) {
          gameEnd();
        }
      });

      // Remove pipes that are off screen
      pipesRef.current = pipesRef.current.filter(
        (pipe) => pipe.x + pipe.width > 0,
      );

      // Check for collision with ground/ceiling
      if (bird.y + bird.radius > canvas.height || bird.y - bird.radius < 0) {
        gameEnd();
      }
    };

    const renderGame = () => {
      // Clear canvas
      ctx.fillStyle = "#1a1a2e";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw pipes
      ctx.fillStyle = "#4CAF50";
      pipesRef.current.forEach((pipe) => {
        // Top pipe
        ctx.fillRect(pipe.x, 0, pipe.width, pipe.topHeight);
        // Bottom pipe
        ctx.fillRect(
          pipe.x,
          canvas.height - pipe.bottomHeight,
          pipe.width,
          pipe.bottomHeight,
        );
      });

      // Draw bird
      ctx.fillStyle = "#FFEB3B";
      ctx.beginPath();
      ctx.arc(
        birdRef.current.x,
        birdRef.current.y,
        birdRef.current.radius,
        0,
        Math.PI * 2,
      );
      ctx.fill();

      // Draw score
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "24px Arial";
      ctx.textAlign = "center";
      ctx.fillText(`Score: ${score}`, canvas.width / 2, 30);

      // Draw instructions
      if (!gameStarted) {
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        ctx.font = "18px Arial";
        ctx.textAlign = "center";
        ctx.fillText(
          "Click or Press Space to Start",
          canvas.width / 2,
          canvas.height / 2,
        );
      }

      // Draw game over
      if (gameOver) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#FFFFFF";
        ctx.font = "24px Arial";
        ctx.textAlign = "center";
        ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2 - 50);
        ctx.fillText(`Score: ${score}`, canvas.width / 2, canvas.height / 2);
        ctx.fillText(
          `High Score: ${highScore}`,
          canvas.width / 2,
          canvas.height / 2 + 30,
        );
        ctx.fillText(
          "Click or Press Space to Play Again",
          canvas.width / 2,
          canvas.height / 2 + 70,
        );
      }
    };

    const gameEnd = () => {
      setGameOver(true);
      setHighScore((prev) => Math.max(prev, score));
    };

    const resetGame = () => {
      birdRef.current = {
        x: 50,
        y: 150,
        velocity: 0,
        gravity: 0.5,
        jump: -8,
        radius: 15,
      };
      pipesRef.current = [];
      frameCountRef.current = 0;
      setScore(0);
      setGameOver(false);
      setGameStarted(true);
    };

    renderGame();
    animationFrameId = requestAnimationFrame(gameLoop);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      canvas.removeEventListener("click", handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, [gameOver, gameStarted, score, highScore]);

  return (
    <div className="flex h-full w-full items-center justify-center bg-gray-900">
      <canvas
        ref={canvasRef}
        width={400}
        height={300}
        className="rounded-lg border-2 border-blue-500 shadow-lg"
      />
    </div>
  );
};

const MemoryGame = () => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [moves, setMoves] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // Card content
  const cardContent = ["🚀", "🎮", "🎲", "🎯", "🏆", "🎨", "🎭", "🎵"];

  useEffect(() => {
    if (gameStarted) {
      initializeGame();
    }
  }, [gameStarted]);

  const initializeGame = () => {
    // Create pairs of cards
    const duplicatedCards = [...cardContent, ...cardContent];
    // Shuffle the cards
    const shuffledCards = duplicatedCards
      .sort(() => Math.random() - 0.5)
      .map((content, i) => ({ id: i, content, flipped: false, solved: false }));

    setCards(shuffledCards);
    setFlipped([]);
    setSolved([]);
    setDisabled(false);
    setMoves(0);
    setGameOver(false);
  };

  const handleCardClick = (id) => {
    if (disabled) return;

    // Can't flip more than 2 cards at once
    if (flipped.length === 2) return;

    // Can't flip a card that's already flipped or solved
    if (flipped.includes(id) || solved.includes(id)) return;

    // Flip the card
    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);

    // If two cards are flipped, check for match
    if (newFlipped.length === 2) {
      setDisabled(true);
      setMoves((prevMoves) => prevMoves + 1);

      const [first, second] = newFlipped;
      if (cards[first].content === cards[second].content) {
        // Match found
        setSolved((prevSolved) => [...prevSolved, first, second]);
        setFlipped([]);
        setDisabled(false);

        // Check if all cards are solved
        if (solved.length + 2 === cards.length) {
          setGameOver(true);
        }
      } else {
        // No match
        setTimeout(() => {
          setFlipped([]);
          setDisabled(false);
        }, 1000);
      }
    }
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-gray-900 p-4">
      {!gameStarted ? (
        <div className="text-center">
          <h3 className="mb-4 text-2xl font-bold text-white">Memory Match</h3>
          <p className="mb-6 text-gray-300">
            Flip cards to find matching pairs
          </p>
          <button
            onClick={() => setGameStarted(true)}
            className="rounded-lg bg-amber-600 px-6 py-2 text-white transition-colors hover:bg-amber-700"
          >
            Start Game
          </button>
        </div>
      ) : gameOver ? (
        <div className="text-center">
          <h3 className="mb-2 text-2xl font-bold text-white">Game Complete!</h3>
          <p className="mb-4 text-gray-300">
            You completed the game in {moves} moves
          </p>
          <button
            onClick={initializeGame}
            className="rounded-lg bg-amber-600 px-6 py-2 text-white transition-colors hover:bg-amber-700"
          >
            Play Again
          </button>
        </div>
      ) : (
        <>
          <div className="mb-4 flex w-full justify-between">
            <span className="text-white">Moves: {moves}</span>
            <span className="text-white">
              Pairs: {solved.length / 2} / {cardContent.length}
            </span>
          </div>
          <div className="grid w-full max-w-md grid-cols-4 gap-3">
            {cards.map((card) => (
              <div
                key={card.id}
                className={`flex h-16 w-full transform cursor-pointer items-center justify-center rounded-lg transition-all duration-300 ${
                  flipped.includes(card.id) || solved.includes(card.id)
                    ? "rotate-y-180 bg-amber-600"
                    : "bg-gray-700 hover:bg-gray-600"
                } ${solved.includes(card.id) ? "opacity-70" : ""}`}
                onClick={() => handleCardClick(card.id)}
              >
                {flipped.includes(card.id) || solved.includes(card.id) ? (
                  <span className="text-2xl">{card.content}</span>
                ) : (
                  <span className="text-2xl">?</span>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const SnakeGame = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const canvasRef = useRef(null);
  const snakeRef = useRef([
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 },
  ]);
  const foodRef = useRef({ x: 15, y: 15 });
  const directionRef = useRef("RIGHT");
  const gridSizeRef = useRef(20);
  const speedRef = useRef(100);
  const gameLoopRef = useRef(null);

  const placeFood = () => {
    const gridSize = gridSizeRef.current;
    const x = Math.floor(Math.random() * gridSize);
    const y = Math.floor(Math.random() * gridSize);

    // Check if food is on snake
    const isOnSnake = snakeRef.current.some(
      (segment) => segment.x === x && segment.y === y,
    );

    if (isOnSnake) {
      placeFood();
    } else {
      foodRef.current = { x, y };
    }
  };

  const endGame = () => {
    setGameOver(true);
    setHighScore((prev) => Math.max(prev, score));
    clearInterval(gameLoopRef.current);
  };

  const startGame = () => {
    if (gameLoopRef.current) clearInterval(gameLoopRef.current);

    setGameStarted(true);
    setGameOver(false);
    directionRef.current = "RIGHT";
    snakeRef.current = [
      { x: 10, y: 10 },
      { x: 9, y: 10 },
      { x: 8, y: 10 },
    ];
    placeFood();
    gameLoopRef.current = setInterval(gameLoop, speedRef.current);
  };

  const resetGame = () => {
    setScore(0);
    startGame();
  };

  const gameLoop = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const gridSize = gridSizeRef.current;
    const cellSize = canvas.width / gridSize;

    // Move snake
    const snake = [...snakeRef.current];
    const head = { ...snake[0] };

    switch (directionRef.current) {
      case "UP":
        head.y--;
        break;
      case "DOWN":
        head.y++;
        break;
      case "LEFT":
        head.x--;
        break;
      case "RIGHT":
        head.x++;
        break;
    }

    // Check for collision with wall
    if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize) {
      endGame();
      return;
    }

    // Check for collision with self
    for (let i = 1; i < snake.length; i++) {
      if (head.x === snake[i].x && head.y === snake[i].y) {
        endGame();
        return;
      }
    }

    // Check for food
    if (head.x === foodRef.current.x && head.y === foodRef.current.y) {
      placeFood();
      setScore((prevScore) => prevScore + 1);
    } else {
      snake.pop();
    }

    snake.unshift(head);
    snakeRef.current = snake;

    // Render game
    renderGame(ctx, canvas.width, canvas.height, cellSize);
  };

  const renderGame = (ctx, width, height, cellSize) => {
    // Clear canvas
    ctx.fillStyle = "#1a1a2e";
    ctx.fillRect(0, 0, width, height);

    // Draw snake
    snakeRef.current.forEach((segment, index) => {
      ctx.fillStyle = index === 0 ? "#4CAF50" : "#388E3C";
      ctx.fillRect(
        segment.x * cellSize,
        segment.y * cellSize,
        cellSize,
        cellSize,
      );

      // Draw eyes on head
      if (index === 0) {
        ctx.fillStyle = "white";
        const eyeSize = cellSize / 5;
        const eyePositions = getEyePositions(
          segment,
          cellSize,
          directionRef.current,
        );

        eyePositions.forEach((pos) => {
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, eyeSize, 0, Math.PI * 2);
          ctx.fill();
        });
      }
    });

    // Draw food
    ctx.fillStyle = "#FF5252";
    ctx.beginPath();
    ctx.arc(
      foodRef.current.x * cellSize + cellSize / 2,
      foodRef.current.y * cellSize + cellSize / 2,
      cellSize / 2,
      0,
      Math.PI * 2,
    );
    ctx.fill();

    // Draw score
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "16px Arial";
    ctx.textAlign = "left";
    ctx.fillText(`Score: ${score}`, 10, 20);

    // Draw game over or start screen
    if (!gameStarted || gameOver) {
      drawOverlay(ctx, width, height);
    }
  };

  const getEyePositions = (segment, cellSize, direction) => {
    const positions = [];
    let leftEye, rightEye;

    switch (direction) {
      case "RIGHT":
        leftEye = {
          x: segment.x * cellSize + cellSize * 0.7,
          y: segment.y * cellSize + cellSize * 0.3,
        };
        rightEye = {
          x: segment.x * cellSize + cellSize * 0.7,
          y: segment.y * cellSize + cellSize * 0.7,
        };
        break;
      case "LEFT":
        leftEye = {
          x: segment.x * cellSize + cellSize * 0.3,
          y: segment.y * cellSize + cellSize * 0.3,
        };
        rightEye = {
          x: segment.x * cellSize + cellSize * 0.3,
          y: segment.y * cellSize + cellSize * 0.7,
        };
        break;
      case "UP":
        leftEye = {
          x: segment.x * cellSize + cellSize * 0.3,
          y: segment.y * cellSize + cellSize * 0.3,
        };
        rightEye = {
          x: segment.x * cellSize + cellSize * 0.7,
          y: segment.y * cellSize + cellSize * 0.3,
        };
        break;
      case "DOWN":
        leftEye = {
          x: segment.x * cellSize + cellSize * 0.3,
          y: segment.y * cellSize + cellSize * 0.7,
        };
        rightEye = {
          x: segment.x * cellSize + cellSize * 0.7,
          y: segment.y * cellSize + cellSize * 0.7,
        };
        break;
    }

    positions.push(leftEye, rightEye);
    return positions;
  };

  const drawOverlay = (ctx, width, height) => {
    const middleX = width / 2;
    const middleY = height / 2;

    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = "#FFFFFF";
    ctx.font = "24px Arial";
    ctx.textAlign = "center";

    if (!gameStarted) {
      ctx.fillText("Snake Game", middleX, middleY - 40);
      ctx.font = "16px Arial";
      ctx.fillText("Press Enter or Space to Start", middleX, middleY);
      ctx.fillText("Use Arrow Keys to Move", middleX, middleY + 30);
    } else if (gameOver) {
      ctx.fillText("Game Over", middleX, middleY - 40);
      ctx.fillText(`Score: ${score}`, middleX, middleY);
      ctx.fillText(`High Score: ${highScore}`, middleX, middleY + 30);
      ctx.font = "16px Arial";
      ctx.fillText("Press Enter or Space to Play Again", middleX, middleY + 70);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const cellSize = canvas.width / gridSizeRef.current;

    const handleKeyDown = (e) => {
      if (!gameStarted && (e.key === "Enter" || e.code === "Space")) {
        startGame();
        return;
      }

      if (gameOver && (e.key === "Enter" || e.code === "Space")) {
        resetGame();
        return;
      }

      if (e.key === "ArrowUp" && directionRef.current !== "DOWN") {
        directionRef.current = "UP";
      } else if (e.key === "ArrowDown" && directionRef.current !== "UP") {
        directionRef.current = "DOWN";
      } else if (e.key === "ArrowLeft" && directionRef.current !== "RIGHT") {
        directionRef.current = "LEFT";
      } else if (e.key === "ArrowRight" && directionRef.current !== "LEFT") {
        directionRef.current = "RIGHT";
      }
    };

    renderGame(ctx, canvas.width, canvas.height, cellSize);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      clearInterval(gameLoopRef.current);
    };
  }, [gameStarted, gameOver, score, highScore]);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-gray-900 p-4">
      {!gameStarted ? (
        <div className="text-center">
          <h3 className="mb-4 text-2xl font-bold text-white">Snake Game</h3>
          <p className="mb-6 text-gray-300">
            Use arrow keys to control the snake
          </p>
          <button
            onClick={startGame}
            className="rounded-lg bg-green-600 px-6 py-2 text-white transition-colors hover:bg-green-700"
          >
            Start Game
          </button>
        </div>
      ) : gameOver ? (
        <div className="mb-4 text-center">
          <h3 className="mb-2 text-2xl font-bold text-white">Game Over!</h3>
          <p className="mb-1 text-gray-300">Score: {score}</p>
          <p className="mb-4 text-gray-300">High Score: {highScore}</p>
          <button
            onClick={resetGame}
            className="rounded-lg bg-green-600 px-6 py-2 text-white transition-colors hover:bg-green-700"
          >
            Play Again
          </button>
        </div>
      ) : null}
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        className="rounded-lg border-2 border-green-500 shadow-lg"
      />
    </div>
  );
};

// Main app that contains all games
const GameCollection = () => {
  const [activeGame, setActiveGame] = useState("menu");

  const renderGame = () => {
    switch (activeGame) {
      case "flappy":
        return <FlappyBirdGame />;
      case "memory":
        return <MemoryGame />;
      case "snake":
        return <SnakeGame />;
      default:
        return (
          <div className="flex h-full w-full flex-col items-center justify-center bg-gray-900 p-4">
            <h2 className="mb-8 text-3xl font-bold text-white">
              Mini Game Collection
            </h2>
            <div className="grid w-full max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">
              <GameCard
                title="Flappy Bird"
                description="Navigate through pipes by tapping to fly"
                icon="🐦"
                onClick={() => setActiveGame("flappy")}
              />
              <GameCard
                title="Memory Match"
                description="Find matching pairs of cards"
                icon="🎮"
                onClick={() => setActiveGame("memory")}
              />
              <GameCard
                title="Snake"
                description="Grow your snake by eating food"
                icon="🐍"
                onClick={() => setActiveGame("snake")}
              />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen w-full flex-col bg-gray-900">
      {activeGame !== "menu" && (
        <div className="p-4">
          <button
            onClick={() => setActiveGame("menu")}
            className="rounded-lg bg-gray-700 px-4 py-2 text-white transition-colors hover:bg-gray-600"
          >
            Back to Menu
          </button>
        </div>
      )}
      {renderGame()}
    </div>
  );
};

// Game card component for the menu
const GameCard = ({ title, description, icon, onClick }) => {
  return (
    <div
      className="flex cursor-pointer flex-col items-center justify-center rounded-lg bg-gray-800 p-6 shadow-lg transition-colors hover:bg-gray-700"
      onClick={onClick}
    >
      <span className="mb-4 text-5xl">{icon}</span>
      <h3 className="mb-2 text-xl font-bold text-white">{title}</h3>
      <p className="text-center text-gray-300">{description}</p>
    </div>
  );
};

// Main App component
const App = () => {
  return (
    <div className="h-screen w-full overflow-hidden">
      <GameCollection />
    </div>
  );
};

export default App;
