import { Currency, Status } from "@/app/entities";
import * as cheerio from "cheerio";
import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function GET() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://www.tgju.org/", { waitUntil: "networkidle2" });

  const html = await page.content();
  const $ = cheerio.load(html);

  const currency: Currency[] = [];

  for (let i = 0; i < 18; i++) {
    const selectedCurrency = $(
      $(`table`).eq(14).find("tbody > tr").get(i),
    ).find("td");

    const currencyName = $($(`table`).eq(14).find("tbody > tr").get(i)).find(
      "th",
    );

    const data: Currency = {
      name: currencyName.text().trim(),
      price: $(selectedCurrency[0]).text().trim(),
      change: $(selectedCurrency[1]).text().trim(),
      status: ($(selectedCurrency[1]).attr("class") as Status) || Status.fixed,
      lowest: $(selectedCurrency[2]).text().trim(),
      highest: $(selectedCurrency[3]).text().trim(),
      time: $(selectedCurrency[4]).text().trim(),
    };

    currency.push(data);
  }

  for (let i = 0; i < 18; i++) {
    const selectedCurrency = $(
      $(`table`).eq(15).find("tbody > tr").get(i),
    ).find("td");

    const currencyName = $($(`table`).eq(15).find("tbody > tr").get(i)).find(
      "th",
    );

    const data: Currency = {
      name: currencyName.text().trim(),
      price: $(selectedCurrency[0]).text().trim(),
      change: $(selectedCurrency[1]).text().trim(),
      status: ($(selectedCurrency[1]).attr("class") as Status) || Status.fixed,
      lowest: $(selectedCurrency[2]).text().trim(),
      highest: $(selectedCurrency[3]).text().trim(),
      time: $(selectedCurrency[4]).text().trim(),
    };

    currency.push(data);
  }

  await browser.close();

  return NextResponse.json(
    { currency, length: currency.length },
    { status: 200 },
  );
}
