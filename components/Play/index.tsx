"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import Image from "next/image";

// Game data
const GAMES = [
  {
    id: 1,
    title: "Magic Worlds",
    description:
      "An immersive fantasy adventure with stunning visuals and engaging storyline.",
    platforms: ["windows", "android"],
    genre: ["RPG", "Adventure"],
    size: "32.5 GB",
    rating: 4.9,
    banner: "/images/play/magicworlds.jpg",
    logo: "/images/logo/logo.png",
    trailer: "/videos/about/intro.mp4",
    downloads: 5247823,
    spotlight: true,
    windowsDownload: "https://magicworlds.itch.io/magic-world",
    androidDownload:
      "https://drive.google.com/file/d/141f8EDsJhFywxbtJ0KfJUH8HRarf3P4j/view?usp=drive_link",
  },
];

// Particle system component
const ParticleField = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-blue-500 opacity-30"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            x: [
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth,
            ],
            y: [
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight,
            ],
          }}
          transition={{
            duration: Math.random() * 20 + 20,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            width: `${Math.random() * 6 + 2}px`,
            height: `${Math.random() * 6 + 2}px`,
            filter: `blur(${Math.random() * 2}px)`,
          }}
        />
      ))}
    </div>
  );
};

// Custom button with animations
const Button = ({
  children,
  className = "",
  variant = "primary",
  icon,
  ...props
}) => {
  const controls = useAnimation();

  const variantStyles = {
    primary:
      "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700",
    secondary:
      "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700",
    danger:
      "bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700",
  };

  return (
    <motion.button
      className={`relative overflow-hidden rounded-lg px-6 py-3 font-bold text-white shadow-lg ${variantStyles[variant]} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      onHoverStart={() => {
        controls.start({
          opacity: 0.2,
          scale: 2,
          transition: { duration: 0.5 },
        });
      }}
      onHoverEnd={() => {
        controls.start({
          opacity: 0,
          scale: 0,
          transition: { duration: 0.5 },
        });
      }}
      {...props}
    >
      <motion.span
        className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
        initial={{ opacity: 0, scale: 0 }}
        animate={controls}
      />
      <span className="relative z-10 flex items-center justify-center gap-2">
        {icon && (
          <Image
            src={`/images/play/${icon}.png`}
            alt={icon}
            width={24}
            height={24}
            className="object-cover"
          />
        )}
        {children}
      </span>
    </motion.button>
  );
};

// Game card component with advanced animations
const GameCard = ({ game, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="group relative h-80 w-96 overflow-hidden rounded-2xl bg-gray-900 shadow-2xl"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      whileHover={{
        scale: 1.05,
        transition: { type: "spring", stiffness: 400, damping: 10 },
      }}
      onClick={onClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: isHovered ? 1.1 : 1,
            filter: isHovered
              ? "brightness(0.7) blur(2px)"
              : "brightness(0.5) blur(0px)",
          }}
          transition={{ duration: 0.4 }}
          className="h-full w-full"
        >
          <Image
            src={game.banner}
            alt={game.title}
            fill
            className="object-cover"
          />
        </motion.div>
      </div>

      {/* Game logo */}
      <motion.div
        className="absolute left-4 top-4 h-16 w-48"
        animate={{
          y: isHovered ? -50 : 0,
          opacity: isHovered ? 0 : 1,
        }}
        transition={{ duration: 0.3 }}
      >
        {game.logo && (
          <Image
            src={game.logo}
            alt={`${game.title} logo`}
            fill
            className="object-contain object-left"
          />
        )}
      </motion.div>

      {/* Platforms */}
      <div className="absolute right-4 top-4 flex gap-2">
        {game.platforms.map((platform) => (
          <motion.div
            key={platform}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-black/50 p-1.5"
            whileHover={{ scale: 1.2, backgroundColor: "rgba(0,0,0,0.8)" }}
          >
            <Image
              src={`/images/play/${platform}.png`}
              alt={platform}
              width={20}
              height={20}
            />
          </motion.div>
        ))}
      </div>

      {/* Game info overlay */}
      <motion.div
        className="absolute inset-0 flex flex-col justify-between p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div>
          <motion.h3
            className="mb-2 text-3xl font-bold leading-tight"
            initial={{ y: 20 }}
            animate={{ y: isHovered ? 0 : 20 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {game.title}
          </motion.h3>

          <motion.div
            className="mb-1 flex gap-2"
            initial={{ y: 20 }}
            animate={{ y: isHovered ? 0 : 20 }}
            transition={{ duration: 0.3, delay: 0.15 }}
          >
            {game.genre.map((g) => (
              <span
                key={g}
                className="rounded-full bg-white/10 px-2 py-0.5 text-xs font-medium"
              >
                {g}
              </span>
            ))}
          </motion.div>

          <motion.p
            className="mt-2 text-sm text-gray-300"
            initial={{ y: 20 }}
            animate={{ y: isHovered ? 0 : 20 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            {game.description}
          </motion.p>
        </div>

        <motion.div
          className="flex justify-between"
          initial={{ y: 20 }}
          animate={{ y: isHovered ? 0 : 20 }}
          transition={{ duration: 0.3, delay: 0.25 }}
        >
          <div>
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  className={`h-4 w-4 ${i < Math.floor(game.rating) ? "text-yellow-400" : "text-gray-600"}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="ml-1 text-sm text-gray-300">{game.rating}</span>
            </div>
            <div className="text-xs text-gray-400">
              {(game.downloads / 1000000).toFixed(1)}M+ downloads
            </div>
          </div>

          <div className="text-right text-xs text-gray-400">{game.size}</div>
        </motion.div>
      </motion.div>

      {/* Bottom gradient */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent" />

      {/* Download buttons */}
      <motion.div
        className="absolute bottom-2 right-4 flex gap-2"
        initial={{ y: 20, opacity: 0 }}
        animate={{
          y: isHovered ? 0 : 20,
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        {game.platforms.includes("windows") && (
          <Button
            variant="primary"
            icon="windows"
            className="!px-2 !py-1 text-sm"
          >
            Windows
          </Button>
        )}

        {game.platforms.includes("android") && (
          <Button
            variant="secondary"
            icon="android"
            className="!px-2 !py-1 text-sm"
          >
            Android
          </Button>
        )}
      </motion.div>
    </motion.div>
  );
};

// Featured game component with video background
const FeaturedGame = ({ game, onClose }) => {
  return (
    <motion.div
      className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="relative mx-6 max-h-[90vh] w-full max-w-6xl overflow-hidden rounded-2xl bg-gray-900"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 20 }}
      >
        <button
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-white/20"
          onClick={onClose}
        >
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="flex flex-col lg:flex-row">
          {/* Game trailer/preview */}
          <div className="relative h-80 w-full lg:h-auto lg:w-7/12">
            {game.trailer ? (
              <video autoPlay loop muted className="h-full w-full object-cover">
                <source src={game.trailer} type="video/mp4" />
              </video>
            ) : (
              <div className="relative h-full w-full">
                <Image
                  src={game.banner}
                  alt={game.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent" />
              </div>
            )}

            <motion.div
              className="absolute bottom-0 left-0 p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-4xl font-bold">{game.title}</h2>
              <div className="mt-2 flex gap-2">
                {game.genre.map((g) => (
                  <span
                    key={g}
                    className="rounded-full bg-white/10 px-3 py-1 text-sm font-medium"
                  >
                    {g}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Game details */}
          <div className="flex w-full flex-col justify-between p-6 lg:w-5/12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-lg text-gray-300">{game.description}</p>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-semibold text-gray-400">Size</h4>
                  <p className="text-lg">{game.size}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-400">
                    Rating
                  </h4>
                  <div className="flex items-center">
                    <span className="mr-2 text-lg">{game.rating}</span>
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                          key={i}
                          className={`h-5 w-5 ${i < Math.floor(game.rating) ? "text-yellow-400" : "text-gray-600"}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-400">
                    Downloads
                  </h4>
                  <p className="text-lg">
                    {(game.downloads / 1000000).toFixed(1)}M+
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-400">
                    Platforms
                  </h4>
                  <div className="flex gap-2">
                    {game.platforms.map((platform) => (
                      <div
                        key={platform}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-800 p-1.5"
                      >
                        <Image
                          src={`/images/play/${platform}.png`}
                          alt={platform}
                          width={20}
                          height={20}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="mb-2 text-sm font-semibold text-gray-400">
                  System Requirements
                </h4>
                <div className="rounded-lg bg-black/30 p-4">
                  <div className="mb-2">
                    <span className="font-semibold">OS:</span> Windows 10 64-bit
                  </div>
                  <div className="mb-2">
                    <span className="font-semibold">Processor:</span> Intel Core
                    i5-6600K / AMD Ryzen 5 1600
                  </div>
                  <div className="mb-2">
                    <span className="font-semibold">Memory:</span> 16 GB RAM
                  </div>
                  <div className="mb-2">
                    <span className="font-semibold">Graphics:</span> NVIDIA GTX
                    1060 6GB / AMD Radeon RX 580
                  </div>
                  <div>
                    <span className="font-semibold">Storage:</span> {game.size}{" "}
                    available space
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="mt-8 flex gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {game.platforms.includes("windows") && (
                <a href={game.windowsDownload}>
                  <Button className="flex-1" variant="primary" icon="windows">
                    Download for Windows
                  </Button>
                </a>
              )}

              {game.platforms.includes("android") && (
                <a href={game.androidDownload}>
                  <Button className="flex-1" variant="secondary" icon="android">
                    Download for Android
                  </Button>
                </a>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Main component
const GameDownloads = () => {
  const [filter, setFilter] = useState("all");
  const [selectedGame, setSelectedGame] = useState(null);
  const [spotlight, setSpotlight] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // Auto rotate spotlight games
    const interval = setInterval(() => {
      const spotlightGames = GAMES.filter((game) => game.spotlight);
      setSpotlight((current) => (current + 1) % spotlightGames.length);
    }, 8000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(interval);
    };
  }, []);

  const filteredGames = GAMES.filter((game) => {
    if (filter === "all") return true;
    return game.platforms.includes(filter);
  });

  const spotlightGames = GAMES.filter((game) => game.spotlight);
  const currentSpotlightGame = spotlightGames[spotlight];

  return (
    <div className="font-sans relative min-h-screen bg-[#090818] text-white">
      {/* Animated background */}
      <div
        className="fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, #2c1b5a, #121026, #080818)",
        }}
      />

      <ParticleField />

      {/* Header with parallax effect */}
      <header className="relative h-screen overflow-hidden">
        {/* Parallax stars */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/images/play/star.png')",
            backgroundSize: "cover",
            transform: `translateY(${scrollY * 0.2}px)`,
            opacity: 0.6,
          }}
        />

        {/* Hero content */}
        <div className="container relative z-10 mx-auto flex h-full flex-col items-center justify-center px-4 text-center">
          <motion.h1
            className="mb-6 text-6xl font-black tracking-tight sm:text-7xl md:text-8xl"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, type: "spring" }}
          >
            <span className="block bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              MAGIC WORLDS
            </span>
            <span className="mt-2 block text-5xl font-bold sm:text-6xl md:text-7xl">
              AWAIT YOU
            </span>
          </motion.h1>

          <motion.p
            className="mb-8 max-w-2xl text-lg text-gray-300 sm:text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Download the latest and greatest games optimized for your device.
            Experience stunning graphics and immersive gameplay.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <Button
              className="!px-8 !py-4 text-lg"
              onClick={() => {
                document.getElementById("games-section").scrollIntoView({
                  behavior: "smooth",
                });
              }}
            >
              Explore Games
            </Button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
            animate={{
              y: [0, 10, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
            }}
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 5L12 19M12 19L6 13M12 19L18 13"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </div>

        {/* Spotlight game background */}
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 1.5 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSpotlightGame.id}
              className="relative h-full w-full"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
            >
              <Image
                src={currentSpotlightGame.banner}
                alt="Background"
                fill
                className="object-cover object-center"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#090818]" />
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </header>

      {/* Games section */}
      <section id="games-section" className="relative pb-24 pt-12">
        <div className="container mx-auto px-4">
          <motion.div
            className="mb-12 flex flex-col items-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-4 text-4xl font-bold">Game Library</h2>
            <div className="h-1 w-24 rounded-full bg-purple-600" />
          </motion.div>

          {/* Filter tabs */}
          <motion.div
            className="mb-12 flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {["all", "windows", "android"].map((platform) => (
              <motion.button
                key={platform}
                className={`relative rounded-full px-6 py-2 font-medium uppercase tracking-wide ${
                  filter === platform
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter(platform)}
              >
                {platform === "all" ? "All Games" : platform}

                {platform !== "all" && (
                  <div className="absolute -left-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-xs font-bold">
                    {
                      GAMES.filter((game) => game.platforms.includes(platform))
                        .length
                    }
                  </div>
                )}
              </motion.button>
            ))}
          </motion.div>

          {/* Games grid */}
          <motion.div
            className="flex flex-wrap justify-center gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <AnimatePresence>
              {filteredGames.map((game, index) => (
                <motion.div
                  key={game.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <GameCard game={game} onClick={() => setSelectedGame(game)} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Featured game modal */}
      {/* Featured game modal */}
      <AnimatePresence>
        {selectedGame && (
          <FeaturedGame
            game={selectedGame}
            onClose={() => setSelectedGame(null)}
          />
        )}
      </AnimatePresence>

      {/* Features section */}
      <section className="relative py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="mb-16 flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-4 text-4xl font-bold">
              Premium Gaming Experience
            </h2>
            <p className="max-w-2xl text-lg text-gray-300">
              Our platform ensures the best gaming experience with optimized
              downloads, regular updates, and exclusive content.
            </p>
            <div className="mt-4 h-1 w-24 rounded-full bg-purple-600" />
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: "lightning",
                title: "Lightning Fast Downloads",
                description:
                  "Our optimized servers ensure you get the fastest possible download speeds for all games.",
              },
              {
                icon: "shield",
                title: "Secure & Verified",
                description:
                  "All games are scanned and verified to be free from malware and other security threats.",
              },
              {
                icon: "devices",
                title: "Multi-Platform Support",
                description:
                  "Play your favorite games across Windows and Android devices with cross-platform progress.",
              },
              {
                icon: "updates",
                title: "Automatic Updates",
                description:
                  "Get the latest patches and updates automatically to keep your games running smoothly.",
              },
              {
                icon: "community",
                title: "Active Community",
                description:
                  "Join thousands of players in our community forums to share tips and strategies.",
              },
              {
                icon: "exclusive",
                title: "Exclusive Content",
                description:
                  "Access exclusive in-game items and DLCs only available through our platform.",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                className="rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-6 backdrop-blur-sm"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{
                  y: -10,
                  boxShadow:
                    "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  background:
                    "linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))",
                }}
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
                  <Image
                    src={`/images/play/${feature.icon}.png`}
                    alt={feature.title}
                    width={28}
                    height={28}
                  />
                </div>
                <h3 className="mb-2 text-xl font-bold">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Download stats */}
      <section className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent" />
        <div className="container mx-auto px-4">
          <div className="grid gap-8 text-center md:grid-cols-4">
            {[
              { value: "15M+", label: "Downloads" },
              { value: "500+", label: "Games" },
              { value: "2.5M+", label: "Active Users" },
              { value: "99.9%", label: "Uptime" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="rounded-lg bg-gray-800/30 p-6 backdrop-blur-sm"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <motion.div
                  className="text-4xl font-bold text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, #60a5fa, #a78bfa)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                >
                  {stat.value}
                </motion.div>
                <motion.div
                  className="text-gray-400"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                >
                  {stat.label}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="relative py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-900/40 to-purple-900/40 p-12 backdrop-blur-md"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-white opacity-10"
                  initial={{
                    x: Math.random() * 100 - 50 + "%",
                    y: Math.random() * 100 - 50 + "%",
                    scale: Math.random() * 0.5 + 0.5,
                  }}
                  animate={{
                    x: [
                      Math.random() * 100 - 50 + "%",
                      Math.random() * 100 - 50 + "%",
                    ],
                    y: [
                      Math.random() * 100 - 50 + "%",
                      Math.random() * 100 - 50 + "%",
                    ],
                  }}
                  transition={{
                    duration: Math.random() * 10 + 10,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{
                    width: `${Math.random() * 300 + 50}px`,
                    height: `${Math.random() * 300 + 50}px`,
                    filter: `blur(${Math.random() * 50 + 50}px)`,
                  }}
                />
              ))}
            </div>

            <div className="relative z-10 flex flex-col items-center justify-between gap-8 text-center lg:flex-row lg:text-left">
              <div>
                <motion.h2
                  className="mb-2 text-3xl font-bold sm:text-4xl"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  Start Your Gaming Journey Today
                </motion.h2>
                <motion.p
                  className="text-xl text-gray-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  Create an account to unlock exclusive features and keep track
                  of your games.
                </motion.p>
              </div>

              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Button
                  className="!px-8 !py-3 text-lg"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 20px rgba(167, 139, 250, 0.5)",
                  }}
                >
                  Sign Up Free
                </Button>
                <Button
                  className="border-2 border-white/20 bg-transparent !px-8 !py-3 text-lg hover:bg-white/10"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 20px rgba(255, 255, 255, 0.2)",
                  }}
                >
                  Learn More
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default GameDownloads;
