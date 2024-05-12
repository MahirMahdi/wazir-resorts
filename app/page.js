"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Navbar from "@/components/navbar";
import Datepicker from "react-tailwindcss-datepicker";
import { useBookingStore } from "@/providers/bookingProvider";
import { hotels, roomsList, hotelsList, allHotels, hilton } from "@/data";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import HotelRoomCard, {
  HotelCard,
  CustomLeftArrow,
  CustomRightArrow,
  DetailRoomCard,
} from "@/components/cards";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Footer from "@/components/footer";

function generateRandomNumber() {
  return Math.floor(Math.random() * 20);
}

export default function Home() {
  const router = useRouter();
  const [isHotelsDropdownOpen, setIsHotelsDropdownOpen] = useState(false);
  const [hotelsDropdownHovered, setHotelsDropdownHovered] = useState(false);
  const [isRoomsDropdownOpen, setIsRoomsDropdownOpen] = useState(false);
  const [roomsDropdownHovered, setRoomsDropdownHovered] = useState(false);
  const bookingState = useBookingStore((state) => state.bookingState);
  const updateBookingStore = useBookingStore(
    (state) => state.updateBookingStore
  );
  const [mobileDate, setMobileDate] = useState({
    startDate: null,
    endDate: null,
  });
  const [checkIn, setCheckIn] = useState({
    startDate: "2024-06-24",
    endDate: "2024-06-24",
  });
  const [checkOut, setCheckOut] = useState({
    startDate: "2024-06-28",
    endDate: "2024-06-28",
  });
  const sectionRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [hoverImage, setHoverImage] = useState(roomsList[0].images[0]);
  const [contactForm, setContactForm] = useState({
    Name: "",
    Email: "",
    Message: "",
  });
  const [contactFormError, setContactFormError] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleHover = () => {
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      const randomNumber = generateRandomNumber();
      setHoverImage(roomsList[randomNumber].images[0]);
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener("mouseenter", handleHover);
      section.addEventListener("mouseleave", handleMouseLeave);
      section.addEventListener("mousemove", handleMouseMove);

      return () => {
        section.removeEventListener("mouseenter", handleHover);
        section.removeEventListener("mouseleave", handleMouseLeave);
        section.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, [sectionRef]);

  const handleMobileDatePicker = (newmobileDate) => {
    setMobileDate(newmobileDate);
    updateBookingStore({
      ...bookingState,
      check_in: newmobileDate.startDate,
      check_out: newmobileDate.endDate,
    });
  };

  const handleCheckIn = (date) => {
    setCheckIn(date);
    updateBookingStore({ ...bookingState, check_in: date.startDate });
  };

  const handleCheckOut = (date) => {
    setCheckOut(date);
    updateBookingStore({ ...bookingState, check_out: date.startDate });
  };

  const handleHotel = (name) => {
    const newBookingState = { ...bookingState, hotel: name, room_type: "" };
    setIsHotelsDropdownOpen(false);
    setHotelsDropdownHovered(false);
    updateBookingStore(newBookingState);
  };

  const handleRoom = (name) => {
    const newBookingState = { ...bookingState, room_type: name };
    setIsRoomsDropdownOpen(false);
    setRoomsDropdownHovered(false);
    updateBookingStore(newBookingState);
  };

  const handleContactForm = (e) => {
    const input = e.target;
    setContactForm({ ...contactForm, [input.name]: input.value });
  };

  const submitContactForm = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_CONTACT_GOOGLE_SHEET_URL,
        {
          method: "POST",
          body: new URLSearchParams(contactForm),
        }
      );

      if (response.ok) {
        const responseData = await response.text();
        router.push("/form_submission_success");
      } else {
        setContactFormError(true);
        setTimeout(() => {
          setContactFormError(false);
        }, 1500);
      }
    } catch (error) {
      setContactFormError(true);
      setTimeout(() => {
        setContactFormError(false);
      }, 1500);
    }
  };

  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  // Update cursor position on mouse move
  const updateCursorPosition = (e) => {
    setCursorPosition({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    window.addEventListener("mousemove", updateCursorPosition);
    return () => {
      window.removeEventListener("mousemove", updateCursorPosition);
    };
  }, []);

  return (
    <main className="w-full flex min-h-screen flex-col">
      {contactFormError && (
        <div className="z-20 toast toast-top toast-end">
          <div className="alert alert-error text-white ">
            <span>Unexpected error. Please try again.</span>
          </div>
        </div>
      )}
      <Navbar />
      <section className="relative w-full flex flex-col items-center">
        <div className="w-full h-[300px] bg-[url('/assets/hero-image.jpg')] bg-cover bg-no-repeat bg-center opacity-30"></div>
        <h1 className="absolute mt-12 w-full text-black text-center grid">
          Your Gateway to
          <br />
          Experiencing Dubai
        </h1>
        {/* Mobile booking starts */}
        <div className="lg:hidden mt-[-6.5rem] w-full flex flex-col items-center space-y-2 z-10 px-8">
          <label className="w-full py-2 pl-8 text-sm uppercase font-dmSans font-light rounded-full bg-containerColor text-primaryButton flex items-center gap-x-4">
            Hotel
            <div className="w-full dropdown dropdown-bottom">
              <div
                tabIndex={0}
                onClick={() => setIsHotelsDropdownOpen(true)}
                className="btn hover:bg-containerColor hover:opacity-80 p-0 bg-containerColor border-0 normal-case shadow-none text-primaryButton text-[16px] lg:text-xl font-dmSans font-normal w-fit appearance-none"
              >
                {bookingState.hotel ? bookingState.hotel : "Select a hotel"}
              </div>
              {isHotelsDropdownOpen && (
                <ul
                  tabIndex={0}
                  className="dropdown-content bg-black text-white border border-neutral-800 z-[1] menu p-2 shadow bg-base-100 rounded-box w-full text-black"
                >
                  {hotels.map((hotel) => (
                    <li
                      key={hotel}
                      className="hover:bg-primaryButton rounded-lg font-dmSans p-2"
                      onClick={() => handleHotel(hotel)}
                    >
                      {hotel}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </label>
          <label className="w-full py-5 pl-8 px-4 text-sm uppercase font-dmSans font-light rounded-full bg-containerColor text-primaryButton flex items-center gap-x-6">
            Dates
            <Datepicker
              value={mobileDate}
              useRange={false}
              onChange={handleMobileDatePicker}
              displayFormat="DD/MM"
              showShortcuts={true}
              separator="-"
              inputClassName="text-[16px] lg:text-xl font-dmSans placeholder:text-primaryButton text-primaryButton bg-containerColor focus:outline-none"
              placeholder="24/06 - 29/06"
              toggleClassName="hidden"
            />
          </label>

          <label className="w-full py-2 pl-8 text-sm uppercase font-dmSans font-light rounded-full focus:ring-1 focus:ring-white bg-containerColor text-primaryButton border border-white flex items-center gap-x-4 px-2">
            Room
            <div className="w-full dropdown dropdown-bottom">
              <div
                tabIndex={0}
                onClick={() => setIsRoomsDropdownOpen(true)}
                className="btn text-left hover:bg-containerColor hover:opacity-80 p-0 bg-containerColor border-0 normal-case shadow-none text-primaryButton text-[16px] lg:text-xl font-dmSans font-normal w-fit appearance-none"
              >
                {bookingState.room_type
                  ? bookingState.room_type
                  : "Select a room"}
              </div>
              {isRoomsDropdownOpen && (
                <ul
                  tabIndex={0}
                  className="dropdown-content bg-black text-white border border-neutral-800 z-[1] menu p-2 shadow bg-base-100 rounded-box w-full text-black"
                >
                  {bookingState.hotel ? (
                    allHotels
                      .filter((hotel) => hotel.name === bookingState.hotel)[0]
                      .room_types.map((room) => (
                        <li
                          key={room.name}
                          className="hover:bg-primaryButton rounded-lg font-dmSans p-2"
                          onClick={() => handleRoom(room.name)}
                        >
                          {room.name}
                        </li>
                      ))
                  ) : (
                    <li className="hover:bg-primaryButton rounded-lg font-dmSans p-2">
                      Select a hotel
                    </li>
                  )}
                </ul>
              )}
            </div>
          </label>
          <span
            onClick={() => router.push("/booking")}
            className="mt-12 rounded-full grid place-items-center w-16 cursor-pointer h-16"
          >
            <img
              src="/assets/button_submit.svg"
              width={"100%"}
              height={"100%"}
            />
          </span>
        </div>
        {/* Mobile booking ends */}

        {/* Desktop booking starts */}

        <div className="hidden relative mt-[-3rem] lg:flex items-center justify-around rounded-3xl bg-containerColor lg:w-[75%] xl:w-3/5 py-2 px-4">
          <span className="w-1/4 mt-2 px-2 pb-2">
            <span className="font-dmSans text-[14px] uppercase font-medium text-primaryButton opacity-90">
              Hotel
            </span>
            <div
              className="w-full dropdown dropdown-hover"
              onMouseEnter={() => setHotelsDropdownHovered(true)}
              onMouseLeave={() => setHotelsDropdownHovered(false)}
            >
              <div
                tabIndex={0}
                className="flex items-center gap-x-1 text-left hover:bg-containerColor hover:opacity-80 p-0 bg-containerColor border-0 normal-case shadow-none text-lg font-dmSans font-normal w-fit appearance-none"
              >
                {bookingState.hotel ? bookingState.hotel : "Select a hotel"}
                <img
                  src="/assets/dropdown.svg"
                  alt="dropdown icon"
                  className="w-2 h-2 mt-[.5px]"
                />
              </div>
              {(isHotelsDropdownOpen || hotelsDropdownHovered) && (
                <ul
                  tabIndex={0}
                  id="dropdownContainerDesktop"
                  className="dropdown-content bg-black text-white border border-neutral-800 z-[1] menu p-2 shadow bg-base-100 rounded-box w-full text-black"
                >
                  {hotels.map((hotel) => (
                    <li
                      key={hotel}
                      className="hover:bg-primaryButton rounded-lg font-dmSans p-2"
                      onClick={() => handleHotel(hotel)}
                    >
                      {hotel}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </span>
          <div className="divider divider-horizontal p-2" />
          <span className="w-1/4 space-y-2 px-2">
            <span className="font-dmSans text-[14px] uppercase font-medium text-primaryButton opacity-90">
              Check in
            </span>
            <Datepicker
              value={
                bookingState?.check_in
                  ? {
                      startDate: bookingState.check_in,
                      endDate: bookingState.check_in,
                    }
                  : checkIn
              }
              minDate={new Date()}
              popoverDirection="up"
              asSingle={true}
              useRange={false}
              onChange={handleCheckIn}
              displayFormat="DD/MM"
              showShortcuts={true}
              separator="-"
              inputClassName="text-lg w-full font-dmSans focus:outline-none bg-containerColor cursor-pointer hover:opacity-80"
              toggleClassName="hidden"
            />
          </span>
          <div className="divider divider-horizontal p-2" />
          <span className="w-1/4 space-y-2 px-2">
            <span className="font-dmSans text-[14px] uppercase font-medium text-primaryButton opacity-90">
              Check out
            </span>
            <Datepicker
              value={
                bookingState?.check_out
                  ? {
                      startDate: bookingState.check_out,
                      endDate: bookingState.check_out,
                    }
                  : checkOut
              }
              popoverDirection="up"
              asSingle={true}
              useRange={false}
              onChange={handleCheckOut}
              minDate={new Date(checkIn.startDate)}
              displayFormat="DD/MM"
              showShortcuts={true}
              separator="-"
              inputClassName="w-full bg-containerColor text-lg font-dmSans focus:outline-none cursor-pointer hover:opacity-80"
              toggleClassName="hidden"
            />
          </span>
          <div className="divider divider-horizontal p-2" />
          <span className="w-1/4 mt-2 px-2">
            <span className="font-dmSans text-[14px] uppercase font-medium text-primaryButton opacity-90">
              Room Type
            </span>
            <div
              className="w-full dropdown dropdown-hover"
              onMouseEnter={() => setRoomsDropdownHovered(true)}
              onMouseLeave={() => setRoomsDropdownHovered(false)}
            >
              <div
                tabIndex={0}
                className="flex items-center gap-x-1 text-left hover:bg-containerColor hover:opacity-80 p-0 bg-containerColor border-0 normal-case shadow-none text-lg font-dmSans font-normal w-fit appearance-none"
              >
                {bookingState.room_type
                  ? bookingState.room_type
                  : "Select a room"}
                <img
                  src="/assets/dropdown.svg"
                  alt="dropdown icon"
                  className="w-2 h-2 mt-[.5px]"
                />
              </div>
              {(isRoomsDropdownOpen || roomsDropdownHovered) && (
                <ul
                  tabIndex={0}
                  id="dropdownContainerDesktop"
                  className="dropdown-content bg-black text-white border border-neutral-800 z-[1] menu p-2 shadow bg-base-100 rounded-box w-full text-black"
                >
                  {bookingState.hotel ? (
                    allHotels
                      .filter((hotel) => hotel.name === bookingState.hotel)[0]
                      .room_types.map((room) => (
                        <li
                          key={room.name}
                          className="hover:bg-primaryButton rounded-lg font-dmSans p-2"
                          onClick={() => handleRoom(room.name)}
                        >
                          {room.name}
                        </li>
                      ))
                  ) : (
                    <li className="hover:bg-primaryButton rounded-lg font-dmSans p-2">
                      Select a hotel
                    </li>
                  )}
                </ul>
              )}
            </div>
          </span>
          <span
            onClick={() => router.push("/booking")}
            className="rounded-full grid place-items-center w-16 h-16 cursor-pointer bg-primaryButton absolute right-[-24px]"
          >
            <img
              src="/assets/button_submit.svg"
              width={"100%"}
              height={"100%"}
            />
          </span>
        </div>
        {/* Desktop booking ends */}

        <div className="w-full mt-12 flex items-center justify-around md:justify-center md:space-x-16 pb-8 lg:pb-4">
          <img
            src="/assets/habtoor-palace.png"
            alt="habtoor-palace-logo"
            className="h-12 md:h-16 lg:h-24"
          />
          <img
            src="/assets/metropolitan-hotel.png"
            alt="habtoor-palace-logo"
            className="h-12 md:h-16 lg:h-24"
          />
          <img
            src="/assets/hilton.png"
            alt="habtoor-palace-logo"
            className="h-12 md:h-16 lg:h-24"
          />
          <img
            src="/assets/mirage.png"
            alt="habtoor-palace-logo"
            className="h-12 md:h-16 lg:h-24"
          />
        </div>
      </section>
      <section
        ref={sectionRef}
        className="hidden relative lg:grid py-12 lg:place-items-center"
      >
        {isHovered && (
          <img
            src={hoverImage}
            style={{
              top: mousePosition.y,
              left: mousePosition.x,
              transform: "translate(-50%, -50%)",
            }}
            className="fixed pointer-events-none lg:w-[225px] lg:h-[250px] z-10 rounded-lg"
          />
        )}
        <h2 className="text-center text-primaryButton font-medium">
          &quot;Once a year, go some place you&apos;ve never been before&quot;{" "}
        </h2>
        <p className="mt-4 font-dmSans font-medium text-[19px] uppercase text-center text-primaryButton">
          Dalai Lama
        </p>
        <p className="mt-12 text-[18px] font-dmSans text-center w-2/5 font-medium text-slate-500 tracking-normal leading-6">
          Wazir Resorts is commited to redefining your stay in Dubai.
          <br /> Explore our meticulously curated selection of luxurious hotels,
          ensuring you and guests experience the epitome of hospitality in this
          dynamic city.
        </p>
      </section>
      <section className="py-4 w-full p-6 lg:px-12 flex flex-col items-center">
        <h1 className="text-center font-extrabold">
          Get the <br />
          Best Prices!
        </h1>
        <p className="mt-4 text-[18px] font-dmSans text-center font-medium text-slate-500 tracking-normal leading-6">
          Our discounts are aligned
          <br />
          with booking.com prices
        </p>
        <div className="mt-6 py-4 w-full">
          <Carousel
            additionalTransfrom={0}
            arrows
            customRightArrow={<CustomRightArrow />}
            customLeftArrow={<CustomLeftArrow />}
            autoPlaySpeed={3000}
            centerMode={false}
            className=""
            containerClass="container py-4 bg-white"
            dotListClass=""
            draggable
            focusOnSelect={false}
            infinite
            itemClass=""
            keyBoardControl
            minimumTouchDrag={80}
            partialVisible
            pauseOnHover
            renderArrowsWhenDisabled={false}
            renderButtonGroupOutside={false}
            renderDotsOutside={false}
            responsive={{
              desktop: {
                breakpoint: {
                  max: 3000,
                  min: 1440,
                },
                items: 3,
                partialVisibilityGutter: 40,
              },
              mobile: {
                breakpoint: {
                  max: 767,
                  min: 0,
                },
                items: 1,
                partialVisibilityGutter: 30,
              },
              tablet: {
                breakpoint: {
                  max: 1439,
                  min: 768,
                },
                items: 2,
                partialVisibilityGutter: 30,
              },
            }}
            rewind={false}
            rewindWithAnimation={false}
            rtl={false}
            shouldResetAutoplay
            showDots={false}
            sliderClass=""
            slidesToSlide={1}
            swipeable
          >
            {roomsList.map((room) => (
              <HotelRoomCard
                key={room.name}
                link={room.link}
                discount={room.discount}
                imagePath={room.images[0]}
                hotelName={room.hotelName}
                roomName={room.name}
              />
            ))}
          </Carousel>
        </div>
      </section>
      <section className="mt-2 py-4 w-full p-6 lg:px-12 flex flex-col items-center">
        <h1 className="text-center font-extrabold">
          Hotels to <br />
          Discover?
        </h1>
        <p className="mt-4 text-[18px] font-dmSans text-center font-medium text-slate-500 tracking-normal leading-6">
          Take a look at our
          <br />
          curated selection of hotels
        </p>
        <div className="mt-12 py-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {hotelsList.map((hotel) => (
            <HotelCard
              key={hotel.name}
              link={hotel.link}
              hotelName={hotel.name}
              benefits={hotel.benefits}
              imagePath={hotel.image}
            />
          ))}
        </div>
      </section>
      <section className="mt-8 py-4 w-full p-6 lg:px-12 flex flex-col items-center">
        <div className="w-full md:w-4/5 lg:w-[70%] grid place-items-center">
          <h1 className="text-center font-extrabold">
            Say Goodbye to the <br />
            Hassle of Overpriced Stays
          </h1>
          <p className="mt-8 text-[16px] md:text-[18px] font-dmSans text-center lg:w-3/5 font-medium text-slate-500 tracking-normal leading-6">
            Wazir Resorts is commited to redefining your stay in Dubai. Explore
            our meticulously curated selection of luxurious hotels, ensuring you
            and guests experience the epitome of hospitality in this dynamic
            city.
          </p>
          <form
            id="contact"
            onSubmit={(e) => submitContactForm(e)}
            className="form relative w-full bg-containerColor mt-32 rounded-[3.5rem] p-8 lg:p-12 grid"
          >
            <h1 className="text-black text-center font-bold">
              Any Problem? <br />
              Contact Us
            </h1>
            <div className="mt-16 space-y-12 pb-24">
              <input
                className="w-full focus:outline-none text-black border-b-2 border-black placeholder:text-black placeholder:font-dmSans bg-transparent py-1"
                placeholder="NAME"
                type="text"
                required={true}
                name="Name"
                onChange={handleContactForm}
                value={contactForm.Name}
              />
              <input
                className="w-full focus:outline-none text-black border-b-2 border-black placeholder:text-black placeholder:font-dmSans bg-transparent py-1"
                placeholder="EMAIL"
                type="email"
                required={true}
                name="Email"
                onChange={handleContactForm}
                value={contactForm.Email}
              />
              <input
                className="w-full focus:outline-none text-black border-b-2 border-black placeholder:text-black placeholder:font-dmSans bg-transparent py-1"
                placeholder="MESSAGE"
                type="text"
                name="Message"
                onChange={handleContactForm}
                value={contactForm.Message}
              />
            </div>

            <button
              type="submit"
              className="disabled:bg-slate-400 disabled:cursor-not-allowed rounded-full grid cursor-pointer place-items-center w-20 h-20  lg:w-24 lg:h-24 bg-black absolute bottom-[-36px] lg:bottom-[-40px] justify-self-center"
            >
              <img
                src="/assets/button_submit.svg"
                width={"100%"}
                height={"100%"}
              />
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </main>
  );
}
