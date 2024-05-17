import React, { useCallback, useEffect, useState, useRef } from "react";
import "./multiRangeSlider.css";
import { useBookingStore } from "@/providers/bookingProvider";

const MultiRangeSlider = ({ min, max }) => {
  const bookingState = useBookingStore((state) => state.bookingState);
  const updateBookingStore = useBookingStore(
    (state) => state.updateBookingStore
  );
  const [minVal, setMinVal] = useState(bookingState.price_from);
  const [maxVal, setMaxVal] = useState(bookingState.price_to);
  const minValRef = useRef(bookingState.price_from);
  const maxValRef = useRef(bookingState.price_to);
  const range = useRef(null);

  // Convert to percentage
  const getPercent = useCallback(
    (value) =>
      Math.round(
        ((value - bookingState.price_from) /
          (bookingState.price_to - bookingState.price_from)) *
          100
      ),
    [bookingState.price_from, bookingState.price_to]
  );

  // Set width of the range to decrease from the left side
  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${getPercent(bookingState.price_from)}%`;
      range.current.style.width = `${
        getPercent(bookingState.price_to) - getPercent(bookingState.price_from)
      }%`;
    }
  }, [
    minVal,
    maxVal,
    bookingState.price_from,
    bookingState.price_to,
    getPercent,
  ]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);

  return (
    <div className="w-full flex items-center justify-center space-x-2">
      <label
        htmlFor="minPrice"
        className="font-dmSans font-medium whitespace-nowrap"
      >
        Price range:
      </label>
      <div className="px-2 py-2">
        <input
          id="maxPrice"
          type="number"
          value={bookingState.price_from}
          onChange={(event) => {
            updateBookingStore({
              ...bookingState,
              price_from: event.target.value,
            });
          }}
          className="w-16 bg-containerColor text-center px-1 py-2 rounded outline-none focus:outline none"
          placeholder="Max"
        />
      </div>
      <span>-</span>
      <div className="px-2 py-2">
        <input
          id="maxPrice"
          type="number"
          value={bookingState.price_to}
          onChange={(event) => {
            updateBookingStore({
              ...bookingState,
              price_to: event.target.value,
            });
          }}
          className="w-16 bg-containerColor text-center px-1 py-2 rounded outline-none focus:outline none"
          placeholder="Max"
        />
      </div>
    </div>
  );
};

export default MultiRangeSlider;
