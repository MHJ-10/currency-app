import Image from "next/image";
import React from "react";
import notFoundImg from "@/public/images/not-found.png";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="text-700 -mt-32 flex h-screen  flex-col items-center justify-center">
      <Image src={notFoundImg} alt="not-found" width={600} height={600} />
      <Link
        className="rounded-md border-2 bg-slate-200 px-3 py-2 font-bold transition-colors duration-500 hover:border-slate-700 hover:bg-slate-300 hover:text-slate-700"
        href="/"
      >
        بازگشت به صفحه اصلی
      </Link>
    </div>
  );
};

export default NotFoundPage;
