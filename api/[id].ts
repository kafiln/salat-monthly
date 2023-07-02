import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getMonthlyPrayers } from "../utils";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { id } = req.query;
  console.log(id);
  const data = await getMonthlyPrayers(Number(id));
  console.log(data);
  return res.json({
    data,
  });
}
