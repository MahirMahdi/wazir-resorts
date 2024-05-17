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
import MultiRangeSlider from "@/components/slider";
import Toast from "@/components/toasts";
import { fetchHotelPrices, filterAndSort, habtoorPalace } from "@/data";
import { useBookingStore } from "@/providers/bookingProvider";
import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Datepicker from "react-tailwindcss-datepicker";
export default function HabtoorPalace() {
  const [pricesList, setPricesList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const bookingState = useBookingStore((state) => state.bookingState);
  const updateBookingStore = useBookingStore(
    (state) => state.updateBookingStore
  );
  const [date, setDate] = useState({
    startDate: null,
    endDate: null,
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownHovered, setDropdownHovered] = useState(false);
  const handlePriceSort = (type) => {
    const newBookingState = { ...bookingState, filter: type };
    setIsDropdownOpen(false);
    setDropdownHovered(false);
    updateBookingStore(newBookingState);
  };
  useEffect(() => {
    async function updateHotelPrices() {
      const pricesList = await fetchHotelPrices(
        "Habtoor Palace",
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
    <main className="w-full flex flex-col overflow-x-hidden">
      <div className="sticky top-0 z-50 bg-white w-full">
        <Navbar />
      </div>
      {bookingSuccess && <Toast />}
      <section className="w-full py-6 lg:py-8 flex flex-col items-center">
        <img src={habtoorPalace.logo} className="h-20 md:h-24 lg:h-32" />
        <p className="mt-4 text-[12px] md:text-[16px] font-dmSans text-center md:w-2/3 lg:w-2/5 font-medium text-slate-700 tracking-normal leading-6">
          {habtoorPalace.subheadline}
        </p>
        <div className="mt-6 py-4 w-full">
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
                // partialVisibilityGutter: 60,
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
                // partialVisibilityGutter: 30,
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
            {habtoorPalace?.room_types?.map((room) => (
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
            With its personalized Butler Service and a palatial experience,
            guests will be spoilt for choice with exclusive access to facilities
            and services available across Al Habtoor City, Dubai&apos;s
            first-ever integrated urban resort.
          </p>
          <p className="mt-8 text-[12px] md:text-[16px] font-dmSans font-medium text-slate-700 tracking-normal leading-6">
            Let us be your guide as you experience a new type of luxury at
            Habtoor Palace, LXR Hotels & Resorts, you&apos;ll want for nothing
            when you stay with us!
          </p>
          <p className="mt-8 text-[12px] md:text-[16px] font-dmSans font-medium text-slate-700 tracking-normal leading-6">
            Silk is the finest and the strongest natural fiber in the world. It
            is the most luxurious and comfortable fabric. It is a protein fiber,
            which is chemically quite similar to the human skin.
          </p>
          <p className="mt-8 text-[12px] md:text-[16px] font-dmSans font-medium text-slate-700 tracking-normal leading-6">
            Silk has impressive moisture wicking properties, keeping you dry and
            comfortable in any climate all year-round.
          </p>
          <p className="mt-8 text-[12px] md:text-[16px] font-dmSans font-medium text-slate-700 tracking-normal leading-6">
            The shimmering appearance of silk is due to the triangular
            prism-like structure of the fiber, which allows the silk cloth to
            refract incoming light at different angles.
          </p>
          <p className="mt-8 text-[12px] md:text-[16px] font-dmSans font-medium text-slate-700 tracking-normal leading-6">
            At Silk Spa, we aim to transfer all these properties in our
            treatment, with facials that allow your skin to refract light and
            body treatments to leave your skin with a radiant glow full of life.
          </p>
          <p className="mt-8 text-[12px] md:text-[16px] font-dmSans font-medium text-slate-700 tracking-normal leading-6">
            An oasis of calm and charm, at Silk Spa, find the perfect balance
            between mind and body, feeling renewed inside and out.
          </p>
          <p className="mt-8 text-[12px] md:text-[16px] font-dmSans font-medium text-slate-700 tracking-normal leading-6">
            We take pride in offering our guests pampering sessions making them
            feel comfortable with our professional team. Our range of luxurious
            treatments and services make for a truly sublime experience.
          </p>

          {/*Description ends */}

          <div className="mt-8 lg:mt-16 w-full grid grid-cols-2 gap-4">
            <div>
              <img
                className="w-full rounded-lg"
                src={habtoorPalace.gridImages[0]}
                alt="habtoor-grand-room-type-1"
              />
            </div>
            <div>
              <img
                className="w-full rounded-lg"
                src={habtoorPalace.gridImages[1]}
                alt="habtoor-grand-room-type-2"
              />
            </div>
            <div className="col-span-2">
              <img
                className="w-full rounded-lg"
                src={habtoorPalace.gridImages[2]}
                alt="habtoor-grand-room-type-3"
              />
            </div>
          </div>
          <div className="mt-16 flex flex-wrap items-center justify-center space-x-4 gap-y-4">
            {habtoorPalace.benefits.map((benefit, i) => (
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
              habtoorPalace.room_types.map((room) => (
                <DetailAccordion
                  key={room.name}
                  room={room}
                  bookingSuccess={handleBookingSucces}
                  hotelName={"Habtoor Palace"}
                  pricesList={null}
                />
              ))}
            {pricesList.length > 0 &&
              filteredList.map((item) => (
                <DetailAccordion
                  key={item.RoomName}
                  room={
                    habtoorPalace.room_types.filter(
                      (room) => room.name === item.RoomName
                    )[0]
                  }
                  bookingSuccess={handleBookingSucces}
                  hotelName={"Habtoor Palace"}
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
