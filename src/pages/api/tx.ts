import { db } from '@/server/db';
import { isAddress } from '@/utils/address';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { tx } = req.query;

    if (!tx) return res.status(400).send({ error: 'No address specified' });
    
    const TX = await db.transaction.findUnique({
        where: {
            id: tx as string
        }
    })

    if (!TX) return res.status(404).send({ error: 'Transaction not found' });

    return res.status(200).send(TX)
}