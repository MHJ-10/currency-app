import { Coin, Status } from "@/app/entities";
import axios from "axios";
import * as cheerio from "cheerio";
import { NextResponse } from "next/server";

export async function GET() {
  const html = (await axios.get("https://www.tgju.org/")).data;
  const $ = cheerio.load(html);

  const coins: Coin[] = [];

  for (let i = 0; i < 5; i++) {
    const selectedCoin = $($("#coin-table > tbody > tr").get(i)).find("td");

    const coinName = $($("#coin-table > tbody > tr").get(i)).find("th");

    const data: Coin = {
      name: coinName.text().trim(),
      price: $(selectedCoin[0]).text().trim(),
      change: $(selectedCoin[1]).text().trim(),
      status:
        (($(selectedCoin[1]).attr("class")
          ? $(selectedCoin[1]).attr("class")
          : $(selectedCoin[1]).find("span").attr("class")) as Status) ||
        "fixed",
      lowest: $(selectedCoin[2]).text().trim(),
      highest: $(selectedCoin[3]).text().trim(),
      time: $(selectedCoin[4]).text().trim(),
    };

    coins.push(data);
  }

  return NextResponse.json({ coins, length: coins.length }, { status: 200 });
}
