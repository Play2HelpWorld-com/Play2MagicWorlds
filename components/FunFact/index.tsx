"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const FunFact = () => {
  // Animated counter hook
  const useCounter = (end, duration = 2000) => {
    const [count, setCount] = useState(0);
    const increment = end / (duration / 50);

    useEffect(() => {
      let timer;
      let current = 0;

      const updateCounter = () => {
        current += increment;
        if (current >= end) {
          current = end;
          clearInterval(timer);
        }
        setCount(Math.floor(current));
      };

      timer = setInterval(updateCounter, 50);
      return () => clearInterval(timer);
    }, [end, increment]);

    return count;
  };

  // Counters for stats
  const usersCount = useCounter(15000);
  const communityCount = useCounter(2500000);
  const gamesCount = useCounter(25);
  const donationsCount = useCounter(500000);

  // Particles for background effect
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 30; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 10 + 2,
          speed: Math.random() * 0.2 + 0.1,
          opacity: Math.random() * 0.5 + 0.1,
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
  }, []);

  return (
    <>
      {/* Gaming Fun Facts Section */}
      <section className="relative overflow-hidden px-4 py-24 md:px-8 lg:py-28 2xl:px-0">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-purple-900 via-blue-900 to-black opacity-90">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute rounded-full bg-blue-400"
              initial={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                opacity: particle.opacity,
              }}
              animate={{
                top: [
                  `${particle.y}%`,
                  `${(particle.y + 10) % 100}%`,
                  `${particle.y}%`,
                ],
                opacity: [
                  particle.opacity,
                  particle.opacity + 0.2,
                  particle.opacity,
                ],
              }}
              transition={{
                duration: 10 / particle.speed,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>

        {/* Game Console Border */}
        <div className="relative z-10 mx-auto max-w-6xl rounded-2xl border-4 border-indigo-500 bg-gradient-to-b from-gray-900 to-indigo-950 shadow-[0_0_50px_rgba(99,102,241,0.5)]">
          {/* Console Details */}
          <div className="absolute -top-3 left-1/2 z-20 flex h-6 w-32 -translate-x-1/2 transform items-center justify-center rounded-lg border-2 border-indigo-500 bg-gray-800">
            <div className="mx-1 h-2 w-2 animate-pulse rounded-full bg-red-500"></div>
            <div
              className="mx-1 h-2 w-2 animate-pulse rounded-full bg-green-500"
              style={{ animationDelay: "0.3s" }}
            ></div>
            <div
              className="mx-1 h-2 w-2 animate-pulse rounded-full bg-blue-500"
              style={{ animationDelay: "0.6s" }}
            ></div>
          </div>

          <div className="absolute right-0 top-0 h-16 w-16 overflow-hidden">
            <div className="absolute right-0 top-0 h-20 w-20 -translate-y-10 translate-x-10 rotate-45 transform bg-indigo-600"></div>
          </div>

          <div className="absolute bottom-0 left-0 h-16 w-16 overflow-hidden">
            <div className="absolute bottom-0 left-0 h-20 w-20 -translate-x-10 translate-y-10 rotate-45 transform bg-indigo-600"></div>
          </div>

          {/* Content Container */}
          <div className="px-8 py-16 md:px-12 lg:py-20">
            {/* Retro Screen Scan Effect */}
            <div className="animate-scanline absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/10 to-transparent opacity-30"></div>

            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                type: "spring",
                stiffness: 100,
              }}
              className="relative mx-auto mb-16 text-center"
            >
              <h2 className="mb-6 bg-gradient-to-r from-indigo-400 via-purple-300 to-indigo-400 bg-clip-text text-4xl font-black text-transparent md:text-5xl">
                <span className="inline-block">GAME</span>
                <span className="ml-3 inline-block -skew-x-12 transform bg-gradient-to-r from-pink-600 to-purple-600 px-4 py-1 text-white">
                  STATS
                </span>
              </h2>
              <p className="mx-auto max-w-3xl text-lg leading-relaxed text-indigo-100">
                We are a revolutionary gaming platform that combines the thrill
                of gaming with the joy of making a difference. Play your
                favorite games and automatically contribute to life-changing
                charitable causes around the world.
              </p>

              {/* Animated Pixel Underline */}
              <motion.div
                className="mx-auto mt-6 h-1 w-24 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                initial={{ width: 0 }}
                animate={{ width: "6rem" }}
                transition={{ duration: 1.5, delay: 0.5 }}
              />
            </motion.div>

            {/* Stats Grid */}
            <div className="relative grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {/* Gamer Silhouettes */}
              <Image
                width={200}
                height={200}
                src="/images/shape/shape-04.png"
                alt="Gamer Silhouette"
                className="absolute -left-12 -top-20 z-0 hidden opacity-20 lg:block"
              />

              {/* User Stats Card */}
              <StatsCard
                icon="👾"
                count={usersCount.toLocaleString()}
                label="Active Gamers"
                color="from-blue-600 to-indigo-700"
                delay={0.1}
              />

              {/* Community Stats Card */}
              <StatsCard
                icon="🌐"
                count={`${(communityCount / 1000000).toFixed(1)}M+`}
                label="Community Members"
                color="from-purple-600 to-indigo-700"
                delay={0.3}
              />

              {/* Games Stats Card */}
              <StatsCard
                icon="🎮"
                count={gamesCount}
                label="Epic Games"
                color="from-pink-600 to-purple-700"
                delay={0.5}
              />

              {/* Donations Stats Card */}
              <StatsCard
                icon="💰"
                count={`$${(donationsCount / 1000).toFixed(0)}K`}
                label="Donations Generated"
                color="from-indigo-600 to-blue-700"
                delay={0.7}
              />
            </div>

            {/* Animated Achievement Banner */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.5 }}
              className="mt-16 flex items-center justify-center rounded-lg border border-indigo-500/30 bg-gradient-to-r from-indigo-900/50 to-purple-900/50 p-4"
            >
              <div className="flex items-center space-x-3">
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ duration: 1, repeat: Infinity, repeatDelay: 5 }}
                  className="text-3xl"
                >
                  🏆
                </motion.div>
                <p className="text-lg font-medium text-indigo-100">
                  <span className="bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text font-bold text-transparent">
                    ACHIEVEMENT UNLOCKED:
                  </span>{" "}
                  Join our community today and level up your impact!
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Controller Button Decorations */}
        <div className="absolute bottom-5 right-10 z-10 hidden opacity-40 lg:block">
          <div className="flex space-x-2">
            <div className="h-5 w-5 rounded-full bg-blue-500"></div>
            <div className="h-5 w-5 rounded-full bg-red-500"></div>
            <div className="h-5 w-5 rounded-full bg-green-500"></div>
            <div className="h-5 w-5 rounded-full bg-yellow-500"></div>
          </div>
        </div>
      </section>
    </>
  );
};

// Stats Card Component
const StatsCard = ({ icon, count, label, color, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay }}
      whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
      className={`relative bg-gradient-to-br ${color} group overflow-hidden rounded-xl p-6`}
    >
      {/* Hexagon patterns */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute h-16 w-16 rotate-45 rounded-lg bg-white/10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.05 + Math.random() * 0.1,
            }}
          />
        ))}
      </div>

      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-white/0 to-white/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Icon */}
      <div className="mb-3 text-4xl">{icon}</div>

      {/* Count */}
      <h3 className="mb-1 text-4xl font-black text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
        {count}
      </h3>

      {/* Label */}
      <p className="text-lg text-indigo-100">{label}</p>

      {/* Animated border */}
      <motion.div
        className="absolute bottom-0 left-0 h-1 bg-white/30"
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: 1.5, delay: delay + 0.5 }}
      />
    </motion.div>
  );
};

export default FunFact;
