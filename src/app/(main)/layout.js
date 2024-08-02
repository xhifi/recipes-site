import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Inter } from "next/font/google";
import "../globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "Recipes Cool",
    template: "%s | Recipes Cool",
  },
  verification: {
    google: "G-LQXQ4DSWHP",
  },
  description: "Genuinely cool recipes for you to try out",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        {children}
        <Footer />
        <SpeedInsights />
      </body>
    </html>
  );
}
