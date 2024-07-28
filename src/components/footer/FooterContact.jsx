import Image from "next/image";

import Home from "@/static/icons/home.svg";
import AtTheRateOf from "@/static/icons/at-the-rate-of.svg";
import Mobile from "@/static/icons/mobile.svg";

const FooterContact = () => {
  return (
    <>
      <h1 className="text-2xl font-bold mb-1">Recipes Cool</h1>
      <ul>
        <li className="text-neutral-100 flex items-center gap-x-2">
          <Image src={Home} className="w-4 h-4 inline" alt="" /> <span>House#2, St#5, Landlord Lane, Homeless City, Mars 2529L</span>
        </li>
        <li className="text-neutral-100 flex items-center gap-x-2">
          <Image src={Mobile} className="w-4 h-4 inline" alt="" /> <span>021 2121221</span>
        </li>
        <li className="text-neutral-100 flex items-center gap-x-2">
          <Image src={AtTheRateOf} className="w-4 h-4 inline" alt="" /> <span>info@recipescool.com</span>
        </li>
      </ul>
    </>
  );
};

export default FooterContact;
