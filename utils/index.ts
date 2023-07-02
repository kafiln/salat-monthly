const fetch = require("node-fetch");
const { JSDOM } = require("jsdom");

const VALUES = [
  "day_name",
  "arabic_month",
  "month",
  "fajr",
  "chorouq",
  "dohr",
  "asr",
  "maghrib",
  "ishae",
];

const MONTHLY_URL = "https://habous.gov.ma/prieres/horaire_hijri_2.php?ville=";

export const getMonthlyPrayers = async (city: number) => {
  const data = await fetch(`${MONTHLY_URL}${city}`).then((res) => res.text());
  return mapResponseToMonthlyPrayers(data);
};

const mapResponseToMonthlyPrayers = (data: any): any => {
  const dom = new JSDOM(data);
  const items = dom.window.document.querySelectorAll("#horaire > tbody > tr");
  return Array.from(items).map((item) => {
    const result: any = {};
    // @ts-ignore
    const children = Array.from(item.children);
    VALUES.forEach((value: string, index) => {
      // skip month
      if (index === 2) return;
      // @ts-ignore
      result[value] = children[index]!.innerHTML.replace(/\s/g, "");
    });
    return result;
  });
};
