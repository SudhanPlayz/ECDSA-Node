import { secp256k1 } from "ethereum-cryptography/secp256k1"

export const getPublicKey = (privateKey: string): Uint8Array | false => {
    try {
        return secp256k1.getPublicKey(Buffer.from(privateKey, "hex"))
    } catch (e) {
        return false
    }
}