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
import { fetchHotelPrices, filterAndSort, metropolitanHotel } from "@/data";
import { useBookingStore } from "@/providers/bookingProvider";
import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Datepicker from "react-tailwindcss-datepicker";
export default function MetropolitanHotel() {
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
        "Metropolitan Hotel",
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
        <img src={metropolitanHotel.logo} className="h-20 md:h-24 lg:h-32" />
        <p className="mt-4 text-[12px] md:text-[16px] font-dmSans text-center md:w-2/3 lg:w-2/5 font-medium text-slate-700 tracking-normal leading-6">
          {metropolitanHotel.subheadline}
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
            {metropolitanHotel?.room_types.map((room) => (
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
            Built in 1979, the original Metropolitan Hotel was famed for being
            one of Dubai&apos;s first hotels and an institution in itself.
            &apos;The Met&apos;, as it became affectionately known, reigned as a
            treasured &apos;home away from home&apos; amongst local and
            international guests alike for over 20 years.
          </p>
          <p className="mt-8 text-[12px] md:text-[16px] font-dmSans font-medium text-slate-700 tracking-normal leading-6">
            A vibrant and refined 4* property opening anew in 2016, the
            Metropolitan Hotel occupies one of Dubai&apos;s most central and
            sought-after locations alongside the Sheik Zayed Road, making it an
            ideal location for guests seeking contemporary comfort in the heart
            of the city. Welcoming guests with the finest in modern
            Middle-Eastern hospitality, the hotel combines sleek design with a
            boutique, the neighborhood feels creating a truly unique &apos;home
            away from home&apos; to both business and leisure guests alike.
          </p>
          <p className="mt-8 font-dmSans text-lg lg:text-2xl font-semibold">
            AN IDEAL LOCATION IN THE CENTRE OF THE CITY
          </p>
          <p className="mt-4 text-[12px] md:text-[16px] font-dmSans font-medium text-slate-700 tracking-normal leading-6">
            The Metropolitan Hotel is ideally located only minutes away from
            some of the city&apos;s key attractions including The Mall of the
            Emirates and Jumeirah Beach. It also offers superb connectivity for
            business travelers to corporate headquarters, international
            conference centers and is a 20 to 35-minute drive from Dubai
            International and Al Maktoum International Airports.
          </p>
          <p className="mt-8 font-dmSans text-lg lg:text-2xl font-semibold">
            SERVICES
          </p>
          <p className="mt-4 text-[12px] md:text-[16px] font-dmSans font-medium text-slate-700 tracking-normal leading-6">
            Complimentary Wi-fi Access, 24 Hour In-Room Dining, Fitness
            Facilities, 5 Restaurants and Bars, Rooftop Swimming Pool, Shuttle
            Bus Services to Local Attractions, Inclusive Pool & Beach Access at
            the Habtoor Grand, Guest Dining and Entertainment Packages at
            Habtoor Hospitality venues*.
          </p>
          <p className="mt-8 font-dmSans text-lg lg:text-2xl font-semibold">
            LEISURE AND DINING
          </p>
          <p className="mt-4 text-[12px] md:text-[16px] font-dmSans font-medium text-slate-700 tracking-normal leading-6">
            The hotel plays host to a variety of indoor and alfresco dining
            options, a rooftop swimming pool, fitness and spa facilities, as
            well as access to the 5* pool and beach facilities at our beautiful
            sister property The Habtoor Grand Resort, Autograph Collection, on
            Jumeirah Beach.
          </p>
          <p className="mt-4 text-[12px] md:text-[16px] font-dmSans font-medium text-slate-700 tracking-normal leading-6">
            With a choice of five restaurants and bars, an array of charming yet
            relaxed dining and drinking options await guests, including our
            traditional English pub; The Red Lion, an authentic neighborhood
            Italian – Don Corleone, Al Safa; serving up global cuisine, Al Sheif
            Shisha Lounge for authentic middle eastern light bites.
          </p>
          <p className="mt-8 lg:mt-12 text-[12px] md:text-[16px] font-dmSans font-semibold text-slate-700 tracking-normal leading-6">
            At the Metropolitan Hotel, we curate luxe vacations for our worldly
            travellers!
          </p>

          {/*Description ends */}

          <div className="mt-8 lg:mt-12 w-full grid grid-cols-2 gap-4">
            <div>
              <img
                className="w-full rounded-lg"
                src={metropolitanHotel.gridImages[0]}
                alt="habtoor-grand-room-type-1"
              />
            </div>
            <div>
              <img
                className="w-full rounded-lg"
                src={metropolitanHotel.gridImages[1]}
                alt="habtoor-grand-room-type-2"
              />
            </div>
            <div className="col-span-2">
              <img
                className="w-full rounded-lg"
                src={metropolitanHotel.gridImages[2]}
                alt="habtoor-grand-room-type-3"
              />
            </div>
          </div>
          <div className="mt-16 flex flex-wrap items-center justify-center space-x-4 gap-y-4">
            {metropolitanHotel.benefits.map((benefit, i) => (
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
              metropolitanHotel.room_types.map((room) => (
                <DetailAccordion
                  key={room.name}
                  room={room}
                  bookingSuccess={handleBookingSucces}
                  hotelName={"Metropolitan Hotel"}
                  pricesList={null}
                />
              ))}
            {pricesList.length > 0 &&
              filteredList.map((item) => (
                <DetailAccordion
                  key={item.RoomName}
                  room={
                    metropolitanHotel.room_types.filter(
                      (room) => room.name === item.RoomName
                    )[0]
                  }
                  bookingSuccess={handleBookingSucces}
                  hotelName={"Metropolitan Hotel"}
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
