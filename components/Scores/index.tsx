"use client";
import { cn } from "../../utils/lib/cn";
import { AnimatedList } from "./animated-list";
import Score from "./score";
import { BellRing} from 'lucide-react';

interface Item {
  name: string; 
  description: string;
  icon: string;
  color: string;
  time: string;
}

// Generate more varied notifications
const generateNotifications = (): Item[] => [
  {
    name: "Battleman entered game",
    description: "Retro Racing Challenge",
    time: "15m ago",
    icon: "🏎️",
    color: "#00C9A7",
  },
  {
    name: "New High Score!",
    description: "20 Points Milestone",
    time: "10m ago",
    icon: "🏆",
    color: "#FFB800",
  },
  {
    name: "battleman won 20 points",
    description: "Retro Racing",
    time: "5m ago",
    icon: "🏁",
    color: "#FF3D71",
  },
  {
    name: "Achievement Unlocked",
    description: "Speed Demon",
    time: "2m ago",
    icon: "⚡",
    color: "#1E86FF",
  },
];

const Notification = ({ name, description, icon, color, time }: Item) => {
  return (
    <figure
      className={cn(
        "relative w-full cursor-pointer overflow-hidden rounded-2xl p-4 group",
        "transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-lg",
        "bg-white dark:bg-gray-800/50 backdrop-blur-sm",
        "border border-gray-100 dark:border-gray-700/50",
        "shadow-sm hover:shadow-md"
      )}
    >
      <div className="flex items-center space-x-4">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-transform group-hover:rotate-6"
          style={{ backgroundColor: color }}
        >
          <span className="text-2xl">{icon}</span>
        </div>
        
        <div className="flex-grow overflow-hidden">
          <div className="flex items-center space-x-2">
            <h3 className="text-sm sm:text-base font-semibold text-gray-800 dark:text-white truncate">
              {name}
            </h3>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {time}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 truncate">
            {description}
          </p>
        </div>
      </div>
    </figure>
  );
};

export default function YourScore() {
  // Generate more notifications to fill the list
  const notifications = Array.from({ length: 10 }, () => generateNotifications()).flat();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Score Section - Full width on small screens, half width on larger screens */}
        <div className="w-full">
          <Score />
        </div>
        
        {/* Notifications Section */}
        <div className="w-full">
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
            {/* Notifications Header */}
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center space-x-3">
              <BellRing className="w-6 h-6 text-blue-500" />
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                Rewards Notifications
              </h2>
            </div>

            {/* Animated List Container */}
            <div className="max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300 dark:scrollbar-track-gray-800 dark:scrollbar-thumb-gray-600">
              <AnimatedList>
                {notifications.map((item, idx) => (
                  <Notification 
                    key={idx} 
                    {...item} 
                  />
                ))}
              </AnimatedList>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}