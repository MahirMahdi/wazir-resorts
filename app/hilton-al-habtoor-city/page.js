"use client";

import {
  DetailRoomCard,
  CustomLeftArrow,
  CustomRightArrow,
  DetailAccordion,
} from "@/components/cards";
import FilterBar from "@/components/filterBar";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Toast from "@/components/toasts";
import { fetchHotelPrices, filterAndSort, hilton } from "@/data";
import { useBookingStore } from "@/providers/bookingProvider";
import img from "next/image";
import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
export default function Hilton() {
  const [pricesList, setPricesList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const bookingState = useBookingStore((state) => state.bookingState);
  const updateBookingStore = useBookingStore(
    (state) => state.updateBookingStore
  );
  // const [date, setDate] = useState({
  //   startDate: null,
  //   endDate: null,
  // });
  // const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // const [isDropdownHovered, setDropdownHovered] = useState(false);
  // const handlePriceSort = (type) => {
  //   const newBookingState = { ...bookingState, filter: type };
  //   setIsDropdownOpen(false);
  //   setDropdownHovered(false);
  //   updateBookingStore(newBookingState);
  // };
  useEffect(() => {
    async function updateHotelPrices() {
      const pricesList = await fetchHotelPrices(
        "Hilton Al Habtoor City",
        bookingState.check_out
      );
      setPricesList(pricesList);
    }

    bookingState.check_out && updateHotelPrices();
  }, [bookingState.check_out]);

  useEffect(() => {
    const filteredLists = filterAndSort(
      bookingState.filter,
      bookingState.price_from,
      bookingState.price_to,
      pricesList
    );
    setFilteredList(filteredLists);
  }, [bookingState, pricesList]);

  const handleDate = (date) => {
    setDate(date);
    updateBookingStore({
      ...bookingState,
      check_in: date.startDate,
      check_out: date.endDate,
    });
  };

  const handleBookingSucces = () => {
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
    }, 1500);
  };

  return (
    <main className="w-full flex min-h-screen flex-col">
      <div className="sticky top-0 z-50 bg-white w-full">
        <Navbar />
      </div>
      {bookingSuccess && <Toast />}
      <section className="w-full py-6 lg:py-8 flex flex-col items-center">
        <img
          alt="hilton-logo"
          src={hilton.logo}
          className="h-20 md:h-24 lg:h-32"
        />
        <p className="mt-4 text-[12px] md:text-[16px] font-dmSans text-center md:w-2/3 lg:w-2/5 font-medium text-slate-700 tracking-normal leading-6">
          {hilton.subheadline}
        </p>
        <div className="w-full mt-6 py-4">
          <Carousel
            additionalTransfrom={0}
            arrows
            customRightArrow={<CustomRightArrow />}
            customLeftArrow={<CustomLeftArrow />}
            autoPlaySpeed={3000}
            centerMode={true}
            className=""
            containerClass="bg-white"
            dotListClass=""
            draggable
            focusOnSelect={false}
            infinite
            itemClass=""
            keyBoardControl
            minimumTouchDrag={80}
            pauseOnHover
            renderArrowsWhenDisabled={false}
            renderButtonGroupOutside={false}
            renderDotsOutside={false}
            responsive={{
              desktop: {
                breakpoint: {
                  max: 3000,
                  min: 1220,
                },
                items: 3,
              },
              mobile: {
                breakpoint: {
                  max: 911,
                  min: 0,
                },
                items: 1,
              },
              tablet: {
                breakpoint: {
                  max: 1219,
                  min: 912,
                },
                items: 2,
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
            {hilton?.room_types.map((room) => (
              <DetailRoomCard
                key={room.name}
                discount={room.discount}
                imagePath={room.images[0]}
                hotelName={room.hotelName}
                roomName={room.name}
              />
            ))}
          </Carousel>
        </div>
        {/*Description starts */}
        <div className="w-full px-6 md:w-4/5 lg:w-3/5 mt-8">
          <p className="text-[12px] md:text-[16px] font-dmSans font-medium text-slate-700 tracking-normal leading-6">
            Indulge and relax within a tranquil oasis on the banks of Dubai
            Water Canal in the heart of the city. The 44-story Hilton Dubai Al
            Habtoor City carries the influence of the Art Deco movement and a
            myriad of colors and textures. The 1,004 rooms and suites are
            beautifully designed to provide a lively experience to guests
            whether traveling for leisure or business.
          </p>
          <p className="mt-8 text-[12px] md:text-[16px] font-dmSans font-medium text-slate-700 tracking-normal leading-6">
            At the Hilton Al Habtoor City enjoy world-class global gourmet
            dining, opulent accommodations, and top-shelf premium liquors.
            Indulge in a pampering experience with our personalized concierge
            services, private chef, laundry service, private golf cart, gourmet
            BBQ grill and so much more.
          </p>
          <p className="mt-8 lg:mt-12 text-[12px] md:text-[16px] font-dmSans font-semibold text-slate-700 tracking-normal leading-6">
            Allow yourself to be enchanted by the breath-taking views and enjoy
            a new way to experience paradise!
          </p>

          {/*Description ends */}

          <div className="mt-8 lg:mt-12 w-full grid grid-cols-2 gap-4">
            <div>
              <img
                className="w-full rounded-lg"
                src={hilton.gridImages[0]}
                alt="habtoor-grand-room-type-1"
              />
            </div>
            <div>
              <img
                className="w-full rounded-lg"
                src={hilton.gridImages[1]}
                alt="habtoor-grand-room-type-2"
              />
            </div>
            <div className="col-span-2">
              <img
                className="w-full rounded-lg"
                src={hilton.gridImages[2]}
                alt="habtoor-grand-room-type-3"
              />
            </div>
          </div>
          <div className="mt-16 flex flex-wrap items-center justify-center space-x-4 gap-y-4">
            {hilton.benefits.map((benefit, i) => (
              <div
                key={i}
                className="p-2 px-3 text-sm lg:text-md bg-primaryButton bg-opacity-10 text-primaryButton rounded-full"
              >
                {benefit}
              </div>
            ))}
          </div>
          <div className="mt-12">
            <FilterBar />
          </div>
          <div className="mt-8 space-y-4">
            {pricesList.length === 0 &&
              hilton.room_types.map((room) => (
                <DetailAccordion
                  key={room.name}
                  room={room}
                  bookingSuccess={handleBookingSucces}
                  hotelName={"Hilton Al Habtoor City"}
                  pricesList={null}
                />
              ))}
            {pricesList.length > 0 &&
              filteredList.map((item) => (
                <DetailAccordion
                  key={item.RoomName}
                  room={
                    hilton.room_types.filter(
                      (room) => room.name === item.RoomName
                    )[0]
                  }
                  bookingSuccess={handleBookingSucces}
                  hotelName={"Hilton Al Habtoor City"}
                  pricesList={item}
                />
              ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
