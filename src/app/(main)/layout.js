import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Inter } from "next/font/google";
import "../globals.css";
import Head from "next/head";

import { GoogleTagManager } from "@next/third-parties/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "Recipes Cool",
    template: "%s | Recipes Cool",
  },
  description: "Genuinely cool recipes for you to try out",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* <GoogleTagManager gtmId="G-LQXQ4DSWHP" /> */}

      <body className={inter.className}>
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
