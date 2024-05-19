import { Metadata } from "next";
import { Crypto } from "../entities";

interface CryptoData {
  crypto: Crypto[];
  length: number;
}

const CryptoPage = async () => {
  const res = await fetch(process.env.BASE_URL + "/api/crypto", {
    next: {
      revalidate: 60 * 60,
    },
  });
  const { crypto }: CryptoData = await res.json();

  return (
    <table className="container mx-auto my-5 w-4/5 rounded-md border text-center text-white">
      <thead className="flex w-full border-b bg-white bg-opacity-70 text-primary ">
        <tr className="flex w-full">
          <th className="w-1/2 p-4 sm:w-1/5 lg:w-1/6">نام ارز</th>
          <th className="w-1/2 p-4 sm:w-1/5 lg:w-1/6">قیمت ریالی</th>
          <th className="hidden p-4 sm:table-cell sm:w-1/5 lg:w-1/6">
            قیمت دلاری
          </th>
          <th className="hidden p-4 sm:table-cell sm:w-1/5 lg:w-1/6">تغییر</th>
          <th className="hidden p-4 lg:table-cell lg:w-1/12">کمترین</th>
          <th className="hidden p-4 lg:table-cell lg:w-1/12">بیشترین</th>
          <th className="hidden p-4 sm:table-cell sm:w-1/5 lg:w-1/6">زمان</th>
        </tr>
      </thead>
      <tbody className="flex h-[70vh] w-full flex-col items-center justify-between overflow-y-scroll">
        {crypto.map((c) => (
          <tr
            key={c.name}
            className={`flex border-b border-${c.status}-800 bg-${c.status}-700 w-full transition-colors duration-500  hover:bg-opacity-80`}
          >
            <td className="w-1/2 whitespace-nowrap p-4 sm:w-1/5 lg:w-1/6">
              {c.name}
            </td>
            <td className="w-1/2 whitespace-nowrap p-4 sm:w-1/5 lg:w-1/6">
              {c.rialPrice}
            </td>
            <td className="hidden whitespace-nowrap p-4 sm:table-cell sm:w-1/5 lg:w-1/6">
              {c.dollarPrice}
            </td>
            <td className="hidden whitespace-nowrap p-4 sm:table-cell sm:w-1/5 lg:w-1/6">
              {c.change}
            </td>
            <td className="hidden whitespace-nowrap p-4 lg:table-cell lg:w-1/12">
              {c.lowest}
            </td>
            <td className="hidden whitespace-nowrap p-4 lg:table-cell lg:w-1/12">
              {c.highest}
            </td>
            <td className="hidden whitespace-nowrap p-4 sm:table-cell sm:w-1/5 lg:w-1/6">
              {c.time}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CryptoPage;

export const metadata: Metadata = {
  title: "جدول قیمت ساعتی ارز دیجیتال",
  description: "بروز رسانی قیمت ارز دیجیتال به صورت ساعتی",
};
