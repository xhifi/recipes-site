"use client";

import { usePathname } from "next/navigation";
import Link from "../primitives/Link";

const Nav = ({ data }) => {
  const pathName = usePathname();

  return (
    <nav id="nav" className="w-full hidden">
      <ul className="flex flex-col space-y-1">
        {data.map((link) => {
          return (
            <li key={link.name} className="block">
              <Link
                href={link.href}
                className={`block py-1 px-2 rounded-lg hover:bg-secondary ${pathName === link.href ? "bg-secondary" : ""}`}
              >
                {link.name}
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="h-4"></div>
    </nav>
  );
};
export default Nav;
