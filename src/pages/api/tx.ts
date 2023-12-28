import { db } from '@/server/db';
import { isAddress } from '@/utils/address';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { id } = req.query;

    if (!id) return res.status(400).send({ error: 'No address specified' });
    
    const tx = await db.transaction.findUnique({
        where: {
            id: id as string
        }
    })

    if (!tx) return res.status(404).send({ error: 'Transaction not found' });

    return res.status(200).send(tx)
}