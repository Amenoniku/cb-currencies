export interface Currency {
  ID: string;
  NumCode: string;
  CharCode: string;
  Nominal: number;
  Name: string;
  Value: number;
  Previous: number;
}

export interface Valute {
  [key: string]: Currency;
}

export interface CBR {
  Date: string;
  Valute: Valute;
}
