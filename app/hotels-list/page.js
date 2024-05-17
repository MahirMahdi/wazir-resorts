"use client";
import { DetailAccordion } from "@/components/cards";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import MultiRangeSlider from "@/components/slider";
import { allRooms, fetchPricesList, filterAndSort, roomsList } from "@/data";
import { useBookingStore } from "@/providers/bookingProvider";
import { useEffect, useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import "react-multi-carousel/lib/styles.css";
import FilterBar from "@/components/filterBar";
import Link from "next/link";
import Toast from "@/components/toasts";
export default function HotelsList() {
  const [pricesList, setPricesList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const bookingState = useBookingStore((state) => state.bookingState);
  const [bookingSuccess, setBookingSuccess] = useState(false);
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
      const pricesList = await fetchPricesList(bookingState.check_out);
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
  }, [
    bookingState.filter,
    bookingState.price_from,
    bookingState.price_to,
    pricesList,
  ]);

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
    <div className="w-full min-h-screen overflow-x-hidden">
      <div className="sticky top-0 z-50 bg-white w-full">
        <Navbar />
      </div>
      <main className="w-full flex min-h-screen flex-col items-center">
        {bookingSuccess && <Toast />}
        <section className="py-4 px-4 w-full lg:w-4/5 xl:w-3/5 flex flex-col items-center">
          <FilterBar />
          <div className="mt-8 space-y-4">
            {pricesList.length === 0 &&
              allRooms.map((room, i) => (
                <DetailAccordion
                  key={`${room.name}${i}`}
                  room={room}
                  bookingSuccess={handleBookingSucces}
                  hotelName={room.hotelName}
                  pricesList={null}
                />
              ))}
            {pricesList.length > 0 &&
              filteredList.map((item, i) => (
                <DetailAccordion
                  key={`${item.RoomName}${i}`}
                  bookingSuccess={handleBookingSucces}
                  room={
                    allRooms.filter(
                      (room) =>
                        room.name === item.RoomName &&
                        room.hotelName === item.HotelName
                    )[0]
                  }
                  hotelName={item.HotelName}
                  pricesList={item}
                />
              ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
