import { Menu } from "@/types/menu";

const menuData: Menu[] = [
  {
    id: 1,
    title: "Play",
    newTab: false,
    path: "/play",
  },
  {
    id: 3,
    title: "Worlds",
    newTab: false,
    path: "/worlds",
  },

  // {
  //   id: 6,
  //   title: "Score",
  //   newTab: false,
  //   submenu: [
  //     {
  //       id: 61,
  //       title: "Leaderboard",
  //       newTab: false,
  //       path: "/leaderboard",
  //     },
  //     {
  //       id: 64,
  //       title: "Your Score",
  //       newTab: false,
  //       path: "/yourScore",
  //     },
  //   ],
  // },
  {
    id: 5,
    title: "Join Us",
    newTab: false,
    submenu: [
      {
        id: 51,
        title: "Youtube",
        newTab: false,
        path: "https://www.youtube.com/channel/UC6PENDkMRLo8Or4-jjtJ3aw",
      },
      {
        id: 54,
        title: "Blogs",
        newTab: false,
        path: "https://mauricebigmoflynn.wordpress.com/",
      },
    ],
  },
  {
    id: 4,
    title: "About",
    newTab: false,
    path: "/docs",
  },
];

export default menuData;
