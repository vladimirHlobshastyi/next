import { produtsDataType } from "../../../moc/moc";
import { NextApiRequest, NextApiResponse } from "next";
import { allProducts } from "../../../moc/moc";

export type searchProductResult = {
  product: produtsDataType;
  category: string;
}[];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { search } = req.query;

  if (req.method !== "GET") {
    res.status(405).end();
    return;
  }

  if (!search) {
    res.status(400).json({ message: 'Параметр "search" обязателен' });
    return;
  }

  if (typeof search !== "string") {
    return res.status(400).json({ error: "Invalid search query" });
  }

  /*  if (search.trim().length === 0) {
    res.status(400).json({ message: 'Параметр "search" не может быть пустым' });
    return;
  } */
  const bodyReq = search.toLowerCase();

  const result = [] as searchProductResult;

  for (let keyItem in allProducts) {
    allProducts[keyItem].data.forEach((product) => {
      const isIncludes = product.description.toLowerCase().includes(bodyReq);
      if (isIncludes) {
        result.push({ product, category: keyItem });
      }
    });
  }

  res.status(200).json(result);
}
