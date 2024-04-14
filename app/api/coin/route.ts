import { Status } from "@prisma/client";
import * as cheerio from "cheerio";
import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

export interface Coin {
  name: string;
  price: string;
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

  const coins: Coin[] = [];

  for (let i = 0; i < 5; i++) {
    const selectedCoin = $($("#coin-table > tbody > tr").get(i)).find("td");

    const coinName = $($("#coin-table > tbody > tr").get(i)).find("th");

    const data: Coin = {
      name: coinName.text().trim(),
      price: $(selectedCoin[0]).text().trim(),
      change: $(selectedCoin[1]).text().trim(),
      status: ($(selectedCoin[1]).attr("class") as Status) ?? "fixed",
      lowest: $(selectedCoin[2]).text().trim(),
      highest: $(selectedCoin[3]).text().trim(),
      time: $(selectedCoin[4]).text().trim(),
    };

    coins.push(data);
  }

  await browser.close();

  return NextResponse.json({ coins, length: coins.length }, { status: 200 });
}
