"use client";
import Navbar from "@/components/navbar";
import { phoneCodes } from "@/data/phoneCodes";
import { useBookingStore } from "@/providers/bookingProvider";
import { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import { hotels, allHotels, fetchPricesList } from "@/data";
import { useRouter } from "next/navigation";
import Footer from "@/components/footer";
import { calculateRoomPrice } from "@/components/cards";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function BookingPage() {
  const router = useRouter();
  const bookingState = useBookingStore((state) => state.bookingState);
  const updateBookingStore = useBookingStore(
    (state) => state.updateBookingStore
  );
  const removeItem = useBookingStore((state) => state.removeItem);
  const updateItem = useBookingStore((state) => state.updateItem);
  const [isCodesDropdownOpen, setIsCodesDropdownOpen] = useState(false);
  const [codesDropdownHovered, setCodesDropdownHovered] = useState(false);
  const [bookingFormError, setBookingFormError] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState({
    dialCode: "",
    number: "",
  });
  const [name, setName] = useState({
    first_name: "",
    last_name: "",
  });
  const resetBookingStore = useBookingStore((state) => state.resetBookingStore);

  const handleCode = (code) => {
    setIsCodesDropdownOpen(false);
    setCodesDropdownHovered(false);
    setPhoneNumber({ dialCode: code, number: "" });
  };

  const submissionCondition =
    bookingState.items.length === 0 ||
    name.first_name.length === 0 ||
    bookingState.check_in.length === 0 ||
    bookingState.check_out.length === 0 ||
    bookingState.email.length === 0 ||
    phoneNumber.number.length < 6;

  const handleBooking = async (e) => {
    e.preventDefault();
    const bookingDetails = bookingState.items.map((item) => {
      const bookingForm = {
        Name: name.first_name + " " + name.last_name,
        Hotel: item.hotel,
        Room: item.room_type,
        CheckIn: item.check_in,
        CheckOut: item.check_out,
        Email: bookingState.email,
        Phone: phoneNumber.dialCode + phoneNumber.number,
        GuestsNumber: item.guests_number,
      };
      return bookingForm;
    });
    updateBookingStore({ ...bookingState, bookingDetails: bookingDetails });
    router.push("/checkout");
  };

  // useEffect(() => {
  //   async function updateHotelPrices() {
  //     const pricesList = await fetchPricesList(bookingState.check_out);
  //     setPricesList(pricesList);
  //   }

  //   bookingState.check_out && updateHotelPrices();
  // }, [bookingState.check_out]);

  return (
    <main className="w-full flex flex-col">
      {bookingFormError && (
        <div className="z-20 toast toast-top toast-end">
          <div className="alert alert-error text-white ">
            <span>Unexpected error. Please try again.</span>
          </div>
        </div>
      )}
      <div className="sticky top-0 z-50 bg-white w-full">
        <Navbar />
      </div>
      <section className="w-full p-6 lg:p-12 flex flex-col items-center">
        <div className="mt-12 w-full lg:w-4/5 2xl:w-2/3 rounded-lg shadow">
          {/*Desktop table */}
          <div className="px-4 lg:px-8 font-dmSans hidden lg:block">
            <table className="table">
              <thead>
                <tr className="text-[16px]">
                  <th>Room</th>
                  <th>Guests</th>
                  <th>Dates</th>
                  <th>Price</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {bookingState.items.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="text-[16px] font-medium font-dmSans text-center py-4"
                    >
                      You haven&apos;t booked any rooms yet.
                    </td>
                  </tr>
                )}

                {bookingState.items.length > 0 &&
                  bookingState.items.map((item, i) => (
                    <tr key={i}>
                      <td className="space-y-2 lg:space-y-1">
                        <p className="text-xs">{item.hotel}</p>
                        <p className="text-[16px] font-semibold">
                          {item.room_type}
                        </p>
                      </td>
                      <td>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() =>
                              updateItem(i, {
                                ...item,
                                guests_number: item.guests_number - 1,
                              })
                            }
                            className="p-2 hover:bg-containerColor rounded-lg"
                          >
                            -
                          </button>
                          <p className="font-dmSans">{item.guests_number}</p>
                          <button
                            onClick={() =>
                              updateItem(i, {
                                ...item,
                                guests_number: item.guests_number + 1,
                              })
                            }
                            className="p-2 hover:bg-containerColor rounded-lg"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td>
                        <Datepicker
                          value={{
                            startDate: item.check_in,
                            endDate: item.check_out,
                          }}
                          useRange={false}
                          minDate={new Date()}
                          onChange={async (date) => {
                            const pricesList = await fetchPricesList(
                              date.endDate
                            );
                            updateItem(i, {
                              ...item,
                              check_in: date.startDate,
                              check_out: date.endDate,
                              total_price: calculateRoomPrice(
                                date.startDate,
                                date.endDate,
                                pricesList.filter(
                                  (list) => list.RoomName === item.room_type
                                )[0].DiscountedPrice
                              ),
                            });
                          }}
                          displayFormat="DD/MM"
                          popoverDirection="down"
                          separator="-"
                          containerClassName=""
                          inputClassName="focus:outline-none cursor-pointer pr-2 py-2 rounded-lg"
                          placeholder="24/06 - 28/06"
                          toggleClassName="hidden absolute right-1 lg:right-4"
                        />
                      </td>
                      <td className="font-semibold">£{item.total_price}</td>
                      <td>
                        <button onClick={() => removeItem(i)} className="p-2">
                          <svg
                            width="18px"
                            height="18px"
                            viewBox="0 0 1024 1024"
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
                                fill="#000000"
                                d="M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32V256zm448-64v-64H416v64h192zM224 896h576V256H224v640zm192-128a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32zm192 0a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32z"
                              />
                            </g>
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>

              {bookingState.items.length > 0 && (
                <tfoot>
                  <tr>
                    <th></th>
                    <th></th>
                    <th className="text-primaryButton text-[14px]">Total</th>
                    <th className="font-bold text-lg text-black">
                      £{calculateTotalPrices(bookingState.items)}
                    </th>
                    <th></th>
                  </tr>
                </tfoot>
              )}
            </table>
          </div>
          {/*Desktop table */}
          {/*Mobile Table */}
          <div className="px-4 lg:px-8 font-dmSans lg:hidden overflow-x-auto">
            <table className="table">
              <thead>
                <tr className="text-[16px]">
                  <th>Room</th>
                  <th></th>
                  <th>Price</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {bookingState.items.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className="text-[16px] font-medium font-dmSans text-center py-4"
                    >
                      You haven&apos;t booked any rooms yet.
                    </td>
                  </tr>
                )}

                {bookingState.items.length > 0 &&
                  bookingState.items.map((item, i) => (
                    <tr key={i}>
                      <td className="space-y-2 lg:space-y-1">
                        <p className="text-xs">{item.hotel}</p>
                        <p className="text-[16px] font-semibold">
                          {item.room_type}
                        </p>
                      </td>
                      <td>
                        <button
                          onClick={() =>
                            document.getElementById("my_modal_1").showModal()
                          }
                          className="p-2"
                        >
                          <svg
                            fill="#000000"
                            width="18px"
                            height="18px"
                            viewBox="0 0 1920 1920"
                            xmlns="http://www.w3.org/2000/svg"
                            transform="rotate(90)"
                          >
                            <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                            <g
                              id="SVGRepo_tracerCarrier"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <g id="SVGRepo_iconCarrier">
                              {" "}
                              <path
                                d="M277.974 49.076c65.267-65.379 171.733-65.49 237.448 0l232.186 232.187 1055.697 1055.809L1919.958 1920l-582.928-116.653-950.128-950.015 79.15-79.15 801.792 801.68 307.977-307.976-907.362-907.474L281.22 747.65 49.034 515.464c-65.379-65.603-65.379-172.069 0-237.448Zm1376.996 1297.96-307.977 307.976 45.117 45.116 384.999 77.023-77.023-385-45.116-45.116ZM675.355 596.258l692.304 692.304-79.149 79.15-692.304-692.305 79.149-79.15ZM396.642 111.88c-14.33 0-28.547 5.374-39.519 16.345l-228.94 228.94c-21.718 21.718-21.718 57.318 0 79.149l153.038 153.037 308.089-308.09-153.037-153.036c-10.972-10.971-25.301-16.345-39.63-16.345Z"
                                fillRule="evenodd"
                              />{" "}
                            </g>
                          </svg>
                        </button>
                      </td>
                      <td className="font-semibold">£{item.total_price}</td>
                      <td>
                        <button onClick={() => removeItem(i)} className="p-2">
                          <svg
                            width="18px"
                            height="18px"
                            viewBox="0 0 1024 1024"
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
                                fill="#000000"
                                d="M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32V256zm448-64v-64H416v64h192zM224 896h576V256H224v640zm192-128a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32zm192 0a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32z"
                              />
                            </g>
                          </svg>
                        </button>
                      </td>
                      <td>
                        <dialog id="my_modal_1" className="modal">
                          <div className="modal-box">
                            <div className="modal-action">
                              <form method="dialog">
                                <button className="p-2">
                                  <svg
                                    width="24px"
                                    height="24px"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                                    <g
                                      id="SVGRepo_tracerCarrier"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <g id="SVGRepo_iconCarrier">
                                      {" "}
                                      <g id="Menu / Close_SM">
                                        {" "}
                                        <path
                                          id="Vector"
                                          d="M16 16L12 12M12 12L8 8M12 12L16 8M12 12L8 16"
                                          stroke="#000000"
                                          strokeWidth={2}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />{" "}
                                      </g>{" "}
                                    </g>
                                  </svg>
                                </button>
                              </form>
                            </div>
                            <div className="space-y-1">
                              <p className="font-dmSans font-medium">Guests</p>
                              <div className="flex items-center space-x-2 bg-containerColor w-min rounded-lg">
                                <button
                                  onClick={() =>
                                    updateItem(i, {
                                      ...item,
                                      guests_number: item.guests_number - 1,
                                    })
                                  }
                                  className="p-2 hover:bg-containerColor rounded-lg"
                                >
                                  -
                                </button>
                                <p className="font-dmSans">
                                  {item.guests_number}
                                </p>
                                <button
                                  onClick={() =>
                                    updateItem(i, {
                                      ...item,
                                      guests_number: item.guests_number + 1,
                                    })
                                  }
                                  className="p-2 hover:bg-containerColor rounded-lg"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                            <div className="mt-4 space-y-1">
                              <p className="font-dmSans font-medium">Dates</p>
                              <Datepicker
                                value={{
                                  startDate: item.check_in,
                                  endDate: item.check_out,
                                }}
                                useRange={false}
                                minDate={new Date()}
                                onChange={async (date) => {
                                  const pricesList = await fetchPricesList(
                                    date.endDate
                                  );
                                  updateItem(i, {
                                    ...item,
                                    check_in: date.startDate,
                                    check_out: date.endDate,
                                    total_price: calculateRoomPrice(
                                      date.startDate,
                                      date.endDate,
                                      pricesList.filter(
                                        (list) =>
                                          list.RoomName === item.room_type
                                      )[0].DiscountedPrice
                                    ),
                                  });
                                }}
                                displayFormat="DD/MM"
                                popoverDirection="down"
                                separator="-"
                                containerClassName="relative z-[100]"
                                inputClassName="focus:outline-none cursor-pointer px-4 py-2 rounded-lg bg-containerColor"
                                placeholder="24/06 - 28/06"
                                toggleClassName="hidden absolute right-1 lg:right-4"
                              />
                            </div>
                          </div>
                        </dialog>
                      </td>
                    </tr>
                  ))}
              </tbody>
              {bookingState.items.length > 0 && (
                <tfoot>
                  <tr>
                    <th></th>
                    <th></th>
                    <th className="text-primaryButton text-[14px]">Total</th>
                    <th className="font-bold text-lg text-black">
                      £{calculateTotalPrices(bookingState.items)}
                    </th>
                  </tr>
                </tfoot>
              )}
            </table>
          </div>
        </div>
        <form className="mt-12 w-full lg:w-4/5 2xl:w-2/3 grid">
          {/* <h1 className="text-[44px] font-extrabold">Get a Quote</h1> */}
          <div className="w-full mt-8 py-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
            <input
              type="text"
              className="rounded-lg text-sm placeholder:text-sm p-4 focus:outline-none bg-containerColor"
              placeholder="First Name"
              value={name.first_name}
              onChange={(e) => setName({ ...name, first_name: e.target.value })}
              required
            />
            <input
              type="text"
              className="rounded-lg p-4 text-sm placeholder:text-sm focus:outline-none bg-containerColor"
              placeholder="Last Name"
              value={name.last_name}
              onChange={(e) => setName({ ...name, last_name: e.target.value })}
            />
            <div className="w-full flex space-x-2 items-center">
              <div
                className="dropdown dropdown-hover w-2/4 lg:w-1/3"
                onMouseEnter={() => setCodesDropdownHovered(true)}
                onMouseLeave={() => setCodesDropdownHovered(false)}
              >
                <div
                  tabIndex={0}
                  className="p-4 flex items-center text-sm gap-x-1 cursor-pointer font-dmSans text-left rounded-lg w-full h-full shadow-none [list-style:none] bg-containerColor"
                >
                  {phoneNumber.dialCode
                    ? phoneCodes.filter(
                        (country) => country.dial_code == phoneNumber.dialCode
                      )[0].code +
                      " " +
                      phoneNumber.dialCode
                    : phoneCodes[0].code + " " + phoneCodes[0].dial_code}
                  <img
                    src="/assets/dropdown.svg"
                    alt="dropdown icon"
                    className="w-2 h-2 mt-[.5px]"
                  />
                </div>
                {(isCodesDropdownOpen || codesDropdownHovered) && (
                  <ul
                    tabIndex={0}
                    className="w-full p-2 shadow dropdown-content z-[2] bg-base-100 rounded-box max-h-[125px] overflow-y-scroll"
                  >
                    {phoneCodes.map((country) => (
                      <li
                        key={country.name}
                        className="hover:bg-primaryButton hover:text-white cursor-pointer rounded-lg font-dmSans p-2"
                        onClick={() => handleCode(country.dial_code)}
                      >
                        {country.code + " " + country.dial_code}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {phoneNumber.dialCode.length > 0 && (
                <input
                  onChange={(e) =>
                    setPhoneNumber({ ...phoneNumber, number: e.target.value })
                  }
                  value={phoneNumber.number}
                  type="number"
                  className="cursor-pointer text-sm placeholder:text-sm bg-containerColor rounded-lg p-4 w-full focus:outline-none"
                  placeholder="Phone Number"
                />
              )}
              {phoneNumber.dialCode.length === 0 && (
                <div
                  className="w-full tooltip justify-self-center"
                  data-tip="Please select the dial code first"
                >
                  <input
                    type="text"
                    disabled
                    className="opacity-50 cursor-not-allowed text-sm placeholder:text-sm bg-containerColor rounded-lg p-4 w-full focus:outline-none"
                    placeholder="Phone Number"
                  />
                </div>
              )}
            </div>
            <input
              type="email"
              className="rounded-lg p-4 text-sm placeholder:text-sm focus:outline-none bg-containerColor"
              placeholder="Email"
              required
              value={bookingState.email}
              onChange={(e) =>
                updateBookingStore({ ...bookingState, email: e.target.value })
              }
            />
          </div>
          {submissionCondition && (
            <div
              className="tooltip"
              data-tip="Please fill in the necessary details to book"
            >
              <button
                disabled={true}
                className="w-full font-dmSans w-max rounded-xl text-white mx-auto disabled:opacity-20 disabled:cursor-not-allowed py-2 px-3 mt-4 bg-primaryButton"
              >
                Book now
              </button>
            </div>
          )}
          {!submissionCondition && (
            <button
              onClick={handleBooking}
              className="w-full font-dmSans w-max rounded-xl text-white mx-auto py-2 px-3 mt-4 bg-primaryButton"
            >
              Book now
            </button>
          )}
        </form>
      </section>
      <Footer />
    </main>
  );
}

export function calculateTotalPrices(arrayOfObjects) {
  const totalPriceSum = arrayOfObjects.reduce((sum, obj) => {
    return sum + obj.total_price;
  }, 0);

  return totalPriceSum;
}
