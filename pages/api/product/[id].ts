import { NextApiRequest, NextApiResponse } from 'next';
import { allProducts, produtsDataType } from '../../../mock/moc';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { category, idProduct } = req.query;
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (!category || !idProduct || Array.isArray(category) || Array.isArray(idProduct)) {
    return res.status(400).json({ message: 'Missing category or idProduct parameter' });
  } else if (!allProducts[category]) {
    return res.status(404).json({ message: 'Category not found' });
  }

  if (idProduct) {
    const product = allProducts[category].data.find((productItem) => productItem.id === idProduct);
    if (product) {
      return res.status(200).json(product);
    } else {
      return res.status(404).json({ message: 'Product not found' });
    }
  } else {
    return res.status(200).json(allProducts[category].data);
  }
}
