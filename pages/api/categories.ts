import { NextApiRequest, NextApiResponse } from 'next';
import { categoriesMock } from '../../mock/mock';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).json(categoriesMock);
}
