"use client";

import Navbar from "@/components/navbar";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { calculateTotalPrices } from "../my-bookings/page";
import { useBookingStore } from "@/providers/bookingProvider";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Checkout() {
  const router = useRouter();
  const bookingState = useBookingStore((state) => state.bookingState);
  const resetBookingStore = useBookingStore((state) => state.resetBookingStore);
  function Message({ content }) {
    return <p>{content}</p>;
  }
  const initialOptions = {
    "client-id": "test",
    "enable-funding": "",
    "disable-funding": "venmo",
    currency: "GBP",
    "data-page-type": "product-details",
    components: "buttons",
    "data-sdk-integration-source": "developer-studio",
  };

  async function updateGoogleSheetsBookingDetails() {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BOOKING_GOOGLE_SHEET_URL,
        {
          method: "POST",
          body: new URLSearchParams({
            bookings: JSON.stringify(bookingState.bookingDetails),
          }),
        }
      );

      if (response.ok) {
        const responseData = await response.text();
        console.log(response);
        resetBookingStore();
        router.push("/payment_success");
      } else {
        setBookingFormError(true);
        setTimeout(() => {
          setBookingFormError(false);
        }, 1500);
      }
    } catch (error) {
      console.log(error);
      setBookingFormError(true);
      setTimeout(() => {
        setBookingFormError(false);
      }, 1500);
    }
  }

  const [message, setMessage] = useState("");
  return (
    <main className="w-full h-full flex flex-col">
      <div className="sticky top-0 z-[9999] bg-white w-full">
        <Navbar />
      </div>
      <section className="w-full p-6 lg:p-12 grid place-items-center">
        {bookingState.items.length === 0 && (
          <p className="text-xl font-dmSans font-medium">
            You haven&apos;t booked any rooms yet.
          </p>
        )}
        {bookingState.items.length > 0 && (
          <div className="w-full lg:w-1/2 xl:w-2/5 grid items-center mx-auto mt-12 space-y-4">
            <p className="text-xl font-dmSans font-medium">
              Select a payment method to complete your booking
            </p>
            <PayPalScriptProvider options={initialOptions}>
              <PayPalButtons
                style={{
                  shape: "pill",
                  layout: "vertical",
                  color: "blue",
                  label: "paypal",
                }}
                createOrder={async () => {
                  try {
                    const response = await fetch("/api/orders", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        cart: [
                          {
                            id: "ABC",
                            quantity: calculateTotalPrices(
                              bookingState.items
                            ).toString(),
                          },
                        ],
                      }),
                    });

                    const orderData = await response.json();

                    if (orderData.id) {
                      return orderData.id;
                    } else {
                      const errorDetail = orderData?.details?.[0];
                      const errorMessage = errorDetail
                        ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
                        : JSON.stringify(orderData);

                      throw new Error(errorMessage);
                    }
                  } catch (error) {
                    console.error(error);
                    setMessage(`Could not initiate PayPal Checkout...${error}`);
                  }
                }}
                onApprove={async (data, actions) => {
                  try {
                    const response = await fetch(
                      `/api/orders/${data.orderID}/capture`,
                      {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                      }
                    );

                    const orderData = await response.json();

                    const errorDetail = orderData?.details?.[0];

                    if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
                      return actions.restart();
                    } else if (errorDetail) {
                      throw new Error(
                        `${errorDetail.description} (${orderData.debug_id})`
                      );
                    } else {
                      await updateGoogleSheetsBookingDetails();
                      const transaction =
                        orderData.purchase_units[0].payments.captures[0];
                      setMessage(
                        `Transaction ${transaction.status}: ${transaction.id}. See console for all available details`
                      );
                      console.log(
                        "Capture result",
                        orderData,
                        JSON.stringify(orderData, null, 2)
                      );
                    }
                  } catch (error) {
                    console.error(error);
                    setMessage(
                      `Sorry, your transaction could not be processed...${error}`
                    );
                  }
                }}
              />
            </PayPalScriptProvider>
            <Message content={message} />
          </div>
        )}
      </section>
    </main>
  );
}
