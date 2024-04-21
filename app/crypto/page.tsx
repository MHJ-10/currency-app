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
  const { crypto }: CryptoData = await res.json();

  return (
    <table className="mx-auto my-5 w-11/12 rounded-md  border px-3 text-center text-white ">
      <thead className="border-b bg-white bg-opacity-70 text-primary ">
        <tr>
          <th className="p-4">نام ارز</th>
          <th className="p-4">قیمت ریالی</th>
          <th className="p-4">قیمت دلاری</th>
          <th className="hidden p-4 sm:table-cell">تغییر</th>
          <th className="hidden p-4 lg:table-cell">کمترین</th>
          <th className="hidden p-4 lg:table-cell">بیشترین</th>
          <th className="hidden p-4 sm:table-cell">زمان</th>
        </tr>
      </thead>
      <tbody>
        {crypto.map((c) => (
          <tr
            key={c.name}
            className={`border-b border-${c.status}-800 bg-${c.status}-700 transition-colors duration-500  hover:bg-opacity-80`}
          >
            <td className="whitespace-nowrap p-4">{c.name}</td>
            <td className="whitespace-nowrap p-4">{c.rialPrice}</td>
            <td className="whitespace-nowrap p-4">{c.dollarPrice}</td>
            <td className="hidden whitespace-nowrap p-4 sm:table-cell">
              {c.change}
            </td>
            <td className="hidden whitespace-nowrap p-4 lg:table-cell">
              {c.lowest}
            </td>
            <td className="hidden whitespace-nowrap p-4 lg:table-cell">
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
