import Link from "next/link";
import { React, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import { useBookingStore } from "@/providers/bookingProvider";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [toggleHotelsState, setToggleHotelsState] = useState(false);
  const toggleMenu = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const bookingState = useBookingStore((state) => state.bookingState);
  const router = useRouter();
  const pathname = usePathname();

  const scrollToContact = () => {
    if (pathname !== "/") {
      router.push("/#contact");
    } else {
      document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
    }
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
    <header className="w-full shadow">
      <nav className="w-full flex lg:flex-col justify-between lg:justify-center items-center py-4 lg:py-6 px-6 bg-white">
        <div className="flex items-center gap-[1ch]">
          <Link href="/">
            <img
              src="/assets/logo.png"
              width={"100%"}
              height={"auto"}
              alt="logo"
              className="w-20 lg:w-36 xl:w-40 lg:ml-4"
            />
          </Link>
        </div>
        <div className="hidden lg:flex items-center space-x-8 mt-8">
          <div className="dropdown dropdown-hover">
            <div
              tabIndex={0}
              role="button"
              className="flex items-center gap-x-1 font-dmSans text-[16px] hover:bg-white text-primaryButton"
            >
              Hotels
              <img
                src="/assets/dropdown.svg"
                alt="dropdown icon"
                className="w-2 h-2 mt-1"
              />
            </div>
            <ul
              tabIndex={0}
              className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-max"
            >
              <li className="hover:bg-primaryButton hover:text-white rounded-lg">
                <Link
                  href="/hilton-al-habtoor-city"
                  className="font-dmSans text-lg"
                >
                  Hilton Al Habtoor City
                </Link>
              </li>
              <li className="hover:bg-primaryButton hover:text-white rounded-lg">
                <Link href="/habtoor-palace" className="font-dmSans text-lg">
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
          </div>
          <div className="rounded-lg">
            <span
              onClick={scrollToContact}
              className="font-dmSans text-[16px] hover:bg-white text-primaryButton cursor-pointer"
            >
              Contact
            </span>
          </div>
          <div className="indicator rounded-lg">
            <span className="indicator-item badge bg-[#C5E898] font-dmSans">
              {bookingState.items.length}
            </span>
            <Link
              href="/my-bookings"
              className="font-dmSans text-[16px] hover:bg-white text-primaryButton [active:bg-white]"
            >
              My Bookings
            </Link>
          </div>
        </div>
        <div className="flex items-center space-x-4 lg:hidden">
          <div className="indicator">
            <span className="indicator-item badge bg-[#C5E898] font-dmSans">
              {bookingState.items.length}
            </span>
            <Link href="/my-bookings">
              <svg
                width="26px"
                height="26px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M6.29977 5H21L19 12H7.37671M20 16H8L6 3H3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z"
                    stroke="#000000"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />{" "}
                </g>
              </svg>
            </Link>
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
        </div>
      </nav>
      <AnimatePresence>
        {open && !toggleHotelsState && (
          <motion.div
            variants={menuVars}
            initial="initial"
            animate="animate"
            exit="exit"
            className="z-20 absolute left-0 top-0 w-full h-screen origin-top bg-black text-white p-10"
          >
            <div className="flex h-full flex-col">
              <div className="flex justify-end rounded-full py-1 px-4">
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
                className="z-20 flex flex-col h-screen mt-24 font-lora items-center gap-4 gap-y-6"
              >
                <div className="overflow-hidden">
                  <motion.div
                    variants={mobileLinkVars}
                    className="text-3xl font-dmSans font-semibold uppercase text-white"
                  >
                    <Link href="/my-bookings">My Bookings</Link>
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
                    <span onClick={scrollToContact}>Contact</span>
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
            className="absolute z-20 left-0 top-0 w-full h-screen origin-top bg-black text-white p-10"
          >
            <div className="flex h-full flex-col">
              <div className="flex justify-end py-1 px-4">
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
                className="z-24 flex flex-col h-full mt-24 font-lora items-center gap-4 gap-y-6"
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
