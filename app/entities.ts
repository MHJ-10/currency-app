export enum Status {
  high = "high",
  fixed = "fixed",
  low = "low",
}

interface CommonData {
  name: string;
  change: string;
  status: Status;
  lowest: string;
  highest: string;
  time: string;
}

export interface Coin extends CommonData {
  price: string;
}

export interface Currency extends CommonData {
  price: string;
}

export interface Crypto extends CommonData {
  rialPrice: string;
  dollarPrice: string;
}
