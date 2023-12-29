import { db } from '@/server/db';
import { isAddress } from '@/utils/address';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { tx } = req.query;

    if (!tx) {
        const TX = await db.transaction.findMany({
            take: 10,
            orderBy: {
                timestamp: 'desc'
            }
        })
        return res.status(200).send(TX)
    }
    
    const TX = await db.transaction.findUnique({
        where: {
            id: tx as string
        }
    })

    if (!TX) return res.status(404).send({ error: 'Transaction not found' });

    return res.status(200).send(TX)
}