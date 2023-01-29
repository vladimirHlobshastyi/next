import { NextApiRequest, NextApiResponse } from "next";
import { mocProducts } from "../../../moc/moc";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const product = mocProducts.filter((item) => item.id.toString() === id);
  res.status(200).json(product[0]);
}
