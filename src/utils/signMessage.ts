import { secp256k1 } from "ethereum-cryptography/secp256k1"

export default (message: string, privateKey: string) => {
    return secp256k1.sign(message, privateKey)
}