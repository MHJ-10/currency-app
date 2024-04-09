"use client";

import Countdown from "@/app/components/Countdown";
import { httpService } from "@/app/services/http-service";
import { Coin } from "@prisma/client";
import React from "react";

const CoinCountdown = ({ coins }: { coins: Coin[] }) => {
  const updateCoins = async () => {
    for (const coin of coins) {
      try {
        const response = await httpService.patch(`/coin/${coin.id}`);
        console.log(response);
      } catch (error) {
        console.error(`Failed to update coin ${coin.id}:`, error);
      }
    }
  };
  return (
    <div>
      <Countdown refreshTime={2000} updateFunc={updateCoins} />
    </div>
  );
};

export default CoinCountdown;
