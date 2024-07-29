import Image from "next/image";

const Badge = ({ icon, children }) => {
  return (
    <div className="inline-block w-auto">
      <div className="text-sm space-x-2 bg-secondary/85 border-secondary border-2 px-2 pe-3 py-1 rounded-full flex items-center group-hover:bg-secondary transition-all">
        <Image src={icon} className="h-5 w-5 p-1 bg-primary rounded-3xl" alt="" />
        <span className="text-sm">{children}</span>
      </div>
    </div>
  );
};

export default Badge;
