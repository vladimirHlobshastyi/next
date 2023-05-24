import { produtsDataType } from '../../../mock/mock';
import { NextApiRequest, NextApiResponse } from 'next';
import { allProducts } from '../../../mock/mock';

export type searchProductResult = {
  product: produtsDataType;
  category: string;
}[];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { search } = req.query;
  res.setHeader('Access-Control-Allow-Origin', '*');
  const bodyReq = search as string;

  const result = [] as searchProductResult;

  for (const keyItem in allProducts) {
    allProducts[keyItem].data.forEach((product) => {
      const isIncludes = product.description.toLowerCase().includes(bodyReq.toLocaleLowerCase());
      if (isIncludes) {
        result.push({ product, category: keyItem });
      }
    });
  }

  res.status(200).json(result);
}
