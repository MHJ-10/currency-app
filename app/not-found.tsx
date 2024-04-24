import Image from "next/image";
import React from "react";
import notFoundImg from "@/public/images/not-found.png";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="text-700 -mt-20 flex h-screen  flex-col items-center justify-center">
      <Image src={notFoundImg} alt="not-found" width={600} height={600} />
      <Link
        className="rounded-md bg-blue-600 px-3 py-2 font-bold text-white transition-colors duration-500 hover:border hover:border-white hover:bg-blue-700"
        href="/"
      >
        بازگشت به صفحه اصلی
      </Link>
    </div>
  );
};

export default NotFoundPage;
