import { db } from '@/server/db';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { address } = req.query;

    if (!address) {
        return res.status(400).json({ message: 'Address is required' });
    }

    const wallet = await db.address.findUnique({
        where: {
            address: address as string,
        }
    });

    if (!wallet) {
        return res.status(404).json({ message: 'Wallet not found' });
    }

    return res.status(200).json(wallet);
}