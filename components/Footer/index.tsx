"use client";
import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import Image from "next/image";

const Footer = () => {
  // Refs for intersection observer
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: false, amount: 0.1 });
  const controls = useAnimation();

  // Animation effect for the footer
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  // Particle system setup
  useEffect(() => {
    const canvas = document.getElementById(
      "footer-particles",
    ) as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Resize canvas
    const resizeCanvas = () => {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;
      }
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Particle properties
    const particles: {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      alpha: number;
    }[] = [];

    // Create particles
    const createParticles = () => {
      const particleCount = Math.floor(canvas.width / 10);

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          color: getRandomColor(),
          alpha: Math.random() * 0.5 + 0.1,
        });
      }
    };

    // Get random gaming-themed color
    const getRandomColor = () => {
      const colors = ["#00ff99", "#ff00cc", "#00ccff", "#ffcc00", "#ff3366"];
      return colors[Math.floor(Math.random() * colors.length)];
    };

    // Animate particles
    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Update position
        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap around edges
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      }

      requestAnimationFrame(animateParticles);
    };

    createParticles();
    animateParticles();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const logoVariants = {
    hidden: { scale: 0.8, opacity: 0, rotateY: 90 },
    visible: {
      scale: 1,
      opacity: 1,
      rotateY: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: [0, 0.5, 0.2],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse" as const,
      },
    },
  };

  const pulseVariants = {
    hidden: { scale: 1 },
    visible: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse" as const,
      },
    },
  };

  const socialIconVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
    },
    hover: {
      scale: 1.2,
      rotate: [0, 10, -10, 0],
      filter: "brightness(1.2)",
      transition: { duration: 0.3 },
    },
  };

  return (
    <footer
      ref={footerRef}
      className="from-gamingDark border-gaming/30 relative overflow-hidden border-t bg-gradient-to-br to-black"
    >
      {/* Particle canvas */}
      <canvas
        id="footer-particles"
        className="pointer-events-none absolute inset-0 opacity-30"
      ></canvas>

      {/* Grid background effect */}
      <motion.div
        variants={gridVariants}
        initial="hidden"
        animate="visible"
        className="absolute inset-0 bg-[url('/images/gaming/grid.svg')] bg-repeat opacity-10"
      ></motion.div>

      {/* Main content container */}
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* Footer Top */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="border-gaming/20 border-b py-16 lg:py-20"
        >
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
            {/* Logo & About Column */}
            <motion.div variants={itemVariants} className="space-y-6">
              <motion.div
                variants={logoVariants}
                className="relative mx-auto h-40 w-40 md:mx-0"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image
                    width={120}
                    height={120}
                    src="/images/logo/logo.png"
                    alt="Game Logo"
                    className="z-10"
                  />
                </div>

                {/* Glowing effect behind logo */}
                <motion.div
                  variants={pulseVariants}
                  initial="hidden"
                  animate="visible"
                  className="bg-gaming/20 absolute inset-0 rounded-full blur-lg"
                ></motion.div>

                {/* Rotating border */}
                <motion.div
                  className="border-gaming/50 absolute inset-0 rounded-full border-2"
                  animate={{
                    rotate: [0, 360],
                    borderColor: [
                      "rgba(0,255,153,0.5)",
                      "rgba(255,0,204,0.5)",
                      "rgba(0,255,153,0.5)",
                    ],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                ></motion.div>
              </motion.div>

              <motion.p
                variants={itemVariants}
                className="text-center leading-relaxed text-gray-300 md:text-left"
              >
                Magic Worlds – Play games, support charities, and make a real
                impact! 🎮✨
              </motion.p>

              <motion.div variants={itemVariants} className="space-y-2">
                <p className="text-gaming text-sm font-bold uppercase tracking-wider">
                  Contact
                </p>
                <a
                  href="mailto:magicworldsonline2025@gmail.com"
                  className="hover:text-gaming inline-block text-white transition-colors duration-300"
                >
                  magicworldsonline2025@gmail.com
                </a>
              </motion.div>
            </motion.div>

            {/* Navigation Columns */}
            {[
              {
                title: "Quick Links",
                links: [
                  { name: "Home", url: "/" },
                  { name: "Download", url: "/play" },
                  { name: "Gameplays", url: "/worlds" },
                  { name: "About", url: "/docs" },
                  { name: "Contact", url: "/support" },
                ],
              },
              {
                title: "Support",
                links: [
                  {
                    name: "Customer Service",
                    url: "https://www.facebook.com/MagikWorlds",
                  },
                  {
                    name: "Teams",
                    url: "https://www.linkedin.com/company/magic-worlds",
                  },
                  { name: "FAQs", url: "#" },
                  { name: "About", url: "/docs" },
                  {
                    name: "Check Updates",
                    url: "https://github.com/orgs/TheMagicWorlds",
                  },
                ],
              },
              {
                title: "Resources",
                links: [
                  {
                    name: "Code",
                    url: "https://github.com/orgs/TheMagicWorlds",
                  },
                  {
                    name: "Apps",
                    url: "https://magicworlds.itch.io/magic-world",
                  },
                  {
                    name: "News",
                    url: "https://x.com/magicworlds3",
                  },
                  {
                    name: "TV",
                    url: "https://youtube.com/@magicworldstv?si=FHtkbuWJh5aYKmQy",
                  },
                  {
                    name: "White Papers",
                    url: "https://helix-labs-gmbh.notion.site/Magic-Worlds-Layer-2-Whitepaper-1adf1e88252580baa4e9cb08def48ba7?pvs=4",
                  },
                ],
              },
            ].map((column, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="space-y-6"
              >
                <motion.h4
                  variants={itemVariants}
                  className="relative inline-block text-xl font-bold text-white"
                >
                  {column.title}
                  <motion.span
                    className="bg-gaming absolute -bottom-1 left-0 h-1"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 1 + idx * 0.2, duration: 0.8 }}
                  ></motion.span>
                </motion.h4>

                <motion.ul variants={containerVariants} className="space-y-3">
                  {column.links.map((link, linkIdx) => (
                    <motion.li
                      key={linkIdx}
                      variants={{
                        hidden: { x: -20, opacity: 0 },
                        visible: {
                          x: 0,
                          opacity: 1,
                          transition: { delay: 0.5 + linkIdx * 0.1 },
                        },
                      }}
                    >
                      <motion.a
                        href={link.url}
                        className="hover:text-gaming group relative flex items-center text-gray-400"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <motion.span
                          className="bg-gaming absolute left-0 h-full w-0 opacity-0 group-hover:w-full group-hover:opacity-10"
                          transition={{ duration: 0.2 }}
                        ></motion.span>

                        <motion.span
                          className="mr-2 hidden group-hover:inline-block"
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: "auto" }}
                        >
                          &gt;
                        </motion.span>

                        {link.name}
                      </motion.a>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Footer Bottom */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="flex flex-col gap-6 py-6 md:flex-row md:items-center md:justify-between"
        >
          {/* Language & Policies */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-6"
          >
            <a
              href="#"
              className="hover:text-gaming group relative text-gray-400 transition-colors"
            >
              <span className="bg-gaming absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 transform transition-transform group-hover:scale-x-100"></span>
              English
            </a>
            <a
              href="#"
              className="hover:text-gaming group relative text-gray-400 transition-colors"
            >
              <span className="bg-gaming absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 transform transition-transform group-hover:scale-x-100"></span>
              Privacy Policy
            </a>
            <a
              href="#"
              className="hover:text-gaming group relative text-gray-400 transition-colors"
            >
              <span className="bg-gaming absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 transform transition-transform group-hover:scale-x-100"></span>
              Terms of Service
            </a>
          </motion.div>

          {/* Copyright */}
          <motion.div variants={itemVariants}>
            <motion.p
              className="flex items-center text-gray-400"
              whileHover={{ color: "#00ff99" }}
            >
              <span className="text-gaming mr-2">&copy;</span>
              <motion.span
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {new Date().getFullYear()} MagicWorlds
              </motion.span>
              <motion.span
                className="bg-gaming/10 border-gaming/30 ml-2 inline-block rounded border px-2 py-1 text-xs"
                animate={{
                  boxShadow: [
                    "0 0 0 rgba(0,255,153,0)",
                    "0 0 10px rgba(0,255,153,0.5)",
                    "0 0 0 rgba(0,255,153,0)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                v1.0.1
              </motion.span>
            </motion.p>
          </motion.div>

          {/* Social Icons */}
          <motion.div variants={itemVariants}>
            <motion.ul className="flex items-center gap-4">
              {[
                {
                  icon: (
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M14 13.5H16.5L17.5 9.5H14V7.5C14 6.47 14 5.5 16 5.5H17.5V2.14C17.174 2.097 15.943 2 14.643 2C11.928 2 10 3.657 10 6.7V9.5H7V13.5H10V22H14V13.5Z" />
                    </svg>
                  ),
                  url: "https://www.facebook.com/MagikWorlds",
                  hoverColor: "#4267B2",
                  delay: 0.1,
                },
                {
                  icon: (
                    <svg
                      width="24"
                      height="24"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.317 4.369A19.933 19.933 0 0 0 15.723 3c-.218.39-.412.79-.586 1.197a18.47 18.47 0 0 0-5.274 0 12.676 12.676 0 0 0-.588-1.197 19.84 19.84 0 0 0-4.592 1.369C1.79 8.478 1.041 12.5 1.411 16.457a19.902 19.902 0 0 0 6.11 3.107 14.422 14.422 0 0 0 1.248-2.107 12.63 12.63 0 0 1-1.979-.948c.166-.119.327-.244.482-.375a9.06 9.06 0 0 0 8.456 0c.155.13.316.256.482.375a12.5 12.5 0 0 1-1.979.948c.37.73.8 1.422 1.248 2.107a19.92 19.92 0 0 0 6.11-3.107c.39-3.985-.378-7.978-3.084-12.088zM9.75 14.988c-.988 0-1.795-.895-1.795-1.993 0-1.098.8-1.993 1.795-1.993 1 0 1.805.898 1.795 1.993.005 1.098-.8 1.993-1.795 1.993zm4.5 0c-.988 0-1.795-.895-1.795-1.993 0-1.098.8-1.993 1.795-1.993 1 0 1.805.898 1.795 1.993.005 1.098-.8 1.993-1.795 1.993z" />
                    </svg>
                  ),
                  url: "https://discord.com/invite/NcNSaTVNdn",
                  hoverColor: "#7289DA",
                  delay: 0.2,
                },
                {
                  icon: (
                    <svg
                      width="24"
                      height="24"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M22 12.99c0-4.907-4.045-8.99-9-8.99s-9 4.083-9 8.99c0 3.965 2.597 7.283 6.187 8.515.454.09.613-.203.613-.442 0-.216-.008-.79-.012-1.55-2.51.553-3.043-.923-3.243-1.77-.101-.29-.535-1.77-.914-2.13-.312-.287-.758-.986-.012-1.007.703-.02 1.207.648 1.377.915.803 1.344 2.084.96 2.588.732.08-.592.314-.96.57-1.182-2.228-.253-4.567-1.114-4.567-4.95 0-1.092.39-1.99 1.027-2.69-.103-.253-.447-1.267.098-2.643 0 0 .84-.267 2.75 1.023.797-.223 1.65-.335 2.5-.34.85.005 1.703.117 2.5.34 1.91-1.29 2.75-1.023 2.75-1.023.545 1.376.2 2.39.098 2.643.637.7 1.027 1.598 1.027 2.69 0 3.846-2.34 4.69-4.567 4.95.323.28.61.835.61 1.682 0 1.22-.012 2.2-.012 2.5 0 .24.158.533.617.442C19.402 20.273 22 16.955 22 12.99z" />
                    </svg>
                  ),
                  url: "https://www.reddit.com/user/MagicWorlds_/",
                  hoverColor: "#FF4500",
                  delay: 0.25,
                },
                {
                  icon: (
                    <svg
                      width="24"
                      height="24"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 4V15.302C20.121 14.896 19.244 14.822 18.389 15.064C17.535 15.306 16.818 15.882 16.31 16.673C15.729 17.515 15.502 18.538 15.669 19.545C15.836 20.553 16.386 21.469 17.227 22.048C18.068 22.628 19.136 22.827 20.165 22.601C21.195 22.375 22.104 21.743 22.659 20.84C23.214 19.937 23.369 18.844 23.095 17.815C22.822 16.787 22.141 15.904 21.202 15.342V4H18.5V12.968L9.5 9.5V4H7V15.302C6.121 14.896 5.244 14.822 4.389 15.064C3.535 15.306 2.818 15.882 2.31 16.673C1.729 17.515 1.502 18.538 1.669 19.545C1.836 20.553 2.386 21.469 3.227 22.048C4.068 22.628 5.136 22.827 6.165 22.601C7.195 22.375 8.104 21.743 8.659 20.84C9.214 19.937 9.369 18.844 9.095 17.815C8.822 16.787 8.141 15.904 7.202 15.342V6.264L18.5 10.86V4H21Z" />
                    </svg>
                  ),
                  url: "https://www.twitch.tv/magicworldsonline",
                  hoverColor: "#9146FF",
                  delay: 0.35,
                },
                {
                  icon: (
                    <svg
                      width="24"
                      height="24"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 2.5v5.51a8.7 8.7 0 0 1-1.8-.17V11c0 5.6-4.5 10.5-10.1 10.98A10 10 0 0 1 3 20.88c4.5.3 8.3-3 8.3-7.48v-1.55a8.9 8.9 0 0 0 7.1 3.18c.4 0 .7-.02 1.1-.05A10.7 10.7 0 0 1 11 22C5.5 22 1 17.5 1 12c0-5.4 4.3-9.8 9.7-10V7h3.7a8.8 8.8 0 0 0 5.8 2.5V2.5H21z" />
                    </svg>
                  ),
                  url: "https://www.tiktok.com/@magicworldsonline",
                  hoverColor: "#000000",
                  delay: 0.45,
                },

                {
                  icon: (
                    <svg
                      width="24"
                      height="24"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z" />
                    </svg>
                  ),
                  url: "https://www.youtube.com/@MagicworldsTV",
                  hoverColor: "#FF0000",
                  delay: 0.3,
                },
                {
                  icon: (
                    <svg
                      width="24"
                      height="24"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                    >
                      <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                    </svg>
                  ),
                  url: "https://x.com/magicworlds3",
                  hoverColor: "#6441A4",
                  delay: 0.4,
                },
                {
                  icon: (
                    <svg
                      width="24"
                      height="24"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                    </svg>
                  ),
                  url: "https://github.com/orgs/TheMagicWorlds",
                  hoverColor: "#333333",
                  delay: 0.5,
                },
              ].map((social, idx) => (
                <motion.li key={idx}>
                  <motion.a
                    href={social.url}
                    aria-label={`Social media link ${idx + 1}`}
                    className="hover:text-gaming relative block p-2 text-gray-400 transition-colors"
                    variants={socialIconVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    custom={idx}
                    transition={{
                      delay: social.delay,
                      duration: 0.3,
                    }}
                    style={{ originX: 0.5, originY: 0.5 }}
                  >
                    {/* Icon background glow effect */}
                    <motion.span
                      className="bg-gaming absolute inset-0 rounded-full opacity-0"
                      initial={{ opacity: 0 }}
                      whileHover={{
                        opacity: 0.15,
                        boxShadow: "0 0 15px rgba(0,255,153,0.7)",
                      }}
                    ></motion.span>

                    {social.icon}
                  </motion.a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </motion.div>

        {/* Game controller decorative element */}
        <motion.div
          className="absolute -bottom-10 -right-10 h-40 w-40 opacity-5"
          animate={{
            rotate: [0, 5, -5, 0],
            y: [0, -5, 0],
          }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-gaming h-full w-full"
          >
            <path d="M7.97,16L5,19C4.67,19.3 4.23,19.5 3.75,19.5A2.25,2.25 0 0,1 1.5,17.25C1.5,16.77 1.7,16.33 2,16L5,13H7V11H3V9H7V7H3V5H7.97L1.97,2.5L2.94,1L21.94,11L2.94,21L1.97,19.5L7.97,16M11,11H13V9H11V11M15,11H17V9H15V11Z" />
          </svg>
        </motion.div>
      </div>

      {/* Animated border */}
      <div className="absolute left-0 top-0 h-1 w-full overflow-hidden">
        <motion.div
          className="from-gaming via-gamingAccent to-gaming h-full bg-gradient-to-r"
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        ></motion.div>
      </div>
    </footer>
  );
};

export default Footer;
