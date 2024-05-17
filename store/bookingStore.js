import { createStore } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const defaultInitState = {
  name: "",
  items: [],
  phone_number: "",
  email: "",
  check_in: "",
  check_out: "",
  price_from: 0,
  price_to: 1000,
  filter: "",
  guests_number: 1,
  bookingDetails: [],
};

export const initBookingStore = () => {
  return defaultInitState;
};

const createBookingStore = (initState = defaultInitState) => {
  return createStore(
    persist(
      (set) => ({
        bookingState: initState,
        updateBookingStore: (newState) => set({ bookingState: newState }),
        resetBookingStore: () => set({ bookingState: initState }),
        addItem: (item) =>
          set((state) => ({
            bookingState: {
              ...state.bookingState,
              items: [...state.bookingState.items, item],
            },
          })),
        removeItem: (index) =>
          set((state) => ({
            bookingState: {
              ...state.bookingState,
              items: state.bookingState.items.filter((_, i) => i !== index),
            },
          })),
        updateItem: (index, newItem) =>
          set((state) => ({
            bookingState: {
              ...state.bookingState,
              items: state.bookingState.items.map((item, i) =>
                i === index ? newItem : item
              ),
            },
          })),
      }),
      {
        name: "booking-store",
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  );
};

export { defaultInitState, createBookingStore };
