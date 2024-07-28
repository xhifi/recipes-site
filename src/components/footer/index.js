import FooterContact from "./FooterContact";
import FooterForm from "./FooterForm";
import FooterLinks from "./FooterLinks";
import PostFooter from "./PostFooter";

const footerLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Recipes", href: "/recipes" },
  { name: "Contact", href: "/contact" },
];

const Footer = () => {
  return (
    <div className="relative bg-primary text-neutral-50">
      <div className="px-4 py-6 md:px-8 md:py-8 lg:px-14">
        <div className="flex flex-col gap-y-6">
          <div>
            <FooterContact />
          </div>
          <div>
            <FooterLinks data={footerLinks} />
          </div>
          <div>
            <FooterForm />
          </div>
        </div>
      </div>
      <PostFooter />
    </div>
  );
};
export default Footer;
