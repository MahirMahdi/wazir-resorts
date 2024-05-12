import { createStore } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const defaultInitState = {
  name: "",
  hotel: "",
  phone_number: "",
  room_type: "",
  check_in: "",
  check_out: "",
  email: "",
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
      }),
      {
        name: "booking-store",
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  );
};

export { defaultInitState, createBookingStore };
