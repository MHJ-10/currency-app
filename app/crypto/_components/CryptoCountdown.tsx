"use client";

import React from "react";
import Countdown from "@/app/components/Countdown";
import { Crypto } from "@prisma/client";
import { httpService } from "@/app/services/http-service";

const CryptoCountdown = ({ crypto }: { crypto: Crypto[] }) => {
  const updateCrypto = async () => {
    for (const c of crypto) {
      try {
        const response = await httpService.patch(`/crypto/${c.id}`);
        console.log(response);
      } catch (error) {
        console.error(`Failed to update crypto ${c.id}:`, error);
      }
    }
  };

  return (
    <div>
      <Countdown refreshTime={3000} updateFunc={updateCrypto} />
    </div>
  );
};

export default CryptoCountdown;
