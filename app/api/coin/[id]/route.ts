import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer";
import * as cheerio from "cheerio";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const coin = await prisma.coin.findUnique({
    where: { id: +params.id },
  });

  if (!coin)
    return NextResponse.json({ message: "Bad Request" }, { status: 400 });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://www.tgju.org/", { waitUntil: "networkidle2" });

  const html = await page.content();
  const $ = cheerio.load(html);

  const selectedCoin = $(
    $("#coin-table > tbody > tr").get(+params.id - 1),
  ).find("td");

  const data = {
    price: $(selectedCoin[0]).text().trim(),
    change: $(selectedCoin[1]).text().trim(),
    status: $(selectedCoin[1]).attr("class"),
    lowest: $(selectedCoin[2]).text().trim(),
    highest: $(selectedCoin[3]).text().trim(),
    time: $(selectedCoin[4]).text().trim(),
  };

  const updatedData = await prisma.coin.update({
    where: {
      id: +params.id,
    },
    data: {
      price: data.price,
      change: data.change,
      lowest: data.lowest,
      highest: data.highest,
      time: data.time,
      status: "fixed",
    },
  });

  await browser.close();

  return NextResponse.json({ updatedData }, { status: 201 });
}
