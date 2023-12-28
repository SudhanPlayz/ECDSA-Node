import { db } from '@/server/db';
import { isAddress } from '@/utils/address';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { address } = req.query;

    if (!address) return res.status(400).json({ error: 'Address is required' });
    if (!isAddress(address as string)) return res.status(400).json({ error: 'Invalid address' });

    const wallet = await db.address.findUnique({
        where: {
            address: address as string,
        }
    });

    if (!wallet) return res.status(404).json({ error: 'Wallet not found' });

    return res.status(200).json(wallet);
}