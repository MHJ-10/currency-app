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
          <th className="p-4">ارز آزاد</th>
          <th className="p-4">قیمت زنده</th>
          <th className="hidden p-4 sm:table-cell">تغییر</th>
          <th className="hidden p-4 md:table-cell">کمترین</th>
          <th className="hidden p-4 md:table-cell">بیشترین</th>
          <th className="hidden p-4 sm:table-cell">زمان</th>
        </tr>
      </thead>
      <tbody>
        {currency.map((c) => (
          <tr
            key={c.name}
            className={`border-b border-white bg-secondary transition-colors duration-500  hover:bg-opacity-80 ${c.status === "high" && "bg-green-600"} ${c.status === "low" && "bg-red-500"} `}
          >
            <td className="whitespace-nowrap p-4">{c.name}</td>
            <td className="whitespace-nowrap p-4">{c.price}</td>
            <td className="hidden whitespace-nowrap p-4 sm:table-cell">
              {c.change}
            </td>
            <td className="hidden whitespace-nowrap p-4 md:table-cell">
              {c.lowest}
            </td>
            <td className="hidden whitespace-nowrap p-4 md:table-cell">
              {c.highest}
            </td>
            <td className="hidden whitespace-nowrap p-4 sm:table-cell">
              {c.time}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CurrencyPage;
