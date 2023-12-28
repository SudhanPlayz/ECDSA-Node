import { db } from "@/server/db";
import { getAddress, isAddress } from "@/utils/address";
import { NextApiRequest, NextApiResponse } from "next";
import { secp256k1 } from "ethereum-cryptography/secp256k1"
import { env } from "@/env";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const forwarded = req.headers["x-forwarded-for"]
    // @ts-ignore
    const ip: string = forwarded ? forwarded.split(/, /)[0] : req.socket.remoteAddress
    const address = req.query.address as string;

    if (!address) return res.status(400).send("No address specified")
    if (!isAddress(address)) return res.status(400).send("Invalid address")

    let ratelimit = await db.ratelimit.findUnique({
        where: {
            ip: ip
        }
    })

    //wait 5 minutes after the last request
    if (ratelimit && (Date.now() - new Date(ratelimit.timestamp).getTime()) < 300000) {
        return res.status(429).send("Too many requests")
    }

    //send 5 balance from the faucet
    const faucet = getAddress(secp256k1.getPublicKey(env.PRIVATE_KEY))
    console.log(faucet)
}