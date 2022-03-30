import Image from "next/image";
export function PageLoader() {
  return (
    <div className="loaderCover flex h-screen w-full justify-center items-center">
      <Image
        alt=""
        className="mx-auto"
        height={245}
        width={456}
        src="/assets/images/loaderLogo.png"
      />
    </div>
  );
}
