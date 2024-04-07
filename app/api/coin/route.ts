import * as cheerio from "cheerio";
import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function GET() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://www.tgju.org/", { waitUntil: "networkidle2" });

  const html = await page.content();
  const $ = cheerio.load(html);

  const selectedCoin = $($("#coin-table > tbody > tr").get(2)).find("td");

  const data = {
    price: $(selectedCoin[0]).text().trim(),
    change: $(selectedCoin[1]).text().trim(),
    status: $(selectedCoin[1]).attr("class"),
    lowest: $(selectedCoin[2]).text().trim(),
    highest: $(selectedCoin[3]).text().trim(),
    time: $(selectedCoin[4]).text().trim(),
  };

  await browser.close();

  return NextResponse.json({ data });
}
