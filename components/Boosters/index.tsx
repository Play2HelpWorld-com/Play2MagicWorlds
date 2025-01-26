import { MagicCard, MagicContainer } from "./magic-card";

export default function BoosterCard() {
  return (
    <section className="mx-auto flex max-w-full flex-col items-center space-y-4 py-20 text-center lg:py-25 xl:py-30">
      <h2 className="font-heading text-4xl font-bold leading-[1.1] sm:text-6xl md:text-3xl lg:text-5xl">
        Our Retro Recommendations
      </h2>
      <p className="text-muted-foreground max-w-[85%] pb-1 leading-normal sm:pb-1 sm:text-lg sm:leading-7 lg:pb-10">
        Here are some of our fav games 🎮
      </p>

      <MagicContainer
        className={
          "mt-60 flex h-auto w-full flex-wrap justify-center gap-4 px-14 pb-10 md:mt-20 lg:mt-20"
        }
      >
        <MagicCard className="w-4/2 sm:w-4/3 lg:1/4 flex cursor-pointer  flex-col items-center justify-center overflow-hidden p-20 shadow-2xl md:w-1/4">
          <p className="z-10 whitespace-nowrap text-4xl font-medium text-gray-800 dark:text-gray-200">
            Game 1
          </p>
          <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
        </MagicCard>
        <MagicCard className="w-4/2 sm:w-4/3 lg:1/4 flex cursor-pointer  flex-col items-center justify-center overflow-hidden p-20 shadow-2xl md:w-1/4">
          <p className="z-10 whitespace-nowrap text-4xl font-medium text-gray-800 dark:text-gray-200">
            Game 2
          </p>
          <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
        </MagicCard>
        <MagicCard className="w-4/2 sm:w-4/3 lg:1/4 flex cursor-pointer flex-col items-center justify-center overflow-hidden p-20 shadow-2xl md:w-1/4">
          <p className="z-10 whitespace-nowrap text-4xl font-medium text-gray-800 dark:text-gray-200">
            Game 3
          </p>
          <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
        </MagicCard>
        <MagicCard className="w-4/2 sm:w-4/3 lg:1/4 flex cursor-pointer  flex-col items-center justify-center overflow-hidden p-20 shadow-2xl md:w-1/4">
          <p className="z-10 whitespace-nowrap text-4xl font-medium text-gray-800 dark:text-gray-200">
            Game 4
          </p>
          <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
        </MagicCard>
        <MagicCard className="w-4/2 sm:w-4/3 lg:1/4 flex cursor-pointer flex-col items-center justify-center overflow-hidden p-20 shadow-2xl md:w-1/4">
          <p className="z-10 whitespace-nowrap text-4xl font-medium text-gray-800 dark:text-gray-200">
            Game 5
          </p>
          <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
        </MagicCard>
        <MagicCard className="w-4/2 sm:w-4/3 lg:1/4 flex cursor-pointer flex-col items-center justify-center overflow-hidden p-20 shadow-2xl md:w-1/4">
          <p className="z-10 whitespace-nowrap text-4xl font-medium text-gray-800 dark:text-gray-200">
            Game 6
          </p>
          <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
        </MagicCard>
      </MagicContainer>
    </section>
  );
}
