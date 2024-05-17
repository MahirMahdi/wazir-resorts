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
import { fetchHotelPrices, filterAndSort, habtoorGrand } from "@/data";
import { useBookingStore } from "@/providers/bookingProvider";
import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Datepicker from "react-tailwindcss-datepicker";
export default function HabtoorGrand() {
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
        "Habtoor Grand",
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
        <img src={habtoorGrand.logo} className="h-20 md:h-24 lg:h-32" />
        <p className="mt-4 text-[12px] md:text-[16px] font-dmSans text-center md:w-2/3 lg:w-2/5 font-medium text-slate-700 tracking-normal leading-6">
          {habtoorGrand.subheadline}
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
            {habtoorGrand.room_types.map((room) => (
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
            The hotel is just 25 minutes away from Dubai International Airport
            and just 30 minutes from Al Maktoum International Airport and is
            surrounded by the Arabian Gulf, shopping malls and Dubai&apos;s most
            featured restaurants.
          </p>
          <div className="mt-8 space-y-2">
            <span className="font-dmSans text-xl lg:text-2xl font-semibold">
              IN-ROOM FACILITIES
            </span>
            <ul className="list-disc ml-4 space-y-2">
              {[
                "Flat-screen satellite television, with USB port and IPTV",
                "Individually controlled air-conditioning",
                "Private bath with walk-in showers",
                "High-speed Wi-Fi internet access",
                "In-room safe and minibar",
                "Hairdryer",
                "Same-day laundry service",
                "24-hour room service",
              ].map((item, i) => (
                <li
                  key={i}
                  className="text-[12px] md:text-[16px] font-dmSans text-slate-700"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-8 space-y-2">
            <span className="font-dmSans text-xl lg:text-2xl font-semibold">
              ADDITIONAL AMENITIES FOR SUITE AND CLUB ROOM GUESTS
            </span>
            <ul className="list-disc ml-4 space-y-2">
              {[
                "Priority check-in and late check-out at 2 pm",
                "Complimentary internet access throughout your stay",
                "Buffet breakfast at Habtoor Grand Club Lounge or Al Dhiyafa Grand Kitchen, from 6 am to 10 am",
                "Afternoon tea available from 3 pm to 5 pm",
                "Pre-dinner drinks served from 6 pm to 8 pm",
                "Tea, coffee, soft drinks and canapés at Habtoor Grand Club Lounge, from 11 am till 11 pm",
                "Complimentary use of meeting room facilities for one hour per day",
                "Complimentary use of Habtoor Grand Club Lounge private dining room for up to eight guests",
                "A selection of local and international newspapers and magazines available daily",
                "Same-day laundry service",
                "24-hour room service",
              ].map((item, i) => (
                <li
                  key={i}
                  className="text-[12px] md:text-[16px] font-dmSans text-slate-700"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-8 lg:mt-12 text-[12px] md:text-[16px] font-dmSans font-semibold text-slate-700 tracking-normal leading-6">
            Allow yourself to be enchanted by the breath-taking views and enjoy
            a new way to experience paradise!
          </p>

          {/*Description ends */}

          <div className="mt-8 lg:mt-12 w-full grid grid-cols-2 gap-4">
            <div>
              <img
                className="w-full rounded-lg"
                src={habtoorGrand.room_types[3].images[2]}
                alt="habtoor-grand-room-type-1"
              />
            </div>
            <div>
              <img
                className="w-full rounded-lg"
                src={habtoorGrand.room_types[2].images[4]}
                alt="habtoor-grand-room-type-2"
              />
            </div>
            <div className="col-span-2">
              <img
                className="w-full rounded-lg"
                src={habtoorGrand.room_types[1].images[4]}
                alt="habtoor-grand-room-type-3"
              />
            </div>
          </div>
          <div className="mt-16 flex flex-wrap items-center justify-center space-x-4 gap-y-4">
            {habtoorGrand.benefits.map((benefit, i) => (
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
              habtoorGrand.room_types.map((room) => (
                <DetailAccordion
                  key={room.name}
                  room={room}
                  bookingSuccess={handleBookingSucces}
                  hotelName={"Habtoor Grand"}
                  pricesList={null}
                />
              ))}
            {pricesList.length > 0 &&
              filteredList.map((item) => (
                <DetailAccordion
                  key={item.RoomName}
                  room={
                    habtoorGrand.room_types.filter(
                      (room) => room.name === item.RoomName
                    )[0]
                  }
                  bookingSuccess={handleBookingSucces}
                  hotelName={"Habtoor Grand"}
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
