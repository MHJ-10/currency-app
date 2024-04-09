import React from "react";
import CurrencyCountdown from "./_components/CurrencyCountdown";
import prisma from "@/prisma/client";

const CurrencyPage = async () => {
  const currency = await prisma.currency.findMany();

  return (
    <div className="flex flex-col items-center justify-center">
      <CurrencyCountdown currency={currency} />
      <table className="mx-auto my-5 w-4/5 rounded-md border text-center text-white">
        <thead className="border-b bg-white bg-opacity-70 text-primary ">
          <tr>
            <th className="px-6 py-4">ارز آزاد</th>
            <th className="px-6 py-4">قیمت زنده</th>
            <th className="px-6 py-4">تغییر</th>
            <th className="px-6 py-4">کمترین</th>
            <th className="px-6 py-4">بیشترین</th>
            <th className="px-6 py-4">زمان</th>
          </tr>
        </thead>
        <tbody>
          {currency?.map((c, i) => (
            <tr
              key={c.id}
              className={`border-b border-white transition-colors duration-500 hover:bg-opacity-80  ${i % 2 === 0 ? "bg-primary" : "bg-secondary"} `}
            >
              <td className="whitespace-nowrap px-6 py-4">{c.name}</td>
              <td className="whitespace-nowrap px-6 py-4">{c.price}</td>
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

export default CurrencyPage;
