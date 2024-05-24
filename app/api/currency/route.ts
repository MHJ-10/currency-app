import { Currency, Status } from "@/app/entities";
import axios from "axios";
import * as cheerio from "cheerio";
import { NextResponse } from "next/server";

export async function GET() {
  const html = (await axios.get("https://www.tgju.org/")).data;
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
      status:
        ($(selectedCurrency[1]).find("div").attr("class") as Status) || "fixed",
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
      status:
        ($(selectedCurrency[1]).find("div").attr("class") as Status) || "fixed",
      lowest: $(selectedCurrency[2]).text().trim(),
      highest: $(selectedCurrency[3]).text().trim(),
      time: $(selectedCurrency[4]).text().trim(),
    };

    currency.push(data);
  }

  return NextResponse.json(
    { currency, length: currency.length },
    { status: 200 },
  );
}
