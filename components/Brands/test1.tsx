"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// Define the Brand type
type Brand = {
  id: number;
  name: string;
  image: string;
  imageLight: string;
  href: string;
  category: "game" | "affiliate" | "engine";
  featured: boolean;
};

// Updated brand data with focus on affiliate marketing and select game partners
const partnerBrands: Brand[] = [
  {
    id: 1,
    name: "Unity",
    image: "/images/brands/unity-dark.png",
    imageLight: "/images/brands/unity-light.png",
    href: "https://unity.com",
    category: "engine",
    featured: true,
  },
  {
    id: 2,
    name: "Amazon Associates",
    image: "/images/brands/amazon-associates-dark.png",
    imageLight: "/images/brands/amazon-associates-light.png",
    href: "https://affiliate-program.amazon.com",
    category: "affiliate",
    featured: true,
  },
  {
    id: 3,
    name: "G2A",
    image: "/images/brands/g2a-dark.png",
    imageLight: "/images/brands/g2a-light.png",
    href: "https://www.g2a.com/goldmine",
    category: "affiliate",
    featured: true,
  },
  {
    id: 4,
    name: "Razer Affiliate",
    image: "/images/brands/razer-dark.png",
    imageLight: "/images/brands/razer-light.png",
    href: "https://www.razer.com/affiliate",
    category: "affiliate",
    featured: false,
  },
  {
    id: 5,
    name: "Blizzard",
    image: "/images/brands/blizzard-dark.png",
    imageLight: "/images/brands/blizzard-light.png",
    href: "https://www.blizzard.com",
    category: "game",
    featured: true,
  },
  {
    id: 6,
    name: "Twitch Affiliate",
    image: "/images/brands/twitch-dark.png",
    imageLight: "/images/brands/twitch-light.png",
    href: "https://affiliate.twitch.tv",
    category: "affiliate",
    featured: true,
  },
  {
    id: 7,
    name: "EA Games",
    image: "/images/brands/ea-dark.png",
    imageLight: "/images/brands/ea-light.png",
    href: "https://www.ea.com",
    category: "game",
    featured: false,
  },
  {
    id: 8,
    name: "Impact",
    image: "/images/brands/impact-dark.png",
    imageLight: "/images/brands/impact-light.png",
    href: "https://www.impact.com",
    category: "affiliate",
    featured: false,
  },
  {
    id: 9,
    name: "Riot Games",
    image: "/images/brands/riot-dark.png",
    imageLight: "/images/brands/riot-light.png",
    href: "https://www.riotgames.com",
    category: "game",
    featured: false,
  },
  {
    id: 10,
    name: "Godot Engine",
    image: "/images/brands/godot-dark.png",
    imageLight: "/images/brands/godot-light.png",
    href: "https://godotengine.org",
    category: "engine",
    featured: false,
  },
  {
    id: 11,
    name: "Epic Games",
    image: "/images/brands/epic-dark.png",
    imageLight: "/images/brands/epic-light.png",
    href: "https://www.epicgames.com",
    category: "game",
    featured: false,
  },
  {
    id: 12,
    name: "Unreal Engine",
    image: "/images/brands/unreal-dark.png",
    imageLight: "/images/brands/unreal-light.png",
    href: "https://www.unrealengine.com",
    category: "engine",
    featured: false,
  },
  {
    id: 13,
    name: "Aniverse Studio",
    image: "/images/brands/aniverse-dark.png",
    imageLight: "/images/brands/aniverse-light.png",
    href: "http://moyasiginko.vercel.app/",
    category: "game",
    featured: false,
  },
];

// Individual Brand Component with enhanced animations
const PartnerBrand = ({ brand, index }: { brand: Brand; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Calculate custom values for each brand to create variety
  const pulseDelay = index * 0.3;
  const rotateValue = index % 2 === 0 ? 5 : -5;
  const scaleValue = brand.featured ? 1.25 : 1.1;

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
      }}
    >
      <motion.a
        href={brand.href}
        className="relative block h-16 w-36 cursor-pointer overflow-hidden rounded-lg bg-gradient-to-br from-gray-900/20 to-gray-900/5 p-1 backdrop-blur-sm transition-all dark:from-gray-100/10 dark:to-gray-100/5"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{
          scale: scaleValue,
          rotate: rotateValue,
          boxShadow: "0px 0px 8px rgba(120, 100, 250, 0.6)",
        }}
      >
        <div className="relative flex h-full w-full items-center justify-center">
          {/* Regular image */}
          <div className="relative h-12 w-full">
            <Image
              className="transition-all duration-300 dark:hidden"
              src={brand.image}
              alt={brand.name}
              fill
              style={{ objectFit: "contain" }}
            />
            <Image
              className="hidden transition-all duration-300 dark:block"
              src={brand.imageLight}
              alt={brand.name}
              fill
              style={{ objectFit: "contain" }}
            />
          </div>

          {/* Hover effects */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className="absolute inset-0 rounded-lg bg-gradient-to-r from-indigo-500/30 via-purple-500/30 to-pink-500/30"
                  animate={{
                    background: [
                      "linear-gradient(90deg, rgba(99,102,241,0.3) 0%, rgba(168,85,247,0.3) 50%, rgba(236,72,153,0.3) 100%)",
                      "linear-gradient(90deg, rgba(236,72,153,0.3) 0%, rgba(99,102,241,0.3) 50%, rgba(168,85,247,0.3) 100%)",
                      "linear-gradient(90deg, rgba(168,85,247,0.3) 0%, rgba(236,72,153,0.3) 50%, rgba(99,102,241,0.3) 100%)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Pulse effect for featured brands */}
        {brand.featured && (
          <motion.div
            className="absolute -inset-1 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 blur-md"
            animate={{
              opacity: [0, 0.3, 0],
              scale: [0.95, 1.05, 0.95],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: pulseDelay,
            }}
          />
        )}
      </motion.a>

      {/* Brand name tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="absolute -bottom-8 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full bg-black/80 px-3 py-1 text-xs font-medium text-white"
          >
            {brand.name}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Filter controls component
const BrandFilters = ({
  activeFilter,
  setActiveFilter,
}: {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
}) => {
  const filters = [
    { id: "all", label: "All Partners" },
    { id: "affiliate", label: "Affiliate Partners" },
    { id: "game", label: "Game Studios" },
    { id: "engine", label: "Game Engines" },
  ];

  return (
    <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
      {filters.map((filter) => (
        <motion.button
          key={filter.id}
          onClick={() => setActiveFilter(filter.id)}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
            activeFilter === filter.id
              ? "bg-indigo-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {filter.label}
        </motion.button>
      ))}
    </div>
  );
};

// Main Brands Component
const Brands = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [filteredBrands, setFilteredBrands] = useState(partnerBrands);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Filter brands based on active filter
  useEffect(() => {
    if (activeFilter === "all") {
      setFilteredBrands(partnerBrands);
    } else {
      setFilteredBrands(
        partnerBrands.filter((brand) => brand.category === activeFilter),
      );
    }

    // Brief delay before showing brands for smoother transitions
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, [activeFilter]);

  // Track mouse position for interactive background effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative overflow-hidden py-16 ">
      {/* New advanced animated background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Gradient mesh background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 opacity-80 dark:from-gray-950 dark:via-gray-900 dark:to-black" />

        {/* Animated color orbs */}
        <motion.div
          className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-gradient-to-r from-blue-400/20 to-purple-500/20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, -30, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        <motion.div
          className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-gradient-to-r from-green-400/20 to-teal-500/20 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, 40, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 2,
          }}
        />

        <motion.div
          className="absolute -left-40 bottom-1/3 h-72 w-72 rounded-full bg-gradient-to-r from-amber-400/15 to-rose-500/15 blur-3xl"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.1, 0.3, 0.1],
            x: [0, 60, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 5,
          }}
        />

        {/* Interactive focus point that follows mouse */}
        <motion.div
          className="absolute h-40 w-40 rounded-full bg-indigo-500/10 blur-3xl"
          animate={{
            x: mousePosition.x - 80,
            y: mousePosition.y - 80,
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            x: { type: "spring", stiffness: 50, damping: 20 },
            y: { type: "spring", stiffness: 50, damping: 20 },
            default: { duration: 3, repeat: Infinity },
          }}
        />

        {/* Animated grid patterns */}
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.03] dark:opacity-[0.02]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="grid-pattern"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>

        {/* Animated floating particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-2 w-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 opacity-30"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              x: [0, Math.random() * 100 - 50],
              scale: [0.5, Math.random() + 0.8, 0.5],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: Math.random() * 20 + 15,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}

        {/* Pulsing rings effect */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border border-emerald-500/10 dark:border-emerald-400/5"
              style={{
                width: `${(i + 1) * 20}vw`,
                height: `${(i + 1) * 20}vw`,
                x: "-50%",
                y: "-50%",
              }}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                delay: i * 2,
              }}
            />
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 md:px-8 2xl:px-0">
        {/* Section header with animated underline */}
        <div className="mb-12 text-center">
          <motion.h2
            className="mb-3 text-3xl font-bold text-gray-900 dark:text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Our Partners & Affiliates
          </motion.h2>

          <motion.div
            className="mx-auto h-1 w-16 rounded-full bg-gradient-to-r from-green-500 via-emerald-500 to-blue-500"
            initial={{ width: 0 }}
            animate={{ width: 64 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />

          <motion.p
            className="mx-auto mt-4 max-w-2xl text-gray-600 dark:text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Maximize your gaming experience with our trusted affiliate partners
            and game studios
          </motion.p>
        </div>

        {/* Filter controls */}
        <BrandFilters
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />

        {/* Brands grid with staggered animations */}
        <motion.div
          className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:gap-8 lg:grid-cols-4 lg:gap-10 xl:grid-cols-5"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          initial="hidden"
          animate={isVisible ? "show" : "hidden"}
        >
          <AnimatePresence>
            {filteredBrands.map((brand, index) => (
              <PartnerBrand key={brand.id} brand={brand} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Brands;
