import { Game } from "@/types/game";

const GameData: Game[] = [
  {
    id: 1,
    title: "UP!",
    description:
      "Streamline the product development flow with a content platform that's aligned across specs and insights.",
    image: "/images/games/UP_Summer.webp",
    alt: "Workflow 01",
    buttonText: "Play Now",
    playLink: `${process.env.NEXT_PUBLIC_GAME_SERVER_URI}/tetrixGame/`,
  },
  {
    id: 2,
    title: "YUM Game",
    description:
      "Streamline the product development flow with a content platform that's aligned across specs and insights.",
    image: "/images/games/YUM_Summer.webp",
    alt: "Workflow 02",
    buttonText: "Play Now",
    playLink: `${process.env.NEXT_PUBLIC_GAME_SERVER_URI}/yumGame/`,
  },
  {
    id: 3,
    title: "POP!",
    description:
      "Streamline the product development flow with a content platform that's aligned across specs and insights.",
    image: "/images/games/POP+WATER_AID.webp",
    alt: "Workflow 03",
    buttonText: "Play Now",
    playLink: `${process.env.NEXT_PUBLIC_GAME_SERVER_URI}/bubbleGame/`,
  },
  {
    id: 4,
    title: "HISS!",
    description: "Can you stop the HISS snake to save the world? 🐍",
    image: "/images/games/HISS+WWF-UK.webp",
    alt: "Workflow 01",
    buttonText: "Play Now",
    playLink:
      `${process.env.NEXT_PUBLIC_GAME_SERVER_URI}/snakeGame/`,
  },
  {
    id: 5,
    title: "3-2-1!",
    description:
      "Streamline the product development flow with a content platform that's aligned across specs and insights.",
    image: "/images/games/321+RED_CROSS.webp",
    alt: "Workflow 02",
    buttonText: "Play Now",
    playLink:
      `${process.env.NEXT_PUBLIC_GAME_SERVER_URI}/racingGame/`,
  },
  {
    id: 6,
    title: "Rail Rush!",
    description:
      "Streamline the product development flow with a content platform that's aligned across specs and insights.",
    image: "/images/games/MORE+MSF.webp",
    alt: "Workflow 03",
    buttonText: "Play Now",
    playLink:
      `${process.env.NEXT_PUBLIC_GAME_SERVER_URI}/railrushGame/`,
  },
  {
    id: 7,
    title: "GRRR!",
    description:
      "Streamline the product development flow with a content platform that's aligned across specs and insights.",
    image: "/images/games/GRRR+ALZEIMERS.webp",
    alt: "Workflow 01",
    buttonText: "Play Now",
    playLink: `${process.env.NEXT_PUBLIC_GAME_SERVER_URI}/grrGame`,
  },
  {
    id: 8,
    title: "FLY!",
    description:
      "Streamline the product development flow with a content platform that's aligned across specs and insights.",
    image: "/images/games/FLY+UNICEF.webp",
    alt: "Workflow 02",
    buttonText: "Play Now",
    playLink:
      `${process.env.NEXT_PUBLIC_GAME_SERVER_URI}/spaceShotter/`,
  },
  {
    id: 10,
    title: "GO!",
    description:
      "Streamline the product development flow with a content platform that's aligned across specs and insights.",
    image: "/images/games/GO+KIVA.webp",
    alt: "Workflow 01",
    buttonText: "Play Now",
    playLink:
      `${process.env.NEXT_PUBLIC_GAME_SERVER_URI}/goGame/`,
  },
];

export default GameData;
