import { NextApiRequest, NextApiResponse } from 'next';
import { authToken } from '../../mock/mock';

const loginMock = 'user';
const passwordMock: string = 'password';
const token = authToken;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { username, password }: { username: string; password: string } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      message: 'Username and password are required',
    });
  }

  const isLoginValid = username === loginMock;
  const isPasswordValid = password === passwordMock;

  if (!isLoginValid || !isPasswordValid) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  res.status(200).json(token);
}
