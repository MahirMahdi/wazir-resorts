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
import { fetchHotelPrices, filterAndSort, vHotel } from "@/data";
import { useBookingStore } from "@/providers/bookingProvider";
import Link from "next/link";
import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Datepicker from "react-tailwindcss-datepicker";
export default function VHotel() {
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
        "V Hotel",
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
    <main className="w-full flex flex-col">
      <div className="sticky top-0 z-50 bg-white w-full">
        <Navbar />
      </div>
      {bookingSuccess && <Toast />}
      <section className="w-full py-6 lg:py-8 flex flex-col items-center">
        <img src={vHotel.logo} className="h-20 md:h-24 lg:h-32" />
        <p className="mt-4 text-[12px] md:text-[16px] font-dmSans text-center md:w-2/3 lg:w-2/5 font-medium text-slate-700 tracking-normal leading-6">
          {vHotel.subheadline}
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
            {vHotel.room_types.map((room) => (
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
        <div className="w-full px-6 md:w-4/5 xl:w-3/5 mt-8">
          <p className="font-dmSans text-lg lg:text-2xl font-semibold">
            TREND HAS A NEW DEFINITION
          </p>
          <p className="mt-2 text-[12px] md:text-[16px] font-dmSans font-medium text-slate-700 tracking-normal leading-6">
            The vibes lure you in and the energy amplifies your every moment as
            you are drawn into a stylish hub, all-hours. The fun-seekers and the
            powerful seamlessly blend for work and play. V Hotel straddles the
            best of all worlds &ndash; within proximity of key attractions and
            locales of Downtown and Uptown Dubai, business districts of Business
            Bay, Dubai International Financial Centre and the center to
            what&apos;s happening in the city.
          </p>
          <p className="mt-8 font-dmSans text-lg lg:text-2xl font-semibold">
            POSSIBILITIES ABOUND
          </p>
          <p className="mt-2 text-[12px] md:text-[16px] font-dmSans font-medium text-slate-700 tracking-normal leading-6">
            Revel in urban idyll in designer spaces tailored to your pleasure.
            Check-in on Level 30 while enjoying stunning skyline views and
            raising a glass at V Lounge, the heart of all the action. Step into
            a space that boasts 356 guestrooms including a two-bedroom duplex
            Sky Villa suite, contemporary restaurant concepts and glamorous
            entertainment experiences where international connections and
            quintessential nightlife play out against panoramic views of the
            pulsating city.
          </p>
          <p className="mt-8 font-dmSans text-lg lg:text-2xl font-semibold">
            BE TEMPTED
          </p>
          <p className="mt-2 text-[12px] md:text-[16px] font-dmSans font-medium text-slate-700 tracking-normal leading-6">
            Tempt your senses with mouth-watering aromas at our restaurants and
            bars. Check out NAMU, a destination restaurant that presents the
            best of Korean cuisine or stop by Level Seven, a culinary crossroads
            of the Mediterranean. Head to V Lounge for social drinks with a view
            before welcoming the night hours with remarkable cocktails. Unwind
            at V Deck for poolside play.
          </p>
          <p className="mt-8 font-dmSans text-lg lg:text-2xl font-semibold">
            At V Hotel
          </p>
          <p className="mt-2 text-[12px] md:text-[16px] font-dmSans font-medium text-slate-700 tracking-normal leading-6">
            Enjoy world-class global gourmet dining, opulent accommodations, and
            top-shelf premium liquors. Indulge in a pampering experience with
            our personalized concierge services, private chef, laundry service,
            private golf cart, gourmet BBQ grill, and so much more.
          </p>

          {/*Description ends */}

          <div className="mt-8 lg:mt-16 w-full grid grid-cols-2 gap-4">
            <div>
              <img
                className="w-full rounded-lg"
                src={vHotel.gridImages[0]}
                alt="habtoor-grand-room-type-1"
              />
            </div>
            <div>
              <img
                className="w-full rounded-lg"
                src={vHotel.gridImages[1]}
                alt="habtoor-grand-room-type-2"
              />
            </div>
            <div className="col-span-2">
              <img
                className="w-full rounded-lg"
                src={vHotel.gridImages[2]}
                alt="habtoor-grand-room-type-3"
              />
            </div>
          </div>
          <div className="mt-16 flex flex-wrap items-center justify-center space-x-4 gap-y-4">
            {vHotel.benefits.map((benefit, i) => (
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
              vHotel.room_types.map((room) => (
                <DetailAccordion
                  key={room.name}
                  room={room}
                  bookingSuccess={handleBookingSucces}
                  hotelName={"V Hotel"}
                  pricesList={null}
                />
              ))}
            {pricesList.length > 0 &&
              filteredList.map((item) => (
                <DetailAccordion
                  key={item.RoomName}
                  room={
                    vHotel.room_types.filter(
                      (room) => room.name === item.RoomName
                    )[0]
                  }
                  bookingSuccess={handleBookingSucces}
                  hotelName={"V Hotel"}
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
