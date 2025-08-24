import { Poppins } from "next/font/google";
import "./globals.css";
import SplashCursor from "@/components/splash.js";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "Saqib Razzak - Educator & Software Engineer",
  description:
    "Dedicated teacher for O Levels, A Levels, and Intermediate students with expertise in software engineering. Guiding the next generation of thinkers and innovators.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} font-poppins antialiased bg-white text-gray-900`}
      >
        <div style={{ opacity: 0.4 }}>
          <SplashCursor SPLAT_RADIUS={0.4} />
        </div>

        {children}
      </body>
    </html>
  );
}
