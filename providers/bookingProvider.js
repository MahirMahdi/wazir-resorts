"use client";

import React, { createContext, useRef, useContext } from "react";
import { useStore } from "zustand";
import { createBookingStore, initBookingStore } from "@/store/bookingStore";

const BookingStoreContext = createContext(null);

const BookingStoreProvider = ({ children }) => {
  const storeRef = useRef();
  if (!storeRef.current) {
    storeRef.current = createBookingStore(initBookingStore());
  }

  return React.createElement(
    BookingStoreContext.Provider,
    { value: storeRef.current },
    children
  );
};

const useBookingStore = (selector) => {
  const context = useContext(BookingStoreContext); // Rename the variable

  if (!context) {
    throw new Error("useBookingStore must be used within BookingStoreProvider");
  }

  return useStore(context, selector);
};

export { BookingStoreContext, BookingStoreProvider, useBookingStore };
