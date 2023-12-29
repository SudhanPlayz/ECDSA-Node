import { isAddress } from "@/utils/address";
import { NextApiRequest, NextApiResponse } from "next";
import verify from "@/utils/verify";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    let {
        from,//from address in hex
        to,//to address in hex
        amount, //amount in number
        signature //message hash in hex
    } = req.body;
    console.log(req.body)

    if (!from) return res.status(400).send({ error: 'No from address specified' })
    if (!to) return res.status(400).send({ error: 'No to address specified' })
    if (!amount) return res.status(400).send({ error: 'No amount specified' })
    if (!signature) return res.status(400).send({ error: 'No signature specified' })
    if (!isAddress(from)) return res.status(400).send({ error: 'Invalid from address' })
    if (!isAddress(to)) return res.status(400).send({ error: 'Invalid to address' })
    if(amount <= 0) return res.status(400).send({ error: 'Amount must be positive and greater than 0' })

    let verification = await verify(from, to, amount, signature)
    if(verification.error) return res.status(400).send(verification)

    return res.status(200).send(verification)
}