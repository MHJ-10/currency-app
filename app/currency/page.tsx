import { Metadata } from "next";
import { Currency } from "../entities";

interface CurrencyData {
  currency: Currency[];
  length: number;
}

const CurrencyPage = async () => {
  const res = await fetch("http://localhost:3000/api/currency", {
    next: {
      revalidate: 60 * 60,
    },
  });
  const { currency }: CurrencyData = await res.json();

  return (
    <table className="container mx-auto my-5 w-4/5 rounded-md border text-center text-white">
      <thead className="flex w-full border-b bg-white bg-opacity-70 text-primary">
        <tr className="flex w-full">
          <th className="w-1/2 p-4 sm:w-1/4 md:w-1/6">ارز آزاد</th>
          <th className="w-1/2 p-4 sm:w-1/4 md:w-1/6">قیمت زنده</th>
          <th className="hidden p-4 sm:table-cell sm:w-1/4 md:w-1/6">تغییر</th>
          <th className="hidden p-4 md:table-cell md:w-1/6">کمترین</th>
          <th className="hidden p-4 md:table-cell md:w-1/6">بیشترین</th>
          <th className="hidden p-4 sm:table-cell sm:w-1/4 md:w-1/6">زمان</th>
        </tr>
      </thead>
      <tbody className="flex h-[80vh] w-full flex-col items-center justify-between overflow-y-scroll">
        {currency.map((c) => (
          <tr
            key={c.name}
            className={`flex border-b border-${c.status}-800 bg-${c.status}-700 w-full transition-colors duration-500  hover:bg-opacity-80`}
          >
            <td className="w-1/2 whitespace-nowrap p-4 sm:w-1/4 md:w-1/6">
              {c.name}
            </td>
            <td className="w-1/2 whitespace-nowrap p-4 sm:w-1/4 md:w-1/6">
              {c.price}
            </td>
            <td className="hidden whitespace-nowrap p-4 sm:table-cell sm:w-1/4 md:w-1/6">
              {c.change}
            </td>
            <td className="hidden whitespace-nowrap p-4 md:table-cell md:w-1/6">
              {c.lowest}
            </td>
            <td className="hidden whitespace-nowrap p-4 md:table-cell md:w-1/6">
              {c.highest}
            </td>
            <td className="hidden whitespace-nowrap p-4 sm:table-cell sm:w-1/4 md:w-1/6">
              {c.time}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CurrencyPage;

export const metadata: Metadata = {
  title: "جدول قیمت ساعتی ارز",
  description: "بروز رسانی قیمت ارز به صورت ساعتی",
};
