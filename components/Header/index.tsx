"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ProfileModal } from "../accounts/profileModal";

import ThemeToggler from "./ThemeToggler";
import menuData from "./menuData";

const Header = () => {
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [dropdownToggler, setDropdownToggler] = useState(false);
  const [stickyMenu, setStickyMenu] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string>();
  const [hideOnScroll, setHideOnScroll] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const pathUrl = usePathname();

  interface MenuItem {
    id: number;
    title: string;
    path?: string;
    submenu?: MenuItem[];
  }

  const handleLinkClick = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    menuItem: MenuItem,
  ) => {
    e.preventDefault();
    setActiveMenu(menuItem.title);
    if (menuItem.id === 5 || menuItem.id === 6) {
      setDropdownToggler(!dropdownToggler);
    } else {
      setNavigationOpen(!navigationOpen);
    }
  };

  // Handle sticky menu
  const handleStickyMenu = () => {
    if (window.scrollY >= 80) {
      setStickyMenu(true);
    }
  };

  // Handle sticky menu and hide on scroll
  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 80) {
      setHideOnScroll(true);
    } else {
      setHideOnScroll(false);
    }

    setLastScrollY(currentScrollY);
    setStickyMenu(currentScrollY >= 80);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setHideOnScroll(currentScrollY > lastScrollY && currentScrollY > 80);
      setLastScrollY(currentScrollY);
      setStickyMenu(currentScrollY >= 80);
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, [lastScrollY]);

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full bg-white/10 py-0.5 transition-transform duration-300 dark:bg-black ${
        hideOnScroll ? "-translate-y-full" : "translate-y-0"
      } ${stickyMenu ? "shadow " : ""}`}
    >
      <div className="relative mx-auto max-w-c-1390 items-center justify-between px-4 md:px-8 xl:flex 2xl:px-0">
        <div className="flex w-full items-center justify-between xl:w-[12%]">
          <a href="/" title="Home">
            <Image
              src="/images/logo/logo.png"
              alt="logo"
              width={200}
              height={50}
              className="hidden h-18 w-24 dark:block"
            />
            <Image
              src="/images/logo/logo.png"
              alt="logo"
              width={200}
              height={50}
              className="h-18 w-24 dark:hidden"
            />
          </a>

          {/* <!-- Hamburger Toggle BTN --> */}
          <button
            aria-label="hamburger Toggler"
            className="block xl:hidden"
            onClick={() => setNavigationOpen(!navigationOpen)}
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="absolute right-0 block h-full w-full">
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${
                    !navigationOpen ? "!w-full delay-300" : "w-0"
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${
                    !navigationOpen ? "delay-400 !w-full" : "w-0"
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${
                    !navigationOpen ? "!w-full delay-500" : "w-0"
                  }`}
                ></span>
              </span>
              <span className="du-block absolute right-0 h-full w-full rotate-45">
                <span
                  className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${
                    !navigationOpen ? "!h-0 delay-[0]" : "h-full"
                  }`}
                ></span>
                <span
                  className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${
                    !navigationOpen ? "!h-0 delay-200" : "h-0.5"
                  }`}
                ></span>
              </span>
            </span>
          </button>
          {/* <!-- Hamburger Toggle BTN --> */}
        </div>

        {/* Nav Menu Start   */}
        <div
          className={`invisible h-0 w-full items-center justify-between xl:visible xl:flex xl:h-auto xl:w-full ${
            navigationOpen &&
            "navbar !visible mt-0 h-auto max-h-[400px] rounded-md bg-white p-7.5 shadow-solid-5 dark:bg-blacksection xl:h-auto xl:p-0 xl:shadow-none xl:dark:bg-transparent"
          }`}
        >
          <nav>
            <ul className="flex flex-col gap-5 font-bold xl:flex-row xl:items-center xl:gap-10">
              {menuData.map((menuItem, key) => (
                <li
                  onClick={(e) => handleLinkClick(e, menuItem)}
                  key={key}
                  className={menuItem.submenu && "group relative"}
                >
                  {menuItem.submenu ? (
                    <>
                      <button className="flex cursor-pointer items-center justify-between gap-3 hover:text-primary">
                        {menuItem.title}
                        <span>
                          <svg
                            className="h-3 w-3 cursor-pointer fill-waterloo group-hover:fill-primary"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                          >
                            <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                          </svg>
                        </span>
                      </button>

                      {menuItem.title === activeMenu && (
                        <ul
                          className={`dropdown ${dropdownToggler ? "flex" : ""}`}
                        >
                          {menuItem.submenu.map((item, key) => (
                            <li
                              onClick={(e) => handleLinkClick(e, item)}
                              key={key}
                              className="hover:text-primary"
                            >
                              <Link href={item.path || "#"}>{item.title}</Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    <Link
                      href={`${menuItem.path}`}
                      className={
                        pathUrl === menuItem.path
                          ? "text-primary hover:text-primary"
                          : "hover:text-primary"
                      }
                    >
                      {menuItem.title}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-7 flex items-center gap-6 xl:mt-0">
            {/* <ProfileModal navOpen={navigationOpen} setNavopen = {setNavigationOpen}/> */}
            <Link
              href="/support"
              className="hover:bg-primary-dark rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4 py-2 font-semibold text-white transition-colors"
            >
              Contact Us
            </Link>
            <ThemeToggler />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
