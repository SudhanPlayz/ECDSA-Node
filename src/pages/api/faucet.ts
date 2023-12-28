import { db } from "@/server/db";
import { getAddress, isAddress } from "@/utils/address";
import { NextApiRequest, NextApiResponse } from "next";
import { secp256k1 } from "ethereum-cryptography/secp256k1"
import { env } from "@/env";
import { toHex } from "ethereum-cryptography/utils";
import hashMessage from "@/utils/hashMessage";
import signMessage from "@/utils/signMessage";
import verify from "@/utils/verify";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const forwarded = req.headers["x-forwarded-for"]
    // @ts-ignore
    const ip: string = forwarded ? forwarded.split(/, /)[0] : req.socket.remoteAddress
    const address = req.query.address as string;

    if (!address) return res.status(400).send({ error: 'Address is required' });
    if (!isAddress(address)) return res.status(400).send({ error: 'Invalid address' });

    let ratelimit = await db.ratelimit.findUnique({
        where: {
            ip: ip
        }
    })

    //wait 5 minutes after the last request
    if (ratelimit && (Date.now() - new Date(ratelimit.timestamp).getTime()) < 300000) {
        return res.status(429).send({ error: 'Too many requests' });
    }

    //send 5 balance from the faucet
    const faucet = getAddress(secp256k1.getPublicKey(env.PRIVATE_KEY))
    const wallet = await db.address.findUnique({
        where: {
            address: faucet
        }
    })

    if (!wallet)return res.status(500).send({ error: 'Faucet wallet not found' });
    if (wallet.balance < 10) return res.status(500).send({ error: 'Faucet wallet has insufficient balance' });

    let message = {
        from: faucet,
        to: address,
        amount: 10
    }

    let messageHash = hashMessage(message.toString())
    let signature = signMessage(toHex(messageHash), env.PRIVATE_KEY)

    let verification = await verify(faucet, address, 10, signature)
    if (verification.error) return res.status(500).send(verification)

    return res.status(200).send(verification)
}