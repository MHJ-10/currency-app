import { Currency } from "../entities";

interface CurrencyData {
  currency: Currency[];
  length: number;
}

const CurrencyPage = async () => {
  const res = await fetch("http://localhost:3000/api/currency", {
    next: {
      revalidate: 2 * 60 * 60,
    },
  });
  const data: CurrencyData = await res.json();
  const currency = data.currency;

  return (
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
        {currency.map((c) => (
          <tr
            key={c.name}
            className={`border-b border-white bg-secondary transition-colors duration-500  hover:bg-opacity-80 ${c.status === "high" && "bg-green-500"} ${c.status === "low" && "bg-red-500"} `}
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
  );
};

export default CurrencyPage;
