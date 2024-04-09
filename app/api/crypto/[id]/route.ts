import * as cheerio from "cheerio";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import prisma from "@/prisma/client";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const crypto = await prisma.crypto.findUnique({
    where: {
      id: +params.id,
    },
  });

  if (!crypto)
    return NextResponse.json({ message: "Bad Request" }, { status: 400 });

  const endpoint = "https://www.tgju.org/";
  const page = await axios.get(endpoint);

  const html = await page.data;
  const $ = cheerio.load(html);

  const cryptoId = +params.id - 1;

  const selectedCrypto = $(
    $(`table`).eq(18).find("tbody > tr").get(cryptoId),
  ).find("td");

  const cryptoName = $($(`table`).eq(18).find("tbody > tr").get(cryptoId)).find(
    "th",
  );

  const data = {
    name: cryptoName.text().trim(),
    rialPrice: $(selectedCrypto[0]).text().trim(),
    dollarPrice: $(selectedCrypto[1]).text().trim(),
    change: $(selectedCrypto[2]).text().trim(),
    status: $(selectedCrypto[2]).attr("class"),
    lowest: $(selectedCrypto[3]).text().trim(),
    highest: $(selectedCrypto[4]).text().trim(),
    time: $(selectedCrypto[5]).text().trim(),
  };

  const updatedData = await prisma.crypto.update({
    where: {
      id: +params.id,
    },
    data: {
      rialPrice: data.rialPrice,
      dollarPrice: data.dollarPrice,
      change: data.change,
      lowest: data.lowest,
      highest: data.highest,
      status: "fixed",
      time: data.time,
    },
  });

  return NextResponse.json({ updatedData }, { status: 201 });
}
