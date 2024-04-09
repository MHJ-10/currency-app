import React from "react";
import prisma from "@/prisma/client";
import CryptoCountdown from "./_components/CryptoCountdown";

const CryptoPage = async () => {
  const crypto = await prisma.crypto.findMany();

  return (
    <div className="flex flex-col items-center justify-center">
      <CryptoCountdown crypto={crypto} />
      <table className="mx-auto my-5 w-4/5 rounded-md border text-center text-white">
        <thead className="border-b bg-white bg-opacity-70 text-primary ">
          <tr>
            <th className="px-6 py-4">نام ارز</th>
            <th className="px-6 py-4">قیمت ریالی</th>
            <th className="px-6 py-4">قیمت دلاری</th>
            <th className="px-6 py-4">تغییر</th>
            <th className="px-6 py-4">کمترین</th>
            <th className="px-6 py-4">بیشترین</th>
            <th className="px-6 py-4">زمان</th>
          </tr>
        </thead>
        <tbody>
          {crypto?.map((c, i) => (
            <tr
              key={c.id}
              className={`border-b border-white transition-colors duration-500 hover:bg-opacity-80  ${i % 2 === 0 ? "bg-primary" : "bg-secondary"} `}
            >
              <td className="whitespace-nowrap px-6 py-4">{c.name}</td>
              <td className="whitespace-nowrap px-6 py-4">{c.rialPrice}</td>
              <td className="whitespace-nowrap px-6 py-4">{c.dollarPrice}</td>
              <td className="whitespace-nowrap px-6 py-4">{c.change}</td>
              <td className="whitespace-nowrap px-6 py-4">{c.lowest}</td>
              <td className="whitespace-nowrap px-6 py-4">{c.highest}</td>
              <td className="whitespace-nowrap px-6 py-4">{c.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoPage;
