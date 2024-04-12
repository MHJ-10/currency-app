import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import axios from "axios";
import * as cheerio from "cheerio";
import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

interface Currency {
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

  const allData: Currency[] = [];

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
      status: $(selectedCurrency[1]).attr("class") as Status,
      lowest: $(selectedCurrency[2]).text().trim(),
      highest: $(selectedCurrency[3]).text().trim(),
      time: $(selectedCurrency[4]).text().trim(),
    };

    allData.push(data);
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
      status: $(selectedCurrency[1]).attr("class") as Status,
      lowest: $(selectedCurrency[2]).text().trim(),
      highest: $(selectedCurrency[3]).text().trim(),
      time: $(selectedCurrency[4]).text().trim(),
    };

    allData.push(data);
  }

  await browser.close();

  return NextResponse.json(
    { data: allData, length: allData.length },
    { status: 200 },
  );
}

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
