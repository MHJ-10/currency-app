import { Metadata } from "next";
import { Coin } from "../entities";

interface CoinData {
  coins: Coin[];
  length: number;
}

const CoinsTablePage = async () => {
  const res = await fetch(process.env.BASE_URL + "/api/coin", {
    next: {
      revalidate: 60 * 60,
    },
  });
  const { coins }: CoinData = await res.json();

  return (
    <table className="container mx-auto my-5 w-4/5 rounded-md border text-center text-white">
      <thead className="border-b bg-white bg-opacity-70 text-primary ">
        <tr>
          <th className="p-4">نام سکه</th>
          <th className="p-4">قیمت زنده</th>
          <th className="hidden p-4 sm:table-cell">تغییر</th>
          <th className="hidden p-4 md:table-cell">کمترین</th>
          <th className="hidden p-4 md:table-cell">بیشترین</th>
          <th className="hidden p-4 sm:table-cell">زمان</th>
        </tr>
      </thead>
      <tbody>
        {coins.map((coin) => (
          <tr
            key={coin.name}
            className={`border-b border-${coin.status}-800 bg-${coin.status}-700 transition-colors duration-500  hover:bg-opacity-80`}
          >
            <td className="whitespace-nowrap p-4">{coin.name}</td>
            <td className="whitespace-nowrap p-4">{coin.price}</td>
            <td className="hidden whitespace-nowrap p-4 sm:table-cell">
              {coin.change}
            </td>
            <td className="hidden whitespace-nowrap p-4 md:table-cell">
              {coin.lowest}
            </td>
            <td className="hidden whitespace-nowrap p-4 md:table-cell">
              {coin.highest}
            </td>
            <td className="hidden whitespace-nowrap p-4 sm:table-cell">
              {coin.time}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CoinsTablePage;

export const metadata: Metadata = {
  title: "جدول قیمت ساعتی سکه",
  description: "بروز رسانی قیمت سکه به صورت ساعتی",
};
