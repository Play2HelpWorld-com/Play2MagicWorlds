import { Menu } from "@/types/menu";

const menuData: Menu[] = [
  {
    id: 1,
    title: "Play",
    newTab: false,
    path: "/games",
  },
  {
    id: 2,
    title: "Boosters",
    newTab: false,
    path: "/boosters",
  },
  {
    id: 3,
    title: "Charities",
    newTab: false,
    path: "/blog",
  },
  {
    id: 4,
    title: "Why Us",
    newTab: false,
    path: "/docs",
  },
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
      {
        id: 55,
        title: "Events",
        newTab: false,
        path: "https://www.eventbrite.com/e/full-community-meetup-tickets-346061678797",
      },
      {
        id: 56,
        title: "Votes",
        newTab: false,
        path: "https://www.surveymonkey.com/r/ZKM37SK",
      },
      {
        id: 57,
        title: "Jobs",
        newTab: false,
        path: "https://www.facebook.com/Play2.HelpWorld/photos/a.210431825738952/5317915491657201/",
      },
      {
        id: 58,
        title: "Contact Us",
        newTab: false,
        path: "/support",
      },
    ],
  },

  {
    id: 6,
    title: "Score",
    newTab: false,
    submenu: [
      {
        id: 61,
        title: "Leaderboard",
        newTab: false,
        path: "/leaderboard",
      },
      {
        id: 64,
        title: "Your Score",
        newTab: false,
        path: "/yourScore",
      },
    ],
  },
];

export default menuData;
