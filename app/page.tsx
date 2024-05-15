import coinLogo from "@/public/images/bitcoin-logo.png";
import { Metadata } from "next";
import Image from "next/image";

export default function Home() {
  return (
    <div className="text-white">
      <div className="container mx-auto flex flex-col items-center justify-center gap-3 py-10 sm:py-24 sm:pb-0 md:flex-row md:justify-around">
        <div className="flex flex-col items-start justify-center gap-5 p-4 text-xl font-bold sm:text-2xl">
          <p>
            به دنیای{" "}
            <span className="bg-gradient-to-r from-sky-500 to-indigo-500 bg-clip-text text-2xl text-transparent sm:text-3xl">
              تبادلات ارزی
            </span>{" "}
            خوش آمدید
          </p>
          <p className="">
            به سادگی تغییرات ساعتی در
            <span className="bg-gradient-to-r from-sky-500 to-indigo-500 bg-clip-text text-3xl text-transparent">
              {" "}
              بازار های مالی{" "}
            </span>
            را پیگیری کنید
          </p>
          <p>
            از آخرین
            <span className="bg-gradient-to-r from-sky-500 to-indigo-500 bg-clip-text text-3xl text-transparent">
              {" "}
              تحولات بازار{" "}
            </span>
            آگاه شوید
          </p>
          <p className="text-sm font-thin">
            برای دسترسی به جدول قیمت‌ها، به بخش مربوطه در وبسایت ما مراجعه کنید
          </p>
        </div>
        <div className="size-48 animate-pulse md:size-80 lg:animate-spin">
          <Image src={coinLogo} alt="bit-coin" />
        </div>
      </div>
      <div className="footer-img fixed bottom-0 h-40 w-full bg-cover bg-no-repeat" />
    </div>
  );
}

export const metadata: Metadata = {
  title: "سایت اطلاع رسانی قیمت سکه و ارز",
  description: "شبکه اطلاع رسانی قیمت ارز به صوزت ساعتی",
  icons: {
    icon: "/icon.png",
  },
};
