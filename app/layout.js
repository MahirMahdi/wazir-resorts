import { Inter } from "next/font/google";
import "./globals.css";
import { BookingStoreProvider } from "@/providers/bookingProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Wazir Resorts",
  description: "Your Gateway to Experiencing Dubai",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <BookingStoreProvider>{children}</BookingStoreProvider>
      </body>
    </html>
  );
}
