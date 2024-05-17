"use client";

import { useBookingStore } from "@/providers/bookingProvider";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Carousel from "react-multi-carousel";

export default function HotelRoomCard({
  discount,
  imagePath,
  roomName,
  hotelName,
  link,
}) {
  return (
    <Link href={link ?? ""}>
      <div className="relative w-[180px] h-[110px] md:w-[275px] md:h-[187.5px] lg:w-[300px] lg:h-[215px] 2xl:w-[350px] 2xl:h-[265px] rounded-xl shadow cursor-pointer overflow-hidden">
        <div className="w-full h-full absolute bg-gradient-to-t from-black via-20% to-50% hover:from-primaryButton hover:from-20% hover:to-50% rounded-xl"></div>
        <div className="absolute shadow text-xs lg:text-md top-2 left-2 md:top-6 md:left-6 w-max rounded-lg bg-[#C5E898] font-medium font-dmSans p-1 md:p-2">
          {discount}% OFF
        </div>
        <img src={imagePath} alt={roomName} className="rounded-xl h-full" />
        <div className="absolute bottom-1 left-2 md:bottom-2 md:left-2 md:p-3 md:px-4 rounded-xl">
          <p className="font-dmSans font-medium text-sm md:text-[18px] text-slate-200">
            {hotelName}
          </p>
          <h3 className="font-dmSans text-md md:text-[20px] text-slate-100 font-semibold">
            {roomName}
          </h3>
        </div>
      </div>
    </Link>
  );
}

export function HotelCard({ imagePath, benefits, hotelName, link }) {
  return (
    <Link href={link ?? ""}>
      <div className="relative w-[200px] h-[125px] md:w-[275px] md:h-[187.5px] lg:w-[300px] lg:h-[215px] 2xl:w-[350px] 2xl:h-[265px] rounded-xl shadow cursor-pointer overflow-hidden">
        <div className="w-full h-full absolute bg-gradient-to-t from-black from-20% to-50% rounded-xl hover:from-primaryButton hover:from-20% hover:to-50%"></div>
        <img src={imagePath} alt={hotelName} className="rounded-xl h-full" />
        <div className="absolute bottom-2 left-2 p-3 px-4 rounded-xl">
          <p className="hidden lg:block font-dmSans font-medium text-[16px] text-slate-200">
            {benefits[0] + " | " + benefits[1] + " | " + benefits[2]}
          </p>
          <h3 className="font-dmSans text-[20px] text-slate-100 font-semibold">
            {hotelName}
          </h3>
        </div>
      </div>
    </Link>
  );
}

export function DetailRoomCard({ discount, imagePath, roomName }) {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="relative w-[180px] h-[110px] md:w-[275px] md:h-[187.5px] lg:w-[300px] lg:h-[215px] 2xl:w-[350px] 2xl:h-[265px] rounded-xl shadow cursor-pointer overflow-hidden">
        <img src={imagePath} alt={roomName} className="rounded-xl h-full" />
      </div>
      <div className="w-full flex flex-col items-center text-center mt-4">
        <h3 className="font-dmSans text-center font-medium text-md lg:text-[24px] font-medium">
          {roomName}
        </h3>
        <p className="font-dmSans text-center text-[16px] text-primaryButton font-medium">
          {discount}% OFF
        </p>
      </div>
    </div>
  );
}

export function AccordionRoomCard({ imagePath, roomName }) {
  return (
    <div className="w-[125px] h-[90px] md:w-[200px] md:h-[150px] lg:w-[150px] lg:h-[110px] 2xl:w-[175px] 2xl:h-[125px] rounded-xl shadow cursor-pointer overflow-hidden">
      <img src={imagePath} alt={roomName} className="rounded-xl h-full" />
    </div>
  );
}

export function DetailAccordion({
  room,
  hotelName,
  pricesList,
  bookingSuccess,
}) {
  const addItem = useBookingStore((state) => state.addItem);
  const bookingState = useBookingStore((state) => state.bookingState);
  const router = useRouter();

  return (
    <div className="w-full p-2 lg:px-6 lg:py-3 collapse collapse-arrow bg-white shadow">
      <input type="checkbox" name="my-accordion-2" />
      <div className="w-full collapse-title flex space-x-[5.5rem] lg:space-x-[12.5rem]  lg:items-center text-xl font-medium">
        <div className="w-full">
          <p className="text-sm lg:text-[16px] font-dmSans">{hotelName}</p>
          <h1 className="font-dmSans text-lg lg:text-xl font-bold">
            {room.name}
          </h1>
        </div>
        {pricesList && (
          <div className="w-full">
            <strike className="font-dmSans text-sm text-[15px] lg:text-[18px] font-normal">
              £{roundUpToNearestInteger(pricesList?.OriginalPrice)}
            </strike>
            <p className="font-dmSans text-lg text-[20px] lg:text-[24px] font-semibold">
              £{roundUpToNearestInteger(pricesList?.DiscountedPrice)}
            </p>
            <span className="w-max text-xs rounded-lg bg-[#C5E898] font-medium font-dmSans py-[5px] px-[7px]">
              {calculatePercentage(pricesList?.DiscountRate)}% OFF
            </span>
          </div>
        )}
        {!pricesList && (
          <div className="w-full">
            <p className="font-dmSans text-lg :text-xl font-semibold">- -</p>
          </div>
        )}
      </div>
      {pricesList && (
        <div className="ml-3 w-full flex items-center space-x-2">
          <button
            type="button"
            onClick={() => {
              addItem({
                hotel: hotelName,
                room_type: room.name,
                check_in: bookingState.check_in,
                check_out: bookingState.check_out,
                guests_number: bookingState.guests_number,
                total_price: calculateRoomPrice(
                  bookingState.check_in,
                  bookingState.check_out,
                  roundUpToNearestInteger(pricesList?.DiscountedPrice)
                ),
              });
              bookingSuccess();
            }}
            className="mt-4 hover:opacity-80 text-center text-xs lg:text-sm py-2 px-3 border-2 border-primaryButton bg-white font-dmSans text-primaryButton rounded-md"
          >
            Add to Booking
          </button>
          {/* Book now button */}
          <button
            type="button"
            onClick={() => {
              addItem({
                hotel: hotelName,
                room_type: room.name,
                check_in: bookingState.check_in,
                check_out: bookingState.check_out,
                guests_number: bookingState.guests_number,
                total_price: calculateRoomPrice(
                  bookingState.check_in,
                  bookingState.check_out,
                  roundUpToNearestInteger(pricesList?.DiscountedPrice)
                ),
              });
              router.push("/my-bookings");
            }}
            className="mt-4 hover:opacity-80 text-center text-xs lg:text-sm py-2 px-3 bg-primaryButton border-2 border-primaryButton font-dmSans text-white rounded-md"
          >
            Book now
          </button>
        </div>
      )}
      <div className="w-full collapse-content overflow-x-auto">
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
            {room.images.map((image) => (
              <AccordionRoomCard
                key={image}
                imagePath={image}
                roomName={image}
              />
            ))}
          </Carousel>
        </div>
        {/* Room description */}
        {room.description}
      </div>
    </div>
  );
}

export function calculateRoomPrice(check_in, checkout, price) {
  // Convert dates to Date objects
  const checkInDate = new Date(check_in);
  const checkoutDate = new Date(checkout);

  // Calculate the difference in days between check-in and checkout dates
  const timeDifference = checkoutDate.getTime() - checkInDate.getTime();
  const totalNights = Math.ceil(timeDifference / (1000 * 3600 * 24));

  // Calculate the total price
  const totalPrice = totalNights > 0 ? price * totalNights : price * 1;

  return totalPrice;
}

function roundUpToNearestInteger(number) {
  const parsedNumber = parseFloat(number);

  if (isNaN(parsedNumber)) {
    return null;
  }

  const roundedNumber = Math.ceil(parsedNumber);

  return roundedNumber;
}

function calculatePercentage(fraction) {
  return roundUpToNearestInteger(fraction * 100);
}

export function CustomRightArrow({ onClick }) {
  return (
    <span
      onClick={() => onClick()}
      className="rounded-full grid cursor-pointer place-items-center w-12 h-12 lg:w-16 lg:h-16 absolute right-2"
    >
      <img src="/assets/button_right.svg" width={"100%"} height={"100%"} />
    </span>
  );
}

export function CustomLeftArrow({ onClick }) {
  return (
    <span
      onClick={() => onClick()}
      className="rounded-full grid cursor-pointer place-items-center w-12 h-12 lg:w-16 lg:h-16 absolute left-2"
    >
      <img src="/assets/button_left.svg" width={"100%"} height={"100%"} />
    </span>
  );
}
