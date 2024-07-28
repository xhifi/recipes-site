import Link from "@/components/primitives/Link";

const FooterLinks = ({ data }) => {
  return (
    <>
      <h1 className="text-xl font-semibold mb-1">Heading 1</h1>
      <ul>
        {data.map((link) => (
          <li key={link.name} className="">
            <Link href={link.href} className="inline hover:text-secondary transition-all hover:underline">
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default FooterLinks;
