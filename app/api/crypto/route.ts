import { Crypto, Status } from "@/app/entities";
import axios from "axios";
import * as cheerio from "cheerio";
import { NextResponse } from "next/server";

export async function GET() {
  const html = (await axios.get("https://www.tgju.org/")).data;
  const $ = cheerio.load(html);

  const crypto: Crypto[] = [];

  for (let i = 0; i < 15; i++) {
    const selectedCrypto = $($(`table`).eq(18).find("tbody > tr").get(i)).find(
      "td",
    );

    const cryptoName = $($(`table`).eq(18).find("tbody > tr").get(i)).find(
      "th",
    );

    const data: Crypto = {
      name: cryptoName.text().trim(),
      rialPrice: $(selectedCrypto[0]).text().trim(),
      dollarPrice: $(selectedCrypto[1]).text().trim(),
      change: $(selectedCrypto[2]).text().trim(),
      status:
        ($(selectedCrypto[2]).find("div").attr("class") as Status) || "fixed",
      lowest: $(selectedCrypto[3]).text().trim(),
      highest: $(selectedCrypto[4]).text().trim(),
      time: $(selectedCrypto[5]).text().trim(),
    };

    crypto.push(data);
  }

  return NextResponse.json({ crypto, length: crypto.length }, { status: 200 });
}
