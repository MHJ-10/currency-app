import { Coin } from "../entities";

interface CoinData {
  coins: Coin[];
  length: number;
}

const CoinsTablePage = async () => {
  const res = await fetch("http://localhost:3000/api/coin", {
    next: {
      revalidate: 2 * 60 * 60,
    },
  });
  const data: CoinData = await res.json();
  const coins = data.coins;

  return (
    <table className="mx-auto my-5 w-4/5 rounded-md border text-center text-white">
      <thead className="border-b bg-white bg-opacity-70 text-primary ">
        <tr>
          <th className="px-6 py-4">نام سکه</th>
          <th className="px-6 py-4">قیمت زنده</th>
          <th className="px-6 py-4">تغییر</th>
          <th className="px-6 py-4">کمترین</th>
          <th className="px-6 py-4">بیشترین</th>
          <th className="px-6 py-4">زمان</th>
        </tr>
      </thead>
      <tbody>
        {coins.map((coin) => (
          <tr
            key={coin.name}
            className={`border-b border-white bg-secondary transition-colors duration-500  hover:bg-opacity-80 ${coin.status === "high" && "bg-green-500"} ${coin.status === "low" && "bg-red-500"} `}
          >
            <td className="whitespace-nowrap px-6 py-4">{coin.name}</td>
            <td className="whitespace-nowrap px-6 py-4">{coin.price}</td>
            <td className="whitespace-nowrap px-6 py-4">{coin.change}</td>
            <td className="whitespace-nowrap px-6 py-4">{coin.lowest}</td>
            <td className="whitespace-nowrap px-6 py-4">{coin.highest}</td>
            <td className="whitespace-nowrap px-6 py-4">{coin.time}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CoinsTablePage;
