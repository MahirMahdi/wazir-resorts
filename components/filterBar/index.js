"use client";

import Datepicker from "react-tailwindcss-datepicker";
import MultiRangeSlider from "../slider";
import { useBookingStore } from "@/providers/bookingProvider";
import { useState } from "react";

export default function FilterBar() {
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

  const handleDate = (date) => {
    setDate(date);
    updateBookingStore({
      ...bookingState,
      check_in: date.startDate,
      check_out: date.endDate,
    });
  };
  return (
    <>
      <div className="mt-12">
        <p className="font-dmSans text-md lg:text-lg font-medium">
          Explore our Rooms
        </p>
        <p className="font-dmSans text-slate-500 text-sm lg:text-md">
          (Please select check-in and check-out dates to view prices)
        </p>
      </div>
      <div className="mt-2 w-full bg-white rounded-lg shadow p-3">
        <div className="flex items-center justify-between">
          <Datepicker
            value={
              bookingState.check_in
                ? {
                    startDate: bookingState.check_in,
                    endDate: bookingState.check_out,
                  }
                : date
            }
            useRange={false}
            minDate={new Date()}
            onChange={handleDate}
            displayFormat="DD/MM"
            separator="-"
            containerClassName="w-max lg:w-2/5 relative grid place-items-center"
            inputClassName="bg-containerColor w-full p-2 rounded-lg"
            placeholder="24/06 - 28/06"
            toggleClassName="absolute right-1 lg:right-4"
          />
          <div className="hidden lg:grid place-items-center lg:w-full">
            <MultiRangeSlider min={0} max={1000} />
          </div>
          <div className="w-max lg:w-2/5 p-2 rounded-lg grid lg:mr-4 place-items-end">
            <div
              className="dropdown dropdown-hover"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <div
                tabIndex={0}
                role="button"
                className="flex items-center gap-x-1 font-dmSans text-md leading-[100%] xl:text-lg xl:leading-[100%] font-medium hover:bg-white text-primaryButton"
              >
                Sorting Options
                <svg
                  width="16px"
                  height="16px"
                  viewBox="0 0 1024 1024"
                  className="icon w-[12px] h-[12px] lg:w-[16px] h-[16px] "
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#000000"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="M903.232 256l56.768 50.432L512 768 64 306.432 120.768 256 512 659.072z"
                      fill="#0766AD"
                    />
                  </g>
                </svg>
              </div>
              {(isDropdownOpen || isDropdownHovered) && (
                <ul
                  tabIndex={0}
                  className="w-full p-2 shadow menu dropdown-content z-[10] bg-base-100 rounded-box"
                >
                  <li
                    onClick={() => handlePriceSort("low-to-high")}
                    className="hover:bg-primaryButton hover:text-white rounded-lg p-2"
                  >
                    Price: Low to High
                  </li>
                  <li
                    onClick={() => handlePriceSort("high-to-low")}
                    className="hover:bg-primaryButton hover:text-white rounded-lg p-2"
                  >
                    Price: High to Low
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
        <div className="lg:hidden py-4 flex items-start">
          <MultiRangeSlider min={0} max={1000} />
        </div>
      </div>
    </>
  );
}
