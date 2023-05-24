import { NextApiRequest, NextApiResponse } from 'next';
import { mockProducts } from '../../mock/mock';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).json(mockProducts);
}
