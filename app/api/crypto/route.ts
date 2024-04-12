import * as cheerio from "cheerio";
import { NextResponse } from "next/server";
import axios from "axios";
import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import puppeteer from "puppeteer";

export interface Crypto {
  name: string;
  rialPrice: string;
  dollarPrice: string;
  change: string;
  status: Status;
  lowest: string;
  highest: string;
  time: string;
}

export async function GET() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://www.tgju.org/", { waitUntil: "networkidle2" });

  const html = await page.content();
  const $ = cheerio.load(html);

  const allData: Crypto[] = [];

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
      status: $(selectedCrypto[2]).attr("class") as Status,
      lowest: $(selectedCrypto[3]).text().trim(),
      highest: $(selectedCrypto[4]).text().trim(),
      time: $(selectedCrypto[5]).text().trim(),
    };

    allData.push(data);
  }

  await browser.close();

  return NextResponse.json(
    { crypto: allData, length: allData.length },
    { status: 200 },
  );
}

// export async function POST() {
//   const endpoint = "https://www.tgju.org/";
//   const page = await axios.get(endpoint);

//   const html = await page.data;
//   const $ = cheerio.load(html);

//   const cryptoId = 14;

//   const selectedCrypto = $(
//     $(`table`).eq(18).find("tbody > tr").get(cryptoId),
//   ).find("td");

//   const cryptoName = $($(`table`).eq(18).find("tbody > tr").get(cryptoId)).find(
//     "th",
//   );

//   const data = {
//     name: cryptoName.text().trim(),
//     rialPrice: $(selectedCrypto[0]).text().trim(),
//     dollarPrice: $(selectedCrypto[1]).text().trim(),
//     change: $(selectedCrypto[2]).text().trim(),
//     status: $(selectedCrypto[2]).attr("class"),
//     lowest: $(selectedCrypto[3]).text().trim(),
//     highest: $(selectedCrypto[4]).text().trim(),
//     time: $(selectedCrypto[5]).text().trim(),
//   };

//   const newCrypto = await prisma.crypto.create({
//     data: {
//       name: data.name,
//       rialPrice: data.rialPrice,
//       dollarPrice: data.dollarPrice,
//       change: data.change,
//       lowest: data.lowest,
//       highest: data.highest,
//       status: "fixed",
//       time: data.time,
//       id: cryptoId + 1,
//     },
//   });

//   return NextResponse.json({ newCrypto });
// }
