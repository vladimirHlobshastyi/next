import { NextApiRequest, NextApiResponse } from "next";
import { allProducts } from "../../../moc/moc";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { category, idProduct } = req.query;

  const product = () => {
    if (!Array.isArray(category) && category) {
      return allProducts[category].data.filter(
        (item) => item.id.toString() === idProduct
      );
    }
  };

  res.status(200).json(product());
}
