import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getMonthlyPrayers } from "../utils";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { id } = req.query;
  const data = await getMonthlyPrayers(Number(id));
  return res.json({
    data,
  });
}
