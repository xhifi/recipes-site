import Link from "@/components/primitives/Link";
import Nav from "./Nav";
import NavToggleButton from "./NavToggleButton";

const data = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Recipes", href: "/recipes" },
  { name: "Contact", href: "/contact" },
];

const Index = () => {
  return (
    <div className="relative bg-primary text-neutral-50">
      <div className="px-4 py-2 md:px-8 lg:px-14">
        <div className="space-y-4">
          <div className="flex items-center">
            <Link href="/" className="">
              <h1 className="text-2xl font-bold">Recipes Cool</h1>
            </Link>
            <NavToggleButton />
          </div>
          <Nav data={data} />
        </div>
      </div>
    </div>
  );
};
export default Index;
