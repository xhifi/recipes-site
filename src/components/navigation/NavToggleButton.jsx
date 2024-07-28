"use client";

const toggleNav = () => {
  const nav = document?.getElementById("nav");
  nav.classList.toggle("hidden");
};

const NavToggleButton = () => {
  return (
    <button
      className="ms-auto text-pretty px-1 py-1 bg-neutral-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary transition-all"
      onClick={toggleNav}
      aria-label="Navigation Toggle Button"
    >
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 18H10" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
        <path d="M4 12L16 12" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
        <path d="M4 6L20 6" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </button>
  );
};

export default NavToggleButton;
