import prisma from "@/prisma/client";
import CoinCountdown from "./_components/CoinCountdown";

const CoinsTablePage = async () => {
  const coins = await prisma.coin.findMany();

  return (
    <div className="flex flex-col items-center justify-center">
      {/* <CoinCountdown coins={coins}/> */}
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
          {coins?.map((coin, i) => (
            <tr
              key={coin.id}
              className={`border-b border-white transition-colors duration-500 hover:bg-opacity-80  ${i % 2 === 0 ? "bg-primary" : "bg-secondary"} `}
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
    </div>
  );
};

export default CoinsTablePage;
