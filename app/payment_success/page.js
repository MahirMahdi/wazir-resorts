"use client";

import Navbar from "@/components/navbar";
import { useRouter } from "next/navigation";
export default function SubmissionSuccess() {
  const router = useRouter();
  return (
    <main className="flex flex-col w-screen h-screen bg-[#f4f4f4]">
      <Navbar />
      <section className="w-full p-6 lg:p-12 flex flex-col items-center">
        <div className="space-y-8 mt-32 grid place-items-center">
          <svg
            width="64px"
            height="64px"
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
              <path
                d="M7.29417 12.9577L10.5048 16.1681L17.6729 9"
                stroke="#326019"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />{" "}
              <circle cx={12} cy={12} r={10} stroke="#326019" strokeWidth={2} />{" "}
            </g>
          </svg>

          <h1 className="font-ptSerif text-center text-[40px] font-medium">
            Your booking has been confirmed!
            <br />
            Our team will be reaching out
            <br />
            to you soon.
          </h1>
          <button
            onClick={() => router.push("/")}
            className="text-lg hover:opacity-90 py-3 px-5 bg-primaryButton text-white rounded-full"
          >
            Go Back
          </button>
        </div>
      </section>
    </main>
  );
}
