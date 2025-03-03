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
      transition: { duration: 3, repeat: Infinity, repeatType: "reverse" },
    },
  };

  const pulseVariants = {
    hidden: { scale: 1 },
    visible: {
      scale: [1, 1.05, 1],
      transition: { duration: 2, repeat: Infinity, repeatType: "reverse" },
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
                Play games to donate to charity and help the world. Level up
                your gaming experience while making a real-world difference.
              </motion.p>

              <motion.div variants={itemVariants} className="space-y-2">
                <p className="text-gaming text-sm font-bold uppercase tracking-wider">
                  Contact
                </p>
                <a
                  href="mailto:mflynn1999@gmail.com"
                  className="hover:text-gaming inline-block text-white transition-colors duration-300"
                >
                  mflynn1999@gmail.coms
                </a>
              </motion.div>
            </motion.div>

            {/* Navigation Columns */}
            {[
              {
                title: "Quick Links",
                links: [
                  { name: "Home", url: "#" },
                  { name: "Games", url: "#" },
                  { name: "Leaderboards", url: "#" },
                  { name: "About", url: "#" },
                  { name: "Tournaments", url: "#" },
                ],
              },
              {
                title: "Support",
                links: [
                  { name: "Help Center", url: "#" },
                  { name: "Contact Us", url: "#" },
                  { name: "FAQs", url: "#" },
                  { name: "Account Recovery", url: "#" },
                  { name: "Bug Reports", url: "#" },
                ],
              },
              {
                title: "Resources",
                links: [
                  { name: "Blog", url: "#" },
                  { name: "Patch Notes", url: "#" },
                  { name: "Charities", url: "#" },
                  { name: "Developers", url: "#" },
                  { name: "Partners", url: "#" },
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
                v3.4.2
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
                  url: "#",
                  hoverColor: "#4267B2",
                  delay: 0.1,
                },
                {
                  icon: (
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M22.162 5.65593C21.3985 5.99362 20.589 6.2154 19.76 6.31393C20.6337 5.79136 21.2877 4.96894 21.6 3.99993C20.78 4.48793 19.881 4.82993 18.944 5.01493C18.3146 4.34151 17.4803 3.89489 16.5709 3.74451C15.6615 3.59413 14.7279 3.74842 13.9153 4.18338C13.1026 4.61834 12.4564 5.30961 12.0771 6.14972C11.6978 6.98983 11.6067 7.93171 11.818 8.82893C10.1551 8.74558 8.52832 8.31345 7.04328 7.56059C5.55823 6.80773 4.24812 5.75098 3.19799 4.45893C2.82628 5.09738 2.63095 5.82315 2.63199 6.56193C2.63199 8.01193 3.36999 9.29293 4.49199 10.0429C3.828 10.022 3.17862 9.84271 2.59799 9.51993V9.57193C2.59819 10.5376 2.93236 11.4735 3.54384 12.221C4.15532 12.9684 5.00647 13.4814 5.95299 13.6729C5.33661 13.84 4.6903 13.8646 4.06299 13.7449C4.32986 14.5762 4.85 15.3031 5.55058 15.824C6.25117 16.345 7.09712 16.6337 7.96999 16.6499C7.10247 17.3313 6.10917 17.8349 5.04687 18.1321C3.98458 18.4293 2.87412 18.5142 1.77899 18.3819C3.69069 19.6114 5.91609 20.2641 8.18899 20.2619C15.882 20.2619 20.089 13.8889 20.089 8.36193C20.089 8.18193 20.084 7.99993 20.076 7.82193C20.8949 7.2301 21.6016 6.49695 22.163 5.65693L22.162 5.65593Z" />
                    </svg>
                  ),
                  url: "#",
                  hoverColor: "#1DA1F2",
                  delay: 0.2,
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
                  url: "#",
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
                  url: "#",
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
                  url: "#",
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
