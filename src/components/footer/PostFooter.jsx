import Link from "@/components/primitives/Link";

const PostFooter = () => {
  return (
    <div className="px-4 py-2 text-sm border-t-[1px] text-center text-white/55">
      Designed by <Link href="https://www.brainloggers.co.uk">Brainloggers&reg;</Link> 2012 - {new Date().getFullYear()}
    </div>
  );
};

export default PostFooter;
