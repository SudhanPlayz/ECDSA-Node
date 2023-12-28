import { db } from '@/server/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { secp256k1 } from "ethereum-cryptography/secp256k1"
import getAddress from '@/utils/getAddress';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const privateKey = secp256k1.utils.randomPrivateKey();
    const publicKey = secp256k1.getPublicKey(privateKey);
    const address = getAddress(publicKey);

    const wallet = await db.address.create({
        data: {
            address,
            publicKey: Buffer.from(publicKey),
            balance: 0
        }
    });

    return res.status(200).json({
        ...wallet,
        privateKey: Buffer.from(privateKey).toString('hex')
    });
}