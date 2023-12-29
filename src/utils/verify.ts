import { secp256k1 } from "ethereum-cryptography/secp256k1"
import hashMessage from "./hashMessage"
import { db } from "@/server/db"
import { Hex } from "@noble/curves/abstract/utils"
import { toHex } from "ethereum-cryptography/utils";

export default async (from: any, to: any, amount: number, signature: Hex | { r: bigint; s: bigint }) => {
    if(from === to)return { error: 'From address can't be same as to address' };
    let fromWallet = await db.address.findUnique({
        where: {
            address: from
        }
    })
    if(!fromWallet) return { error: 'From address not found' }
    if(fromWallet.balance < amount) return { error: 'Insufficient balance' }

    let toWallet = await db.address.findUnique({
        where: {
            address: to
        }
    })
    if(!toWallet) return { error: 'To address not found' }

    let message = {
        from: from,
        to: to,
        amount: amount
    }

    let messageHash = hashMessage(message.toString())
    let verification = secp256k1.verify(signature, messageHash, fromWallet.publicKey)

    if(!verification) return { error: 'Invalid signature' }

    await db.address.update({
        where: {
            address: from
        },
        data: {
            balance: fromWallet.balance - amount
        }
    })

    await db.address.update({
        where: {
            address: to
        },
        data: {
            balance: toWallet.balance + amount
        }
    })

    let tx = await db.transaction.create({
        data: {
            from: from,
            to: to,
            amount: amount,
            hash: toHex(messageHash),
        }
    })

    return { success: true, message: 'Transaction successful', tx }
}