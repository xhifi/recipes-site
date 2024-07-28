const FooterForm = () => {
  return (
    <>
      <form className="space-y-2">
        <div className="space-y-2">
          <label htmlFor="email" className="block text-xl font-bold">
            Subscribe to our Newsletter
            <span className="block text-sm font-thin">
              We provide weekly best recipes list to our subscribers at a very low rate of free
            </span>
          </label>
          <input
            type="email"
            id="email"
            placeholder="some@email.com"
            name="email"
            className="block w-full rounded-full text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-opacity-50 focus-visible:ring-offset-2"
          />
        </div>
        <button className="block w-full py-2 bg-secondary text-neutral-50 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-opacity-50 focus-visible:ring-offset-2">
          Subscribe
        </button>
      </form>
    </>
  );
};
export default FooterForm;
