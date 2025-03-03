"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
  Fullscreen,
  Maximize2,
  X,
} from "lucide-react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";

interface GameplayVideo {
  id: string;
  title: string;
  genre: string;
  duration: string;
  videoUrl: string;
  thumbnailUrl: string;
  views: string;
  uploadDate: string;
}

const EpicGamingShowcase: React.FC = () => {
  // State management
  const [videos, setVideos] = useState<GameplayVideo[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true); // Muted by default to prevent autoplay issues
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [videoCategory, setVideoCategory] = useState("All");
  const [videoReady, setVideoReady] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const modalVideoRef = useRef<HTMLVideoElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  // Animation controls
  const mainVideoControls = useAnimation();
  const loaderControls = useAnimation();
  const titleControls = useAnimation();

  // Simulate loading data
  useEffect(() => {
    const loadingInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        const newProgress = prev + 5;
        if (newProgress >= 100) {
          clearInterval(loadingInterval);
          setTimeout(() => {
            loaderControls.start({
              opacity: 0,
              y: -50,
              transition: { duration: 0.8, ease: "easeInOut" },
            });
          }, 300);
        }
        return newProgress > 100 ? 100 : newProgress;
      });
    }, 100);

    return () => clearInterval(loadingInterval);
  }, [loaderControls]);

  // Generate video data
  useEffect(() => {
    const gameTitles = [
      { title: "Elden Ring: Final Boss Perfect Run", genre: "Action RPG" },
      {
        title: "Cyberpunk 2077: Night City Stealth Mission",
        genre: "Action RPG",
      },
      { title: "Forza Horizon 5: Ultimate Drift Challenge", genre: "Racing" },
      {
        title: "God of War: Ragnarök Boss Marathon",
        genre: "Action Adventure",
      },
      { title: "Valorant: Pro Player Ace Compilation", genre: "FPS" },
      { title: "League of Legends: World Championship Finals", genre: "MOBA" },
      { title: "Apex Legends: 20 Kill Solo Victory", genre: "Battle Royale" },
      { title: "Starfield: Unexplored Planet Discovery", genre: "Space RPG" },
      { title: "Baldur's Gate 3: Impossible Choices", genre: "RPG" },
      { title: "Call of Duty: Warzone Best Plays", genre: "FPS" },
      { title: "Final Fantasy XVI: Ultimate Summon Showcase", genre: "JRPG" },
      {
        title: "Hellblade 2: Senua's Sacrifice Walkthrough",
        genre: "Action Adventure",
      },
    ];

    const durations = [
      "12:45",
      "8:32",
      "15:07",
      "10:21",
      "6:18",
      "9:45",
      "7:33",
      "14:22",
      "11:09",
      "5:47",
      "16:38",
      "13:15",
    ];
    const viewCounts = [
      "1.2M",
      "845K",
      "3.7M",
      "698K",
      "2.1M",
      "1.5M",
      "922K",
      "1.8M",
      "762K",
      "4.2M",
      "552K",
      "1.1M",
    ];
    const uploadDates = [
      "2 days ago",
      "1 week ago",
      "3 days ago",
      "5 hours ago",
      "2 weeks ago",
      "1 day ago",
      "4 days ago",
      "12 hours ago",
      "3 weeks ago",
      "Just now",
      "8 hours ago",
      "Yesterday",
    ];

    const generatedVideos = gameTitles.map((game, i) => ({
      id: (i + 1).toString(),
      title: game.title,
      genre: game.genre,
      duration: durations[i] || "10:00",
      videoUrl: `/videos/worlds/gameplay-${(i % 12) + 1}.mp4`,
      thumbnailUrl: `/images/thumbnails/gameplay-${(i % 12) + 1}.jpg`,
      views: viewCounts[i] || "1M",
      uploadDate: uploadDates[i] || "Recently",
    }));

    setVideos(generatedVideos);
  }, []);

  // Handle video loading and time updates
  useEffect(() => {
    if (videoRef.current) {
      const handleCanPlay = () => {
        setVideoReady(true);
        setDuration(videoRef.current?.duration || 0);
      };

      const handleTimeUpdate = () => {
        setCurrentTime(videoRef.current?.currentTime || 0);
      };

      videoRef.current.addEventListener("canplay", handleCanPlay);
      videoRef.current.addEventListener("timeupdate", handleTimeUpdate);
      videoRef.current.addEventListener("durationchange", () => {
        setDuration(videoRef.current?.duration || 0);
      });

      return () => {
        if (videoRef.current) {
          videoRef.current.removeEventListener("canplay", handleCanPlay);
          videoRef.current.removeEventListener("timeupdate", handleTimeUpdate);
          videoRef.current.removeEventListener("durationchange", () => {});
        }
      };
    }
  }, [activeIndex]);

  // Video playback controls
  const handleVideoSelect = (index: number) => {
    // Pause current video first to prevent AbortError
    if (videoRef.current && isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    }

    setVideoReady(false);
    setCurrentTime(0);

    mainVideoControls
      .start({
        opacity: 0,
        scale: 0.95,
        transition: { duration: 0.3 },
      })
      .then(() => {
        setActiveIndex(index);
        mainVideoControls.start({
          opacity: 1,
          scale: 1,
          transition: { duration: 0.5, ease: "easeOut" },
        });
      });

    titleControls
      .start({
        opacity: 0,
        y: 20,
        transition: { duration: 0.2 },
      })
      .then(() => {
        setTimeout(() => {
          titleControls.start({
            opacity: 1,
            y: 0,
            transition: { duration: 0.4, ease: "easeOut" },
          });
        }, 300);
      });
  };

  const handlePlayPause = () => {
    if (videoRef.current && videoReady) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        // Use a promise and catch errors to handle any play() issues
        const playPromise = videoRef.current.play();

        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
            })
            .catch((error) => {
              console.error("Play error:", error);
              // Don't update isPlaying if play failed
            });
        }
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);

      // Also update modal video if it exists
      if (modalVideoRef.current) {
        modalVideoRef.current.muted = !isMuted;
      }
    }
  };

  const handleFullScreen = () => {
    if (videoRef.current) {
      if (!isFullScreen) {
        if (videoRef.current.requestFullscreen) {
          videoRef.current.requestFullscreen();
        }
      }
      setIsFullScreen(!isFullScreen);
    }
  };

  const handleNextVideo = () => {
    const newIndex = (activeIndex + 1) % videos.length;
    handleVideoSelect(newIndex);
  };

  const handlePrevVideo = () => {
    const newIndex = (activeIndex - 1 + videos.length) % videos.length;
    handleVideoSelect(newIndex);
  };

  const handleOpenModal = () => {
    // Pause the main video when opening modal
    if (videoRef.current && isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    // Pause the modal video when closing
    if (modalVideoRef.current) {
      modalVideoRef.current.pause();
    }
    setShowModal(false);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressBarRef.current && videoRef.current && duration > 0) {
      const rect = progressBarRef.current.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      const newTime = pos * duration;

      // Update video time
      videoRef.current.currentTime = newTime;

      // Also update our state (for immediate UI update)
      setCurrentTime(newTime);
    }
  };

  // Format time function for displaying current time / duration
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Filter videos by category
  const filteredVideos =
    videoCategory === "All"
      ? videos
      : videos.filter((video) => video.genre === videoCategory);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const cardHoverVariants = {
    rest: { scale: 1, boxShadow: "0px 0px 0px rgba(124, 58, 237, 0)" },
    hover: {
      scale: 1.02,
      boxShadow: "0px 0px 20px rgba(124, 58, 237, 0.7)",
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  const progressBarVariants = {
    initial: { width: "0%" },
    animate: (progress: number) => ({
      width: `${progress}%`,
      transition: { duration: 0.5, ease: "easeOut" },
    }),
  };

  // Categories for filtering
  const categories = [
    "All",
    "Action RPG",
    "FPS",
    "Racing",
    "MOBA",
    "Battle Royale",
    "JRPG",
    "Action Adventure",
    "Space RPG",
    "RPG",
  ];

  // Calculate progress percentage safely
  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-black via-purple-950/20 to-black text-white">
      {/* Loading Screen */}
      <AnimatePresence>
        {loadingProgress < 100 && (
          <motion.div
            className="absolute inset-0 bottom-96 top-0 z-50 mb-96 flex flex-col items-center justify-center bg-black"
            initial={{ opacity: 1 }}
            animate={loaderControls}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
          >
            <motion.div
              className="mb-8 text-5xl font-bold tracking-wider text-purple-500"
              initial={{ opacity: 0, y: 30 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { delay: 0.2, duration: 0.8 },
              }}
            >
              MAGIC WORLDS VAULT
            </motion.div>
            <motion.div
              className="relative h-2 w-64 overflow-hidden rounded-full bg-gray-800"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 1,
                scale: 1,
                transition: { delay: 0.4, duration: 0.6 },
              }}
            >
              <motion.div
                className="absolute h-full rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500"
                variants={progressBarVariants}
                initial="initial"
                animate="animate"
                custom={loadingProgress}
              />
            </motion.div>
            <motion.div
              className="mt-4 text-lg text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.6 } }}
            >
              Loading gaming experiences... {loadingProgress}%
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-16">
        {/* Header */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <h1 className="mb-4 bg-gradient-to-r from-purple-400 to-fuchsia-500 bg-clip-text text-5xl font-extrabold tracking-tight text-transparent">
            MAGIC WORLDS VAULT
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-300">
            Explore extraordinary gaming moments from our Magic Worlds, captured
            in stunning detail
          </p>
        </motion.div>

        {/* Category Selection */}
        <motion.div
          className="mb-8 overflow-x-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <div className="flex space-x-2 pb-2">
            {categories.map((category) => (
              <motion.button
                key={category}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  videoCategory === category
                    ? "bg-purple-600 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
                onClick={() => setVideoCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Featured Video */}
        <motion.div
          ref={showcaseRef}
          className="mb-12"
          initial={{ opacity: 0 }}
          animate={mainVideoControls}
        >
          {videos.length > 0 && (
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-purple-900/10 to-fuchsia-900/10 p-1">
              <motion.div
                className="relative aspect-video w-full overflow-hidden rounded-lg"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <video
                  ref={videoRef}
                  className="h-full w-full rounded-lg object-contain"
                  src={videos[activeIndex]?.videoUrl}
                  // poster={videos[activeIndex]?.thumbnailUrl}
                  onPause={() => setIsPlaying(false)}
                  onEnded={handleNextVideo}
                  muted={isMuted}
                  playsInline
                />

                {/* Video Controls Overlay */}
                <div className="absolute inset-0 flex flex-col justify-between bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 transition-opacity duration-300 hover:opacity-100">
                  {/* Top Controls */}
                  <div className="flex justify-between">
                    <motion.div
                      animate={titleControls}
                      initial={{ opacity: 0, y: 20 }}
                    >
                      <h3 className="text-2xl font-bold text-white drop-shadow-lg">
                        {videos[activeIndex]?.title}
                      </h3>
                      <p className="text-sm text-gray-300">
                        {videos[activeIndex]?.genre} •{" "}
                        {videos[activeIndex]?.views} views •{" "}
                        {videos[activeIndex]?.uploadDate}
                      </p>
                    </motion.div>
                    <button
                      className="rounded-full bg-gray-800/50 p-2 text-white transition-all hover:bg-gray-700"
                      onClick={handleOpenModal}
                    >
                      <Maximize2 size={20} />
                    </button>
                  </div>

                  {/* Bottom Controls */}
                  <div className="space-y-2">
                    {/* Progress Bar */}
                    <div
                      ref={progressBarRef}
                      className="group relative h-1 w-full cursor-pointer rounded-full bg-gray-700"
                      onClick={handleSeek}
                    >
                      <div
                        className="absolute h-full origin-left rounded-full bg-purple-500"
                        style={{ width: `${progressPercentage}%` }}
                      />
                      <div
                        className="absolute bottom-0 h-3 w-3 -translate-x-1/2 rounded-full bg-purple-300 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        style={{ left: `${progressPercentage}%` }}
                      />
                    </div>

                    {/* Control Buttons */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <button
                          className="rounded-full bg-gray-800/50 p-2 text-white transition-all hover:bg-gray-700"
                          onClick={handlePlayPause}
                          disabled={!videoReady}
                        >
                          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                        </button>
                        <button
                          className="rounded-full bg-gray-800/50 p-2 text-white transition-all hover:bg-gray-700"
                          onClick={handleMuteToggle}
                        >
                          {isMuted ? (
                            <VolumeX size={20} />
                          ) : (
                            <Volume2 size={20} />
                          )}
                        </button>
                        <span className="text-sm text-gray-300">
                          {formatTime(currentTime)} /{" "}
                          {videos[activeIndex]?.duration}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <button
                          className="rounded-full bg-gray-800/50 p-2 text-white transition-all hover:bg-gray-700"
                          onClick={handlePrevVideo}
                        >
                          <ChevronLeft size={20} />
                        </button>
                        <button
                          className="rounded-full bg-gray-800/50 p-2 text-white transition-all hover:bg-gray-700"
                          onClick={handleNextVideo}
                        >
                          <ChevronRight size={20} />
                        </button>
                        <button
                          className="rounded-full bg-gray-800/50 p-2 text-white transition-all hover:bg-gray-700"
                          onClick={handleFullScreen}
                        >
                          <Fullscreen size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </motion.div>

        {/* Video Grid - Vertical Layout */}
        <motion.div
          className="mb-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.8 }}
        >
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-white">
              More Epic Gameplay
            </h2>
          </div>

          {/* Grid layout for videos */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredVideos.map((video, index) => (
              <motion.div
                key={video.id}
                variants={itemVariants}
                whileHover="hover"
                initial="rest"
              >
                <motion.div
                  className="h-full overflow-hidden rounded-lg bg-gray-900 shadow-lg"
                  variants={cardHoverVariants}
                  onClick={() =>
                    handleVideoSelect(
                      videos.findIndex((v) => v.id === video.id),
                    )
                  }
                >
                  <div className="relative aspect-video w-full overflow-hidden">
                    {/* Using image thumbnails instead of video to prevent loading issues */}
                    <video
                      className="h-full w-full object-contain"
                      src={video.videoUrl}
                      muted
                      loop
                      playsInline
                    />
                    <div className="absolute bottom-2 right-2 rounded bg-black/70 px-2 py-1 text-xs text-white">
                      {video.duration}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="mb-1 line-clamp-1 text-lg font-semibold text-white">
                      {video.title}
                    </h3>
                    <p className="text-sm text-gray-400">{video.genre}</p>
                    <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                      <span>{video.views} views</span>
                      <span>{video.uploadDate}</span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-4xl rounded-xl bg-gray-900 p-1"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 30 }}
            >
              <button
                className="absolute -right-4 -top-4 z-10 rounded-full bg-gray-800 p-2 text-white shadow-lg transition-all hover:bg-gray-700"
                onClick={handleCloseModal}
              >
                <X size={20} />
              </button>
              <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                <video
                  ref={modalVideoRef}
                  className="h-full w-full object-contain"
                  src={videos[activeIndex]?.videoUrl}
                  // poster={videos[activeIndex]?.thumbnailUrl}
                  controls
                  muted={isMuted}
                />
              </div>
              <div className="p-4">
                <h3 className="text-2xl font-bold text-white">
                  {videos[activeIndex]?.title}
                </h3>
                <p className="mt-1 text-sm text-gray-400">
                  {videos[activeIndex]?.genre} • {videos[activeIndex]?.views}{" "}
                  views • {videos[activeIndex]?.uploadDate}
                </p>
                <div className="mt-4 rounded-lg bg-gray-800 p-4 text-gray-300">
                  <p>
                    Experience an incredible gaming moment from{" "}
                    {videos[activeIndex]?.title}. This video showcases
                    exceptional gameplay and strategy that highlights the best
                    this game has to offer.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <motion.footer
        className="mt-16 border-t border-gray-800 py-8 text-center text-sm text-gray-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        {/* <p>
          © 2025 Magic Worlds Vault. All gameplay videos are property of their
          respective owners.
        </p> */}
      </motion.footer>
    </div>
  );
};

export default EpicGamingShowcase;
