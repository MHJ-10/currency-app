import { Crypto } from "../entities";

interface CryptoData {
  crypto: Crypto[];
  length: number;
}

const CryptoPage = async () => {
  const res = await fetch("http://localhost:3000/api/crypto", {
    next: {
      revalidate: 2 * 60 * 60,
    },
  });
  const data: CryptoData = await res.json();
  const crypto = data.crypto;

  return (
    <table className="mx-auto my-5 w-11/12 rounded-md  border px-3 text-center text-white ">
      <thead className="border-b bg-white bg-opacity-70 text-primary ">
        <tr>
          <th className="p-4">نام ارز</th>
          <th className="p-4">قیمت ریالی</th>
          <th className="p-4">قیمت دلاری</th>
          <th className="hidden p-4 sm:table-cell">تغییر</th>
          <th className="hidden p-4 sm:table-cell">کمترین</th>
          <th className="hidden p-4 sm:table-cell">بیشترین</th>
          <th className="hidden p-4 sm:table-cell">زمان</th>
        </tr>
      </thead>
      <tbody>
        {crypto.map((c) => (
          <tr
            key={c.name}
            className={`border-b border-white bg-secondary transition-colors duration-500  hover:bg-opacity-80 ${c.status === "high" && "bg-green-500"} ${c.status === "low" && "bg-red-500"} `}
          >
            <td className="whitespace-nowrap p-4">{c.name}</td>
            <td className="whitespace-nowrap p-4">{c.rialPrice}</td>
            <td className="whitespace-nowrap p-4">{c.dollarPrice}</td>
            <td className="hidden whitespace-nowrap p-4 sm:table-cell">
              {c.change}
            </td>
            <td className="hidden whitespace-nowrap p-4 sm:table-cell">
              {c.lowest}
            </td>
            <td className="hidden whitespace-nowrap p-4 sm:table-cell">
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

export default CryptoPage;
