import * as cheerio from "cheerio";
import { NextResponse } from "next/server";
import axios from "axios";
import prisma from "@/prisma/client";

export async function POST() {
  const endpoint = "https://www.tgju.org/";
  const page = await axios.get(endpoint);

  const html = await page.data;
  const $ = cheerio.load(html);

  const currencyId = 18;

  const selectedCurrency = $(
    $(`table`).eq(15).find("tbody > tr").get(currencyId),
  ).find("td");

  const currencyName = $(
    $(`table`).eq(15).find("tbody > tr").get(currencyId),
  ).find("th");

  const data = {
    name: currencyName.text().trim(),
    price: $(selectedCurrency[0]).text().trim(),
    change: $(selectedCurrency[1]).text().trim(),
    status: $(selectedCurrency[1]).attr("class"),
    lowest: $(selectedCurrency[2]).text().trim(),
    highest: $(selectedCurrency[3]).text().trim(),
    time: $(selectedCurrency[4]).text().trim(),
  };

  const newCurrency = await prisma.currency.create({
    data: {
      name: data.name,
      price: data.price,
      change: data.change,
      lowest: data.lowest,
      highest: data.highest,
      status: "fixed",
      time: data.time,
      id: currencyId + 19,
    },
  });

  return NextResponse.json({ newCurrency });
}
