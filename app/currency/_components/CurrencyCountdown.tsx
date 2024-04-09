"use client";

import React from "react";
import Countdown from "@/app/components/Countdown";
import { Currency } from "@prisma/client";
import { httpService } from "@/app/services/http-service";

const CurrencyCountdown = ({ currency }: { currency: Currency[] }) => {
  const updateCurrency = async () => {
    for (const c of currency) {
      try {
        const response = await httpService.patch(`/currency/${c.id}`);
        console.log(response);
      } catch (error) {
        console.error(`Failed to update currency ${c.id}:`, error);
      }
    }
  };

  return (
    <div>
      <Countdown refreshTime={3000} updateFunc={updateCurrency} />
    </div>
  );
};

export default CurrencyCountdown;
