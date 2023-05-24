import { NextApiRequest, NextApiResponse } from 'next';
import { mocProducts } from '../../mock/mock';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).json(mocProducts);
}
