import { Crypto, Status } from "@/app/entities";
import * as cheerio from "cheerio";
import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function GET() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://www.tgju.org/", { waitUntil: "networkidle2" });

  const html = await page.content();
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
        ($(selectedCrypto[2]).attr("class")?.split(" ")[1] as Status) ??
        Status.fixed,
      lowest: $(selectedCrypto[3]).text().trim(),
      highest: $(selectedCrypto[4]).text().trim(),
      time: $(selectedCrypto[5]).text().trim(),
    };

    crypto.push(data);
  }

  await browser.close();

  return NextResponse.json({ crypto, length: crypto.length }, { status: 200 });
}
