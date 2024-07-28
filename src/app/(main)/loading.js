import LogoSprite from "@/static/images/logo-sprite.png";
import Image from "next/image";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="flex items-center justify-center min-h-64">
      <Image src={LogoSprite} className="animate-spin" />
    </div>
  );
}
