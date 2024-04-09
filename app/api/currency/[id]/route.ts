import * as cheerio from "cheerio";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import prisma from "@/prisma/client";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const currency = await prisma.currency.findUnique({
    where: {
      id: +params.id,
    },
  });

  if (!currency)
    return NextResponse.json({ message: "Bad Request" }, { status: 400 });

  const endpoint = "https://www.tgju.org/";
  const page = await axios.get(endpoint);

  const html = await page.data;
  const $ = cheerio.load(html);

  const tableNum = +params.id > 18 ? 15 : 14;

  const currencyId = +params.id > 18 ? +params.id - 19 : +params.id - 1;

  const selectedCurrency = $(
    $(`table`).eq(tableNum).find("tbody > tr").get(currencyId),
  ).find("td");

  const data = {
    price: $(selectedCurrency[0]).text().trim(),
    change: $(selectedCurrency[1]).text().trim(),
    status: $(selectedCurrency[1]).attr("class"),
    lowest: $(selectedCurrency[2]).text().trim(),
    highest: $(selectedCurrency[3]).text().trim(),
    time: $(selectedCurrency[4]).text().trim(),
  };

  const updatedCurrency = await prisma.currency.update({
    where: {
      id: +params.id,
    },
    data: {
      price: data.price,
      change: data.change,
      lowest: data.lowest,
      highest: data.highest,
      status: "fixed",
      time: data.time,
    },
  });

  return NextResponse.json({ updatedCurrency }, { status: 201 });
}
