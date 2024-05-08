import Link from "next/link";
import { React, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const navLinks = [
  { title: "What we do", href: "/" },
  { title: "How it works", href: "/" },
  { title: "Case studies", href: "/" },
  { title: "About", href: "/" },
  { title: "Contact", href: "/" },
];
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [toggleHotelsState, setToggleHotelsState] = useState(false);
  const toggleMenu = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const toggleHotels = () => {
    setToggleHotelsState((prevToggle) => !prevToggle);
  };
  const menuVars = {
    initial: {
      scaleY: 0,
    },
    animate: {
      scaleY: 1,
      transition: {
        duration: 0.5,
        ease: [0.12, 0, 0.39, 0],
      },
    },
    exit: {
      scaleY: 0,
      transition: {
        delay: 0.5,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };
  const containerVars = {
    initial: {
      transition: {
        staggerChildren: 0.09,
        staggerDirection: -1,
      },
    },
    open: {
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.09,
        staggerDirection: 1,
      },
    },
  };

  return (
    <header className="w-full">
      <nav className="flex justify-between items-center py-4 lg:py-4 px-6 bg-white rounded-full">
        <div className="flex items-center gap-[1ch]">
          <img
            src="/assets/logo.png"
            width={"100%"}
            height={"auto"}
            alt="logo"
            className="w-20 lg:w-32 lg:ml-4"
          />
        </div>
        <div className="hidden lg:flex items-center space-x-8">
          <ul className="menu lg:menu-horizontal rounded-box">
            <li>
              <details>
                <summary className="font-dmSans text-[16px] hover:bg-white">
                  HOTELS
                </summary>
                <ul className="w-max">
                  <li className="hover:bg-primaryButton hover:text-white rounded-lg">
                    <Link
                      href="/hilton-al-habtoor-city"
                      className="font-dmSans text-lg"
                    >
                      Hilton Al Habtoor City
                    </Link>
                  </li>
                  <li className="hover:bg-primaryButton hover:text-white rounded-lg">
                    <Link
                      href="/habtoor-palace"
                      className="font-dmSans text-lg"
                    >
                      Habtoor Palace
                    </Link>
                  </li>
                  <li className="hover:bg-primaryButton hover:text-white rounded-lg">
                    <Link href="/v-hotel" className="font-dmSans text-lg">
                      V Hotel
                    </Link>
                  </li>
                  <li className="hover:bg-primaryButton hover:text-white rounded-lg">
                    <Link href="/habtoor-grand" className="font-dmSans text-lg">
                      Habtoor Grand
                    </Link>
                  </li>
                  <li className="hover:bg-primaryButton hover:text-white rounded-lg">
                    <Link href="/the-mirage" className="font-dmSans text-lg">
                      The Mirage
                    </Link>
                  </li>
                  <li className="hover:bg-primaryButton hover:text-white rounded-lg">
                    <Link
                      href="/metropolitan-hotel"
                      className="font-dmSans text-lg"
                    >
                      Metropolitan Hotel
                    </Link>
                  </li>
                </ul>
              </details>
            </li>
            <li className="rounded-lg">
              <Link
                href="/#contact"
                className="font-dmSans text-[16px] hover:bg-white"
              >
                CONTACT
              </Link>
            </li>
          </ul>
          <button className="hidden lg:block text-[16px] hover:opacity-90 py-2 px-4 bg-primaryButton text-white rounded-full">
            Book Now
          </button>
        </div>
        <div
          className="cursor-pointer lg:hidden text-md text-black"
          onClick={toggleMenu}
        >
          <img
            src="/assets/menu.png"
            width={"100%"}
            height={"auto"}
            alt="menu icon"
            className="w-[32px]"
          />
        </div>
      </nav>
      <AnimatePresence>
        {open && !toggleHotelsState && (
          <motion.div
            variants={menuVars}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed left-0 top-0 w-full h-screen origin-top bg-black text-white p-10"
          >
            <div className="flex h-full flex-col">
              <div className="flex justify-end rounded-full border-white border-[1px] border-solid py-1 px-4">
                <button onClick={toggleMenu}>
                  <svg
                    width="32px"
                    height="32px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="#ffffff"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        d="M19 5L5 19M5.00001 5L19 19"
                        stroke="#35373f"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>{" "}
                    </g>
                  </svg>
                </button>
              </div>
              <motion.div
                variants={containerVars}
                initial="initial"
                animate="open"
                exit="initial"
                className="flex flex-col h-full mt-24 font-lora items-center gap-4 gap-y-6"
              >
                <div className="overflow-hidden">
                  <motion.div
                    variants={mobileLinkVars}
                    className="text-3xl font-dmSans font-semibold uppercase text-white"
                  >
                    <Link href="/booking">Booking</Link>
                  </motion.div>
                </div>
                <div className="overflow-hidden">
                  <motion.div
                    variants={mobileLinkVars}
                    onClick={toggleHotels}
                    className="text-3xl font-dmSans font-semibold uppercase text-white"
                  >
                    Hotels
                  </motion.div>
                </div>
                <div className="overflow-hidden">
                  <motion.div
                    variants={mobileLinkVars}
                    className="text-3xl font-dmSans font-semibold uppercase text-white"
                  >
                    <Link href="/#contact">Contact</Link>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
        {open && toggleHotelsState && (
          <motion.div
            variants={menuVars}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed left-0 top-0 w-full h-screen origin-top bg-black text-white p-10"
          >
            <div className="flex h-full flex-col">
              <div className="flex justify-end rounded-full border-white border-[1px] border-solid py-1 px-4">
                <button onClick={toggleMenu}>
                  <svg
                    width="32px"
                    height="32px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="#ffffff"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        d="M19 5L5 19M5.00001 5L19 19"
                        stroke="#35373f"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>{" "}
                    </g>
                  </svg>
                </button>
              </div>
              <button className="mt-6" onClick={toggleHotels}>
                <svg
                  width="32px"
                  height="32px"
                  viewBox="0 0 1024 1024"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#ffffff"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <g id="SVGRepo_iconCarrier">
                    <path
                      fill="#ffffff"
                      d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
                    />
                    <path
                      fill="#ffffff"
                      d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
                    />
                  </g>
                </svg>
              </button>
              <motion.div
                variants={containerVars}
                initial="initial"
                animate="open"
                exit="initial"
                className="flex flex-col h-full mt-24 font-lora items-center gap-4 gap-y-6"
              >
                <div className="overflow-hidden">
                  <motion.div
                    variants={mobileLinkVars}
                    className="text-3xl font-dmSans font-semibold uppercase text-white"
                  >
                    <Link
                      href="/hilton-al-habtoor-city"
                      className="font-dmSans text-lg"
                    >
                      Hilton Al Habtoor City
                    </Link>
                  </motion.div>
                </div>
                <div className="overflow-hidden">
                  <motion.div
                    variants={mobileLinkVars}
                    onClick={toggleHotels}
                    className="text-3xl font-dmSans font-semibold uppercase text-white"
                  >
                    <Link
                      href="/habtoor-palace"
                      className="font-dmSans text-lg"
                    >
                      Habtoor Palace
                    </Link>
                  </motion.div>
                </div>
                <div className="overflow-hidden">
                  <motion.div
                    variants={mobileLinkVars}
                    className="text-3xl font-dmSans font-semibold uppercase text-white"
                  >
                    <Link href="/v-hotel" className="font-dmSans text-lg">
                      V Hotel
                    </Link>
                  </motion.div>
                </div>
                <div className="overflow-hidden">
                  <motion.div
                    variants={mobileLinkVars}
                    onClick={toggleHotels}
                    className="text-3xl font-dmSans font-semibold uppercase text-white"
                  >
                    <Link href="/habtoor-grand" className="font-dmSans text-lg">
                      Habtoor Grand
                    </Link>
                  </motion.div>
                </div>
                <div className="overflow-hidden">
                  <motion.div
                    variants={mobileLinkVars}
                    className="text-3xl font-dmSans font-semibold uppercase text-white"
                  >
                    <Link href="/the-mirage" className="font-dmSans text-lg">
                      The Mirage
                    </Link>
                  </motion.div>
                </div>
                <div className="overflow-hidden">
                  <motion.div
                    variants={mobileLinkVars}
                    onClick={toggleHotels}
                    className="text-3xl font-dmSans font-semibold uppercase text-white"
                  >
                    <Link
                      href="/metropolitan-hotel"
                      className="font-dmSans text-lg"
                    >
                      Metropolitan Hotel
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
const mobileLinkVars = {
  initial: {
    y: "30vh",
    transition: {
      duration: 0.5,
      ease: [0.37, 0, 0.63, 1],
    },
  },
  open: {
    y: 0,
    transition: {
      ease: [0, 0.55, 0.45, 1],
      duration: 0.7,
    },
  },
};
const MobileNavLink = ({ title, href }) => {
  return (
    <motion.div
      variants={mobileLinkVars}
      className="text-5xl uppercase text-white"
    >
      <Link href={href}>{title}</Link>
    </motion.div>
  );
};
