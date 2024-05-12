import Link from "next/link";

export default function HotelRoomCard({
  discount,
  imagePath,
  roomName,
  hotelName,
  link,
}) {
  return (
    <Link href={link ?? ""}>
      <div className="relative w-[275px] h-[187.5px] md:w-[300px] md:h-[200px] lg:w-[360px] lg:h-[250px] 2xl:w-[400px] 2xl:h-[275px] rounded-xl shadow cursor-pointer overflow-hidden">
        <div className="w-full h-full absolute bg-gradient-to-t from-black via-20% to-50% hover:from-primaryButton hover:from-20% hover:to-50% rounded-xl"></div>
        <div className="absolute shadow text-xs lg:text-md top-6 left-6 w-max rounded-lg bg-[#C5E898] font-medium font-dmSans p-2">
          {discount}% OFF
        </div>
        <img src={imagePath} alt={roomName} className="rounded-xl h-full" />
        <div className="absolute bottom-2 left-2 p-3 px-4 rounded-xl">
          <p className="font-dmSans font-medium text-[18px] text-slate-200">
            {hotelName}
          </p>
          <h3 className="font-dmSans text-[20px] text-slate-100 font-semibold">
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
      <div className="relative cursor-pointer w-[275px] h-[187.5px] md:w-[300px] md:h-[200px] lg:w-[360px] lg:h-[250px] 2xl:w-[400px] 2xl:h-[275px] rounded-xl shadow">
        <div className="w-full h-full absolute bg-gradient-to-t from-black from-20% to-50% rounded-xl hover:from-primaryButton hover:from-20% hover:to-50%"></div>
        <img src={imagePath} alt={hotelName} className="rounded-xl h-full" />
        <div className="absolute bottom-2 left-2 p-3 px-4 rounded-xl">
          <p className="font-dmSans font-medium text-[16px] text-slate-200">
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
      <div className="relative w-[275px] h-[187.5px] md:w-[300px] md:h-[200px] lg:w-[360px] lg:h-[250px] 2xl:w-[400px] 2xl:h-[275px] rounded-xl shadow cursor-pointer overflow-hidden">
        <img src={imagePath} alt={roomName} className="rounded-xl h-full" />
      </div>
      <div className="w-full text-center mt-4">
        <h3 className="font-dmSans font-medium text-[24px] font-medium">
          {roomName}
        </h3>
        <p className="font-dmSans text-[16px] text-primaryButton font-medium">
          {discount}% OFF
        </p>
      </div>
    </div>
  );
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
